"""Trial state and the deterministic verdict engine (docs/adr/0001).

The model proposes meter *deltas*; this module clamps and accumulates them into
the meters and computes the Verdict deterministically from the running totals.
The verdict's "truth" lives here, not in the model — so interactions provably
move the needle (design-spec §6, §8.5) and the whole thing is unit-testable with
synthetic delta sequences, no model required.

    GuiltScore = 0.55·Suspicion + 0.25·EvidenceWeight + 0.20·PettySeverity
    band: <35 Not Guilty · 35–65 Lesser Pettiness · >65 Guilty
    Confidence = (depth into band, %) × (EvidenceWeight / 100) × (Dignity / 100)

Guilt blends two separate questions the court loves to confuse: how guilty the
accused *looks* (Suspicion — vibes) and how much can actually be *proven*
(Evidence Weight — proof). Object! attacks the proof; Submit Evidence builds it;
they stop fighting over the Suspicion bar (the meters brainstorm's Config B).
Confidence then keys off Evidence Weight × Dignity, so a high-suspicion /
low-evidence case yields a guilty-feeling verdict the court openly admits it
cannot *prove* — peak comedy ("Guilty. Confidence: 19%. We just know.").

Three meters are deliberately kept OUT of the guilt math (CONTEXT.md):
  * Dignity scales only Confidence — how seriously to take the ruling.
  * Mercy scales only the SENTENCE — how softly the hammer falls. A leniency
    plea raises Mercy: you stay just as guilty, but the court is gentler. This
    keeps "did they do it" (the band) separate from "how hard is the
    punishment" (the sentence) — the meters brainstorm's Config A.
  * Patience ("His Honor's Last Nerve") paces the trial — it depletes as the
    court sits through chatter, evidence, and objections, and changes nothing
    in the verdict; when it runs out the court declines further idle chatter
    and calls for the ruling (the meters brainstorm's Config D).
"""

from __future__ import annotations

from dataclasses import dataclass, field

# Verdict bands
NOT_GUILTY = "Not Guilty"
LESSER = "Guilty of a Lesser Pettiness"
GUILTY = "Guilty"

# Band edges on the 0–100 GuiltScore axis.
LOWER_EDGE = 35.0
UPPER_EDGE = 65.0

# GuiltScore blend weights (sum to 1.0). Suspicion (the vibes) still dominates,
# Evidence Weight (the proof) is a strong second so Object!/Submit Evidence
# measurably move the band, and Petty Severity keeps nudging the baseline.
SUSPICION_WEIGHT = 0.55
EVIDENCE_WEIGHT = 0.25
SEVERITY_WEIGHT = 0.20

# The roles that speak as *the court* in the glass-phase chat: the react()
# whitelist, the renderer's court-vs-user bubble side, and what the tests /
# verification flow assert against. One set so they cannot drift apart.
COURT_VOICES = {"Judge", "Court Clerk", "Prosecutor"}


def clamp(value: float, lo: float = 0.0, hi: float = 100.0) -> float:
    return max(lo, min(hi, value))


@dataclass
class Meters:
    """The load-bearing meters (CONTEXT.md §Meters)."""

    suspicion: float = 0.0           # 0–100, the vibes; dominates the verdict
    evidence_weight: float = 0.0     # 0–100, the proof; blends into guilt + drives confidence
    petty_severity: float = 0.0      # 0–100, raises the baseline + shapes sentence
    courtroom_dignity: float = 100.0  # starts at 100, only scales Confidence
    mercy: float = 0.0               # 0–100, starts at 0; only softens the sentence
    patience: float = 100.0          # starts at 100, falls with chatter; paces the trial

    # The Case File (Full Trial only — meters brainstorm, Config C). Suspicion is
    # the *vibes*; in a Full Trial it is decomposed into the three legs the court
    # actually reasons about, and Suspicion is recomposed as their mean (see
    # compose_suspicion). In a Quick Trial these stay 0 and Suspicion moves
    # directly, so the dense Case File never clutters the default path.
    means: float = 0.0               # 0–100, could they have done it (the how)
    motive: float = 0.0              # 0–100, did they want to (the why)
    opportunity: float = 0.0         # 0–100, were they positioned to (the when/where)

    def apply(
        self,
        *,
        suspicion: float = 0.0,
        evidence: float = 0.0,
        severity: float = 0.0,
        dignity: float = 0.0,
        mercy: float = 0.0,
        patience: float = 0.0,
        means: float = 0.0,
        motive: float = 0.0,
        opportunity: float = 0.0,
    ) -> None:
        """Accumulate clamped deltas onto the running totals."""
        self.suspicion = clamp(self.suspicion + suspicion)
        self.evidence_weight = clamp(self.evidence_weight + evidence)
        self.petty_severity = clamp(self.petty_severity + severity)
        self.courtroom_dignity = clamp(self.courtroom_dignity + dignity)
        self.mercy = clamp(self.mercy + mercy)
        self.patience = clamp(self.patience + patience)
        self.means = clamp(self.means + means)
        self.motive = clamp(self.motive + motive)
        self.opportunity = clamp(self.opportunity + opportunity)


def compose_suspicion(meters: Meters) -> float:
    """Suspicion as the mean of the three Case File legs (Config C). Used by the
    Full Trial after Means/Motive/Opportunity move, so the headline Suspicion bar
    is provably the sum of its parts — 'your witness established Motive; the needle
    moves'. The band math (resolve_verdict) still just reads meters.suspicion, so
    this only changes how Suspicion is *sourced*, never the verdict formula."""
    return clamp((meters.means + meters.motive + meters.opportunity) / 3.0)


