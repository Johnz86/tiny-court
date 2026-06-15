"""Delimited parser tests (docs/adr/0003) — tolerance on malformed input."""

from tinycourt.parsing import parse_delimited


def test_well_formed():
    text = (
        "The court is amused.\n"
        "---\n"
        "CASE_TITLE: The People vs. The Spoon\n"
        "SUSPICION_DELTA: +10\n"
        "DIGNITY_DELTA: -5\n"
    )
    p = parse_delimited(text)
    assert p.ok
    assert p.prose == "The court is amused."
    assert p.get("CASE_TITLE") == "The People vs. The Spoon"
    assert p.deltas["suspicion"] == 10
    assert p.deltas["dignity"] == -5
    assert p.deltas["severity"] == 0  # default when absent


def test_no_fence_but_keys_present():
    text = "PROSECUTOR: The yogurt is gone.\nSUSPICION_DELTA: +7\n"
    p = parse_delimited(text)
    assert p.ok
    assert p.get("PROSECUTOR") == "The yogurt is gone."
    assert p.deltas["suspicion"] == 7


def test_apostrophes_and_quotes_in_prose_do_not_break():
    text = (
        'The defense yells "it wasn\'t me!" dramatically.\n'
        "---\n"
        "DEFENSE: It wasn't me, your honor; gravity did it.\n"
    )
    p = parse_delimited(text)
    assert p.ok
    assert "gravity did it" in p.get("DEFENSE")


def test_malformed_delta_defaults_to_zero():
    text = "---\nSUSPICION_DELTA: a lot, honestly\n"
    p = parse_delimited(text)
    assert p.deltas["suspicion"] == 0


def test_garbage_marks_not_ok():
    p = parse_delimited("just some prose with no structure at all")
    assert not p.ok
    assert p.prose == "just some prose with no structure at all"


def test_empty_marks_not_ok():
    assert not parse_delimited("").ok
    assert not parse_delimited("   \n  ").ok


def test_extra_dashes_count_as_fence():
    p = parse_delimited("prose\n-----\nRULING: SUSTAINED\n")
    assert p.ok
    assert p.get("RULING") == "SUSTAINED"


def test_signed_and_float_numbers():
    p = parse_delimited("---\nSEVERITY_DELTA: +2.5\nDIGNITY_DELTA: -0.5\n")
    assert p.deltas["severity"] == 2.5
    assert p.deltas["dignity"] == -0.5
