"""Example farm-sensor federated learning workflow stub.

This placeholder demonstrates how local farm nodes can build update payloads
without exposing raw sensor records.
"""

from dataclasses import dataclass
from typing import Dict, List


@dataclass
class FarmUpdate:
    region: str
    model_delta: List[float]
    tpm_attested: bool


def build_local_update(region: str, values: List[float]) -> FarmUpdate:
    # In production, this should include DP clipping/noise and signature metadata.
    delta = [round(v * 0.01, 6) for v in values]
    return FarmUpdate(region=region, model_delta=delta, tpm_attested=True)


def summarize_update(update: FarmUpdate) -> Dict[str, object]:
    return {
        "region": update.region,
        "delta_len": len(update.model_delta),
        "tpm_attested": update.tpm_attested,
    }


if __name__ == "__main__":
    sample = build_local_update("EU", [123.4, 98.1, 102.7, 88.9])
    print(summarize_update(sample))
