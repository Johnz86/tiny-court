"""HTML renderers for the single-page court wizard.

These build the wizard's markup (smoked-glass chat shells + opaque "paper"
ruling cards) from the engine's ``TrialState``. The Gradio app
(``tinycourt/app.py``) owns flow and the real composer/buttons; this module only
builds the inner HTML for the ``gr.HTML`` surfaces. All dynamic text is escaped —
the comedy is user- and model-supplied.

The visual system (classes, fonts, background crops) lives in ``static/courtroom.css``; this
file must emit the matching class names (``message-shell``, ``court-message``,
``ruling-surface``, ``verdict-stamp``, ``seal`` …).
"""

from __future__ import annotations

from html import escape

from . import data
from .trial import COURT_VOICES, GUILTY, LESSER, NOT_GUILTY, TrialState

# --- Inline icons (the courtroom role/action icon() map) -------------------

_ICONS = {
    "file": '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/></svg>',
    "witness": '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    "evidence": '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v13H4z"/><path d="M8 7V4h8v3"/><path d="M8 12h8M8 16h5"/></svg>',
    "hammer": '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m14 5 5 5"/><path d="m12 7 5 5"/><path d="m5 14 5 5"/><path d="m9 18 8-8"/><path d="m3 21 6-6"/></svg>',
    "stamp": '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4h6v7l3 4v3H6v-3l3-4z"/><path d="M5 21h14"/></svg>',
    "mic": '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/></svg>',
}


def icon(name: str) -> str:
    return _ICONS.get(name, _ICONS["file"])


def _avatar(name: str) -> str:
    return f'<span class="avatar-icon">{icon(name)}</span>'


# Which avatar each role speaks with.
_ROLE_AVATAR = {
    "Court Clerk": "file",
    "Complaint": "witness",
    "You": "witness",
    "Accused": "witness",
    "Defense": "witness",
    "Prosecutor": "evidence",
    "Witness": "evidence",
    "Evidence": "evidence",
    "Evidence Tray": "evidence",
    "Judge": "hammer",
}


# --- Verdict helpers --------------------------------------------------------

_STAMP_WORD = {NOT_GUILTY: "Not Guilty", LESSER: "Lesser Pettiness", GUILTY: "Guilty"}


def verdict_stamp_word(band: str) -> str:
    return _STAMP_WORD.get(band, "Guilty")


# --- Phase stepper — a dynamic timeline of what happened --------------------

# The stepper is a *record of this trial*, not a fixed playlist
# (docs/full-trial-conversation-flow.md §7, design B). The mandatory anchors
# (Case · Verdict · Sentence) are always present; an optional scene's pip
# (Evidence, Witness, Twist, Appeal) is inserted by the caller only once that
# scene has actually happened. So a session that never called a witness simply
# has no Witness pip — the timeline never implies a skipped step.
#
# The caller (`app._timeline`) owns *which* steps are present and their state;
# this renderer just lays out the ``(label, status)`` list it is handed, where
# ``status`` is "active" (the live focus), "done" (already passed), or "" (a
# pending anchor such as the terminal Verdict before it is reached).


def stepper(steps: list[tuple[str, str]]) -> str:
    if not steps:
        return ""
    items = []
    active_index = 0
    for i, (label, status) in enumerate(steps):
        if status == "active":
            active_index = i
        aria = ' aria-current="step"' if status == "active" else ""
        items.append(
            f'<li class="step {status}"{aria}>'
            f'<span aria-hidden="true">{i + 1}</span> {escape(label)}</li>'
        )
    return (
        '<nav class="stepper" aria-label="Court progress">'
        f'<ol class="stepper-list">{"".join(items)}</ol>'
        f'<span class="step-progress" aria-hidden="true">Step {active_index + 1} of {len(steps)}</span>'
        "</nav>"
    )


# --- Glass chat bubbles -----------------------------------------------------


def _side(who: str) -> str:
    """Bubble side for a chat event: the court's voices render court-side,
    every human speaking label (You, Complaint, Accused, Witness…) user-side."""
    return "" if who in COURT_VOICES else "user"


def court_message(role: str, text: str, *, kind: str = "") -> str:
    avatar = _ROLE_AVATAR.get(role, "file")
    return f"""
<div class="court-message {kind}">
  <div class="message-avatar">{_avatar(avatar)}</div>
  <div class="message-bubble">
    <span class="message-label">{escape(role)}</span>
    {escape(text)}
  </div>
</div>"""


