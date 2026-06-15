"""Trial orchestration: ties the generation seam, the tolerant parser, the
deterministic fallbacks, and the verdict engine together.

Each model call goes through ``robust_call`` — generate, parse, retry once on a
bad parse, then surface ``ok=False`` so the step function can drop in a canned
fallback card (docs/adr/0003). The verdict band is always computed in Python
(docs/adr/0001); the CLOSING call only writes prose to fit it.
"""

from __future__ import annotations

import random
from collections.abc import Sequence

from . import data, prompts
from .config import BACKEND
from .generation import CallTag, FakeClient, GenerationClient, Message
from .parsing import Parsed, parse_delimited
from .safety import scrub_output
from .trial import COURT_VOICES, NOT_GUILTY, Exhibit, TrialState, clamp, compose_suspicion


# How much each interaction wears down the court's Patience (meters brainstorm,
# Config D). Tuned so a focused Quick Trial never exhausts it, but a long ramble
# of chatter eventually does — the court's natural anti-stall (~8 chat messages).
PATIENCE_CHATTER = -12.0
PATIENCE_EVIDENCE = -8.0
PATIENCE_OBJECTION = -15.0


def make_client() -> GenerationClient:
    """Construct the configured backend (docs/adr/0002). ``local`` is imported
    lazily so torch/transformers are never required for the fake path or tests."""
    if BACKEND == "local":
        from .local_client import LocalTransformersClient

        return LocalTransformersClient()
    if BACKEND == "remote":
        from .remote_client import RemoteModalClient

        return RemoteModalClient()
    return FakeClient()


def robust_call(
    client: GenerationClient,
    messages: list[Message],
    tag: CallTag,
    *,
    required_keys: Sequence[str] = (),
    max_new_tokens: int = 320,
    temperature: float = 0.9,
    state: TrialState,
) -> Parsed:
    """Generate + parse with a single retry. Returns the best parse; ``ok`` is
    False if even the retry failed to yield a usable structure.

    A backend exception degrades to a fallback card rather than propagating — a
    broken model never freezes the trial (docs/adr/0003). The retry exists for
    parse failures, where a re-roll genuinely helps; an exception is almost
    always deterministic (model missing, OOM), so it skips straight to fallback.
    An unusable final result is recorded in ``state.fallbacks`` so the
    verification flow can detect canned output.
    """
    best = Parsed()
    for attempt in range(2):
        try:
            result = client.generate(
                messages, tag=tag, max_new_tokens=max_new_tokens, temperature=temperature
            )
        except Exception:
            break
        parsed = parse_delimited(result.text)
        has_required = all(parsed.get(k) for k in required_keys)
        if parsed.ok and has_required:
            return parsed
        best = parsed  # keep the latest attempt for partial recovery
    state.fallbacks.append(tag.value)
    return best


# --- Context summary fed to each prompt ------------------------------------


def state_summary(state: TrialState) -> str:
    """The case context fed to every prompt. Must carry the *content* of the
    trial — the complaint verbatim and the exhibits — or the model physically
    cannot write a crime-relevant reaction, reason, or sentence."""
    complaint = (state.complaint or "").strip()
    if len(complaint) > 500:
        complaint = complaint[:500] + "…"
    lines = [
        f"Case: {state.case_title or '(pending)'}",
        f"Complaint (the citizen's own words): \"{complaint}\"",
        f"Charge: {state.charge}" + (f" / {state.secondary_charge}" if state.secondary_charge else ""),
        f"Accused: {state.accused}",
        f"Court mood: {state.court_mood}",
        f"Meters — Suspicion {state.meters.suspicion:.0f}, "
        f"Evidence {state.meters.evidence_weight:.0f}, "
        f"Severity {state.meters.petty_severity:.0f}, Dignity {state.meters.courtroom_dignity:.0f}, "
        f"Mercy {state.meters.mercy:.0f}, Patience {state.meters.patience:.0f}",
    ]
    if state.is_full:
        lines.append(
            f"Case File (Suspicion = mean of these) — Means {state.meters.means:.0f}, "
            f"Motive {state.meters.motive:.0f}, Opportunity {state.meters.opportunity:.0f}"
        )
    if state.exhibits:
        lines.append("Exhibits on record:")
        lines += [f"  {e.label}: {e.name} — {e.ruling}" for e in state.exhibits[-4:]]
    if state.transcript:
        recent = state.transcript[-4:]
        lines.append("Recent transcript:")
        lines += [f"  {c.role}: {c.text}" for c in recent]
    return "\n".join(lines)


