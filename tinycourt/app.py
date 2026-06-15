"""The single-page court-wizard Gradio app.

A full-height theatrical ritual: a landing stage that hands off to
a focused single-column wizard — ``case → (evidence) → judgement → (plea →
revisedJudgement) → sentence`` — plus a simulated ``?court=<id>`` join flow.

The visual system lives in ``tinycourt/static/`` (``courtroom.css`` + ``courtroom.js``,
loaded at launch); the HTML surfaces are built by
:mod:`tinycourt.render`; the trial truth (deterministic verdict, meters, safety)
is reused unchanged from the engine. This module owns flow: the component tree,
one ``render(wiz)`` that drives every component, and the per-action handlers.

Backend is the env-selected :class:`GenerationClient` (default ``FakeClient`` — no
GPU, no model at import). ZeroGPU only matters when ``TINYCOURT_BACKEND=local``.
"""

from __future__ import annotations

import random
import re
import threading
import time
from dataclasses import dataclass, field
from pathlib import Path

import mimetypes
import os

import gradio as gr
from gradio_multimodalcomposer import MultimodalComposer

from . import data, prompts
from . import render as view
from .config import BACKEND
from .engine import (
    add_twist,
    call_witness,
    cross_examine,
    deliver_closing,
    make_client,
    open_case,
    play_arguments,
    raise_objection,
    react,
    submit_evidence,
    submit_plea,
)
from .generation import GenerationClient
from .safety import Outcome, screen
from .trial import TrialState

# Serve the self-hosted fonts + background to CSS url("/gradio_api/file=assets/…").
ASSETS_DIR = Path(__file__).resolve().parent.parent / "assets"
gr.set_static_paths([str(ASSETS_DIR)])

# Front-end resources live as plain files, loaded at launch (see main()): the
# stylesheet via launch(css_paths=…) and the behaviour script inlined into
# <head>. Both are hand-maintained — there is no build/generation step.
STATIC_DIR = Path(__file__).resolve().parent / "static"
CSS_PATH = STATIC_DIR / "courtroom.css"
JS_PATH = STATIC_DIR / "courtroom.js"
# Vendored (not a CDN) so the shareable-PNG capture works offline on the Space
# and leaks no visitor IP to a third party. Loaded before courtroom.js so
# window.html2canvas exists when window.tc.savePng runs.
H2C_PATH = STATIC_DIR / "html2canvas.min.js"

# Lazily-built singleton client so the (possibly heavy) backend loads once.
# The lock keeps a warmup thread and the first user request from double-loading.
_CLIENT: GenerationClient | None = None
_CLIENT_LOCK = threading.Lock()


def get_client() -> GenerationClient:
    global _CLIENT
    if _CLIENT is None:
        with _CLIENT_LOCK:
            if _CLIENT is None:
                _CLIENT = make_client()
    return _CLIENT


# --- Wizard state -----------------------------------------------------------


@dataclass
class WizardState:
    """One object held in ``gr.State``. Wraps the engine's :class:`TrialState`
    (left untouched so the verdict engine + its tests stay decoupled from the UI)
    and adds the wizard-only bookkeeping the front-end tracks in JS."""

    trial: TrialState = field(default_factory=TrialState)
    # The *material* the surface is made of, not the scene (docs/full-trial-
    # conversation-flow.md §5): glass for talking (`trial`), paper for the two
    # rulings. The former case/evidence/witness/twist/plea glass screens all
    # collapse into one `trial` surface; `focus` (below) carries what the court is
    # doing now.
    wiz_phase: str = "landing"   # landing | join | trial | judgement | revisedJudgement | sentence
    # What the court is doing *now* inside the one glass trial — drives the
    # composer placeholder and how a composer send is interpreted. Scene, not
    # screen: changing it never clears the transcript.
    focus: str = "case"          # case | evidence | witness | twist | plea (appeal)
    role: str = "clerk"          # clerk|accused|evidence|mercy|spectator
    session_id: str | None = None
    session_path: str | None = None
    plea_type: str | None = None
    plea_text: str = ""
    plea_rounds: int = 0
    revision_marker: str = ""
    # Signed meter movement to SHOW on the ruling card (review: "make consequence
    # visible"). On the first judgement it's the movement since charges were filed
    # (the user's evidence/objections); on the revised card it's the plea's effect.
    meter_deltas: dict[str, float] = field(default_factory=dict)
    # Meters snapshot taken when the docket opens, so the first judgement can diff
    # against it and show what the user's interactions did. None until the docket
    # is built.
    meters_baseline: dict[str, float] | None = None
    attachments: list[dict] = field(default_factory=list)
    events: list[dict] = field(default_factory=list)
    completed_sentence: bool = False
    media_open: bool = False
    action_ids: list[str] = field(default_factory=list)


def _w(wiz: WizardState | None) -> WizardState:
    return wiz if isinstance(wiz, WizardState) else WizardState()


# --- Copy, placeholders, stages --------------------------------------------

# The composer placeholder is keyed by the current glass `focus` (the scene),
# not by a screen — the one `trial` surface re-points it as the court's attention
# moves (file → weigh evidence → examine witness → react to a twist → appeal).
PLACEHOLDERS = {
    "case": "Tell the court what happened…",
    "evidence": "Example: The empty container was found in their trash.",
    "witness": "Cross-examine the witness… (or ask the judge to rule)",
    "twist": "React to the twist… (or ask the judge to rule)",
    "plea": "Example: I admit partial guilt, but the cookie was emotionally available.",
}

PLEA_DRAFTS = {
    "draft_blame": "I blame circumstances, bad labeling, and a tragic misunderstanding.",
    "draft_partial": "I admit partial guilt and offer a replacement snack as settlement.",
    "draft_witness": "I call a witness who can confirm the timeline was suspicious.",
    "draft_apology": "I offer apology, restitution, and one week of improved behavior.",
}

# The human participant's speaking label per chosen role. The trial starter
# ("clerk" role) speaks as "You" — "Court Clerk" is reserved for the court's own
# replies, so user bubbles and court bubbles can't share a label.
ROLE_LABELS = {
    "clerk": "You",
    "accused": "Accused",
    "evidence": "Witness",
    "mercy": "Defense",
    "spectator": "Spectator",
}


def _stage_for(wiz: WizardState) -> str:
    """The CSS background stage (body[data-stage]) for the current surface.

    Paper phases keep their own scenery; the one glass `trial` surface picks its
    crop from the current `focus` — the `case` crop while filing (so the JS
    optimistic bubble still labels the user "Complaint"), and the smoked-glass
    `evidence` crop once the court is weighing evidence / a witness / a twist, the
    `plea` crop during an appeal. Witness and Twist have no dedicated scenery and
    reuse the evidence crop, which is built for a chat surface."""
    p = wiz.wiz_phase
    if p in ("judgement", "revisedJudgement", "sentence"):
        return p
    if p == "join":
        return "case"
    if p == "trial":
        if wiz.focus == "case":
            return "case"
        if wiz.focus == "plea":
            return "plea"
        return "evidence"
    return "case"