def reply_chips(actions: list[dict] | None) -> str:
    """Render the phase's actions as smoked-glass reply chips that sit under the
    last court message. Inert HTML — each chip carries a ``data-tc-action`` id that
    a document-level click listener forwards to the Python dispatcher (see the
    inbound bridge in :mod:`tinycourt.app`). The primary action is emphasized."""
    if not actions:
        return ""
    buttons = []
    for a in actions:
        cls = "reply-chip primary" if a.get("kind") == "primary" else "reply-chip"
        buttons.append(
            f'<button type="button" class="{cls}" '
            f'data-tc-action="{escape(a.get("id", ""))}">{escape(a.get("label", ""))}</button>'
        )
    return f'<div class="reply-actions">{"".join(buttons)}</div>'


def _glass_shell(
    extra_class: str,
    messages: list[str],
    *,
    head: str = "",
    actions: list[dict] | None = None,
) -> str:
    shell_class = "plea-shell" if head else ""
    return f"""
<article class="message-shell {extra_class} {shell_class}">
  {head}
  <div class="message-list">{"".join(messages)}{reply_chips(actions)}</div>
</article>"""


# Optional scenes are separated in the one growing transcript by a light divider
# rather than by clearing the screen (docs/full-trial-conversation-flow.md §4).
# The label is emitted only when that scene actually occurs — the divider is
# driven by the per-event ``scene`` tag, so a session with no twist shows no
# "Twist!" rule. ``case`` is the opening scene and needs no divider.
SCENE_LABELS = {
    "opening": "Opening Statements",
    "evidence": "Evidence",
    "witness": "The Witness",
    "twist": "Twist!",
    "objection": "Objection!",
    "appeal": "Appeal",
}


def scene_divider(label: str) -> str:
    return f'<div class="scene-divider" role="separator"><span>{escape(label)}</span></div>'


def glass_trial(
    state: TrialState,
    events: list[dict] | None = None,
    *,
    actions: list[dict] | None = None,
    focus: str = "case",
) -> str:
    """The one continuous pre-verdict (and appeal) transcript.

    Renders the *entire* ordered ``events`` list as a single bubble stream — no
    ``scene`` filter, no per-call cap (the shell scrolls internally and is
    bottom-anchored). A light scene divider is inserted whenever the ``scene``
    tag changes to a labelled scene, so the flow stays legible without ever
    clearing earlier messages (docs/full-trial-conversation-flow.md §2, §4). The
    ``focus`` only tints the shell (and drives the composer placeholder upstream);
    the history behind it is always whole.
    """
    msgs: list[str] = []
    prev_scene: str | None = None
    for ev in events or []:
        scene = ev.get("scene", "case")
        if scene != prev_scene and scene in SCENE_LABELS:
            msgs.append(scene_divider(SCENE_LABELS[scene]))
        who = ev.get("who", "Court Clerk")
        msgs.append(court_message(who, ev.get("text", ""), kind=_side(who)))
        prev_scene = scene
    shell_class = "complaint-surface" if focus == "case" else "evidence-surface"
    return _glass_shell(shell_class, msgs, actions=actions)


# --- Paper ruling / record cards -------------------------------------------


def _docket_strip(state: TrialState) -> str:
    return f"""
<div class="docket-strip">
  <div class="docket-mini"><span>Case</span><strong>{escape(state.case_title)}</strong></div>
  <div class="docket-mini"><span>Defendant</span><strong>{escape(state.accused)}</strong></div>
  <div class="docket-mini"><span>Charge</span><strong>{escape(state.charge)}</strong></div>
</div>"""


def _reason_items(state: TrialState) -> list[str]:
    """The verdict card's 2–3 short reasons (design-spec §10.5): the closing
    call's own reasons when it supplied them, else scraped transcript lines."""
    if state.reasons:
        return state.reasons[:3]
    out = []
    for card in reversed(state.transcript):
        if card.role in ("Prosecutor", "Defense", "Witness"):
            first = card.text.split(". ")[0].strip().rstrip(".")
            if first and first not in out:
                out.append(first + ".")
        if len(out) >= 3:
            break
    out.reverse()
    if not out:
        out = [escape(state.charge or "A tiny crime of suspicious convenience.")]
    return out