# --- Meter application (with the Full Trial Case File composition) ----------


def _apply_meters(
    state: TrialState,
    *,
    suspicion: float = 0.0,
    means: float = 0.0,
    motive: float = 0.0,
    opportunity: float = 0.0,
    evidence: float = 0.0,
    severity: float = 0.0,
    dignity: float = 0.0,
    mercy: float = 0.0,
    patience: float = 0.0,
) -> None:
    """Apply meter deltas, honouring the Full Trial Case File (Config C).

    In a Quick Trial, ``suspicion`` moves the Suspicion meter directly (today's
    behaviour). In a Full Trial, the move is routed into the three Case File legs
    (Means/Motive/Opportunity) and Suspicion is recomposed as their mean, so the
    headline bar is provably the sum of its parts. A step that supplies an
    explicit leg split uses it; a step that only knows a flat ``suspicion`` move
    (e.g. a chat reaction) spreads it across all three legs so the needle still
    moves. The non-Suspicion meters are unaffected by the mode.
    """
    m = state.meters
    if state.is_full:
        if means == 0.0 and motive == 0.0 and opportunity == 0.0 and suspicion != 0.0:
            means = motive = opportunity = suspicion
        m.apply(
            means=means, motive=motive, opportunity=opportunity,
            evidence=evidence, severity=severity, dignity=dignity, mercy=mercy, patience=patience,
        )
        m.suspicion = compose_suspicion(m)
    else:
        m.apply(
            suspicion=suspicion,
            evidence=evidence, severity=severity, dignity=dignity, mercy=mercy, patience=patience,
        )


# --- Step functions (each mutates TrialState) ------------------------------


def open_case(state: TrialState, client: GenerationClient, *, accused: str = "", severity: str = "dramatic", rng: random.Random | None = None) -> TrialState:
    rng = rng or random
    parsed = robust_call(
        client,
        prompts.case_open(state.complaint, accused=accused, severity=severity),
        CallTag.CASE_OPEN,
        required_keys=("CASE_TITLE", "CHARGE"),
        state=state,
    )
    # Docket fields are model-authored and shown on the card / record, so they
    # bypass add_card's scrub — apply the output floor here (design-spec §14).
    fb = data.FALLBACK_DOCKET
    state.case_title = scrub_output(parsed.get("CASE_TITLE"), fb["CASE_TITLE"]) or fb["CASE_TITLE"]
    state.charge = scrub_output(parsed.get("CHARGE"), fb["CHARGE"]) or fb["CHARGE"]
    state.secondary_charge = scrub_output(parsed.get("SECONDARY_CHARGE"), "")
    state.accused = scrub_output(parsed.get("ACCUSED") or accused, fb["ACCUSED"]) or fb["ACCUSED"]
    state.severity_label = scrub_output(parsed.get("SEVERITY"), fb["SEVERITY"]) or fb["SEVERITY"]
    state.court_mood = scrub_output(parsed.get("COURT_MOOD"), "") or data.random_mood(rng)
    state.judge = parsed.get("JUDGE") or data.random_judge(rng)
    # Baseline meters from intake deltas (clamped/accumulated in Meters.apply).
    # Evidence Weight opens at the prosecution's circumstantial case — there is
    # always *some* proof on the record, so a fresh verdict isn't 0%-confident;
    # Submit Evidence builds on it and a sustained Object! tears it down.
    d = parsed.deltas
    _apply_meters(
        state,
        suspicion=d["suspicion"] or 30,
        means=d["means"], motive=d["motive"], opportunity=d["opportunity"],
        evidence=d["evidence"] or 40,
        severity=d["severity"] or 25,
        dignity=d["dignity"],
    )
    state.phase = "charges"
    return state


def play_arguments(state: TrialState, client: GenerationClient) -> TrialState:
    parsed = robust_call(
        client,
        prompts.arguments(state_summary(state)),
        CallTag.ARGUMENTS,
        required_keys=("PROSECUTOR", "DEFENSE"),
        state=state,
    )
    state.add_card("Bailiff", parsed.get("BAILIFF") or data.FALLBACK_BAILIFF)
    state.add_card("Prosecutor", parsed.get("PROSECUTOR") or data.FALLBACK_PROSECUTOR)
    state.add_card("Defense", parsed.get("DEFENSE") or data.FALLBACK_DEFENSE)
    d = parsed.deltas
    _apply_meters(state, suspicion=d["suspicion"], severity=d["severity"], dignity=d["dignity"] or -6)
    state.phase = "evidence"
    return state


