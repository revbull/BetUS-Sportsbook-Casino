// ============================
// CONFIG
// ============================

const AFFILIATE_URL = "YOUR_AFFILIATE_LINK"; // Replace

const leaguesBySport = {
  Basketball: ["NBA", "WNBA"],
  Baseball: ["MLB", "NPB", "KBO"],
  Cricket: ["Test", "ODI", "T20"],
  Football: ["NFL", "NCAAF"],
  Golf: ["PGA Tour", "LPGA"],
  Hockey: ["NHL", "World Championships"],
  MMA: ["UFC", "Bellator"],
  Motorsport: ["NASCAR", "Formula 1"],
  Soccer: ["Premier League", "World Cup", "MLS"],
  Tennis: ["ATP Tour", "WTA Tour"]
};

const betTypes = ["Moneyline", "Point Spread", "Over / Under"];

// ============================
// URL PARAM PRESETS
// ============================

function applyUrlPresets() {
  function applyDynamicAiCopy(sportParam) {
  const title = document.getElementById("aiTitle");
  const intro = document.getElementById("aiIntro");

  if (!title || !intro) return;

  if (sportParam === "NFL") {
    title.textContent = "NFL AI Predictions";
    intro.textContent =
      "Generate free AI-powered NFL betting predictions for informational use. Compare NFL odds at BetUS.";
  }

  if (sportParam === "NBA") {
    title.textContent = "NBA AI Predictions";
    intro.textContent =
      "Generate AI-powered NBA betting predictions and compare basketball markets at BetUS.";
  }
}

  const params = new URLSearchParams(window.location.search);
  const sportParam = params.get("sport");

  if (!sportParam) return;

  // Map URL param -> sport/league
  const presetMap = {
    NFL: { sport: "Football", league: "NFL" },
    NBA: { sport: "Basketball", league: "NBA" },
    MLB: { sport: "Baseball", league: "MLB" },
    NHL: { sport: "Hockey", league: "NHL" },
    Soccer: { sport: "Soccer", league: "Premier League" }
  };

  const preset = presetMap[sportParam];
  if (!preset) return;

  // Set sport
  sportSelect.value = preset.sport;
  sportSelect.dispatchEvent(new Event("change"));

  // Small delay to ensure leagues are populated
  setTimeout(() => {
    leagueSelect.value = preset.league;
  }, 50);

  // Optional UX improvement
  const aiSection = document.getElementById("ai-predictions");
  aiSection?.scrollIntoView({ behavior: "smooth" });
}


// ============================
// DOM
// ============================

const sportSelect = document.getElementById("sport");
const leagueSelect = document.getElementById("league");
const form = document.getElementById("aiForm");
const resultBox = document.getElementById("aiResult");
const resetBtn = document.getElementById("aiReset");
const yearEl = document.getElementById("year");
const stickyCta = document.getElementById("stickyCta");

// ============================
// INIT
// ============================

if (yearEl) yearEl.textContent = new Date().getFullYear();

// Populate leagues when sport changes
sportSelect?.addEventListener("change", () => {
  leagueSelect.innerHTML = `<option value="">Select League</option>`;
  const leagues = leaguesBySport[sportSelect.value];
  if (!leagues) return;

  leagues.forEach((league) => {
    const option = document.createElement("option");
    option.value = league;
    option.textContent = league;
    leagueSelect.appendChild(option);
  });
});

// Submit handler
form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const sport = sportSelect.value?.trim();
  const league = leagueSelect.value?.trim();
  const matchup = document.getElementById("matchup").value?.trim();

  if (!sport || !league || !matchup) {
    alert("Please complete Sport, League, and Matchup.");
    return;
  }

  renderPrediction({ sport, league, matchup });
});

resetBtn?.addEventListener("click", () => {
  form.reset();
  leagueSelect.innerHTML = `<option value="">Select League</option>`;
  resultBox.style.display = "none";
  resultBox.innerHTML = "";
});

// Sticky CTA show/hide on scroll
window.addEventListener("scroll", () => {
  const y = window.scrollY || 0;
  if (!stickyCta) return;

  if (y > 520) {
    stickyCta.classList.add("is-visible");
    stickyCta.setAttribute("aria-hidden", "false");
  } else {
    stickyCta.classList.remove("is-visible");
    stickyCta.setAttribute("aria-hidden", "true");
  }
    applyUrlPresets();
});

// ============================
// PREDICTION ENGINE (Mock)
// ============================

function renderPrediction({ sport, league, matchup }) {
  const probability = randomBetween(52, 68);
  const betType = betTypes[Math.floor(Math.random() * betTypes.length)];
  const confidence = getConfidence(probability);

  const lean = getLeanText(betType);
  const safeMatchup = escapeHtml(matchup);

  const confidenceLabel = `Confidence: ${confidence}`;
  const probabilityLabel = `Win Probability: ${probability}%`;

  resultBox.style.display = "block";
  resultBox.innerHTML = `
    <h3>AI Prediction</h3>
    <p><strong>Sport:</strong> ${escapeHtml(sport)} (${escapeHtml(league)})</p>
    <p><strong>Matchup:</strong> ${safeMatchup}</p>
    <p><strong>Suggested Market:</strong> ${betType}</p>
    <p><strong>Lean:</strong> ${lean}</p>

    <div class="metric" aria-label="Prediction metrics">
      <span class="badge">${probabilityLabel}</span>
      <span class="badge">${confidenceLabel}</span>
    </div>

   <div style="margin-top:12px;">
  <a class="btn btn--primary btn--block"
     href="${AFFILIATE_URL}"
     rel="nofollow sponsored">
     Bet on ${safeMatchup} at BetUS
  </a>

  <a class="btn btn--subtle btn--block"
     href="${AFFILIATE_URL}"
     rel="nofollow sponsored"
     style="margin-top:8px;">
     Claim Bonus Before Betting
  </a>
</div>


    <p class="fineprint" style="margin-top:10px;">
      This prediction is informational only and does not guarantee outcomes. Odds and availability are subject to BetUS terms.
    </p>
  `;

  // Smooth scroll result into view (better UX)
  resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Escalate sticky CTA after AI interaction
let aiUsed = false;

function escalateStickyCta() {
  if (!stickyCta) return;
  stickyCta.querySelector("strong").textContent = "Exclusive BetUS Bonus";
  stickyCta.querySelector(".muted").textContent =
    "Limited availability for new US players";
}

// Hook after prediction render
const _renderPrediction = renderPrediction;
renderPrediction = function(args) {
  aiUsed = true;
  _renderPrediction(args);
  escalateStickyCta();
};

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getConfidence(probability) {
  if (probability >= 65) return "High";
  if (probability >= 58) return "Medium";
  return "Low";
}

function getLeanText(betType) {
  switch (betType) {
    case "Moneyline":
      return "Slight edge to the perceived stronger side (informational).";
    case "Point Spread":
      return "Lean toward the side offering value at current spread levels.";
    case "Over / Under":
      return "Lean based on pace/scoring tendencies (informational).";
    default:
      return "Informational lean based on historical patterns.";
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
let exitShown = false;
const exitModal = document.getElementById("exitModal");
const exitClose = document.getElementById("exitClose");

document.addEventListener("mouseout", (e) => {
  if (exitShown) return;
  if (e.clientY <= 0) {
    exitShown = true;
    exitModal.style.display = "flex";
  }
});

exitClose?.addEventListener("click", () => {
  exitModal.style.display = "none";
});