# --- Court meters strip -----------------------------------------------------
# The verdict engine (trial.py) tracks the court meters; the review flagged that they
# were computed but never shown ("make consequence visible"). This renders them
# as labelled bars on the ruling/record cards, with an optional signed delta
# badge so a plea's effect on the needle is legible, not just asserted in prose.

# Compact single-word labels so all six fit one row; the full meter name + what
# it does lives in the title tooltip. Order groups the two guilt drivers first
# (Suspicion = vibes, Evidence = proof), then severity, then the non-guilt axes.
_METERS = [
    ("suspicion", "Suspicion", "Suspicion — how guilty the accused looks (the vibes)"),
    ("evidence", "Evidence", "Evidence Weight — how much can actually be proven"),
    ("severity", "Severity", "Petty Severity — how grave the tiny crime is"),
    ("dignity", "Dignity", "Courtroom Dignity — how composed the court remains"),
    ("mercy", "Mercy", "Mercy — how softly the hammer falls"),
    ("patience", "Patience", "His Honor's Last Nerve — how much chatter the court will still abide"),
]


# The Case File legs that compose into Suspicion in a Full Trial (Config C).
# Shown as a second, captioned strip beneath the main meters so the headline
# Suspicion bar is visibly the sum of its parts — without cluttering Quick Trial.
_CASE_FILE = [
    ("means", "Means", "Could they have done it — the how"),
    ("motive", "Motive", "Did they want to — the why"),
    ("opportunity", "Opportunity", "Were they positioned to — the when and where"),
]


def _meter_value(state: TrialState, key: str) -> float:
    m = state.meters
    raw = {
        "suspicion": m.suspicion,
        "evidence": m.evidence_weight,
        "severity": m.petty_severity,
        "dignity": m.courtroom_dignity,
        "mercy": m.mercy,
        "patience": m.patience,
        "means": m.means,
        "motive": m.motive,
        "opportunity": m.opportunity,
    }[key]
    return max(0.0, min(100.0, raw))


def _delta_badge(delta: float | None) -> str:
    """A ▲/▼ badge for a meter that moved (e.g. after a plea). Sub-1 moves are
    rounding noise and render nothing. The arrow is decorative (aria-hidden); the
    signed amount is also exposed as SR-only text so the movement isn't
    sighted-only."""
    if not delta or abs(delta) < 1.0:
        return ""
    arrow = "▲" if delta > 0 else "▼"
    cls = "up" if delta > 0 else "down"
    amount = abs(round(delta))
    word = "up" if delta > 0 else "down"
    return (
        f'<span class="meter-delta {cls}"><span aria-hidden="true">{arrow}{amount}</span>'
        f'<span class="sr-only"> ({word} {amount})</span></span>'
    )


def _meter_row(state: TrialState, key: str, label: str, hint: str, deltas: dict[str, float] | None) -> str:
    val = _meter_value(state, key)
    badge = _delta_badge((deltas or {}).get(key))
    return (
        f'<div class="meter meter--{key}" title="{escape(hint)}">'
        f'<div class="meter-top"><span class="meter-label">{escape(label)}</span>'
        f'{badge}<span class="meter-value">{val:.0f}</span></div>'
        f'<div class="meter-track"><span class="meter-fill" style="--fill:{val:.0f}%"></span></div>'
        "</div>"
    )


def meters_strip(
    state: TrialState, *, deltas: dict[str, float] | None = None, animate: bool = True
) -> str:
    """The court meters as labelled bars. ``deltas`` adds ▲/▼ badges (only
    meaningful where there's a before→after, i.e. the revised card). ``animate``
    plays the settle-in fill on mount — on for the verdict *reveal*, off for the
    frozen shareable record so a screenshot never catches bars mid-grow."""
    rows = [_meter_row(state, key, label, hint, deltas) for key, label, hint in _METERS]
    cls = "meters" if animate else "meters meters--static"
    return f'<div class="{cls}" role="group" aria-label="Court meters">{"".join(rows)}</div>'


def case_file_strip(
    state: TrialState, *, deltas: dict[str, float] | None = None, animate: bool = True
) -> str:
    """The Full Trial Case File: the three legs (Means/Motive/Opportunity) that
    compose into Suspicion (Config C). Rendered as a captioned sub-strip beneath
    the main meters so the headline Suspicion bar reads as the sum of its parts.
    Returns "" for a Quick Trial, which never shows the dense decomposition."""
    if not state.is_full:
        return ""
    rows = [_meter_row(state, key, label, hint, deltas) for key, label, hint in _CASE_FILE]
    static = "" if animate else " meters--static"
    return (
        '<div class="case-file">'
        '<span class="case-file-caption">Case File · what feeds Suspicion</span>'
        f'<div class="meters case-file-legs{static}" role="group" aria-label="Case file">{"".join(rows)}</div>'
        "</div>"
    )


