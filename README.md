# Sovereign Mohawk Agriculture Global

Privacy-preserving AI for global agriculture and farming.

Sovereign Mohawk Agriculture Global enables policy-gated federated learning across farms, co-ops, and regional operators while preserving full farmer data sovereignty. It extends the Sovereign Mohawk ecosystem from foundation and scale to food security and climate resilience.

## Tagline

Sovereign Mohawk Agriculture Global: every farm keeps full data sovereignty while contributing to planetary-scale AI for sustainable yields, climate resilience, pest and disease detection, soil health, and precision resource management.

## Ecosystem

Core repositories:

- [Sovereign-Mohawk-Proto](https://github.com/rwilliamspbg-ops/Sovereign-Mohawk-Proto)
- [Sovereign_Map_Federated_Learning](https://github.com/rwilliamspbg-ops/Sovereign_Map_Federated_Learning)
- [Sovereign_Mohawk_Oncology_Global](https://github.com/rwilliamspbg-ops/Sovereign_Mohawk_Oncology_Global)
- [Sovereign_Mohawk_Agriculture_Global](https://github.com/rwilliamspbg-ops/Sovereign_Mohawk_Agriculture_Global)
- [Sovereign_Mohawk_Climate_Global](https://github.com/rwilliamspbg-ops/Sovereign_Mohawk_Climate_Global)
- [Sovereign_Mohawk_SupplyChain_Global](https://github.com/rwilliamspbg-ops/Sovereign_Mohawk_SupplyChain_Global)

Canonical architecture and shared execution plans:

- [docs/ECOSYSTEM_ARCHITECTURE.md](docs/ECOSYSTEM_ARCHITECTURE.md)
- [docs/UNIFIED_PHASE2_MILESTONES.md](docs/UNIFIED_PHASE2_MILESTONES.md)
- [docs/GOVERNANCE_PR_ONLY.md](docs/GOVERNANCE_PR_ONLY.md)
- [docs/ACTION_PINNING_POLICY.md](docs/ACTION_PINNING_POLICY.md)
- [docs/PRODUCTION_DATA_PLANE_PLAN.md](docs/PRODUCTION_DATA_PLANE_PLAN.md)

## Core Purpose

- Federated learning across millions of edge nodes (tractors, drones, IoT sensors, weather stations, and satellite-derived field data) without centralizing sensitive farm data.
- Preserve farmer ownership of raw data (yields, soil scans, machinery telemetry, and proprietary farm practices).
- Enforce policy-gated model updates with Mohawk Protocol controls: BFT, zk-SNARK verification, TPM attestation, and PQC-ready transport.
- Deliver an interactive geospatial dashboard with farm-region layering and operational telemetry.
- Provide compliance automation for cross-border agricultural data governance.

## Ecosystem Positioning

This repository is the agriculture flagship in the progression:

Proto (foundation) -> Map (scalable FL engine) -> Oncology (healthcare) -> Agriculture (food security and climate).

## Key Features

### 1) Policy-Gated Federated Learning

- Flower security wrapper with signed-update policy enforcement.
- Mohawk streaming aggregation profile for high-scale rounds.
- Poisoning detection, differential privacy controls, and secure aggregation guardrails.

### 2) Geospatial Farm Intelligence Dashboard

- Continent -> country -> cooperative region drill-down simulation.
- Crop-intelligence and yield-convergence visualizations.
- Soil health and climate risk overlays.
- FL pipeline, node health, tokenomics telemetry, and compliance scorecards.

### 3) Compliance and Data Sovereignty Toolkit

- Agriculture control mapping (EU CAP-aligned handling, USDA-oriented privacy constraints, GDPR-style controls for farm-linked data).
- DPIA-style templates for farm data processing flows.
- Consent and regional policy engine patterns.

### 4) LLM Governance Workflow for Farmers and Operators

- Safe prompt and audit workflow templates for agronomic insights.
- Governance checklist before model-assisted recommendations.
- Threat-model lens tuned for ag-sector adversaries and supply-chain manipulation.

### 5) Incentives and Tokenomics

- MHC utility incentive model for honest FL contributions.
- Contribution-aware telemetry and operator scorecards.

## Repository Layout

- `index.html`: dashboard entry point.
- `app.js`: dashboard logic, geospatial simulation, telemetry views.
- `styles.css`: visual theme and responsive layout.
- `manifesto.html`: agriculture edition manifesto.
- `flower_security_wrapper/`: policy wrapper templates.
- `docs/`: beta release, compliance evidence, manifesto, roadmap.
- `scripts/`: artifact capture and utility scripts.
- `examples/`: example farm sensor FL workflows.
- `.github/workflows/`: static site deployment workflow.

## Quick Start

Serve the dashboard locally:

```bash
cd Sovereign_Mohawk_Agriculture_Global
python3 -m http.server 8080
```

Then open:

- http://localhost:8080/

### Sprint-1 Full Local Stack (Dashboard + Mock API)

```bash
docker compose -f docker-compose.mock.yml up
```

Dashboard:

- http://localhost:8080/

Mock API:

- http://localhost:8088/healthz

## Suggested Next Integration Steps

1. Copy policy and streaming aggregation adapters from Map and Oncology wrappers.
2. Wire live metrics endpoints to Prometheus/Grafana sources.
3. Connect compliance controls to production policy definitions.
4. Add CI quality gates (lint/test/security/performance) mirroring ecosystem standards.

## Phase 2 Integration (Live Endpoint Wiring)

The dashboard now supports live endpoint integration with simulation fallback.

Default endpoint targets:

- `/api/agri/stats`
- `/api/agri/regions`
- `/api/agri/pipeline`
- `/api/agri/risk`
- `/api/agri/health`

You can override endpoints by setting `window.AGRI_DASHBOARD_CONFIG` before loading `app.js`.

Example:

```html
<script>
	window.AGRI_DASHBOARD_CONFIG = {
		statsUrl: "https://your-gateway.example.com/agri/stats",
		regionsUrl: "https://your-gateway.example.com/agri/regions",
		pipelineUrl: "https://your-gateway.example.com/agri/pipeline",
		riskUrl: "https://your-gateway.example.com/agri/risk",
		healthUrl: "https://your-gateway.example.com/agri/health",
		timeoutMs: 5000
	};
</script>
```

See `docs/PHASE2_INTEGRATION.md` for payload contract examples.

## Sprint-1 Implementation Status

Completed in this sprint:

- Mock live API (`mock_api/server.py`) with endpoint fixtures.
- Contract validation script (`scripts/validate_dashboard_contract.py`).
- Contract test (`tests/test_contract_validator.py`).
- CI workflow (`.github/workflows/ci.yml`) with contract and endpoint smoke checks.
- Security workflows (`.github/workflows/codeql.yml`, `.github/workflows/secret-scan.yml`).
- Dependency update automation (`.github/dependabot.yml`).
- PR governance files (`.github/pull_request_template.md`, `.github/CODEOWNERS`).
- Threat baseline (`docs/THREAT_MODEL_BASELINE.md`).

Run local validation:

```bash
python3 scripts/validate_dashboard_contract.py
python3 -m unittest -q tests/test_contract_validator.py
```

## Release Hardening Checklist

Before cutting the first release tag:

1. Ensure Pages deploy from `main` is green.
2. Ensure CI, CodeQL, and Secret Scan are green.
3. Ensure contract validator passes with production-shaped payloads.
4. Ensure branch protection required checks match active workflows.

## Status

Bootstrap scaffold complete. Domain adapters and production connectors are planned in the beta hardening cycle documented in `docs/ROADMAP.md`.