def _role_label(wiz: WizardState) -> str:
    return ROLE_LABELS.get(wiz.role, "Participant")


# The current glass `focus` maps to the conversation `scene` tag used for
# dividers + the timeline. The appeal focus ("plea") tags its events "appeal".
_FOCUS_SCENE = {"case": "case", "evidence": "evidence", "witness": "witness", "twist": "twist", "plea": "appeal"}


def _scene_now(wiz: WizardState) -> str:
    return _FOCUS_SCENE.get(wiz.focus, "case")


# --- Session simulation -----------------------------------------------------


def _slug(text: str) -> str:
    base = re.sub(r"[^a-z0-9]+", "-", (text or "tiny court case").lower()).strip("-")[:24]
    suffix = "".join(random.choices("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", k=4))
    return f"{base or 'tiny-court-case'}-{suffix}"


def _ensure_session(wiz: WizardState) -> None:
    if not wiz.session_id:
        wiz.session_id = _slug(wiz.trial.complaint)
        wiz.session_path = f"/court/{wiz.session_id}"


def _toast(msg: str) -> str:
    return f"{time.time_ns()}|{msg}"


def _signal() -> str:
    """A monotonically-changing value for a hidden bridge Textbox, so its
    ``.change`` listener fires on every server turn (the value must differ from
    the previous one or Gradio coalesces it away)."""
    return str(time.time_ns())


# --- Multimodal composer helpers --------------------------------------------

def _mm_text(v) -> str:
    """Extract plain text from a MultimodalComposer value (dict or str)."""
    if v is None:
        return ""
    if isinstance(v, dict):
        return (v.get("text") or "").strip()
    return (str(v) or "").strip()


def _mm_files(v) -> list:
    """Extract file paths from a MultimodalComposer value."""
    if isinstance(v, dict):
        return v.get("files") or []
    return []


def _kind_from_path(path: str) -> str:
    """Guess attachment kind (image/audio/video/file) from file path."""
    mime, _ = mimetypes.guess_type(path)
    if mime:
        if mime.startswith("image/"):
            return "image"
        if mime.startswith("audio/"):
            return "audio"
        if mime.startswith("video/"):
            return "video"
    ext = os.path.splitext(path)[1].lower()
    if ext in (".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"):
        return "image"
    if ext in (".mp3", ".wav", ".ogg", ".m4a", ".flac"):
        return "audio"
    if ext in (".mp4", ".webm", ".mov", ".avi"):
        return "video"
    return "file"


def _ingest_files(wiz: WizardState, files: list) -> None:
    """Append uploaded files to the wizard attachment model."""
    if not files:
        return
    _ensure_session(wiz)
    for path in files:
        kind = _kind_from_path(str(path))
        label = os.path.basename(str(path))
        wiz.attachments.append({"kind": kind, "label": label})
        wiz.events.append({"who": "You", "text": f"added {label}", "scene": _scene_now(wiz)})


# --- Action model -----------------------------------------------------------

_P = lambda label, aid: {"label": label, "kind": "primary", "id": aid}   # noqa: E731
_S = lambda label, aid: {"label": label, "kind": "secondary", "id": aid}  # noqa: E731

# Every action id that can surface as an in-message reply chip (the glass `trial`
# surface). Each gets a hidden, offscreen real ``gr.Button`` whose ``.click`` the
# chip's delegated JS listener fires — the only mechanism Gradio reliably
# round-trips to Python (programmatic input/change events on a hidden Textbox do
# not). Paper-phase ids (accept/finalize/copy/…) stay on #actionRow.
CHIP_ACTION_IDS = [
    # the one terminal forward affordance — leaves glass for paper
    "ask_judge", "invite",
    # the optional moves that append to the one transcript and STAY in glass
    "submit_evidence", "call_witness", "cross_examine", "object", "add_twist",
    # appeal (glass again, after the verdict): submit + draft helpers
    "submit_plea", "draft_blame", "draft_partial", "draft_witness", "draft_apology",
]


def _witness_standing(wiz: WizardState) -> bool:
    return any(c.role == "Witness" for c in wiz.trial.transcript)


def _can_object(wiz: WizardState) -> bool:
    """Object! is offered once there is a statement on the record to object to
    (an opening, witness, or twist beat) and the defense hasn't already objected
    this trial — the move is limited (≈once, flow doc §3)."""
    if any(e.get("scene") == "objection" for e in wiz.events):
        return False
    return any(
        c.role in ("Prosecutor", "Witness") for c in wiz.trial.transcript
    )


def _trial_actions(wiz: WizardState) -> list[dict]:
    """The moves currently legal in the glass trial, plus the one terminal
    verdict (flow doc §6). Every move except the verdict keeps the user in glass
    and *enlarges* the transcript; the verdict is the only thing that goes to
    paper, and it is available from the very first moment (the bored-user escape
    hatch — Fast Judgement is just taking it early)."""
    t = wiz.trial
    # The appeal is a focused glass scene: only the plea moves are offered.
    if wiz.focus == "plea":
        return [
            _P("Submit Plea", "submit_plea"),
            _S("Blame Circumstances", "draft_blame"),
            _S("Admit Partial Guilt", "draft_partial"),
            _S("Offer Apology", "draft_apology"),
        ]
    # The terminal forward affordance, always available. Before anything has
    # happened it reads "Fast Judgement" (demand the ruling now); once the court
    # is mid-trial it reads "Ask the Judge".
    verdict_label = "Fast Judgement" if wiz.focus == "case" else "Ask the Judge"
    acts = [_P(verdict_label, "ask_judge"), _S("Submit Evidence", "submit_evidence")]
    if t.is_full:
        if _witness_standing(wiz):
            acts.append(_S("Cross-examine", "cross_examine"))
        else:
            acts.append(_S("Call Witness", "call_witness"))
        if not t.twist_used:
            acts.append(_S("Add Twist", "add_twist"))
    if _can_object(wiz):
        acts.append(_S("Object!", "object"))
    # On the case scene with nothing filed, also offer Invite (the shareable
    # session) — it has room before the trial fills with moves.
    if wiz.focus == "case":
        acts.append(_S("Invite", "invite"))
    return acts


