"""Prompt builders for each courtroom call.

Every call asks the model for comedic prose, then a ``---`` fence, then flat
``KEY: value`` lines (docs/adr/0003). The verdict band is decided in Python
(docs/adr/0001); the CLOSING call is *told* the band so its reasoning and
sentence match a decision it does not get to make.
"""

from __future__ import annotations

from .generation import CallTag, Message

SYSTEM = """You are the writers' room for the Tiny Court of Everyday Crimes, a \
comedy courtroom that puts petty everyday grievances — snack thefts, suspicious \
pets, object betrayals, minor social crimes among family, friends, roommates, \
and pets — on trial.

VOICE: theatrical, witty, dramatic, slightly bureaucratic, emotionally \
exaggerated, and OPINIONATED — the court has strong feelings about fridge \
etiquette, shared-couch law, and pet accountability, and it loves slipping a \
tiny life lesson about living with other people (and animals) into its rulings. \
The court takes tiny problems with absurd seriousness. Never mean-spirited, \
never actually legalistic, never cruel. Keep every spoken card to 2–4 short \
sentences.

SPECIFICITY: always react to the ACTUAL details of this case — name the snack, \
the pet, the object, the suspicious timing the complainant described. Generic \
courtroom filler is a mistrial.

SAFETY: this is harmless comedy only. Keep real people low-stakes and never \
targeted; recommend a ceremonial apology, never revenge. Never handle abuse, \
violence, self-harm, medical, or real legal matters as comedy.

OUTPUT FORMAT — follow exactly:
1. First write any short comedic prose (optional, one line at most).
2. Then a line containing only three dashes: ---
3. Then flat KEY: value lines, one per line, no JSON, no markdown, no extra \
commentary. Every value fits on its own single line.
Use only the KEYS you are asked for. Meter deltas are signed integers.

Example shape (keys vary per request):
The court inhales sharply.
---
EXHIBIT: The Lid of Betrayal
RULING: Admitted, with one raised eyebrow
SUSPICION_DELTA: +12
DIGNITY_DELTA: -4"""


def _severity_hint(severity: str) -> str:
    return {
        "gentle": "Keep it gentle and warm.",
        "dramatic": "Lean into the drama.",
        "unhinged": "Go unhinged but friendly — never cruel.",
    }.get((severity or "").lower(), "Lean into the drama.")


def _msgs(user: str) -> list[Message]:
    return [Message("system", SYSTEM), Message("user", user)]


def case_open(complaint: str, accused: str = "", severity: str = "dramatic") -> list[Message]:
    accused_line = f"\nThe complainant blames: {accused}." if accused else ""
    user = f"""A citizen submits this Complaint:
\"{complaint}\"{accused_line}

{_severity_hint(severity)} Open a case file. Invent an absurd, specific primary \
charge (and optionally a secondary one), identify the Accused, and set the mood.

Return prose (optional), then ---, then these KEYS:
CASE_TITLE: (e.g. The People vs. The Yogurt Vanisher)
CHARGE: (absurd, specific)
SECONDARY_CHARGE: (optional, may be blank)
ACCUSED:
SEVERITY: (a short funny label, e.g. Petty but Emotionally Significant)
COURT_MOOD: (a short funny label)
JUDGE: (an absurd judge name)
SUSPICION_DELTA: (+0..+50 — how guilty they LOOK (vibes): COMMIT to a read — a \
damning complaint with motive and opportunity starts +35..+50, an ambiguous one \
+15..+30, a flimsy accusation +5..+15; timid mid-range defaults make every trial \
end the same)
EVIDENCE_DELTA: (+10..+60 — how much HARD PROOF the complaint already contains, \
separate from vibes: a caught-red-handed account with receipts is +45..+60, a \
"my gut says it was them" hunch is +10..+25)
SEVERITY_DELTA: (+0..+45 — how dramatically serious the charge is; a beloved \
snack or a sacred household rule deserves more than a misplaced sock)
DIGNITY_DELTA: (0 or small negative)"""
    return _msgs(user)


def arguments(state_summary: str) -> list[Message]:
    user = f"""{state_summary}

The court opens. Write the Bailiff's opening call, the Prosecutor's accusation, \
and the Defense's rebuttal. Each is 2–3 short sentences, in character.

Return prose (optional), then ---, then these KEYS:
BAILIFF:
PROSECUTOR:
DEFENSE:
SUSPICION_DELTA: (small +, the prosecution pressing)
DIGNITY_DELTA: (small negative, the court fraying)"""
    return _msgs(user)


