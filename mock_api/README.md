# Mock API

Local mock service for dashboard live endpoint mode.

Run locally:

```bash
python3 mock_api/server.py
```

Health check:

```bash
curl -fsS http://localhost:8088/healthz
```

Endpoints:

- `/api/agri/stats`
- `/api/agri/regions`
- `/api/agri/pipeline`
- `/api/agri/risk`
- `/api/agri/health`
