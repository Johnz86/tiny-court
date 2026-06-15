"""Plain data tables for replayability (design-spec §18) and the deterministic
fallback cards used when a model response can't be parsed (docs/adr/0003).

These are intentionally just Python data — judge names, court moods, example
complaints — so reruns feel fresh without any model involvement.
"""

from __future__ import annotations

import random
from dataclasses import dataclass

JUDGE_NAMES = [
    "The Honorable Crumbwell",
    "Hon. Biscuit P. Gavel",
    "Judge Mildred Snifflewax",
    "The Honorable Reginald Teaspoon",
    "Justice Petunia Overcooked",
    "Hon. Bartholomew Fussbudget",
    "Judge Cornelius Dribblesworth",
]

COURT_MOODS = [
    "Gravely unserious",
    "Theatrically exhausted",
    "Suspiciously caffeinated",
    "Reluctantly whimsical",
    "Dramatically impartial",
    "On the verge of a snack",
]

# Tab 2 (design-spec §16) + landing example buttons (§5).
EXAMPLE_COMPLAINTS = [
    "My cat knocked over my coffee and then sat next to it like nothing happened.",
    "My roommate keeps eating my yogurt and pretending it was a misunderstanding.",
    "My printer jammed at the exact moment I needed it most.",
    "My friend said 'I'm five minutes away' and arrived in thirty.",
    "My washing machine produced only one sock.",
    "My coworker microwaved fish in the office kitchen.",
]


# --- Landing "Example Court Chat" dockets ----------------------------------
# The looping showcase on the landing page (design-spec §5). Each entry is one
# fully-resolved tiny trial; render.landing_examples() stacks them and CSS
# rotates between them (no JS). Kept as plain data so the set can be swapped or
# grown later — e.g. seeded from real anonymized court records.


@dataclass(frozen=True)
class LandingExample:
    case_id: str
    complaint: str   # the citizen's grievance (user bubble)
    charge: str      # the filed charge (court bubble)
    judgement: str   # the verdict line (judge bubble)
    sentence: str    # the harmless sentence (sentence bubble)
    stamp: str       # the stamped verdict word, e.g. "Guilty"


# The hero dockets (remaining-work T4): strong, concrete, funny cases the landing
# rotates through as one pinned faux court record, so a first-time visitor gets the
# joke AND the output format at a glance before clicking Begin. The first is the
# lead; the rest rotate in behind it (single card, crossfading — see
# render.landing_hero).
LANDING_DOCKETS: list[LandingExample] = [
    LandingExample(
        case_id="Case #001",
        complaint="He reheated fish in the shared office kitchen. Again.",
        charge="Aggravated Aromatic Assault",
        judgement="Guilty on all counts of olfactory disturbance",
        sentence="One week of desk-side potpourri and a written ode to ventilation.",
        stamp="Guilty",
    ),
    LandingExample(
        case_id="Case #014",
        complaint="My roommate ate the emergency lasagna.",
        charge="Unauthorized Leftover Conversion",
        judgement="Guilty of Lesser Snack Misconduct",
        sentence="Replacement lasagna plus one ceremonial apology to the fridge.",
        stamp="Guilty",
    ),
    LandingExample(
        case_id="Case #027",
        complaint="The cat knocked over my coffee and watched the puddle spread.",
        charge="Reckless Paw Conduct",
        judgement="Guilty, with gravity named as co-conspirator",
        sentence="One replacement coffee and fifteen minutes of tiny criminal allegations.",
        stamp="Guilty",
    ),
    LandingExample(
        case_id="Case #031",
        complaint="A friend said 'five minutes' and arrived in thirty.",
        charge="False ETA in the First Degree",
        judgement="Suspicious beyond calendar reason",
        sentence="Calendar-honesty training and one genuinely punctual apology.",
        stamp="Suspicious",
    ),
]

# Back-compat alias for the lead docket.
LANDING_HERO = LANDING_DOCKETS[0]


def random_judge(rng: random.Random | None = None) -> str:
    return (rng or random).choice(JUDGE_NAMES)


def random_mood(rng: random.Random | None = None) -> str:
    return (rng or random).choice(COURT_MOODS)


# --- Deterministic fallback cards ------------------------------------------
# Returned when a call's output can't be parsed after one retry. Zero delta, so
# the trial stays consistent; mildly funny so the seams don't show.

FALLBACK_BAILIFF = (
    "All rise. The court's stenographer briefly fainted from the drama, so the "
    "record simply states: a grave injustice, allegedly, occurred."
)
FALLBACK_PROSECUTOR = (
    "The prosecution rests on vibes, proximity, and a deep personal conviction "
    "that something snack-adjacent went wrong here."
)
FALLBACK_DEFENSE = (
    "The defense notes that nothing has been proven, that everyone is tired, and "
    "that the real culprit may well be gravity."
)
FALLBACK_JUDGE = "The court will allow it, but only under protest."

FALLBACK_EXHIBIT = {
    "name": "The Unlabeled Item",
    "description": "A piece of evidence the clerk forgot to write down.",
    "relevance": "Mysterious",
    "ruling": "Admitted with a shrug",
}

FALLBACK_REACTION = (
    "Noted for the record. The court raises one eyebrow and awaits further "
    "developments with theatrical patience."
)

FALLBACK_SENTENCE = (
    "The accused must reflect upon their tiny crime and provide one sincere, "
    "slightly dramatic apology at the earliest petty convenience."
)
FALLBACK_BEST_QUOTE = "The court has seen things today it cannot unsee."

FALLBACK_DOCKET = {
    "CASE_TITLE": "The People vs. The Usual Suspect",
    "CHARGE": "Conduct Unbecoming of a Household",
    "SECONDARY_CHARGE": "",
    "ACCUSED": "The Accused",
    "SEVERITY": "Petty but Emotionally Significant",
    "COURT_MOOD": "Gravely unserious",
}

# Plea + revised-closing fallbacks (used when those calls can't be parsed).
FALLBACK_PLEA = (
    "The defense rises, clutches its chest, and offers a plea so heartfelt the "
    "bailiff briefly considers a career change."
)
FALLBACK_REVISED_SENTENCE = (
    "Having heard the plea, the court adjusts its tiny gavel and reissues the "
    "sentence with one extra ounce of theatrical mercy."
)


# --- Comedic confidence + revision phrasing (design-spec §10, interaction §3) ---
# The verdict's Confidence integer is owned by the engine (docs/adr/0001); these
# only dress it up. Keyed by verdict band label (see trial.GUILTY / LESSER / ...).

CONFIDENCE_FLAVOR = {
    "Guilty": "judicial eyebrow certainty",
    "Guilty of a Lesser Pettiness": "fridge-light certainty",
    "Not Guilty": "reasonable-doubt certainty",
}


def confidence_phrase(band: str, confidence: int) -> str:
    """e.g. '72% fridge-light certainty' (interaction spec §3, Fast Judgement)."""
    flavor = CONFIDENCE_FLAVOR.get(band, "procedural side-eye")
    return f"{confidence}% {flavor}"


# Revision markers shown after a plea (interaction spec §5). Picked in the engine
# by comparing band/confidence before vs after the plea.
REVISION_MARKERS = {
    "reduced": "Sentence reduced due to credible household remorse",
    "cleared": "New evidence accepted — suspicion withdrawn",
    "upheld": "Verdict upheld after one dramatic objection",
    "unmoved": "Court remains unimpressed",
    "fairer": "Sentence clarified for household fairness",
}