def judgement_card(
    state: TrialState,
    *,
    revised: bool,
    revision_marker: str = "",
    closing_note: str = "",
    meter_deltas: dict[str, float] | None = None,
) -> str:
    v = state.verdict
    stamp = "" if revised else (
        f'<div class="verdict-stamp">{escape(verdict_stamp_word(v.band))}</div>'
    )
    marker = ""
    if revised and revision_marker:
        marker = (
            '<div class="revision-banner"><strong>Revised ruling</strong>'
            f'<span>{escape(revision_marker)}</span></div>'
        )
    docket = "" if revised else _docket_strip(state)
    reasons = "" if revised else (
        '<ol class="reason-list">'
        + "".join(f"<li>{escape(r)}</li>" for r in _reason_items(state))
        + "</ol>"
    )
    # The flavor line is this case's own docket data (severity label + court
    # mood, both written by the CASE_OPEN call), not fixed copy.
    flavor = ""
    if not revised and (state.severity_label or state.court_mood):
        bits = [b for b in (
            f"Filed under: {state.severity_label}" if state.severity_label else "",
            f"Court mood: {state.court_mood}" if state.court_mood else "",
        ) if b]
        flavor = f'<div class="judge-note flavor-note">{escape(". ".join(bits))}.</div>'
    note = f'<div class="judge-note">{escape(closing_note)}</div>' if closing_note else ""
    # Show the meters on every ruling, with delta badges for the movement the
    # user caused: on the first judgement that's their evidence/objections since
    # charges were filed; on the revised card it's the plea's effect.
    meters = meters_strip(state, deltas=meter_deltas)
    case_file = case_file_strip(state, deltas=meter_deltas)
    return f"""
<article class="surface ruling-surface">
  {stamp}
  <div class="surface-pad judgement-card">
    {marker}
    {docket}
    <div class="verdict-head">
      <span class="verdict-label">The court finds</span>
      <h1 class="verdict-title">{escape(state.verdict_title)}</h1>
      <span class="confidence">{escape(data.confidence_phrase(v.band, v.confidence))}</span>
    </div>
    {meters}
    {case_file}
    {reasons}
    {flavor}
    <div class="court-order">{escape(state.sentence or data.FALLBACK_SENTENCE)}</div>
    {note}
  </div>
</article>"""


def record_card(state: TrialState, *, completed: bool) -> str:
    v = state.verdict
    served = (
        '<span class="change-marker">Sentence served. The court grudgingly approves.</span>'
        if completed
        else ""
    )
    return f"""
<article class="surface ruling-surface">
  <div class="surface-pad judgement-card">
    <div class="seal">Tiny Court Certified</div>
    <h1 class="prompt">Court Record</h1>
    <div class="record-grid">
      <div class="record-item"><span class="record-label">Case</span><span class="record-value">{escape(state.case_title)}</span></div>
      <div class="record-item"><span class="record-label">Defendant</span><span class="record-value">{escape(state.accused)}</span></div>
      <div class="record-item"><span class="record-label">Charge</span><span class="record-value">{escape(state.charge)}</span></div>
      <div class="record-item"><span class="record-label">Verdict</span><span class="record-value">{escape(state.verdict_title)} — {escape(data.confidence_phrase(v.band, v.confidence))}</span></div>
      <div class="record-item"><span class="record-label">Best Quote</span><span class="record-value">{escape(state.best_quote or data.FALLBACK_BEST_QUOTE)}</span></div>
    </div>
    {meters_strip(state, animate=False)}
    {case_file_strip(state, animate=False)}
    <div class="court-order">{escape(state.sentence or data.FALLBACK_SENTENCE)}</div>
    {served}
  </div>
</article>"""


# --- Chips + session line ---------------------------------------------------


