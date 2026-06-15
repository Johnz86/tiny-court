"""End-to-end verification of the interactive trial flow.

Drives the REAL wizard handlers (do_begin / do_send / do_action_by_id) through a
scripted session — complaint chat → evidence → judgement → plea → revised
judgement → court record — and verifies four properties:

  1. FLOW          phases advance exactly as the wizard promises
  2. GENERATION    no call fell back to canned text (trial.fallbacks empty)
  3. INTERACTIVITY every composer send was answered by a court reply
  4. RELEVANCE     the charge/reasons/sentence reference this case's actual
                   content (only enforced on a real backend; FakeClient is
                   canned by design)

plus the safety redirect (a serious message never enters the record).

Usage:
    uv run python scripts/verify_e2e.py                       # FakeClient smoke
    TINYCOURT_BACKEND=local uv run python scripts/verify_e2e.py        # real model
    (PowerShell)  $env:TINYCOURT_BACKEND='local'; uv run python scripts/verify_e2e.py

Exit code 0 = all checks passed.
"""

from __future__ import annotations

import re
import sys
import time

# The transcript dump + summary lines contain unicode (→, ·, smart quotes from the
# model). On a Windows cp1252 console that raises UnicodeEncodeError mid-report, so
# force UTF-8 on stdout/stderr where the runtime allows it.
for _stream in (sys.stdout, sys.stderr):
    try:
        _stream.reconfigure(encoding="utf-8")
    except (AttributeError, ValueError):
        pass

from tinycourt import app as tc
from tinycourt.app import C, WizardState, do_action_by_id, do_begin, do_send
from tinycourt.config import BACKEND
from tinycourt.safety import COPY_TOO_SERIOUS
from tinycourt.trial import COURT_VOICES

COMPLAINT = "My dog stole my sandwich off the table and buried it in the couch."
DETAIL = "There were crumbs in his bed and he refused to make eye contact."
EVIDENCE = "The couch cushion now has one suspicious sandwich-shaped lump."
PLEA = "He is a good boy and the table was suspiciously low."
SERIOUS = "Actually my neighbour keeps threatening to sue me."

_STOPWORDS = {
    "the", "and", "off", "his", "her", "their", "that", "this", "with", "was",
    "were", "have", "has", "from", "into", "over", "then", "like", "just", "very",
}


def _keywords(text: str) -> set[str]:
    return {w for w in re.findall(r"[a-z]+", text.lower()) if len(w) >= 4 and w not in _STOPWORDS}


CHECKS: list[tuple[str, bool, str]] = []


def check(name: str, ok: bool, info: str = "") -> None:
    CHECKS.append((name, ok, info))
    print(f"  [{'PASS' if ok else 'FAIL'}] {name}" + (f" — {info}" if info and not ok else ""))


def send(wiz, text):
    t0 = time.perf_counter()
    out = do_send(wiz, {"text": text, "files": []})
    print(f"  (send took {time.perf_counter() - t0:.1f}s)")
    return out[C["st"]], out


def act(wiz, action_id, text=""):
    t0 = time.perf_counter()
    out = do_action_by_id(wiz, action_id, text)
    print(f"  ({action_id} took {time.perf_counter() - t0:.1f}s)")
    return out[C["st"]], out


