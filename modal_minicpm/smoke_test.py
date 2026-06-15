"""Smoke test a deployed Tiny Court Modal llama-server endpoint."""

from __future__ import annotations

import argparse
import json
import sys

import requests


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("chat_url", help="Modal /v1/chat/completions URL")
    parser.add_argument("--model", default="MiniCPM-V-4.6")
    args = parser.parse_args()

    payload = {
        "model": args.model,
        "temperature": 0.2,
        "max_tokens": 160,
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
    response = requests.post(args.chat_url, json=payload, timeout=300)
    print(f"HTTP {response.status_code}")
    print(response.text)
    response.raise_for_status()

    data = response.json()
    content = data["choices"][0]["message"]["content"]
    return 0 if "CHARGE:" in content else 2


if __name__ == "__main__":
    sys.exit(main())

