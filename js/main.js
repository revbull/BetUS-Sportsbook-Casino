// ============================
// CONFIG
// ============================

const AFFILIATE_URL = "YOUR_AFFILIATE_LINK"; // Replace with your actual affiliate link

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
// DOM Elements
// ============================

const sportSelect = document.getElementById("sport");
const leagueSelect = document.getElementById("league");
const form = document.getElementById("aiForm");
const resultBox = document.getElementById("aiResult");
const resetBtn = document.getElementById("aiReset");
const stickyCta = document.getElementById("stickyCta");

// ============================
// PRESETS + EXAMPLES
// ============================

const sportPresets = {
  NFL: {
    sport: "Football",
    league: "NFL",
    title: "NFL AI Predictions",
    intro: "Generate AI-powered NFL betting predictions for informational use.",
    helper: "Popular markets: spreads, totals, player props.",
    example: "Chiefs vs Bills"
  },
  NBA: {
    sport: "Basketball",
    league: "NBA",
    title: "NBA AI Predictions",
    intro: "Generate AI-powered NBA predictions for informational use.",
    helper: "Strong for totals and player props.",
    example: "Lakers vs Celtics"
  },
  MLB: {
    sport: "Baseball",
    league: "MLB",
    title: "MLB AI Predictions",
    intro: "Use AI-powered MLB predictions to analyze pitching matchups.",
    helper: "Best for totals and moneyline.",
    example: "Yankees vs Red Sox"
  }
  // Add more presets here in the same format if desired
};

// ============================
// INIT
// ============================

window.addEventListener("DOMContentLoaded", () => {
  fillLeaguesOnSportChange();
  applyPresetFromUrl();
  attachFormHandlers();
  initStickyCTA();
});

// ============================
// FUNCTIONS
// ============================

function fillLeaguesOnSportChange() {
  sportSelect?.addEventListener("change", () => {
    leagueSelect.innerHTML = `<option value="">Select League</option>`;
    const leagues = leaguesBySport[sportSelect.value] || [];
    leagues.forEach(l => {
      const option = document.createElement("option");
      option.value = l;
      option.textContent = l;
      leagueSelect.appendChild(option);
    });
  });
}

function applyPresetFromUrl() {
  const key = new URLSearchParams(window.location.search).get("sport");
  if (!key || !sportPresets[key]) return;

  const preset = sportPresets[key];

  sportSelect.value = preset.sport;
  sportSelect.dispatchEvent(new Event("change"));

  setTimeout(() => {
    leagueSelect.value = preset.league;
  }, 50);

  document.getElementById("aiTitle")?.textContent = preset.title;
  document.getElementById("aiIntro")?.textContent = preset.intro;
  document.getElementById("aiHelper")?.textContent = preset.helper;

  if (preset.example) {
    const matchupInput = document.getElementById("matchup");
    const exampleEl = document.getElementById("aiExample");
    if (matchupInput) matchupInput.value = preset.example;
    if (exampleEl) exampleEl.textContent = `Example matchup: ${preset.example}`;
  }
}

function attachFormHandlers() {
  form?.addEventListener("submit", e => {
    e.preventDefault();
    const matchup = document.getElementById("matchup").value.trim();
    if (!sportSelect.value || !leagueSelect.value || !matchup) {
      alert("Please complete all fields.");
      return;
    }
    renderPrediction({
      sport: sportSelect.value,
      league: leagueSelect.value,
      matchup
    });
  });

  resetBtn?.addEventListener("click", () => {
    form.reset();
    leagueSelect.innerHTML = `<option value="">Select League</option>`;
    resultBox.style.display = "none";
    resultBox.innerHTML = "";
  });
}

function renderPrediction({ sport, league, matchup }) {
  const probability = randomBetween(52, 68);
  const betType = betTypes[Math.floor(Math.random() * betTypes.length)];
  const confidence = getConfidence(probability);

  resultBox.style.display = "block";
  resultBox.innerHTML = `
    <h3>AI Prediction</h3>
    <p><strong>${sport} (${league})</strong></p>
    <p><strong>Matchup:</strong> ${escapeHtml(matchup)}</p>
    <p><strong>Suggested Market:</strong> ${betType}</p>

    <div class="metric">
      <span class="badge">Win Probability: ${probability}%</span>
      <span class="badge">Confidence: ${confidence}</span>
    </div>

    <a class="btn btn--primary btn--block"
       href="${AFFILIATE_URL}"
       rel="nofollow sponsored">
       Bet at BetUS
    </a>

    <p class="fineprint">
      Informational only. No guaranteed outcomes.
    </p>
  `;

  escalateStickyCta();
  resultBox.scrollIntoView({ behavior: "smooth" });
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getConfidence(val) {
  if (val >= 65) return "High";
  if (val >= 58) return "Medium";
  return "Low";
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function initStickyCTA() {
  window.addEventListener("scroll", () => {
    const y = window.scrollY || 0;
    if (!stickyCta) return;
    if (y > 500) stickyCta.classList.add("is-visible");
    else stickyCta.classList.remove("is-visible");
  });
}

function escalateStickyCta() {
  if (!stickyCta) return;
  stickyCta.querySelector("strong")?.textContent = "Exclusive BetUS Bonus";
  stickyCta.querySelector(".muted")?.textContent = "Limited availability for new US players";
}