def _actions_for(wiz: WizardState) -> list[dict]:
    p = wiz.wiz_phase
    if p == "trial":
        return _trial_actions(wiz)
    if p == "judgement":
        return [
            _P("Accept", "accept"),
            _S("Appeal: Innocent", "plead_innocent"),
            _S("Appeal: Leniency", "request_leniency"),
            _S("Appeal: Evidence", "plead_evidence"),
            _S("Fairer", "fairer"),
        ]
    if p == "revisedJudgement":
        acts = [_P("Finalize", "finalize")]
        if wiz.plea_rounds < 2:
            acts.append(_S("One More Plea", "one_more_plea"))
        acts.append(_S("Invite Witness", "invite"))
        return acts
    if p == "sentence":
        return [
            _P("Copy", "copy"),
            _S("Save Image", "download_png"),
            _S("Share", "share"),
            _S("Served", "served"),
            _S("New Case", "new_case"),
        ]
    return []


# --- The single render(wiz) -------------------------------------------------
# Returns a dict keyed by component; every handler ends with `return render(wiz)`
# (or a small partial dict). The component objects are bound in build_demo and
# captured by closure into this function via the module-level `C` registry.

C: dict[str, gr.components.Component] = {}


def _timeline(wiz: WizardState) -> list[tuple[str, str]]:
    """A dynamic-timeline stepper as ``(label, status)`` (flow doc §7, design B).

    The mandatory anchors (Case · Verdict · Sentence) are always present; an
    optional scene's pip (Evidence · Witness · Twist · Appeal) is inserted only
    once that scene has actually happened, so the timeline reads as a true record
    of *this* trial. The terminal Verdict anchor is shown pending from the start
    so the user can always see where the flow is heading. The active pip is the
    current material/focus; everything before it reads "done"."""
    t = wiz.trial
    p = wiz.wiz_phase
    appeal_seen = wiz.plea_rounds > 0 or (p == "trial" and wiz.focus == "plea")
    # Build the present steps in timeline order with a stable key per pip.
    keys: list[tuple[str, str]] = [("case", "Case")]
    if bool(wiz.attachments) or bool(t.exhibits) or any(e.get("scene") == "evidence" for e in wiz.events):
        keys.append(("evidence", "Evidence"))
    if any(c.role == "Witness" for c in t.transcript):
        keys.append(("witness", "Witness"))
    if t.twist_used:
        keys.append(("twist", "Twist"))
    keys.append(("verdict", "Verdict"))
    if appeal_seen:
        keys.append(("appeal", "Appeal"))
    keys.append(("sentence", "Sentence"))

    # Which key is the live one.
    if p == "sentence":
        current = "sentence"
    elif p in ("judgement", "revisedJudgement"):
        current = "appeal" if (p == "revisedJudgement" or wiz.focus == "plea") else "verdict"
    else:  # glass trial
        current = "appeal" if wiz.focus == "plea" else {
            "case": "case", "evidence": "evidence", "witness": "witness", "twist": "twist",
        }.get(wiz.focus, "case")

    order = [k for k, _ in keys]
    cur_index = order.index(current) if current in order else 0
    steps: list[tuple[str, str]] = []
    for i, (key, label) in enumerate(keys):
        status = "active" if i == cur_index else ("done" if i < cur_index else "")
        steps.append((label, status))
    return steps


def render(wiz: WizardState, *, reset_composer: bool = True) -> dict:
    p = wiz.wiz_phase
    is_landing = p == "landing"
    is_join = p == "join"
    is_court = not (is_landing or is_join)

    out: dict = {
        C["st"]: wiz,
        C["landing"]: gr.update(visible=is_landing),
        C["join"]: gr.update(visible=is_join),
        C["court"]: gr.update(visible=is_court),
        C["stage"]: _stage_for(wiz),
        # Every completed turn pings the busy bridge so the JS clears its
        # optimistic busy-state deterministically (no DOM-mutation guessing).
        C["busy"]: _signal(),
    }

    if is_landing:
        return out

    if is_join:
        out[C["join_info"]] = view.join_summary(wiz.session_path, wiz.trial.case_title)
        return out

    # --- Court ---
    out[C["stepper"]] = view.stepper(_timeline(wiz))

    actions = _actions_for(wiz)
    wiz.action_ids = [a["id"] for a in actions]

    show_composer = p == "trial"
    out[C["surface"]] = _surface(wiz, actions if show_composer else None)
    # `reset_composer=False` (the composer-send path): the box was already
    # cleared by the instant stash step, and the user may have typed the NEXT
    # message while the court was thinking — never wipe it from a slow response.
    composer_update: dict = {
        "placeholder": PLACEHOLDERS.get(wiz.focus, "") if show_composer else "",
        "visible": show_composer,
    }
    if reset_composer:
        composer_update["value"] = {"text": "", "files": []}
    out[C["composer"]] = gr.update(**composer_update)

    # Glass/composer phases carry their actions as in-message reply chips; the whole
    # #actionRow is hidden by CSS for those stages (see courtroom.css). We deliberately
    # DON'T send `visible` updates to the buttons here: a `visible=False` update on a
    # button that has never been mounted (act2..act5 are created hidden) makes a later
    # `visible=True` no-op in Gradio 6.0's frontend. Leaving them untouched in glass
    # phases means a paper phase's first update on them is `visible=True`, which works.
    if not show_composer:
        slots = [C["primary"], C["act2"], C["act3"], C["act4"], C["act5"]]
        for i, slot in enumerate(slots):
            if i < len(actions):
                out[slot] = gr.update(value=actions[i]["label"], visible=True)
            else:
                out[slot] = gr.update(visible=False)
    return out


def _surface(wiz: WizardState, actions: list[dict] | None = None) -> str:
    p, s = wiz.wiz_phase, wiz.trial
    if p == "trial":
        # One continuous transcript. On the opening `case` scene, withhold the
        # reply chips until the user has actually filed something — an empty court
        # offers no "Fast Judgement". Every later focus shows its moves at once.
        has_complaint = bool((s.complaint or "").strip()) or bool(wiz.attachments)
        show = actions if (wiz.focus != "case" or has_complaint) else None
        return view.glass_trial(s, wiz.events, actions=show, focus=wiz.focus)
    if p == "judgement":
        return view.judgement_card(s, revised=False, meter_deltas=wiz.meter_deltas)
    if p == "revisedJudgement":
        note = "The court has heard enough theatre for one session." if wiz.plea_rounds >= 2 else ""
        return view.judgement_card(
            s, revised=True, revision_marker=wiz.revision_marker,
            closing_note=note, meter_deltas=wiz.meter_deltas,
        )
    if p == "sentence":
        return view.record_card(s, completed=wiz.completed_sentence)
    return ""


# --- Trial helpers ----------------------------------------------------------


def _meters_snapshot(wiz: WizardState) -> dict[str, float]:
    m = wiz.trial.meters
    return {
        "suspicion": m.suspicion,
        "evidence": m.evidence_weight,
        "severity": m.petty_severity,
        "dignity": m.courtroom_dignity,
        "mercy": m.mercy,
        "patience": m.patience,
        "means": m.means,
        "motive": m.motive,
        "opportunity": m.opportunity,
    }