def submit_evidence(state: TrialState, client: GenerationClient, raw_evidence: str) -> TrialState:
    parsed = robust_call(
        client,
        prompts.evidence(state_summary(state), raw_evidence),
        CallTag.EVIDENCE,
        required_keys=("EXHIBIT",),
        state=state,
    )
    fb = data.FALLBACK_EXHIBIT
    exhibit = Exhibit(
        label=state.next_exhibit_label(),
        name=scrub_output(parsed.get("EXHIBIT"), fb["name"]) or fb["name"],
        description=scrub_output(parsed.get("DESCRIPTION"), fb["description"]) or fb["description"],
        relevance=scrub_output(parsed.get("RELEVANCE"), fb["relevance"]) or fb["relevance"],
        ruling=scrub_output(parsed.get("RULING"), fb["ruling"]) or fb["ruling"],
    )
    state.exhibits.append(exhibit)
    state.add_card("Court Clerk", f"{exhibit.label} entered: {exhibit.name}. Ruling: {exhibit.ruling}")
    d = parsed.deltas
    # Evidence primarily builds the *proof* on record (Evidence Weight); it also
    # nudges Suspicion, since a damning exhibit makes the accused look guiltier.
    # An admitted exhibit must add proof even if the model's delta wandered to 0;
    # a rejected one ("rejected" ruling) adds none.
    evidence = d["evidence"]
    if "REJECT" in (exhibit.ruling or "").upper():
        evidence = min(evidence, 0.0)
    elif evidence <= 0:
        evidence = 12.0
    _apply_meters(
        state,
        suspicion=d["suspicion"],
        evidence=evidence,
        severity=d["severity"],
        dignity=d["dignity"],
        patience=PATIENCE_EVIDENCE,
    )
    state.interaction_done = True
    return state


def call_witness(state: TrialState, client: GenerationClient) -> TrialState:
    """Full Trial: summon a witness whose testimony establishes Motive and
    Opportunity (the Case File legs, Config C).

    Unlike a flat chat reaction, this routes explicit ``motive=/opportunity=``
    into :func:`_apply_meters`, so the two legs finally move *distinctly* — the
    first interaction that makes the Case File more than a spread of one number.
    The deltas are guaranteed positive even if the model's wandered to zero, so a
    summoned witness always tilts the case.
    """
    parsed = robust_call(
        client,
        prompts.witness(state_summary(state)),
        CallTag.WITNESS,
        required_keys=("WITNESS", "TESTIMONY"),
        state=state,
    )
    name = parsed.get("WITNESS") or "The Spoon"
    testimony = parsed.get("TESTIMONY") or (
        "I saw everything. I have no eyes, but I saw everything."
    )
    state.add_card("Bailiff", f"The court summons {name} to the stand.")
    state.add_card("Witness", testimony)
    d = parsed.deltas
    _apply_meters(
        state,
        motive=d["motive"] if d["motive"] > 0 else 14.0,
        opportunity=d["opportunity"] if d["opportunity"] > 0 else 12.0,
        dignity=d["dignity"] or -7,
        patience=PATIENCE_EVIDENCE,
    )
    state.interaction_done = True
    return state


def cross_examine(state: TrialState, client: GenerationClient, question: str = "") -> TrialState:
    """Full Trial: the Defense cross-examines the witness, shaking the Motive and
    Opportunity legs (Config C). ``question`` is the user's own line if they typed
    one; otherwise the Defense presses on its own initiative. Wears Patience like
    any other interruption."""
    parsed = robust_call(
        client,
        prompts.cross_examine(state_summary(state), question),
        CallTag.CROSS,
        required_keys=("DEFENSE", "WITNESS"),
        state=state,
    )
    state.add_card("Defense", parsed.get("DEFENSE") or "And yet — were you even in the kitchen?")
    state.add_card(
        "Witness",
        parsed.get("WITNESS") or "I decline to answer, on the grounds of being a spoon.",
    )
    d = parsed.deltas
    _apply_meters(
        state,
        motive=d["motive"],
        opportunity=d["opportunity"],
        dignity=d["dignity"] or -4,
        patience=PATIENCE_OBJECTION,
    )
    state.interaction_done = True
    return state


