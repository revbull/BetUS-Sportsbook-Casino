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
// ALL SPORTS PRESETS + CONTENT
// ============================

const sportPresets = {
  // FOOTBALL
  NFL: {
    sport: "Football",
    league: "NFL",
    title: "NFL AI Predictions",
    intro: "Generate AI-powered NFL betting predictions for informational use. Analyze NFL matchups and compare odds at BetUS.",
    helper: "Popular markets: spreads, totals, player props."
  },
  NCAAF: {
    sport: "Football",
    league: "NCAAF",
    title: "College Football AI Predictions",
    intro: "AI-powered college football predictions for informational analysis across major NCAAF matchups.",
    helper: "Best for spreads and totals."
  },

  // BASKETBALL
  NBA: {
    sport: "Basketball",
    league: "NBA",
    title: "NBA AI Predictions",
    intro: "Generate AI NBA betting predictions and analyze basketball matchups before betting at BetUS.",
    helper: "Strong for totals and player props."
  },
  WNBA: {
    sport: "Basketball",
    league: "WNBA",
    title: "WNBA AI Predictions",
    intro: "AI-generated WNBA predictions for informational basketball analysis.",
    helper: "Lower totals, pace-driven edges."
  },

  // BASEBALL
  MLB: {
    sport: "Baseball",
    league: "MLB",
    title: "MLB AI Predictions",
    intro: "Use AI-powered MLB predictions to analyze pitching matchups and totals.",
    helper: "Best for totals and moneyline."
  },
  NPB: {
    sport: "Baseball",
    league: "NPB",
    title: "NPB AI Predictions",
    intro: "AI predictions for Japan’s NPB baseball league.",
    helper: "Market efficiency differs from MLB."
  },
  KBO: {
    sport: "Baseball",
    league: "KBO",
    title: "KBO AI Predictions",
    intro: "AI-powered KBO betting insights for informational purposes.",
    helper: "Totals-driven league."
  },

  // HOCKEY
  NHL: {
    sport: "Hockey",
    league: "NHL",
    title: "NHL AI Predictions",
    intro: "AI NHL predictions analyzing team performance and scoring trends.",
    helper: "Goalie matchups matter."
  },

  // MMA
  UFC: {
    sport: "MMA",
    league: "UFC",
    title: "UFC AI Predictions",
    intro: "AI-powered UFC fight predictions based on historical performance.",
    helper: "Moneyline-focused markets."
  },
  Bellator: {
    sport: "MMA",
    league: "Bellator",
    title: "Bellator AI Predictions",
    intro: "Informational AI predictions for Bellator MMA events.",
    helper: "Smaller cards, higher variance."
  },

  // MOTORSPORT
  F1: {
    sport: "Motorsport",
    league: "Formula 1",
    title: "Formula 1 AI Predictions",
    intro: "AI-based Formula 1 race predictions for informational analysis.",
    helper: "Qualifying pace is key."
  },
  NASCAR: {
    sport: "Motorsport",
    league: "NASCAR",
    title: "NASCAR AI Predictions",
    intro: "AI NASCAR predictions analyzing track history and performance.",
    helper: "Track type matters."
  },

  // SOCCER
  EPL: {
    sport: "Soccer",
    league: "Premier League",
    title: "Premier League AI Predictions",
    intro: "AI-powered Premier League soccer predictions.",
    helper: "Totals and match result markets."
  },
  MLS: {
    sport: "Soccer",
    league: "MLS",
    title: "MLS AI Predictions",
    intro: "AI MLS betting predictions for US soccer matches.",
    helper: "Home advantage is stronger."
  },
  WC: {
    sport: "Soccer",
    league: "World Cup",
    title: "World Cup AI Predictions",
    intro: "AI-generated World Cup match predictions for informational use.",
    helper: "International variance is higher."
  },

  // TENNIS
  ATP: {
    sport: "Tennis",
    league: "ATP Tour",
    title: "ATP Tennis AI Predictions",
    intro: "AI-powered ATP tennis predictions.",
    helper: "Surface matters significantly."
  },
  WTA: {
    sport: "Tennis",
    league: "WTA Tour",
    title: "WTA Tennis AI Predictions",
    intro: "AI-powered WTA tennis predictions.",
    helper: "Form swings are common."
  },

  // GOLF
  PGA: {
    sport: "Golf",
    league: "PGA Tour",
    title: "PGA Tour AI Predictions",
    intro: "AI predictions for PGA Tour golf tournaments.",
    helper: "Course fit is critical."
  },
  LPGA: {
    sport: "Golf",
    league: "LPGA",
    title: "LPGA AI Predictions",
    intro: "AI-based LPGA golf predictions.",
    helper: "Field strength varies by event."
  },

  // CRICKET
  CricketT20: {
    sport: "Cricket",
    league: "T20",
    title: "T20 Cricket AI Predictions",
    intro: "AI-powered T20 cricket predictions.",
    helper: "High variance format."
  },
  CricketODI: {
    sport: "Cricket",
    league: "ODI",
    title: "ODI Cricket AI Predictions",
    intro: "AI-generated ODI cricket predictions.",
    helper: "Form consistency matters."
  },
  CricketTest: {
    sport: "Cricket",
    league: "Test",
    title: "Test Cricket AI Predictions",
    intro: "AI predictions for Test cricket matches.",
    helper: "Pitch conditions matter most."
  }
};