def _meters_delta(before: dict[str, float], wiz: WizardState) -> dict[str, float]:
    after = _meters_snapshot(wiz)
    return {k: after[k] - before[k] for k in after}


_CASE_INTRO = (
    "File the complaint. The court accepts tiny betrayal, snack incidents, "
    "suspicious timing, and objects acting weird."
)


def _drain(wiz: WizardState, scene: str, since: int) -> None:
    """Append every engine transcript card added since index ``since`` to the one
    growing conversation, tagged with ``scene``. This is the single seam that
    keeps ``wiz.events`` (the UI record, which also holds the user's own bubbles)
    in lockstep with ``state.transcript`` (the court-only engine record) — every
    court card surfaces in the flow with a scene, no more accidental untagged
    appends (flow doc §5)."""
    for card in wiz.trial.transcript[since:]:
        wiz.events.append({"who": card.role, "text": card.text, "scene": scene})


def _start_trial(wiz: WizardState, focus: str = "case") -> None:
    """Open the one glass trial surface. Seeds the case-scene framing line into
    the conversation once, so it becomes a normal court message in the record
    rather than a header that re-renders every turn (flow doc §4)."""
    wiz.wiz_phase = "trial"
    wiz.focus = focus
    if not wiz.events:
        wiz.events.append({"who": "Court Clerk", "text": _CASE_INTRO, "scene": "case"})


def _build_docket_if_needed(wiz: WizardState, client: GenerationClient) -> None:
    if not wiz.trial.case_title:
        if not wiz.trial.complaint.strip():
            wiz.trial.complaint = "A petty matter with suspicious timing and no adult supervision."
        since = len(wiz.trial.transcript)
        open_case(wiz.trial, client, accused=wiz.trial.accused, severity="dramatic")
        play_arguments(wiz.trial, client)
        # Charges filed + one prosecution + one defense beat: surface that opening
        # exchange into the one transcript as its own scene (flow doc §3 Opening),
        # so the conversation shows the charge being filed, not just the verdict.
        _drain(wiz, "opening", since)
        # The "charges filed" baseline: everything the user does from here
        # (evidence, objections) shows as movement on the first judgement.
        wiz.meters_baseline = _meters_snapshot(wiz)


def _enter_paper(wiz: WizardState, phase: str) -> None:
    """Switch to a paper ruling and clear the glass `focus` — focus is a scene of
    the glass conversation and is meaningless on paper; leaving it stale (e.g. at
    "plea") is the kind of cross-surface leak the 'scene, not screen' model avoids."""
    wiz.wiz_phase = phase
    wiz.focus = "case"


def _close_with_deltas(wiz: WizardState, client: GenerationClient) -> None:
    """Capture the movement since charges were filed, then close. The deltas are
    taken BEFORE deliver_closing so the badges reflect the user's interactions,
    not the closing call's own small dignity drift."""
    if wiz.meters_baseline is not None:
        wiz.meter_deltas = _meters_delta(wiz.meters_baseline, wiz)
    deliver_closing(wiz.trial, client)
    _enter_paper(wiz, "judgement")


_APPEAL_PROMPTS = {
    "innocent": "State your defense. The court allows one dramatic objection.",
    "leniency": "Explain why mercy is appropriate.",
    "evidence": "Add new evidence or suspicious context.",
}


def _append_appeal_intro(wiz: WizardState) -> None:
    """Open the appeal as a glass scene under an "— Appeal —" divider (flow doc
    §8): the Judge's plea prompt becomes a normal court message in the one
    continuing transcript, after the paper interlude."""
    prompt = _APPEAL_PROMPTS.get(wiz.plea_type or "innocent", _APPEAL_PROMPTS["innocent"])
    wiz.events.append({"who": "Judge", "text": prompt, "scene": "appeal"})


def _run_revision(wiz: WizardState, client: GenerationClient, plea_text: str = "") -> None:
    """Apply the current plea, then re-close so verdict/sentence reflect it."""
    before = wiz.trial.verdict
    snapshot = _meters_snapshot(wiz)
    submit_plea(wiz.trial, client, wiz.plea_type or "leniency", plea_text)
    wiz.plea_rounds += 1
    after = wiz.trial.verdict
    wiz.meter_deltas = _meters_delta(snapshot, wiz)
    wiz.revision_marker = _revision_marker(before, after, wiz.meter_deltas["mercy"])
    deliver_closing(wiz.trial, client, revised=True, marker_hint=wiz.revision_marker)
    _enter_paper(wiz, "revisedJudgement")


def _revision_marker(before, after, mercy_gain: float = 0.0) -> str:
    if after.guilt_score < before.guilt_score:
        return data.REVISION_MARKERS["cleared" if after.band != before.band else "reduced"]
    # A leniency plea leaves guilt untouched but raises Mercy: the sentence is
    # reduced even though the verdict stands (meters brainstorm, Config A).
    if mercy_gain > 0 or after.confidence < before.confidence:
        return data.REVISION_MARKERS["reduced"]
    if after.guilt_score > before.guilt_score:
        return data.REVISION_MARKERS["unmoved"]
    return data.REVISION_MARKERS["upheld"]


# --- Handlers ---------------------------------------------------------------


def do_begin(wiz, length: str = "quick"):
    wiz = _w(wiz)
    # Quick (default, ~60–90s) or Full (Witness/Twist moves + the Case File
    # decomposition of Suspicion; design-spec §11.2, meters brainstorm Config C).
    wiz.trial.length = "full" if str(length).lower().startswith("full") else "quick"
    _start_trial(wiz)
    return render(wiz)