def evidence(state_summary: str, raw_evidence: str) -> list[Message]:
    user = f"""{state_summary}

The complainant submits evidence: \"{raw_evidence}\"

Turn it into one dramatic Exhibit card and have the court rule on it.

Return prose (optional), then ---, then these KEYS:
EXHIBIT: (a dramatic name, e.g. The Lid of Betrayal)
DESCRIPTION: (one sentence)
RELEVANCE: (e.g. Highly suspicious / Moderate / Tenuous)
RULING: (admitted / rejected / admitted with suspicion, with a funny aside)
EVIDENCE_DELTA: (0..+35 — how much PROOF this exhibit puts on the record, in \
EITHER direction: a smoking gun OR a solid alibi is +20..+35, a minor clue \
+8..+18, flimsy +2..+8; only a rejected or irrelevant exhibit is 0)
SUSPICION_DELTA: (-20..+20 — which WAY the exhibit points: incriminating goes \
positive, exculpatory (a clean alibi) goes negative)
DIGNITY_DELTA: (0 or small negative)"""
    return _msgs(user)


def witness(state_summary: str) -> list[Message]:
    """Full Trial: the court summons a witness (Config C).

    A witness speaks to two legs of the Case File — whether the accused WANTED
    to (Motive) and were positioned to (Opportunity) — so its deltas move those
    two legs distinctly, finally giving the Case File real per-leg movement.
    """
    user = f"""{state_summary}

The court summons a WITNESS — often an unlikely one (an object, a pet, or an \
abstraction: The Spoon, The Upstairs Neighbour, Gravity, The Group Chat). Write \
the witness's short Testimony, in character, reacting to THIS case's specific \
details.

A witness speaks to two things: did the accused have a reason (Motive) and were \
they positioned to do it (Opportunity). Move those two legs of the Case File.

Return prose (optional), then ---, then these KEYS:
WITNESS: (the witness's name/identity, e.g. The Spoon, The Upstairs Neighbour, Gravity)
TESTIMONY: (2–3 short sentences of testimony, in character, citing a specific case detail)
MOTIVE_DELTA: (+5..+25 — how much the testimony establishes the accused WANTED to do it)
OPPORTUNITY_DELTA: (+5..+25 — how much it places them at the scene, positioned to act)
DIGNITY_DELTA: (small negative — a testifying spoon costs the court its composure)"""
    return _msgs(user)


def cross_examine(state_summary: str, question: str = "") -> list[Message]:
    """Full Trial: the Defense cross-examines the witness (Config C).

    Cross-examination SHAKES the legs the witness established — usually weakening
    Motive/Opportunity, but it can backfire and strengthen them.
    """
    asked = (
        f'\nThe complainant\'s cross-examination: "{question}"'
        if (question or "").strip()
        else "\nThe Defense cross-examines on its own initiative."
    )
    user = f"""{state_summary}
{asked}

Write the Defense's pointed cross-examination question and the Witness's \
flustered answer. Cross-examination SHAKES the witness — it usually weakens what \
they established, but a clumsy question can backfire and strengthen it.

Return prose (optional), then ---, then these KEYS:
DEFENSE: (the cross-examination question, in character, pressing on a specific detail)
WITNESS: (the witness's answer — flustered, evasive, or defiant, in character)
MOTIVE_DELTA: (-15..+10 — negative if the cross undermines the motive, positive if it backfires)
OPPORTUNITY_DELTA: (-15..+10 — negative if it shakes their presence at the scene, positive if it backfires)
DIGNITY_DELTA: (small negative — cross-examination is chaos)"""
    return _msgs(user)


def twist(state_summary: str) -> list[Message]:
    """Full Trial: a once-per-trial surprise complication (CONTEXT.md §Twist).

    A twist meaningfully SWINGS the Case File — it can raise *or* lower any of
    the three legs — and may reshape how serious the charge looks.
    """
    user = f"""{state_summary}

The court introduces a TWIST — a single surprise complication that reframes the \
case: a sudden confession, a surprise second witness, a discovered receipt, an \
alibi that collapses, a co-conspirator unmasked. Make it specific to THIS case \
and genuinely funny.

A twist meaningfully SWINGS the Case File — it can raise OR lower any of the \
three legs (Means/Motive/Opportunity) — and may change how serious the charge \
now looks (Severity).

Return prose (optional), then ---, then these KEYS:
TWIST: (the dramatic complication, 2–3 sentences, in character, citing a specific case detail)
MEANS_DELTA: (-25..+25 — how the twist changes whether they COULD have done it)
MOTIVE_DELTA: (-25..+25 — how it changes whether they WANTED to)
OPPORTUNITY_DELTA: (-25..+25 — how it changes whether they were positioned to)
SEVERITY_DELTA: (-15..+15 — how much graver or sillier the charge now looks)
DIGNITY_DELTA: (negative — a twist is pure chaos)"""
    return _msgs(user)