def add_twist(state: TrialState, client: GenerationClient) -> TrialState:
    """Full Trial: a once-per-trial surprise complication that swings the Case
    File (CONTEXT.md §Twist, meters brainstorm Config C). Unlike the witness
    (which only builds the case), a twist can move any leg in EITHER direction
    and reshape Petty Severity — the model owns which way. Sets ``twist_used`` so
    the court allows but one."""
    parsed = robust_call(
        client,
        prompts.twist(state_summary(state)),
        CallTag.TWIST,
        required_keys=("TWIST",),
        state=state,
    )
    twist = parsed.get("TWIST") or (
        "A surprise witness bursts in: the snack itself. It has notes, and they are damning."
    )
    state.add_card("Bailiff", "Order! Order! A twist enters the record.")
    state.add_card("Court Clerk", twist)
    d = parsed.deltas
    _apply_meters(
        state,
        means=d["means"],
        motive=d["motive"],
        opportunity=d["opportunity"],
        severity=d["severity"],
        dignity=d["dignity"] or -8,
    )
    state.twist_used = True
    state.interaction_done = True
    return state


def raise_objection(state: TrialState, client: GenerationClient) -> TrialState:
    last = state.transcript[-1].text if state.transcript else ""
    parsed = robust_call(
        client,
        prompts.objection(state_summary(state), last),
        CallTag.OBJECTION,
        required_keys=("DEFENSE", "JUDGE"),
        state=state,
    )
    state.add_card("Defense", parsed.get("DEFENSE") or "Objection! On the grounds of general drama.")
    state.add_card("Judge", parsed.get("JUDGE") or data.FALLBACK_JUDGE)
    ruling = (parsed.get("RULING") or "").upper()
    d = parsed.deltas
    # A sustained objection lowers Suspicion (CONTEXT.md) AND discredits proof
    # (Evidence Weight); an overruled one nudges both up. Guarantee the direction
    # even if the model's deltas disagree with its own ruling.
    suspicion = d["suspicion"]
    evidence = d["evidence"]
    if "SUSTAINED" in ruling:
        if suspicion >= 0:
            suspicion = -20.0
        if evidence >= 0:
            evidence = -18.0
    elif "OVERRULED" in ruling:
        if suspicion <= 0:
            suspicion = 8.0
        if evidence <= 0:
            evidence = 5.0
    _apply_meters(
        state, suspicion=suspicion, evidence=evidence, dignity=d["dignity"] or -6, patience=PATIENCE_OBJECTION
    )
    state.objection_used = True
    state.interaction_done = True
    return state


def submit_plea(state: TrialState, client: GenerationClient, plea_type: str, plea_text: str = "") -> TrialState:
    """Enter a plea and move the meters; the verdict band is still resolved by
    Python from the running totals (docs/adr/0001). ``plea_type`` is one of
    ``innocent`` / ``leniency`` / ``evidence`` (interaction spec §4).

    The caller runs :func:`deliver_closing` (revised) afterwards to rewrite the
    sentence to fit the (possibly changed) band.
    """
    kind = (plea_type or "").lower()
    # Innocent and evidence pleas reuse the existing machinery so their meter
    # effects (and unit-test coverage) match objections/exhibits exactly.
    if kind == "innocent":
        return raise_objection(state, client)
    if kind == "evidence":
        return submit_evidence(state, client, plea_text or "a suspicious new detail")

    # Leniency: a mercy plea. It moves the MERCY meter, never guilt (CONTEXT.md):
    # the accused stays exactly as guilty, but the sentence softens — "did they
    # do it" (band) stays separate from "how hard the hammer falls" (sentence).
    parsed = robust_call(
        client,
        prompts.plea(state_summary(state), kind or "leniency", plea_text),
        CallTag.PLEA,
        required_keys=("PLEA_RESPONSE",),
        state=state,
    )
    state.add_card("Defense", parsed.get("PLEA_RESPONSE") or data.FALLBACK_PLEA)
    ruling = parsed.get("RULING")
    if ruling:
        state.add_card("Judge", f"The court rules the plea {ruling.title()}.")
    d = parsed.deltas
    # Guarantee a merciful direction even if the model's delta wandered to zero.
    mercy = d["mercy"] if d["mercy"] > 0 else 12.0
    state.meters.apply(mercy=mercy, dignity=d["dignity"] or -4)
    state.interaction_done = True
    return state


