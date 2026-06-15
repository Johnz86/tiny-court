"""Verdict engine tests (docs/adr/0001) — no model involved."""

from pytest import approx

from tinycourt.trial import (
    GUILTY,
    LESSER,
    NOT_GUILTY,
    Meters,
    compose_suspicion,
    guilt_score,
    resolve_verdict,
)


def test_meters_clamp_to_0_100():
    m = Meters()
    m.apply(suspicion=140, dignity=-250)
    assert m.suspicion == 100
    assert m.courtroom_dignity == 0
    m.apply(suspicion=-500)
    assert m.suspicion == 0


def test_guilt_score_weighting():
    # 0.55*Suspicion + 0.25*EvidenceWeight + 0.20*PettySeverity
    assert guilt_score(Meters(suspicion=100)) == approx(55)
    assert guilt_score(Meters(evidence_weight=100)) == approx(25)
    assert guilt_score(Meters(petty_severity=100)) == approx(20)
    assert guilt_score(Meters(suspicion=100, evidence_weight=100, petty_severity=100)) == approx(100)


def test_band_boundaries():
    # score < 35 -> Not Guilty
    assert resolve_verdict(Meters(suspicion=20, evidence_weight=20, petty_severity=20)).band == NOT_GUILTY  # 20
    # 35..65 -> Lesser Pettiness
    assert resolve_verdict(Meters(suspicion=60, evidence_weight=60, petty_severity=60)).band == LESSER  # 60
    # > 65 -> Guilty
    assert resolve_verdict(Meters(suspicion=100, evidence_weight=100, petty_severity=80)).band == GUILTY  # 96


def test_evidence_weight_blends_into_guilt_and_can_flip_the_band():
    # Evidence Weight is part of the band now (Config B): building proof on a
    # borderline case can drag it up a band, so Submit Evidence measurably moves
    # the verdict — not just the confidence.
    m = Meters(suspicion=40, evidence_weight=10, petty_severity=30)  # score 30.5 -> Not Guilty
    assert resolve_verdict(m).band == NOT_GUILTY
    m.apply(evidence=60)  # a smoking-gun exhibit lands
    assert resolve_verdict(m).band == LESSER  # score 45.5


def test_confidence_keys_off_evidence_times_dignity():
    # Confidence = depth% × (EvidenceWeight/100) × (Dignity/100). Pin the exact
    # figure so the formula (and the Evidence factor in it) can't drift.
    m = Meters(suspicion=100, evidence_weight=50, petty_severity=100, courtroom_dignity=100)
    # guilt 87.5 -> Guilty; depth into the >65 band = (87.5-65)/35*100 = 64.29
    # confidence = 64.29 × 0.50 × 1.0 = 32
    assert resolve_verdict(m).band == GUILTY
    assert resolve_verdict(m).confidence == 32


def test_thin_evidence_yields_a_guilty_verdict_the_court_cannot_prove():
    # The headline Config B joke: same Guilty band, but almost no confidence when
    # the proof is thin — "Guilty. Confidence: 3%. We just know."
    thin = Meters(suspicion=100, evidence_weight=10, petty_severity=80, courtroom_dignity=100)
    proven = Meters(suspicion=100, evidence_weight=90, petty_severity=80, courtroom_dignity=100)
    vt, vp = resolve_verdict(thin), resolve_verdict(proven)
    assert vt.band == vp.band == GUILTY
    assert vt.confidence < 10 < vp.confidence


def test_dignity_scales_confidence_not_guilt():
    # Hold Evidence Weight at full so Dignity is the only varying confidence factor.
    high = Meters(suspicion=100, evidence_weight=100, petty_severity=100, courtroom_dignity=100)
    low = Meters(suspicion=100, evidence_weight=100, petty_severity=100, courtroom_dignity=40)
    vh, vl = resolve_verdict(high), resolve_verdict(low)
    # Same guilt/band, lower confidence when the court lost its dignity.
    assert vh.band == vl.band == GUILTY
    assert vl.confidence < vh.confidence
    # 40% dignity scales confidence to 40% of the full-dignity figure.
    assert vl.confidence == round(vh.confidence * 0.4)