function applyAllSportPresets() {
  const params = new URLSearchParams(window.location.search);
  const key = params.get("sport");
  if (!key || !sportPresets[key]) return;

  const preset = sportPresets[key];

  // Set selects
  sportSelect.value = preset.sport;
  sportSelect.dispatchEvent(new Event("change"));

  setTimeout(() => {
    leagueSelect.value = preset.league;
  }, 50);

  // Swap content
  const titleEl = document.getElementById("aiTitle");
  const introEl = document.getElementById("aiIntro");
  const helperEl = document.getElementById("aiHelper");

  if (titleEl) titleEl.textContent = preset.title;
  if (introEl) introEl.textContent = preset.intro;
  if (helperEl) helperEl.textContent = preset.helper;

  // Scroll to AI
  document.getElementById("ai-predictions")
    ?.scrollIntoView({ behavior: "smooth" });
}
    applyExampleMatchup(key);

// ============================
// AUTO-EXAMPLE MATCHUPS
// ============================

const exampleMatchups = {
  // FOOTBALL
  NFL: "Chiefs vs Bills",
  NCAAF: "Alabama vs Georgia",

  // BASKETBALL
  NBA: "Lakers vs Celtics",
  WNBA: "Aces vs Liberty",

  // BASEBALL
  MLB: "Yankees vs Red Sox",
  NPB: "Yomiuri Giants vs Hanshin Tigers",
  KBO: "Doosan Bears vs LG Twins",

  // HOCKEY
  NHL: "Maple Leafs vs Bruins",

  // MMA
  UFC: "Jon Jones vs Stipe Miocic",
  Bellator: "McKee vs Pitbull",

  // MOTORSPORT
  F1: "Verstappen vs Hamilton",
  NASCAR: "Kyle Larson vs Denny Hamlin",

  // SOCCER
  EPL: "Manchester City vs Arsenal",
  MLS: "LA Galaxy vs Inter Miami",
  WC: "Brazil vs Argentina",

  // TENNIS
  ATP: "Djokovic vs Alcaraz",
  WTA: "Swiatek vs Sabalenka",

  // GOLF
  PGA: "Scheffler vs McIlroy",
  LPGA: "Korda vs Ko",

  // CRICKET
  CricketT20: "India vs Pakistan",
  CricketODI: "England vs Australia",
  CricketTest: "India vs Australia"
};

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
    applyAllSportPresets();

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
function applyExampleMatchup(sportKey) {
  const example = exampleMatchups[sportKey];
  if (!example) return;

  const matchupInput = document.getElementById("matchup");
  const exampleEl = document.getElementById("aiExample");

  if (matchupInput) {
    matchupInput.value = example;
  }

  if (exampleEl) {
    exampleEl.textContent = `Example matchup: ${example}`;
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