def react(state: TrialState, client: GenerationClient, phase: str, user_text: str) -> tuple[str, str]:
    """One short in-character reply to a single chat message (glass phases).

    Returns ``(role, text)`` for the caller to surface in the chat, and applies
    the (small, clamped) deltas so even casual chatter measurably moves the
    case. Falls back to a canned clerk line so the court always answers.
    """
    parsed = robust_call(
        client,
        prompts.reaction(state_summary(state), phase, user_text),
        CallTag.REACTION,
        required_keys=("TEXT",),
        max_new_tokens=160,
        state=state,
    )
    role = (parsed.get("ROLE") or "").title()
    if role not in COURT_VOICES:
        role = "Court Clerk"
    # react() RETURNS the text for the caller to show as the chat bubble (the UI
    # uses this, not the card), so scrub here too — add_card scrubs the stored
    # card, but the returned line must be safe before it reaches the surface.
    text = scrub_output(parsed.get("TEXT") or data.FALLBACK_REACTION)
    state.add_card(role, text)
    d = parsed.deltas
    # Chat reactions are small beats: clamp so one message can't swing the case.
    # Each one also wears down the court's patience (it is, after all, listening).
    _apply_meters(
        state,
        suspicion=clamp(d["suspicion"], -6.0, 8.0),
        dignity=clamp(d["dignity"], -3.0, 0.0),
        patience=PATIENCE_CHATTER,
    )
    return role, text


def deliver_closing(
    state: TrialState,
    client: GenerationClient,
    *,
    revised: bool = False,
    marker_hint: str = "",
) -> TrialState:
    # Python owns the verdict: freeze the band from current meters BEFORE the call.
    band = state.verdict.band
    if revised:
        messages = prompts.revised_closing(state_summary(state), band, marker_hint)
        tag = CallTag.REVISED_CLOSING
    else:
        messages = prompts.closing(state_summary(state), band)
        tag = CallTag.CLOSING
    parsed = robust_call(client, messages, tag, required_keys=("SENTENCE",), state=state)
    # The verdict, sentence, quote, and reasons are model-authored and shown on
    # the ruling/record cards (bypassing add_card), so they get the output floor
    # here — a cruel or real-world punishment is replaced before display (§14).
    state.sentence = scrub_output(parsed.get("SENTENCE"), data.FALLBACK_SENTENCE) or data.FALLBACK_SENTENCE
    state.best_quote = scrub_output(parsed.get("BEST_QUOTE"), "") or _auto_best_quote(state)
    # Creative case-specific verdict title. A revision that returns no usable
    # label falls back to the earlier creative one — re-validated, since the
    # band may have changed underneath it and the old label could now lie.
    state.verdict_label = (
        _safe_verdict_label(scrub_output(parsed.get("VERDICT_LABEL"), ""), band)
        or _safe_verdict_label(state.verdict_label, band)
    )
    # The model's reasons drive the judgement card (design-spec §10.5); REASON is
    # the pre-rename single-key form, kept as a tolerated alias. Scrub each, then
    # drop empties — so a reason scrubbed away to "" never leaves a blank bullet on
    # the card (it would otherwise make state.reasons truthy as [""]).
    reasons = [scrub_output(parsed.get(k), "") for k in ("REASON_1", "REASON_2", "REASON_3")]
    if not any(reasons):
        reasons = [scrub_output(parsed.get("REASON"), "")]
    state.reasons = [r for r in reasons if r]
    verdict = state.verdict
    judge_text = f"This court finds the accused {state.verdict_title}. Confidence: {verdict.confidence}%."
    if state.reasons:
        judge_text += f" {state.reasons[0]}"
    state.add_card("Judge", judge_text)
    # Closing deltas are ~0 by design; apply only the (small) dignity drift.
    state.meters.apply(dignity=parsed.deltas["dignity"])
    state.phase = "verdict"
    return state


def _safe_verdict_label(label: str, band: str) -> str:
    """Accept the model's creative verdict title only when it agrees with the
    rule-owned band: a guilty-band label must read guilty, a not-guilty one must
    not (and vice versa). A bare restatement of the band is not a creative title.
    Anything rejected returns "" so the card falls back to the plain band."""
    label = (label or "").strip().strip('"')
    if not label or label.lower() == band.lower():
        return ""
    sounds_innocent = any(w in label.lower() for w in ("not guilty", "acquit", "innocent", "cleared", "absolv"))
    if (band == NOT_GUILTY) != sounds_innocent:
        return ""
    return label


def _auto_best_quote(state: TrialState) -> str:
    """Pick the funniest line heuristically when the model didn't supply one:
    the longest non-Bailiff transcript line is usually the most dramatic."""
    candidates = [c.text for c in state.transcript if c.role in ("Prosecutor", "Defense", "Judge", "Witness")]
    if not candidates:
        return data.FALLBACK_BEST_QUOTE
    return max(candidates, key=len)