def objection(state_summary: str, last_statement: str) -> list[Message]:
    user = f"""{state_summary}

The most recent statement was:
\"{last_statement}\"

The complainant shouts \"Objection!\" Write the Defense's dramatic objection \
(hearsay, speculation, excessive drama, snack-based prejudice, etc.), then the \
Judge SUSTAINS or OVERRULES it.

Return prose (optional), then ---, then these KEYS:
DEFENSE: (the objection)
JUDGE: (the ruling, in character)
RULING: (exactly SUSTAINED or OVERRULED)
SUSPICION_DELTA: (negative if SUSTAINED ~ -15..-25, small positive if OVERRULED)
EVIDENCE_DELTA: (a SUSTAINED objection discredits proof, ~ -15..-25; an \
OVERRULED one lets it stand, small positive 0..+8)
DIGNITY_DELTA: (small negative — objections are chaos)"""
    return _msgs(user)


def plea(state_summary: str, plea_type: str, plea_text: str) -> list[Message]:
    """The accused enters a plea (innocent / leniency / evidence appeal).

    Interaction spec §4. The plea moves the meters; Python still owns the band.
    """
    framing = {
        "innocent": "The accused pleads INNOCENT and offers one dramatic defense.",
        "leniency": "The accused throws themselves upon the court's mercy and asks for LENIENCY.",
        "evidence": "The accused appeals with NEW EVIDENCE or suspicious context.",
    }.get((plea_type or "").lower(), "The accused enters a plea.")
    said = f'\nThey say: "{plea_text}"' if (plea_text or "").strip() else ""
    user = f"""{state_summary}

{framing}{said}

Write the court's response in character, then rule on the plea.

A mercy plea does NOT argue innocence — it asks the court to be gentle. So it
moves MERCY, not suspicion: the accused stays exactly as guilty, but a moving
plea earns a softer sentence.

Return prose (optional), then ---, then these KEYS:
PLEA_RESPONSE: (the Defense/accused's plea in 2–3 sentences, in character)
RULING: (exactly ACCEPTED, PARTIAL, or REJECTED)
MERCY_DELTA: (+8..+30 if the plea is moving/credible, +0..+5 if it falls flat — \
COMMIT: a tearful, specific, remorseful plea earns real mercy; a smug or generic \
one earns almost none)
DIGNITY_DELTA: (small negative — pleas are theatrical chaos)"""
    return _msgs(user)


def reaction(state_summary: str, phase: str, user_text: str) -> list[Message]:
    """One short in-character court reply to a single chat message.

    Keeps the glass phases conversational: every composer send gets an
    immediate, specific reaction (wizard interaction spec — the court is
    *talking* in these phases). Small deltas only; the big moves belong to the
    dedicated evidence/objection/plea calls.
    """
    framing = {
        "case": (
            "The complainant adds a detail to their Complaint. React to THAT "
            "detail as the Court Clerk or the Prosecutor (pick whichever is "
            "funnier here): acknowledge it into the record with an opinion, and "
            "if something obvious is missing (who, what snack, what time), nudge "
            "for exactly one more incriminating detail."
        ),
        "evidence": (
            "A participant speaks during the evidence phase. React as the Court "
            "Clerk or the Judge: weigh the detail aloud with an opinion about "
            "what it suggests."
        ),
        "plea": (
            "The accused argues their plea. React as the Judge: visibly moved, "
            "skeptical, or both, referencing their exact argument. Do not rule "
            "yet — the formal ruling comes later."
        ),
        "witness": (
            "A participant questions the witness. React as the Judge or the "
            "Court Clerk: weigh what the testimony just established, with an "
            "opinion, referencing the specific detail raised."
        ),
        "twist": (
            "A participant reacts to the twist that just landed. React as the "
            "Judge or the Court Clerk: absorb the new complication aloud, with an "
            "opinion about what it changes for the case."
        ),
    }.get(phase, "React in character to the message, briefly.")
    user = f"""{state_summary}

The latest message from the participant:
\"{user_text}\"

{framing} One reply only, 1–3 short sentences.

Return prose (optional), then ---, then these KEYS:
ROLE: (exactly one of: Court Clerk, Prosecutor, Judge)
TEXT: (the reply, in character, reacting to the specific detail)
SUSPICION_DELTA: (-6..+8, how this detail moves the case)
DIGNITY_DELTA: (0 or -1..-3)"""
    return _msgs(user)


