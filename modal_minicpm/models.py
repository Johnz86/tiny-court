"""MiniCPM model choices for the Modal llama.cpp backend.

The field guide rewards MiniCPM usage and llama.cpp usage separately. Keep this
registry explicit so the final README can describe exactly which OpenBMB model is
running and which fallbacks were considered.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class MiniCPMModel:
    key: str
    served_model: str
    repo_id: str
    model_file: str
    approx_params_b: float
    modality: str
    why: str
    mmproj_file: str | None = None
    context_size: int = 4096
    gpu: str = "T4"


MINICPM_MODELS: dict[str, MiniCPMModel] = {
    "minicpm-v-4.6-q4": MiniCPMModel(
        key="minicpm-v-4.6-q4",
        served_model="MiniCPM-V-4.6",
        repo_id="openbmb/MiniCPM-V-4.6-gguf",
        model_file="MiniCPM-V-4_6-Q4_K_M.gguf",
        approx_params_b=1.3,
        modality="vision-language",
        why=(
            "Primary final-day target: latest small OpenBMB VLM, Tiny Titan "
            "eligible by parameter count, and the model card documents "
            "llama-server usage directly."
        ),
        mmproj_file="mmproj-model-f16.gguf",
    ),
    "minicpm-v-4-q4": MiniCPMModel(
        key="minicpm-v-4-q4",
        served_model="MiniCPM-V-4",
        repo_id="openbmb/MiniCPM-V-4-gguf",
        model_file="ggml-model-Q4_K_M.gguf",
        approx_params_b=4.0,
        modality="vision-language",
        why=(
            "Fallback if the 4.6 GGUF filename or runtime support moves. Still "
            "keeps the app at the Tiny Titan boundary."
        ),
        mmproj_file="mmproj-model-f16.gguf",
    ),
    "minicpm-v-4.5-q4": MiniCPMModel(
        key="minicpm-v-4.5-q4",
        served_model="MiniCPM-V-4.5",
        repo_id="openbmb/MiniCPM-V-4_5-gguf",
        model_file="MiniCPM-V-4_5-Q4_K_M.gguf",
        approx_params_b=8.0,
        modality="vision-language",
        why=(
            "Quality fallback for vision evidence if Tiny Titan is no longer "
            "the priority. This exceeds 4B, so do not claim Tiny Titan with it."
        ),
        mmproj_file="mmproj-model-f16.gguf",
        gpu="L4",
    ),
}


DEFAULT_MODEL_KEY = "minicpm-v-4.6-q4"


def model_for_key(key: str | None) -> MiniCPMModel:
    if not key:
        return MINICPM_MODELS[DEFAULT_MODEL_KEY]
    try:
        return MINICPM_MODELS[key]
    except KeyError as exc:
        known = ", ".join(sorted(MINICPM_MODELS))
        raise ValueError(f"unknown MiniCPM model key {key!r}; expected one of: {known}") from exc