def do_send(wiz, mm):
    """Composer submit / Enter: post a message, get a court reply, STAY in phase.

    The composer is a real chat input — every send is answered by a short
    in-character court reaction (LLM-generated, small meter deltas), so the
    glass phases read as a dialogue. The trial only advances when the user
    clicks the primary reply chip (which dispatches the phase's primary action)."""
    wiz = _w(wiz)
    files = _mm_files(mm)
    text = _mm_text(mm)
    _ingest_files(wiz, files)
    if wiz.wiz_phase != "trial" or not text:
        return render(wiz, reset_composer=False)
    f = wiz.focus

    # Safety gate on every chat message (design-spec §13–14, docs/adr/0004). The
    # `case` focus IS intake, so it gets the FULL gate including the model
    # classifier — catching genuinely serious input the offline keyword floor
    # misses, BEFORE the comedy court reacts to it. Later scenes (evidence/witness/
    # twist/appeal) keep the fast offline floor. A blocked message gets the gentle
    # redirect and never enters the record.
    client = get_client()
    decision = screen(text, client) if f == "case" else screen(text)
    if decision.outcome is Outcome.TOO_SERIOUS:
        wiz.events.append({"who": "Court Clerk", "text": decision.message, "scene": _scene_now(wiz)})
        return render(wiz, reset_composer=False)

    # His Honor's Last Nerve (meters brainstorm, Config D): once patience is
    # spent, the court hears no more idle chatter and calls for the ruling — a
    # gentle, in-character anti-stall. The reply chips still advance the trial.
    if wiz.trial.meters.patience <= 0:
        wiz.events.append({
            "who": "Judge",
            "text": "The court has heard quite enough theatrics. Call for the ruling.",
            "scene": _scene_now(wiz),
        })
        return render(wiz, reset_composer=False)

    if f == "case":
        wiz.trial.complaint = f"{wiz.trial.complaint}\n{text}".strip() if wiz.trial.complaint else text
        wiz.events.append({"who": "Complaint", "text": text, "scene": "case"})
        _ensure_session(wiz)
        role, reply = react(wiz.trial, client, "case", text)
        wiz.events.append({"who": role, "text": reply, "scene": "case"})
    elif f == "evidence":
        # Build first so any opening exchange leads the transcript, then post the
        # user's detail and the clerk's exhibit ruling under the Evidence scene.
        _build_docket_if_needed(wiz, client)
        wiz.events.append({"who": _role_label(wiz), "text": text, "scene": "evidence"})
        since = len(wiz.trial.transcript)
        submit_evidence(wiz.trial, client, text)
        _drain(wiz, "evidence", since)
    elif f == "witness":
        # A composer send while a witness stands is the user's own cross-examination
        # question; surface the Defense/Witness exchange it draws.
        _build_docket_if_needed(wiz, client)
        wiz.events.append({"who": _role_label(wiz), "text": text, "scene": "witness"})
        since = len(wiz.trial.transcript)
        cross_examine(wiz.trial, client, text)
        _drain(wiz, "witness", since)
    elif f == "twist":
        # A composer send after a twist is a reaction to the complication.
        _build_docket_if_needed(wiz, client)
        wiz.events.append({"who": _role_label(wiz), "text": text, "scene": "twist"})
        role, reply = react(wiz.trial, client, "twist", text)
        wiz.events.append({"who": role, "text": reply, "scene": "twist"})
    else:  # plea (appeal)
        wiz.plea_text = f"{wiz.plea_text} {text}".strip() if wiz.plea_text else text
        wiz.events.append({"who": _role_label(wiz), "text": text, "scene": "appeal"})
        _build_docket_if_needed(wiz, client)
        role, reply = react(wiz.trial, client, "plea", text)
        wiz.events.append({"who": role, "text": reply, "scene": "appeal"})
    return render(wiz, reset_composer=False)


def stash_and_clear(mm):
    """Step 1 of a composer send: capture the value and clear the box NOW.

    Runs before any inference, so the input empties immediately on submit; the
    captured value rides a ``gr.State`` into :func:`do_send` (step 2), whose
    render leaves the composer value untouched — a message typed while the
    court deliberates survives the response."""
    return mm, {"text": "", "files": []}


def do_action(wiz, slot, mm=""):
    """Slot dispatch for the real #actionRow buttons (paper phases)."""
    wiz = _w(wiz)
    if slot >= len(wiz.action_ids):
        return {C["st"]: wiz, C["busy"]: _signal()}
    return do_action_by_id(wiz, wiz.action_ids[slot], mm)