# The "Fairer" action's marker_hint for revised_closing: keep the verdict, make
# the sentence fair to the whole household. Its UI banner copy is
# data.REVISION_MARKERS["fairer"]; both live as one keyed pair so they can't drift.
FAIRNESS_HINT = (
    "Sentence clarified for household fairness — keep the verdict, "
    "restate the sentence so it is fair to everyone involved, "
    "explicitly banning revenge, gloating, and group-chat trials"
)


def revised_closing(state_summary: str, band: str, marker_hint: str = "") -> list[Message]:
    """Re-close the case after a plea (wizard ``revisedJudgement``).

    Like :func:`closing`, but acknowledges that the verdict was reconsidered, so
    the reasoning and sentence reflect the change. Python still owns ``band``.
    """
    hint = f"\nThe change to announce is roughly: {marker_hint}." if marker_hint else ""
    user = f"""{state_summary}

After hearing a plea, the court has RE-REACHED its verdict: {band}. Do not change \
it. Write a brief revised closing that proves the court listened: the reasons and \
sentence must visibly respond to what the accused argued.{hint}

Return prose (optional), then ---, then these KEYS:
VERDICT_LABEL: (a creative, case-specific verdict title that AGREES with the \
revised {band} verdict — name this case's crime, never contradict the band)
REASON_1: (one short sentence justifying the revised {band} verdict, citing a specific case detail)
REASON_2: (another, referencing the plea itself)
REASON_3: (optional third, may be blank)
SENTENCE: (harmless, funny, doable; name the Accused and the actual crime details; \
the higher the court's Mercy meter, the gentler this sentence should be — soften \
the obligations to match it — and end with a tiny life lesson about living together)
BEST_QUOTE: (the single funniest line from this trial, quoted)
CHANGE_MARKER: (a short label, e.g. Sentence reduced / Verdict upheld / New evidence accepted)
SUSPICION_DELTA: 0
DIGNITY_DELTA: (0 or small negative)"""
    return _msgs(user)


def closing(state_summary: str, band: str) -> list[Message]:
    user = f"""{state_summary}

The court has ALREADY reached its verdict: {band}. Do not change it. Write a \
closing that fits this verdict and THIS case — every reason must cite a specific \
detail from the Complaint, the exhibits, or the testimony above.

Return prose (optional), then ---, then these KEYS:
VERDICT_LABEL: (a creative, case-specific verdict title that AGREES with the \
{band} verdict — e.g. "Guilty of Reckless Paw Conduct", "Guilty of a Lesser \
Snack Pettiness", "Acquitted of All Dairy Charges"; name this case's crime, \
never contradict the band)
REASON_1: (one short sentence justifying the {band} verdict, citing a specific case detail)
REASON_2: (another, citing a different detail)
REASON_3: (optional third, may be blank)
SENTENCE: (harmless, funny, doable; name the Accused and the actual objects/snacks/\
pets involved; 1–3 small comedic obligations ending with a tiny life lesson about \
living with family, friends, or pets — never cruel, never real punishment)
BEST_QUOTE: (the single funniest line from this trial, quoted)
SUSPICION_DELTA: 0
DIGNITY_DELTA: (0 or small negative)"""
    return _msgs(user)


def classify(complaint: str) -> list[Message]:
    """Safety/coherence classifier (docs/adr/0004). Strict, terse output."""
    system = """You are a strict intake classifier for a comedy courtroom that \
only handles petty, harmless, everyday grievances. You do not write comedy here \
— you only classify. Respond with exactly two lines:
VERDICT: one of OK, SERIOUS, INCOHERENT
REASON: a few words.

SERIOUS = anything genuinely dangerous, violent, abusive, self-harm, medical, \
or a real legal matter. INCOHERENT = you cannot identify any accused party or \
any tiny crime. OK = a petty everyday grievance suitable for harmless comedy."""
    user = f'Classify this Complaint:\n"{complaint}"'
    return [Message("system", system), Message("user", user)]


# Convenience: which builder for which tag (used by tests/harness).
BUILDERS = {
    CallTag.CASE_OPEN: case_open,
    CallTag.ARGUMENTS: arguments,
    CallTag.EVIDENCE: evidence,
    CallTag.WITNESS: witness,
    CallTag.CROSS: cross_examine,
    CallTag.TWIST: twist,
    CallTag.OBJECTION: objection,
    CallTag.PLEA: plea,
    CallTag.REACTION: reaction,
    CallTag.CLOSING: closing,
    CallTag.REVISED_CLOSING: revised_closing,
    CallTag.CLASSIFY: classify,
}