def main() -> int:
    live = BACKEND != "fake"
    print(f"backend: {BACKEND}" + ("" if live else " (relevance checks reported, not enforced)"))
    tc.build_demo()  # populate the component registry used by render()

    # --- Case scene: chat with the court -----------------------------------
    print("\n== case scene ==")
    wiz = do_begin(WizardState())[C["st"]]
    check("begin opens the glass trial on the case scene",
          wiz.wiz_phase == "trial" and wiz.focus == "case")

    wiz, _ = send(wiz, COMPLAINT)
    wiz, _ = send(wiz, DETAIL)
    case_events = [e for e in wiz.events if e.get("scene") == "case"]
    user_msgs = [e for e in case_events if e["who"] == "Complaint"]
    court_msgs = [e for e in case_events if e["who"] in COURT_VOICES]
    check("both complaint messages entered the chat", len(user_msgs) == 2)
    check("every send got a court reply", len(court_msgs) >= 2,
          f"got {len(court_msgs)} replies to 2 sends")

    # Safety: a serious message is redirected, never recorded.
    complaint_before = wiz.trial.complaint
    wiz, _ = send(wiz, SERIOUS)
    redirected = [e for e in wiz.events if e.get("text") == COPY_TOO_SERIOUS]
    check("serious message redirected with spec copy", bool(redirected))
    check("serious message never entered the complaint", wiz.trial.complaint == complaint_before)

    # --- Evidence scene ------------------------------------------------------
    print("\n== evidence scene ==")
    wiz, _ = act(wiz, "submit_evidence")
    check("evidence scene focused (stays in glass)",
          wiz.wiz_phase == "trial" and wiz.focus == "evidence")
    wiz, _ = send(wiz, EVIDENCE)
    check("exhibit created from evidence send", bool(wiz.trial.exhibits))
    ev_events = [e for e in wiz.events if e.get("scene") == "evidence"]
    check("clerk's exhibit ruling shown in chat",
          any(e["who"] == "Court Clerk" and "Exhibit" in e["text"] for e in ev_events))

    # --- Judgement -----------------------------------------------------------
    print("\n== judgement ==")
    wiz, out = act(wiz, "ask_judge")
    t = wiz.trial
    check("judgement phase reached", wiz.wiz_phase == "judgement")
    check("docket built (title + charge)", bool(t.case_title and t.charge))
    check("sentence generated", bool(t.sentence))
    check("reasons generated", bool(t.reasons))
    v = t.verdict
    check("verdict band valid",
          v.band in ("Not Guilty", "Guilty of a Lesser Pettiness", "Guilty"))
    check("confidence in range", 0 <= v.confidence <= 100)
    if live:
        check("creative verdict label generated",
              bool(t.verdict_label) and t.verdict_label != v.band,
              f"label: {t.verdict_label!r}")

    # --- Appeal → revised judgement -----------------------------------------
    print("\n== appeal ==")
    wiz, _ = act(wiz, "request_leniency")
    check("appeal returns to glass (plea focus)",
          wiz.wiz_phase == "trial" and wiz.focus == "plea")
    wiz, _ = send(wiz, PLEA)
    plea_events = [e for e in wiz.events if e.get("scene") == "appeal"]
    check("judge reacted to the plea", any(e["who"] in COURT_VOICES for e in plea_events))

    sentence_before = t.sentence
    wiz, _ = act(wiz, "submit_plea")
    check("revised judgement reached", wiz.wiz_phase == "revisedJudgement")
    check("revision marker set", bool(wiz.revision_marker))
    check("closing revised after plea", t.sentence != "" and (not live or t.sentence != sentence_before),
          "sentence unchanged by the plea")

    # --- Record --------------------------------------------------------------
    print("\n== record ==")
    wiz, out = act(wiz, "finalize")
    check("sentence/record phase reached", wiz.wiz_phase == "sentence")
    check("best quote present", bool(t.best_quote))
    v = t.verdict  # re-resolve: the plea may have moved the meters

    # --- Generation + relevance ----------------------------------------------
    print("\n== generation quality ==")
    check("no call fell back to canned text", t.fallbacks == [], f"fallbacks: {t.fallbacks}")

    case_words = _keywords(f"{COMPLAINT} {DETAIL} {EVIDENCE}")
    outcome_text = " ".join([t.case_title, t.charge, t.verdict_label, t.sentence, *t.reasons])
    reaction_text = " ".join(e["text"] for e in wiz.events if e["who"] in COURT_VOICES)
    outcome_hits = case_words & _keywords(outcome_text)
    reaction_hits = case_words & _keywords(reaction_text)
    relevance_ok = bool(outcome_hits)
    msg = f"outcome mentions {sorted(outcome_hits) or 'nothing case-specific'}"
    if live:
        check("outcome references this case's content", relevance_ok, msg)
        check("court replies reference this case's content", bool(reaction_hits),
              f"reactions mention {sorted(reaction_hits) or 'nothing case-specific'}")
    else:
        print(f"  [info] relevance (fake backend): {msg}")

    # --- Human-review transcript ----------------------------------------------
    print("\n== session transcript (for human review) ==")
    for e in wiz.events:
        print(f"  [{e.get('scene', '-'):>9}] {e['who']}: {e['text']}")
    print("\n== court record ==")
    print(f"  Case:      {t.case_title}")
    print(f"  Charge:    {t.charge}")
    print(f"  Accused:   {t.accused}")
    print(f"  Verdict:   {v.band} ({v.confidence}%)")
    print(f"  Label:     {t.verdict_label or '(band only)'}")
    for i, r in enumerate(t.reasons, 1):
        print(f"  Reason {i}:  {r}")
    print(f"  Sentence:  {t.sentence}")
    print(f"  Quote:     {t.best_quote}")

    # --- Full Trial: Witness → cross-examination → Twist → verdict -----------
    # The power-user path (design-spec §11.2): the Case File decomposes Suspicion
    # into Means/Motive/Opportunity, and the witness/twist phases move the legs
    # distinctly (meters brainstorm Config C, docs/adr/0005).
    print("\n== full trial: case file ==")
    fwiz = do_begin(WizardState(), "full")[C["st"]]
    check("full trial flagged", fwiz.trial.is_full)
    fwiz, _ = send(fwiz, "My cat unplugged the router during my big meeting and looked smug.")
    fwiz, _ = act(fwiz, "submit_evidence")
    fwiz, _ = send(fwiz, "There were paw prints on the router and a suspicious lack of remorse.")

    fwiz, fout = act(fwiz, "call_witness")
    check("witness scene reached (stays in glass)",
          fwiz.wiz_phase == "trial" and fwiz.focus == "witness")
    check("a witness testified", any(c.role == "Witness" for c in fwiz.trial.transcript))
    m = fwiz.trial.meters
    check("case file legs lit (Motive + Opportunity)", m.motive > 0 and m.opportunity > 0,
          f"means={m.means:.0f} motive={m.motive:.0f} opp={m.opportunity:.0f}")
    check("Suspicion is the mean of the legs",
          m.suspicion == round((m.means + m.motive + m.opportunity) / 3),
          f"suspicion={m.suspicion:.0f}, mean={round((m.means + m.motive + m.opportunity) / 3)}")

    legs_before = (m.means, m.motive, m.opportunity)
    fwiz, _ = act(fwiz, "cross_examine")
    check("cross-examination moves the case file legs",
          (m.means, m.motive, m.opportunity) != legs_before)

    fwiz, _ = act(fwiz, "add_twist")
    check("twist scene reached (stays in glass)",
          fwiz.wiz_phase == "trial" and fwiz.focus == "twist")
    check("twist is marked once-per-trial", fwiz.trial.twist_used)

    fwiz, _ = act(fwiz, "ask_judge")
    ft = fwiz.trial
    check("full trial reaches judgement", fwiz.wiz_phase == "judgement")
    check("full trial sentence generated", bool(ft.sentence))
    check("no full-trial call fell back to canned text", ft.fallbacks == [],
          f"fallbacks: {ft.fallbacks}")
    print("\n== full trial transcript (for human review) ==")
    for e in fwiz.events:
        print(f"  [{e.get('scene', '-'):>9}] {e['who']}: {e['text']}")
    fv = ft.verdict
    print(f"  Case File — Means {ft.meters.means:.0f} · Motive {ft.meters.motive:.0f} · "
          f"Opportunity {ft.meters.opportunity:.0f} → Suspicion {ft.meters.suspicion:.0f}")
    print(f"  Verdict:   {fv.band} ({fv.confidence}%)  Label: {ft.verdict_label or '(band only)'}")
    print(f"  Sentence:  {ft.sentence}")

    failed = [name for name, ok, _ in CHECKS if not ok]
    print(f"\n{len(CHECKS) - len(failed)}/{len(CHECKS)} checks passed.")
    if failed:
        print("FAILED: " + ", ".join(failed))
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