@dataclass(frozen=True)
class Verdict:
    band: str
    confidence: int          # 0–100, integer percent
    guilt_score: float       # the underlying GuiltScore, for display/debug


def guilt_score(meters: Meters) -> float:
    return (
        SUSPICION_WEIGHT * meters.suspicion
        + EVIDENCE_WEIGHT * meters.evidence_weight
        + SEVERITY_WEIGHT * meters.petty_severity
    )


def _band_and_depth(score: float) -> tuple[str, float]:
    """Return the verdict band and how deep into it the score sits, scaled to a
    0–100 confidence-before-dignity figure.

    Each band can reach ~100% at its deepest point: the outer bands run 0–35
    wide, the middle band 0–15 from each edge. Scaling each band's depth against
    its own half-extent keeps confidence comparable across bands.
    """
    if score < LOWER_EDGE:
        depth = LOWER_EDGE - score          # 0 at the edge, 35 at score 0
        return NOT_GUILTY, depth / LOWER_EDGE * 100.0
    if score > UPPER_EDGE:
        depth = score - UPPER_EDGE          # 0 at the edge, 35 at score 100
        return GUILTY, depth / (100.0 - UPPER_EDGE) * 100.0
    # Middle band: nearest edge is whichever boundary is closer.
    half_extent = (UPPER_EDGE - LOWER_EDGE) / 2.0  # 15
    depth = min(score - LOWER_EDGE, UPPER_EDGE - score)
    return LESSER, depth / half_extent * 100.0


def resolve_verdict(meters: Meters) -> Verdict:
    score = guilt_score(meters)
    band, depth_pct = _band_and_depth(score)
    # Confidence keys off proof × composure: how deep into the band we are,
    # scaled by how much was actually proven (Evidence Weight) and how seriously
    # the court can still be taken (Dignity). Thin proof → a verdict the court
    # admits it can't really back up (meters brainstorm, Config B).
    confidence = clamp(
        depth_pct * (meters.evidence_weight / 100.0) * (meters.courtroom_dignity / 100.0)
    )
    return Verdict(band=band, confidence=round(confidence), guilt_score=round(score, 1))


# --- Transcript + full trial state ----------------------------------------


@dataclass
class Card:
    """One styled transcript card spoken by a fixed role (CONTEXT.md §Roles)."""

    role: str   # Judge | Prosecutor | Defense | Witness | Bailiff | Court Clerk
    text: str


@dataclass
class Exhibit:
    label: str          # "Exhibit A"
    name: str
    description: str
    relevance: str
    ruling: str


@dataclass
class TrialState:
    """The single dataclass held in ``gr.State`` for one Quick Trial."""

    complaint: str = ""

    # "quick" (default, ~60–90s) or "full" (power-user, 3–5 min; design-spec §11).
    # Full Trial unlocks the Witness and Twist phases and the Case File
    # decomposition of Suspicion (meters brainstorm, Config C).
    length: str = "quick"

    # Docket (filled by the CASE_OPEN call)
    case_title: str = ""
    charge: str = ""
    secondary_charge: str = ""
    accused: str = ""
    severity_label: str = ""
    court_mood: str = ""
    judge: str = ""

    meters: Meters = field(default_factory=Meters)
    transcript: list[Card] = field(default_factory=list)
    exhibits: list[Exhibit] = field(default_factory=list)

    # Outcome
    sentence: str = ""
    best_quote: str = ""
    reasons: list[str] = field(default_factory=list)
    # Case-specific comedic verdict title written by the closing call (e.g.
    # "Guilty of Reckless Paw Conduct"). Display dressing only — the canonical
    # band in `verdict` stays rule-owned (docs/adr/0001).
    verdict_label: str = ""

    # Flow bookkeeping
    phase: str = "intake"
    objection_used: bool = False
    # The Twist is a once-per-trial surprise complication (CONTEXT.md §Twist);
    # this gates it so the court allows but one (Full Trial, meters brainstorm C).
    twist_used: bool = False
    interaction_done: bool = False
    # Calls whose model output could not be used (parse failed after retry, or
    # generation raised) — the verification flow asserts this stays empty.
    fallbacks: list[str] = field(default_factory=list)

    def add_card(self, role: str, text: str) -> None:
        # The single choke point for every transcript line (model- or canned-).
        # Output-side safety scrub (design-spec §14): a generated line that drifts
        # into real harm / real legal consequence is replaced with a gentle
        # in-character redaction before it can reach any surface. Imported lazily
        # so the verdict engine stays import-light for its unit tests.
        from .safety import scrub_output

        text = scrub_output((text or "").strip())
        if text:
            self.transcript.append(Card(role=role, text=text))

    def next_exhibit_label(self) -> str:
        return f"Exhibit {chr(ord('A') + len(self.exhibits))}"

    @property
    def is_full(self) -> bool:
        """Whether this is a Full Trial (Witness/Twist phases + Case File)."""
        return self.length == "full"

    @property
    def verdict(self) -> Verdict:
        return resolve_verdict(self.meters)

    @property
    def verdict_title(self) -> str:
        """The verdict title shown to the user everywhere (judgement card,
        record, share text): the creative label when present, else the band."""
        return self.verdict_label or self.verdict.band
