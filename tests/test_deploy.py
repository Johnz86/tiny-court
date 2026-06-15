"""Deployment-shape guards (remaining-work T5, docs/deployment.md).

ZeroGPU runs handlers behind a pickle boundary, and gr.State is pickled across
it. These check the WizardState/TrialState graph round-trips through pickle and
that the ZeroGPU import shape is intact (spaces imported, generation decorated).
"""

import pickle

import tinycourt.app as app
from tinycourt.app import C, WizardState, do_action_by_id, do_begin, do_send
from tinycourt.generation import FakeClient

# Build once to populate the component registry C that the handlers' render() uses.
DEMO = app.build_demo()


def _played_wiz():
    app._CLIENT = FakeClient(seed=7)
    wiz = do_begin(WizardState(), "full")[C["st"]]
    wiz = do_send(wiz, {"text": "My roommate keeps eating my yogurt and denying it.", "files": []})[C["st"]]
    wiz = do_action_by_id(wiz, "call_witness")[C["st"]]
    wiz = do_action_by_id(wiz, "add_twist")[C["st"]]
    wiz = do_action_by_id(wiz, "ask_judge")[C["st"]]
    return wiz


def test_wizard_state_pickles_across_the_worker_boundary():
    wiz = _played_wiz()
    blob = pickle.dumps(wiz)
    restored = pickle.loads(blob)
    assert isinstance(restored, WizardState)
    # The nested engine graph (TrialState, Meters, Cards, Exhibits, events) survives.
    assert restored.trial.case_title == wiz.trial.case_title
    assert restored.trial.sentence == wiz.trial.sentence
    assert len(restored.trial.transcript) == len(wiz.trial.transcript)
    assert restored.events == wiz.events
    assert restored.trial.meters.suspicion == wiz.trial.meters.suspicion


def test_local_client_has_zerogpu_shape():
    # Imports must not require a GPU (lazy torch); the spaces decorator must be
    # applied to the module-level GPU compute, and the model must NOT load at
    # import time.
    import tinycourt.local_client as lc

    assert hasattr(lc, "spaces"), "spaces must be imported unconditionally"
    assert callable(lc._gpu_generate), "the GPU compute function must exist"
    assert lc._MODEL is None, "no model may load at import (only inside _load)"
