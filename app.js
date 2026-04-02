const stats = {
  nodesOnline: 18472,
  flRound: 312,
  complianceScore: 97,
  tokenRate: 842,
};

const regions = [
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

const pipelineFeed = [
  "Round 312: 18,472 nodes submitted signed updates.",
  "Byzantine filters flagged 0.43% suspicious gradients.",
  "Secure aggregation completed with regional quorum attestation.",
  "zk-SNARK verification mean latency: 10.8 ms.",
  "PQC transport mode enforced on all cross-region channels.",
];

const riskFeed = [
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

function renderStats() {
  setText("nodesOnline", stats.nodesOnline.toLocaleString());
  setText("flRound", String(stats.flRound));
  setText("complianceScore", `${stats.complianceScore}%`);
  setText("tokenRate", `${stats.tokenRate} MHC/min`);
}

function renderRegions() {
  const container = document.getElementById("regionGrid");
  const details = document.getElementById("regionDetails");
  if (!container || !details) {
    return;
  }

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
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

renderStats();
renderRegions();
renderFeed("pipelineFeed", pipelineFeed);
renderFeed("riskFeed", riskFeed);