def do_action_by_id(wiz, aid, mm=""):
    wiz = _w(wiz)
    # Accept either a plain string or a raw MultimodalComposer dict.
    text = _mm_text(mm) if isinstance(mm, dict) else (mm or "").strip()
    client = get_client()

    # --- Plea draft chips: append a draft to the composer, do not re-view. ---
    if aid in PLEA_DRAFTS:
        draft = PLEA_DRAFTS[aid]
        existing_files = _mm_files(mm) if isinstance(mm, dict) else []
        new_text = f"{text} {draft}".strip() if text else draft
        return {C["st"]: wiz, C["composer"]: gr.update(value={"text": new_text, "files": existing_files})}

    # --- Trial moves: append to the one transcript and STAY in glass. ---
    if aid == "submit_evidence":
        # Refocus the composer on evidence and, the first time, post the framing
        # line as a normal court message. The exhibit itself is created on the
        # next composer send (interpreted by the evidence focus).
        _ensure_session(wiz)
        _build_docket_if_needed(wiz, client)
        if not any(e.get("scene") == "evidence" for e in wiz.events):
            wiz.events.append({
                "who": "Evidence Tray",
                "text": "Add one useful detail. Photos, voice notes, alibis, "
                        "suspicious silence, and countertop crumbs are all welcome.",
                "scene": "evidence",
            })
        wiz.focus = "evidence"
        return render(wiz)

    if aid == "call_witness" and wiz.trial.is_full:
        # Summon a witness whose testimony lights Motive + Opportunity (the Case
        # File legs). The Bailiff's summons card is the scene's framing line.
        _build_docket_if_needed(wiz, client)
        wiz.focus = "witness"
        since = len(wiz.trial.transcript)
        call_witness(wiz.trial, client)
        _drain(wiz, "witness", since)
        return render(wiz)

    if aid == "cross_examine":
        _build_docket_if_needed(wiz, client)
        wiz.focus = "witness"
        if text:
            wiz.events.append({"who": _role_label(wiz), "text": text, "scene": "witness"})
        since = len(wiz.trial.transcript)
        cross_examine(wiz.trial, client, text)
        _drain(wiz, "witness", since)
        return render(wiz)

    if aid == "object":
        # Object! is inline (flow doc §6): it appends the Defense/Judge exchange to
        # the flow and STAYS in glass — it is NOT a jump into the plea screen.
        if not _can_object(wiz):
            return {C["st"]: wiz, C["toast"]: _toast(
                "There is nothing on the record to object to just yet.")}
        _build_docket_if_needed(wiz, client)
        since = len(wiz.trial.transcript)
        raise_objection(wiz.trial, client)
        _drain(wiz, "objection", since)
        return render(wiz)

    if aid == "add_twist":
        if wiz.trial.twist_used:
            return {C["st"]: wiz, C["toast"]: _toast("The court allows but one twist per trial.")}
        _build_docket_if_needed(wiz, client)
        wiz.focus = "twist"
        since = len(wiz.trial.transcript)
        add_twist(wiz.trial, client)
        _drain(wiz, "twist", since)
        return render(wiz)

    # --- The one terminal forward affordance → paper. ---
    # "Ask the Judge" / "Fast Judgement" / "Deliver the Verdict" — available from
    # the first moment (the bored-user escape hatch, flow doc §3).
    if aid == "ask_judge":
        if not wiz.trial.case_title:
            # Fast Judgement straight from the complaint: validate intake first.
            decision = screen(wiz.trial.complaint or text, client)
            if decision.outcome in (Outcome.EMPTY, Outcome.TOO_SERIOUS, Outcome.INCOHERENT):
                return {C["st"]: wiz, C["toast"]: _toast(decision.message)}
            wiz.trial.complaint = (
                decision.condensed if decision.outcome is Outcome.TOO_LONG
                else (wiz.trial.complaint or text)
            )
            if len(wiz.trial.complaint.strip()) < 12:
                return {C["st"]: wiz, C["toast"]: _toast(
                    "The court needs at least one dramatic detail before swinging the hammer.")}
            _ensure_session(wiz)
        _build_docket_if_needed(wiz, client)
        if text and wiz.focus in ("witness", "evidence"):
            # A pending composer line is one last beat in the active scene: a
            # cross-examination question (witness) or one more exhibit (evidence).
            scene = _scene_now(wiz)
            wiz.events.append({"who": _role_label(wiz), "text": text, "scene": scene})
            since = len(wiz.trial.transcript)
            if wiz.focus == "witness":
                cross_examine(wiz.trial, client, text)
            else:
                submit_evidence(wiz.trial, client, text)
            _drain(wiz, scene, since)
        _close_with_deltas(wiz, client)
        return render(wiz)

    # --- Appeal entry points (from the judgement paper → back to glass). ---
    if aid in ("plead_innocent", "request_leniency", "plead_evidence"):
        wiz.plea_type = {"plead_innocent": "innocent", "request_leniency": "leniency", "plead_evidence": "evidence"}[aid]
        wiz.plea_text = ""
        wiz.wiz_phase = "trial"
        wiz.focus = "plea"
        _append_appeal_intro(wiz)
        return render(wiz)

    if aid == "submit_plea":
        # Plea arguments accumulate across composer sends (wiz.plea_text); fall back
        # to any text still sitting unsent in the composer.
        plea_text = (wiz.plea_text or text).strip()
        if not plea_text:
            return {C["st"]: wiz, C["toast"]: _toast(
                "The court will not consider an empty dramatic objection.")}
        if not wiz.plea_text and plea_text:
            wiz.events.append({"who": _role_label(wiz), "text": plea_text, "scene": "appeal"})
        wiz.trial.complaint = wiz.trial.complaint or plea_text
        _build_docket_if_needed(wiz, client)
        _run_revision(wiz, client, plea_text)
        wiz.plea_text = ""
        return render(wiz)

    if aid == "fairer":
        # A real re-closing call: the court restates the sentence so it is fair
        # to every household member, based on this case's actual content. No plea,
        # so no needle movement to show — clear any stale deltas from the first
        # judgement.
        wiz.revision_marker = data.REVISION_MARKERS["fairer"]
        wiz.meter_deltas = {}
        _build_docket_if_needed(wiz, client)
        deliver_closing(wiz.trial, client, revised=True, marker_hint=prompts.FAIRNESS_HINT)
        _enter_paper(wiz, "revisedJudgement")
        return render(wiz)

    # --- Judgement / revised ---
    if aid in ("accept", "finalize"):
        _enter_paper(wiz, "sentence")
        return render(wiz)

    if aid == "one_more_plea":
        wiz.plea_type = "innocent"
        wiz.plea_text = ""
        wiz.wiz_phase = "trial"
        wiz.focus = "plea"
        _append_appeal_intro(wiz)
        return render(wiz)

    # --- Sentence ---
    if aid == "copy":
        out = render(wiz)
        out[C["share"]] = _toast(view.share_text(wiz.trial))
        out[C["toast"]] = _toast("Verdict copied. Use responsibly and with theatrical restraint.")
        return out
    if aid == "share":
        out = render(wiz)
        out[C["share"]] = _toast(view.share_text(wiz.trial))
        out[C["toast"]] = _toast("Verdict copied to share. Petty justice, now portable.")
        return out
    if aid == "download_png":
        # Client-side capture (remaining-work T3): pulse the png bridge so the JS
        # renders the existing record card to a PNG the user can download. The
        # render itself is pure browser work — the server just triggers it.
        out = render(wiz)
        out[C["png"]] = _signal()
        out[C["toast"]] = _toast("Rendering your court record… the download will begin shortly.")
        return out

    if aid == "served":
        wiz.completed_sentence = True
        out = render(wiz)
        out[C["toast"]] = _toast("Sentence served. The court grudgingly approves.")
        return out
    if aid == "new_case":
        return do_begin(WizardState())

    # --- Shared: invite ---
    if aid == "invite":
        return do_invite(wiz)

    return {C["st"]: wiz, C["busy"]: _signal()}


def do_invite(wiz):
    wiz = _w(wiz)
    _ensure_session(wiz)
    out = render(wiz)
    out[C["share"]] = _toast(wiz.session_path or "/court/pending")
    out[C["toast"]] = _toast("Invite copied. The summons is now somebody else's problem.")
    return out


def do_choose_role(wiz, role):
    wiz = _w(wiz)
    wiz.role = role
    # A join participant enters the one glass trial; the "evidence" role lands
    # focused on the evidence scene, everyone else on the complaint.
    focus = "evidence" if role == "evidence" else "case"
    _start_trial(wiz, focus)
    wiz.events.append({"who": _role_label(wiz), "text": "entered court", "scene": _scene_now(wiz)})
    return render(wiz)


# --- Boot (query params) ----------------------------------------------------

_SAMPLE_COMPLAINT = (
    "Our house cat spilled milk on the floor, stared at it, and left without filing a report."
)


# The query-param debug `view`s, mapped to the collapsed material model: the
# former case/evidence/plea glass screens are now one `trial` surface at a given
# focus; judgement/revisedJudgement/sentence stay paper.
_GLASS_VIEWS = {"case": "case", "evidence": "evidence", "plea": "plea"}
_PAPER_VIEWS = {"judgement", "revisedJudgement", "sentence"}


def _seed_sample(wiz: WizardState, view: str) -> None:
    client = get_client()
    wiz.trial.complaint = _SAMPLE_COMPLAINT
    wiz.attachments = [{"kind": "image", "label": "milk-scene-1"}, {"kind": "audio", "label": "defensive-meow"}]
    _ensure_session(wiz)
    # Seed the opening conversation so the glass surface has real content.
    wiz.events.append({"who": "Court Clerk", "text": _CASE_INTRO, "scene": "case"})
    wiz.events.append({"who": "Complaint", "text": _SAMPLE_COMPLAINT, "scene": "case"})
    # Anything past the complaint needs the docket + a closed verdict.
    if view in _PAPER_VIEWS or view in ("plea", "evidence"):
        _build_docket_if_needed(wiz, client)
    if view == "evidence":
        wiz.events.append({
            "who": "Evidence Tray",
            "text": "Add one useful detail. Photos, voice notes, alibis, "
                    "suspicious silence, and countertop crumbs are all welcome.",
            "scene": "evidence",
        })
    if view in _PAPER_VIEWS or view == "plea":
        deliver_closing(wiz.trial, client)
    if view == "plea":
        wiz.plea_type = "leniency"
        _append_appeal_intro(wiz)
    if view in ("revisedJudgement", "sentence"):
        wiz.plea_type = "leniency"
        _run_revision(wiz, client)


