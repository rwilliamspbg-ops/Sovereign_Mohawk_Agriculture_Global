# THREAT_MODEL_BASELINE

Baseline STRIDE-oriented threat model for Sprint-1 security hardening.

## Scope

- Static dashboard and endpoint integration layer.
- Policy-gated wrapper templates under `flower_security_wrapper/`.
- Mock API used for local and CI integration verification.

## Key Threats and Controls

- Spoofing:
  - Threat: unauthorized service impersonates API source.
  - Control: route production calls through mTLS-attested gateway and signed payload checks.
- Tampering:
  - Threat: manipulated policy or endpoint payload alters governance decisions.
  - Control: signed policy artifacts and immutable audit evidence.
- Repudiation:
  - Threat: missing traceability for model-transfer decisions.
  - Control: per-round logs and compliance evidence retention.
- Information Disclosure:
  - Threat: sensitive farm telemetry leaves region without authorization.
  - Control: regional deny/allow policy gating and DP aggregation controls.
- Denial of Service:
  - Threat: endpoint overload causes stale dashboard decisions.
  - Control: timeout-based fallback to simulation and health status surfaces.
- Elevation of Privilege:
  - Threat: direct branch pushes bypass review safeguards.
  - Control: branch protection plus required CI checks.

## Sprint-1 Security Automation

- CodeQL workflow.
- Secret scanning workflow.
- Dependabot workflow updates.