def chips(attachments: list[dict], session_path: str | None) -> str:
    chip_html = ""
    if attachments:
        chip_html = '<div class="chip-row">' + "".join(
            f'<span class="chip">{escape(a.get("label", "exhibit"))}</span>' for a in attachments
        ) + "</div>"
    session = ""
    if session_path:
        session = (
            '<div class="session-line">Court session created: '
            f"<strong>{escape(session_path)}</strong> — use Invite to copy.</div>"
        )
    return chip_html + session


# --- Join screen ------------------------------------------------------------


def join_summary(session_path: str | None, case_title: str = "") -> str:
    where = escape(session_path or "/court/pending")
    title = f" The matter on the docket: {escape(case_title)}." if case_title else ""
    return f"""
<article class="surface">
  <div class="surface-pad">
    <h1 class="prompt">You have been summoned.</h1>
    <p class="subprompt">Court session {where} is already in progress.{title}
      Choose your level of involvement.</p>
  </div>
</article>"""


# --- Landing hero docket (a single, rotating faux court record) --------------
# The landing front-loads a strong court record (remaining-work T4) so a first-
# time visitor reads the joke + output format at a glance. It is ONE card that
# rotates through several cases: every docket is stacked into the same grid cell
# and crossfaded with pure CSS, phased apart by a negative animation-delay keyed
# off each card's --k (see the .landing-hero-rotator block in courtroom.css). The
# only piece CSS can't express is the count-dependent crossfade timeline (keyframe
# %s can't be a var()), so it is generated here from the same data and inlined.


def _hero_card(ex: data.LandingExample, k: int) -> str:
    """One faux court record; `--k` is its slot index in the CSS rotation."""
    return f"""
<div class="landing-hero" style="--k:{k}">
  <div class="landing-hero-stamp">{escape(ex.stamp)}</div>
  <div class="landing-hero-head">
    <span class="landing-hero-kicker">Now on the docket</span>
    <span class="landing-hero-case">{escape(ex.case_id)}</span>
  </div>
  <p class="landing-hero-complaint">&ldquo;{escape(ex.complaint)}&rdquo;</p>
  <h2 class="landing-hero-charge">{escape(ex.charge)}</h2>
  <div class="landing-hero-verdict">
    <span class="landing-hero-tag">Verdict</span>{escape(ex.judgement)}
  </div>
  <div class="landing-hero-sentence">
    <span class="landing-hero-tag">Sentence</span>{escape(ex.sentence)}
  </div>
</div>"""


def _rotate_keyframes(n: int, *, fade_pct: float = 6.0) -> str:
    """The count-dependent crossfade timeline (shared `tc-ex-rotate`).

    Each card is opaque for one 1/n slice of the shared cycle and hidden the
    rest; siblings are phased apart by a negative ``animation-delay`` keyed off
    ``--k`` (in courtroom.css), so exactly one shows at a time. The visible-window
    boundary is the only number that depends on n; emit it here. One card needs no
    rotation."""
    if n <= 1:
        return ""
    window = 100.0 / n
    fade = min(fade_pct, window / 3)
    pct = lambda v: f"{round(v, 2):g}%"  # noqa: E731
    return (
        "@keyframes tc-ex-rotate{"
        f"0%{{opacity:0}}{pct(fade)}{{opacity:1}}"
        f"{pct(window - fade)}{{opacity:1}}{pct(window)}{{opacity:0}}"
        "100%{opacity:0}}"
    )


def landing_hero(dockets: list[data.LandingExample] | None = None) -> str:
    """The pinned hero docket: one faux court record that rotates through several
    cases (case → charge → verdict + stamp → sentence). With a single docket it is
    static; with several it crossfades."""
    dockets = dockets or data.LANDING_DOCKETS
    cards = "".join(_hero_card(ex, k) for k, ex in enumerate(dockets))
    keyframes = _rotate_keyframes(len(dockets))
    style = f"<style>{keyframes}</style>" if keyframes else ""
    return (
        '<div class="landing-hero-rotator" id="landingHero" aria-label="Example court record"'
        f' style="--n:{len(dockets)}">{cards}{style}</div>'
    )


# --- Shareable plain text (reused by Copy / Share) --------------------------


def share_text(state: TrialState) -> str:
    v = state.verdict
    return (
        "⚖ Tiny Court of Everyday Crimes\n"
        f"Case: {state.case_title}\n"
        f"Charge: {state.charge}\n"
        f"Verdict: {state.verdict_title} (Confidence: {v.confidence}%)\n"
        f"Sentence: {state.sentence}\n"
        f'Best Quote: "{state.best_quote}"'
    )