def test_confidence_zero_on_band_edge():
    # GuiltScore exactly 35 sits on the edge -> zero depth -> 0% confidence,
    # even with full proof.
    v = resolve_verdict(Meters(suspicion=40, evidence_weight=40, petty_severity=15))  # score 35
    assert v.confidence == 0


def test_sustained_objection_can_flip_band():
    # A borderline-guilty case that a sustained objection (Suspicion + Evidence
    # both down) drags down a band.
    m = Meters(suspicion=80, evidence_weight=60, petty_severity=40)  # score 67 -> Guilty
    assert resolve_verdict(m).band == GUILTY
    m.apply(suspicion=-20, evidence=-18)  # sustained objection
    assert resolve_verdict(m).band in (LESSER, NOT_GUILTY)


def test_mercy_does_not_change_guilt_or_band():
    # Mercy is a sentence-only axis (meters brainstorm, Config A): raising it must
    # leave GuiltScore and the band identical — only the sentence softens.
    base = Meters(suspicion=80, evidence_weight=60, petty_severity=40)  # score 67 -> Guilty
    merciful = Meters(suspicion=80, evidence_weight=60, petty_severity=40, mercy=100)
    assert guilt_score(base) == guilt_score(merciful)
    assert resolve_verdict(base).band == resolve_verdict(merciful).band == GUILTY
    assert resolve_verdict(base).confidence == resolve_verdict(merciful).confidence


def test_mercy_accumulates_and_clamps():
    m = Meters()
    m.apply(mercy=18)
    assert m.mercy == 18
    m.apply(mercy=200)
    assert m.mercy == 100  # clamped to 100
    m.apply(mercy=-500)
    assert m.mercy == 0     # clamped to 0


def test_evidence_weight_accumulates_and_clamps():
    m = Meters()
    m.apply(evidence=40)
    assert m.evidence_weight == 40
    m.apply(evidence=200)
    assert m.evidence_weight == 100  # clamped to 100
    m.apply(evidence=-500)
    assert m.evidence_weight == 0     # clamped to 0


def test_patience_does_not_change_guilt_or_band():
    # Patience (meters brainstorm, Config D) paces the trial; it must never touch
    # GuiltScore, the band, or Confidence.
    base = Meters(suspicion=80, evidence_weight=60, petty_severity=40)        # score 67 -> Guilty
    impatient = Meters(suspicion=80, evidence_weight=60, petty_severity=40, patience=0)
    assert guilt_score(base) == guilt_score(impatient)
    assert resolve_verdict(base).band == resolve_verdict(impatient).band == GUILTY
    assert resolve_verdict(base).confidence == resolve_verdict(impatient).confidence


def test_patience_starts_full_and_clamps():
    m = Meters()
    assert m.patience == 100  # His Honor starts patient
    m.apply(patience=-130)
    assert m.patience == 0     # clamped to 0, never negative


def test_compose_suspicion_is_the_mean_of_the_case_file():
    # Config C: Suspicion is the mean of Means/Motive/Opportunity, clamped 0–100.
    assert compose_suspicion(Meters(means=30, motive=60, opportunity=90)) == 60
    assert compose_suspicion(Meters(means=0, motive=0, opportunity=0)) == 0
    assert compose_suspicion(Meters(means=100, motive=100, opportunity=100)) == 100


def test_case_file_legs_accumulate_and_clamp():
    m = Meters()
    m.apply(means=30, motive=20, opportunity=50)
    assert (m.means, m.motive, m.opportunity) == (30, 20, 50)
    m.apply(means=200, motive=-500, opportunity=80)
    assert (m.means, m.motive, m.opportunity) == (100, 0, 100)


def test_synthetic_delta_sequence():
    m = Meters()
    for s, ev, sev, dig in [(30, 40, 25, -5), (10, 0, 0, -8), (18, 22, 0, -4), (-20, -18, 0, -6)]:
        m.apply(suspicion=s, evidence=ev, severity=sev, dignity=dig)
    assert m.suspicion == 38
    assert m.evidence_weight == 44
    assert m.petty_severity == 25
    assert m.courtroom_dignity == 77
    v = resolve_verdict(m)
    assert 0 <= v.confidence <= 100
