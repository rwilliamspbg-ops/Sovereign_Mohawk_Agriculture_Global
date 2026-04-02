const simulatedStats = {
  nodesOnline: 18472,
  flRound: 312,
  complianceScore: 97,
  tokenRate: 842,
};

const simulatedRegions = [
  {
    name: "North America",
    crops: "Corn, soy, wheat",
    climateRisk: "Drought volatility: moderate",
    modelConvergence: "95.1%",
    soilSignal: "Nitrogen stabilization improving",
  },
  {
    name: "South America",
    crops: "Soy, coffee, sugarcane",
    climateRisk: "Flood and pest pressure: elevated",
    modelConvergence: "93.8%",
    soilSignal: "Moisture retention variance across co-ops",
  },
  {
    name: "Europe",
    crops: "Wheat, barley, vineyards",
    climateRisk: "Heatwave recurrence: moderate-high",
    modelConvergence: "96.4%",
    soilSignal: "Carbon sequestration trend improving",
  },
  {
    name: "Africa",
    crops: "Maize, sorghum, cassava",
    climateRisk: "Rainfall unpredictability: high",
    modelConvergence: "92.9%",
    soilSignal: "Localized nutrient depletion alerts",
  },
  {
    name: "Asia",
    crops: "Rice, pulses, horticulture",
    climateRisk: "Monsoon shift risk: medium-high",
    modelConvergence: "94.6%",
    soilSignal: "Salinity hot-spots under watch",
  },
  {
    name: "Oceania",
    crops: "Wheat, livestock feed systems",
    climateRisk: "Fire-weather risk: seasonal spikes",
    modelConvergence: "95.7%",
    soilSignal: "Soil organic matter stable",
  },
];

const simulatedPipelineFeed = [
  "Round 312: 18,472 nodes submitted signed updates.",
  "Byzantine filters flagged 0.43% suspicious gradients.",
  "Secure aggregation completed with regional quorum attestation.",
  "zk-SNARK verification mean latency: 10.8 ms.",
  "PQC transport mode enforced on all cross-region channels.",
];

const simulatedRiskFeed = [
  "Pest pressure model detected early rust signals in 14 regions.",
  "Soil model forecasts phosphorus depletion in 8 cooperative zones.",
  "Climate-risk layer marked 5 regions for heat stress mitigation.",
  "Yield model confidence rose 1.4% after latest federated round.",
  "Irrigation planner suggests water reduction of 7% in low-risk sectors.",
];

function setText(id, text) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = text;
  }
}

function setDataMode(modeLabel) {
  setText("dataMode", `Data Mode: ${modeLabel}`);
}

function renderStats(stats) {
  setText("nodesOnline", Number(stats.nodesOnline || 0).toLocaleString());
  setText("flRound", String(stats.flRound || 0));
  setText("complianceScore", `${stats.complianceScore || 0}%`);
  setText("tokenRate", `${stats.tokenRate || 0} MHC/min`);
}

function renderRegions(regions) {
  const container = document.getElementById("regionGrid");
  const details = document.getElementById("regionDetails");
  if (!container || !details) {
    return;
  }

  container.innerHTML = "";

  regions.forEach((region) => {
    const button = document.createElement("button");
    button.className = "region-btn";
    button.type = "button";
    button.innerHTML = `<strong>${region.name}</strong><br/><small>${region.crops}</small>`;
    button.addEventListener("click", () => {
      details.innerHTML = `
        <strong>${region.name}</strong><br/>
        Crops: ${region.crops}<br/>
        Climate risk: ${region.climateRisk}<br/>
        Convergence: ${region.modelConvergence}<br/>
        Soil signal: ${region.soilSignal}
      `;
    });
    container.appendChild(button);
  });
}

function renderFeed(listId, items) {
  const list = document.getElementById(listId);
  if (!list) {
    return;
  }

  list.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

function renderEndpointStatus(statusItems) {
  renderFeed("endpointStatus", statusItems);
}

function getConfig() {
  const override = window.AGRI_DASHBOARD_CONFIG || {};
  return {
    timeoutMs: Number(override.timeoutMs || 3000),
    statsUrl: override.statsUrl || "/api/agri/stats",
    regionsUrl: override.regionsUrl || "/api/agri/regions",
    pipelineUrl: override.pipelineUrl || "/api/agri/pipeline",
    riskUrl: override.riskUrl || "/api/agri/risk",
    healthUrl: override.healthUrl || "/api/agri/health",
  };
}

async function fetchJson(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function loadLiveData(config) {
  const endpoints = [
    { key: "stats", url: config.statsUrl },
    { key: "regions", url: config.regionsUrl },
    { key: "pipeline", url: config.pipelineUrl },
    { key: "risk", url: config.riskUrl },
    { key: "health", url: config.healthUrl },
  ];

  const results = await Promise.allSettled(
    endpoints.map((endpoint) => fetchJson(endpoint.url, config.timeoutMs))
  );

  const data = {
    stats: { ...simulatedStats },
    regions: [...simulatedRegions],
    pipeline: [...simulatedPipelineFeed],
    risk: [...simulatedRiskFeed],
  };
  const endpointStatus = [];
  let liveSuccessCount = 0;

  results.forEach((result, index) => {
    const endpoint = endpoints[index];
    if (result.status === "fulfilled") {
      liveSuccessCount += 1;
      endpointStatus.push(`${endpoint.key}: live (${endpoint.url})`);

      if (endpoint.key === "stats") {
        const payload = result.value || {};
        data.stats = {
          nodesOnline: payload.nodesOnline || payload.nodes_online || data.stats.nodesOnline,
          flRound: payload.flRound || payload.fl_round || data.stats.flRound,
          complianceScore:
            payload.complianceScore || payload.compliance_score || data.stats.complianceScore,
          tokenRate: payload.tokenRate || payload.token_rate || data.stats.tokenRate,
        };
      }

      if (endpoint.key === "regions" && Array.isArray(result.value)) {
        data.regions = result.value;
      }

      if (endpoint.key === "pipeline") {
        if (Array.isArray(result.value)) {
          data.pipeline = result.value;
        } else if (Array.isArray(result.value.events)) {
          data.pipeline = result.value.events;
        }
      }

      if (endpoint.key === "risk") {
        if (Array.isArray(result.value)) {
          data.risk = result.value;
        } else if (Array.isArray(result.value.events)) {
          data.risk = result.value.events;
        }
      }

      if (endpoint.key === "health" && Array.isArray(result.value.services)) {
        result.value.services.forEach((service) => {
          endpointStatus.push(`service ${service.name}: ${service.status}`);
        });
      }
      return;
    }

    endpointStatus.push(
      `${endpoint.key}: simulated fallback (${endpoint.url}) - ${result.reason?.message || "unavailable"}`
    );
  });

  const mode = liveSuccessCount > 0 ? "Hybrid (Live + Simulation)" : "Simulation";
  return { data, endpointStatus, mode };
}

async function initDashboard() {
  const config = getConfig();
  const { data, endpointStatus, mode } = await loadLiveData(config);
  setDataMode(mode);
  renderStats(data.stats);
  renderRegions(data.regions);
  renderFeed("pipelineFeed", data.pipeline);
  renderFeed("riskFeed", data.risk);
  renderEndpointStatus(endpointStatus);
}

initDashboard();