def boot(current, request: gr.Request):
    wiz = WizardState()
    params = dict(request.query_params) if request else {}
    court = params.get("court")
    view = params.get("view")
    if view in _GLASS_VIEWS or view in _PAPER_VIEWS or view == "join":
        if view == "join":
            wiz.wiz_phase = "join"
            wiz.session_id, wiz.session_path = "tiny-milk-trial", "/court/tiny-milk-trial"
            _seed_sample(wiz, "judgement")  # give the join screen a case to reference
            wiz.wiz_phase = "join"
        elif view in _GLASS_VIEWS:
            if view != "case" or params.get("sample") == "1":
                _seed_sample(wiz, view)
            else:
                _start_trial(wiz)
            wiz.wiz_phase = "trial"
            wiz.focus = _GLASS_VIEWS[view]
        else:  # paper views
            _seed_sample(wiz, view)
            wiz.wiz_phase = view
        return render(wiz)
    if court:
        wiz.wiz_phase = "join"
        wiz.session_id, wiz.session_path = court, f"/court/{court}"
        wiz.trial.complaint = "A shared petty matter awaiting testimony."
        return render(wiz)
    # No routing params: the components already start on the landing view. Echo
    # the CURRENT State back unchanged and touch nothing else. The load event can
    # fire LATE (after the SPA connects, possibly after the user has already
    # clicked and advanced the wizard); echoing `current` means a late boot can
    # neither change the view nor reset the trial state mid-session.
    return {C["st"]: current}


# --- Client-side behaviour ---------------------------------------------------
# All JS lives in tinycourt/static/courtroom.js as a single `window.tc`
# namespace, injected once into <head> at launch (see main()). The event
# wiring below bridges to it with thin one-line `js=` wrappers — no JS bodies
# in this module. CSS likewise lives in tinycourt/static/courtroom.css
# (loaded via launch(css_paths=...)); its "Neutralize Gradio dark mode" block
# is what keeps the fixed light/paper palette identical in either OS theme.


# --- Build ------------------------------------------------------------------


