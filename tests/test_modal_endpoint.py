"""Opt-in live checks for the Modal MiniCPM OpenAI-compatible endpoint.

Run the protected-endpoint smoke check with:

    uv run --env-file .env pytest -m modal_live tests/test_modal_endpoint.py

The tests expect Modal proxy auth by default because the endpoint is deployed
with `requires_proxy_auth=True`. For a pre-auth public-baseline check, set
`TINYCOURT_EXPECT_MODAL_PROXY_AUTH=0` in `.env`. Normal pytest runs deselect this
file because the `modal_live` marker is excluded by default in pyproject.toml.
"""

from __future__ import annotations

import os
from typing import Any

import pytest
import requests


pytestmark = [pytest.mark.integration, pytest.mark.modal_live]


def _env(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        pytest.fail(f"{name} must be set for Modal endpoint integration tests")
    return value


def _enabled() -> bool:
    return os.environ.get("TINYCOURT_RUN_MODAL_INTEGRATION") == "1"


def _expect_proxy_auth() -> bool:
    value = os.environ.get("TINYCOURT_EXPECT_MODAL_PROXY_AUTH", "1").lower()
    return value in {"1", "true", "yes", "y"}


def _payload() -> dict[str, Any]:
    return {
        "model": os.environ.get("TINYCOURT_MODAL_MODEL", "MiniCPM-V-4.6"),
        "temperature": 0.2,
        "max_tokens": 96,
        "messages": [
            {
                "role": "system",
                "content": "Return only the answer. Do not show reasoning.",
            },
            {
                "role": "user",
                "content": (
                    "Write a Tiny Court charge for a roommate who used the last "
                    "clean mug. Include a --- delimiter and CHARGE: field."
                ),
            },
        ],
    }


def _image_payload() -> dict[str, Any]:
    # 1x1 transparent PNG. Small enough for a fast live endpoint contract test.
    tiny_png = (
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8"
        "/x8AAwMCAO+/p9sAAAAASUVORK5CYII="
    )
    return {
        "model": os.environ.get("TINYCOURT_MODAL_MODEL", "MiniCPM-V-4.6"),
        "temperature": 0.2,
        "max_tokens": 128,
        "messages": [
            {
                "role": "system",
                "content": (
                    "Return only a Tiny Court delimited response. Do not use markdown. "
                    "Do not show reasoning."
                ),
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/png;base64,{tiny_png}"},
                    },
                    {
                        "type": "text",
                        "text": (
                            "Inspect this uploaded image as evidence in Tiny Court. "
                            "Return exactly this field format:\n"
                            "---\n"
                            "EXHIBIT: <dramatic exhibit name>\n"
                            "DESCRIPTION: <one sentence>\n"
                            "RELEVANCE: <short relevance>\n"
                            "RULING: <admitted or rejected>"
                        ),
                    },
                ],
            },
        ],
    }


def _auth_headers() -> dict[str, str]:
    return {
        "Modal-Key": _env("TINYCOURT_MODAL_KEY"),
        "Modal-Secret": _env("TINYCOURT_MODAL_SECRET"),
    }


@pytest.fixture(scope="module")
def chat_url() -> str:
    if not _enabled():
        pytest.skip("set TINYCOURT_RUN_MODAL_INTEGRATION=1 to run live Modal tests")
    value = os.environ.get("TINYCOURT_MODAL_CHAT_URL") or os.environ.get("MODAL_CHAT_URL")
    if not value:
        pytest.fail(
            "TINYCOURT_MODAL_CHAT_URL or MODAL_CHAT_URL must be set for Modal "
            "endpoint integration tests"
        )
    return value


def test_modal_endpoint_without_proxy_headers_matches_expected_policy(chat_url: str) -> None:
    response = requests.post(chat_url, json=_payload(), timeout=60)

    if _expect_proxy_auth():
        assert response.status_code in {401, 403}
    else:
        assert response.status_code == 200, response.text


def test_modal_endpoint_accepts_proxy_auth_when_credentials_are_configured(
    chat_url: str,
) -> None:
    if not os.environ.get("TINYCOURT_MODAL_KEY") and not os.environ.get(
        "TINYCOURT_MODAL_SECRET"
    ):
        pytest.skip("set TINYCOURT_MODAL_KEY/SECRET to test authenticated access")

    response = requests.post(
        chat_url,
        json=_payload(),
        headers=_auth_headers(),
        timeout=float(os.environ.get("TINYCOURT_MODAL_TIMEOUT", "300")),
    )

    assert response.status_code == 200, response.text
    data = response.json()
    content = data["choices"][0]["message"].get("content", "")
    assert "CHARGE:" in content


def test_modal_endpoint_accepts_image_evidence_content(chat_url: str) -> None:
    response = requests.post(
        chat_url,
        json=_image_payload(),
        headers=_auth_headers(),
        timeout=float(os.environ.get("TINYCOURT_MODAL_TIMEOUT", "300")),
    )

    assert response.status_code == 200, response.text
    data = response.json()
    content = data["choices"][0]["message"].get("content", "")
    assert "EXHIBIT:" in content
