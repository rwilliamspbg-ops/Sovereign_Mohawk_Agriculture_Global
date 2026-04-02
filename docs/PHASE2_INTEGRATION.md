# PHASE2_INTEGRATION

This guide defines the expected payload contracts for live endpoint wiring used by the dashboard.

## Endpoint Contracts

### GET /api/agri/stats

```json
{
  "nodes_online": 25021,
  "fl_round": 418,
  "compliance_score": 98,
  "token_rate": 1050
}
```

Accepted aliases:

- `nodesOnline` or `nodes_online`
- `flRound` or `fl_round`
- `complianceScore` or `compliance_score`
- `tokenRate` or `token_rate`

### GET /api/agri/regions

```json
[
  {
    "name": "Europe",
    "crops": "Wheat, barley",
    "climateRisk": "Heatwave recurrence: moderate-high",
    "modelConvergence": "96.4%",
    "soilSignal": "Carbon sequestration trend improving"
  }
]
```

### GET /api/agri/pipeline

Either array form:

```json
[
  "Round 418: 25,021 nodes submitted signed updates."
]
```

Or object form:

```json
{
  "events": [
    "Round 418: 25,021 nodes submitted signed updates."
  ]
}
```

### GET /api/agri/risk

Either array form:

```json
[
  "Pest pressure model flagged rust risk in 9 regions."
]
```

Or object form:

```json
{
  "events": [
    "Pest pressure model flagged rust risk in 9 regions."
  ]
}
```

### GET /api/agri/health

```json
{
  "services": [
    { "name": "orchestrator", "status": "up" },
    { "name": "prometheus", "status": "up" },
    { "name": "grafana", "status": "up" }
  ]
}
```

## Runtime Behavior

- If one or more endpoints respond, dashboard enters `Hybrid (Live + Simulation)` mode.
- If all endpoints fail, dashboard remains in `Simulation` mode.
- Endpoint status panel always shows live/fallback state for each endpoint.

## Integration Recommendation

Use an API gateway route that normalizes these payloads from Mohawk runtime, Flower wrapper, and observability backends to keep the front-end contract stable.