def build_demo() -> gr.Blocks:
    # theme/css/head go to launch() (Gradio 6 ignores them on the Blocks
    # constructor — see launch_kwargs); build_demo only assembles the tree so
    # tests can drive handlers without a server.
    with gr.Blocks(
        title="Tiny Court of Everyday Crimes",
        fill_height=True,
        fill_width=True,
        elem_id="tc-app",
        elem_classes="app",
    ) as demo:
        st = gr.State()

        # Fixed extras: the toast element + live region (positioned fixed).
        gr.HTML(
            '<div class="toast" id="toast"></div>'
            '<div class="sr-only" id="liveRegion" aria-live="polite" role="status"></div>',
            elem_id="tcExtras",
        )

        # --- Landing ---
        with gr.Column(visible=True, elem_id="landingView", elem_classes="landing-view") as landing_col:
            with gr.Column(elem_id="landingInner", elem_classes="landing-inner"):
                gr.HTML(
                    '<div class="landing-stack">'
                    '<div class="landing-kicker">Petty justice, delivered with paperwork</div>'
                    '<h1>Tiny Court</h1>'
                    '<p class="landing-promise">Settle petty disputes with dramatic fairness.</p>'
                    '<p class="landing-help">Describe what happened, add evidence, invite '
                    'witnesses, and receive a tiny judgement.</p>'
                    f'{view.landing_hero()}'
                    '</div>'
                )
                with gr.Row(elem_id="beginRow", elem_classes="begin-row"):
                    begin_btn = gr.Button("Quick Trial", elem_id="beginCourtBtn", elem_classes="primary-btn begin-btn")
                    begin_full_btn = gr.Button("Full Trial", elem_id="beginFullBtn", elem_classes="secondary-btn begin-btn")
                gr.HTML('<p class="landing-note"><strong>Quick Trial</strong> runs in about a minute. '
                        '<strong>Full Trial</strong> calls witnesses, allows a twist, and opens the Case File. '
                        'Evidence optional. Grudges welcome.</p>')

        # --- Join ---
        with gr.Column(visible=False, elem_id="joinView", elem_classes="court-view") as join_col:
            join_info = gr.HTML(elem_id="joinInfo")
            with gr.Row(elem_classes="join-grid"):
                role_accused = gr.Button("I am accused", elem_classes="secondary-btn")
                role_evidence = gr.Button("I have evidence", elem_classes="secondary-btn")
                role_mercy = gr.Button("I plead for mercy", elem_classes="secondary-btn")
                role_spectator = gr.Button("I am watching silently", elem_classes="secondary-btn")

        # --- Court ---
        with gr.Column(visible=False, elem_id="courtView", elem_classes="court-view") as court_col:
            stepper_html = gr.HTML(elem_id="stepperWrap", elem_classes="stepper-wrap")
            with gr.Column(elem_id="interactionSurface", elem_classes="court-center"):
                surface_html = gr.HTML(elem_id="surface")
                composer = MultimodalComposer(
                    sources=["upload", "microphone"],
                    file_count="multiple",
                    placeholder=PLACEHOLDERS["case"],
                    submit_btn=True,
                    show_label=False,
                    container=False,
                    lines=1,
                    max_lines=6,
                    elem_id="composerInput",
                    elem_classes=["tc-composer"],
                )
            with gr.Row(elem_id="actionRow", elem_classes="action-row"):
                primary_btn = gr.Button("Fast Judgement", elem_classes="primary-btn")
                act2 = gr.Button(visible=False, elem_classes="secondary-btn")
                act3 = gr.Button(visible=False, elem_classes="secondary-btn")
                act4 = gr.Button(visible=False, elem_classes="secondary-btn")
                act5 = gr.Button(visible=False, elem_classes="secondary-btn")

        # --- Hidden signal bridges ---
        stage_signal = gr.Textbox(visible=False, elem_classes="tc-hidden")
        toast_signal = gr.Textbox(visible=False, elem_classes="tc-hidden")
        share_bridge = gr.Textbox(visible=False, elem_classes="tc-hidden")
        busy_signal = gr.Textbox(visible=False, elem_classes="tc-hidden")
        png_signal = gr.Textbox(visible=False, elem_classes="tc-hidden")
        # Inbound bridge: one hidden, offscreen real button per chip action id. The
        # reply chips in #surface are inert HTML; a delegated listener (window.tc.init)
        # clicks `#tcbtn-<id>` when its chip is clicked. Wrapped in an offscreen
        # container (kept in the DOM — Gradio drops `visible=False` from the DOM).
        action_triggers: dict[str, gr.Button] = {}
        with gr.Row(elem_id="actionTriggers", elem_classes="tc-bridge"):
            for aid in CHIP_ACTION_IDS:
                action_triggers[aid] = gr.Button(aid, elem_id=f"tcbtn-{aid}")

        # Register components for render()/handlers.
        C.update(
            st=st, landing=landing_col, join=join_col, court=court_col,
            join_info=join_info, stepper=stepper_html, surface=surface_html,
            composer=composer, primary=primary_btn, act2=act2, act3=act3, act4=act4,
            act5=act5, stage=stage_signal, toast=toast_signal, share=share_bridge,
            busy=busy_signal, png=png_signal,
        )

        OUTPUTS = [
            st, landing_col, join_col, court_col, join_info, stepper_html,
            surface_html, composer, primary_btn, act2, act3, act4, act5,
            stage_signal, toast_signal, share_bridge, busy_signal, png_signal,
        ]

        # --- Wiring ---
        # `show_progress="hidden"`: handlers return dict-style partial updates that
        # deliberately omit some of OUTPUTS (boot echoes only state; render() leaves
        # the hidden join_info / toast / share / glass-phase action buttons untouched).
        # Gradio paints a progress tracker on every declared output and only clears it
        # for components the response actually updates, so an omitted output's tracker
        # spins forever — visible once that component is later revealed (landing→court).
        # The courtroom supplies its own theatrical feedback and "must not look like
        # default Gradio", so suppress the framework trackers everywhere.
        PROG = "hidden"
        # Model-bound events all share one GPU slot: on a single-GPU Space (and the
        # 8GB local card) two concurrent generations would OOM, so serialize them.
        # `concurrency_id` groups them; `concurrency_limit=1` admits one at a time.
        GPU = {"show_progress": PROG, "concurrency_limit": 1, "concurrency_id": "gpu"}
        begin_btn.click(lambda w: do_begin(w, "quick"), st, OUTPUTS, show_progress=PROG)
        begin_full_btn.click(lambda w: do_begin(w, "full"), st, OUTPUTS, show_progress=PROG)

        # Composer send is three listeners on one `submit` event:
        #   1. a client-side-only pass that raises the optimistic bubble + busy
        #      state from the event payload (no DOM scraping),
        #   2. an instant stash+clear of the input (must stay off the GPU queue so
        #      the box empties immediately),
        #   3. the slow, model-bound trial turn reading the stashed value.
        pending_mm = gr.State()
        composer.submit(None, composer, None, js="(mm) => window.tc.composer(mm)")
        composer.submit(
            stash_and_clear, composer, [pending_mm, composer], show_progress=PROG,
        ).then(do_send, [st, pending_mm], OUTPUTS, **GPU)

        primary_btn.click(lambda w, mm: do_action(w, 0, mm), [st, composer], OUTPUTS, **GPU)
        act2.click(lambda w, mm: do_action(w, 1, mm), [st, composer], OUTPUTS, **GPU)
        act3.click(lambda w, mm: do_action(w, 2, mm), [st, composer], OUTPUTS, **GPU)
        act4.click(lambda w, mm: do_action(w, 3, mm), [st, composer], OUTPUTS, **GPU)
        act5.click(lambda w, mm: do_action(w, 4, mm), [st, composer], OUTPUTS, **GPU)

        # Inbound chip bridge: each hidden trigger dispatches its action id by closure.
        for aid, btn in action_triggers.items():
            btn.click(lambda w, mm, a=aid: do_action_by_id(_w(w), a, mm), [st, composer], OUTPUTS, **GPU)

        role_accused.click(lambda w: do_choose_role(w, "accused"), st, OUTPUTS, show_progress=PROG)
        role_evidence.click(lambda w: do_choose_role(w, "evidence"), st, OUTPUTS, show_progress=PROG)
        role_mercy.click(lambda w: do_choose_role(w, "mercy"), st, OUTPUTS, show_progress=PROG)
        role_spectator.click(lambda w: do_choose_role(w, "spectator"), st, OUTPUTS, show_progress=PROG)

        # Side-effecting JS bridges (no server round-trip) → window.tc (courtroom.js).
        stage_signal.change(None, stage_signal, None, js="(s) => window.tc.stage(s)")
        toast_signal.change(None, toast_signal, None, js="(v) => window.tc.toast(v)")
        share_bridge.change(None, share_bridge, None, js="(v) => window.tc.share(v)")
        busy_signal.change(None, busy_signal, None, js="(v) => window.tc.busyDone(v)")
        png_signal.change(None, png_signal, None, js="(v) => window.tc.savePng(v)")

        # Three load passes: seed the body skin/stage, run the Python boot that
        # routes on query params, then bind the delegated listeners. Combining
        # `js=` and `fn=` on one `.load` suppresses the Python handler in Gradio,
        # so the JS passes stay separate.
        demo.load(None, None, None, js="() => window.tc.onLoad()")
        demo.load(boot, st, OUTPUTS, show_progress=PROG)
        demo.load(None, None, None, js="() => window.tc.init()")

    return demo


def warm_backend() -> None:
    """Announce the backend and, for the local model, start downloading/loading
    it in a daemon thread so the first composer send doesn't stall on model load.
    Safe to call at import time (the entry point does, so the warm-up overlaps the
    Space boot)."""
    print(f"[tinycourt] backend: {BACKEND}")
    if BACKEND == "local":
        from .config import selected_model

        print(f"[tinycourt] model: {selected_model().repo_id}")
        threading.Thread(target=get_client, daemon=True).start()


def launch_kwargs() -> dict:
    """The single source of truth for launch configuration (theme/css/head and
    host binding). Gradio 6 requires these on ``launch()``, not the Blocks. Used
    by both ``main()`` and the ``main.py`` Space entry point so the styling is
    applied identically however the app is started."""
    return dict(
        # Bind all interfaces so the Space proxy can reach the app (harmless
        # locally); the platform supplies the port.
        server_name="0.0.0.0",
        server_port=7860,
        # Gradio 6 defaults to SSR (a Node.js proxy in front of Python). On the
        # ZeroGPU Space that proxy starts then immediately stops and the app
        # exits (RUNTIME_ERROR). Serve directly from Python instead.
        ssr_mode=False,
        theme=gr.themes.Base(),
        css_paths=[str(CSS_PATH)],
        # head inlines the behaviour script so window.tc exists before the SPA mounts.
        head=(
            f"<script>{H2C_PATH.read_text(encoding='utf-8')}</script>"
            f"<script>{JS_PATH.read_text(encoding='utf-8')}</script>"
        ),
    )


def main() -> None:
    warm_backend()
    build_demo().launch(**launch_kwargs())


if __name__ == "__main__":
    main()
