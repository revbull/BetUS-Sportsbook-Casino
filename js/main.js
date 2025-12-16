// ============================
// DATA CONFIG
// ============================

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

const betTypes = [
  "Moneyline",
  "Point Spread",
  "Over / Under"
];

// ============================
// DOM ELEMENTS
// ============================

const sportSelect = document.getElementById("sport");
const leagueSelect = document.getElementById("league");
const form = document.getElementById("aiForm");
const resultBox = document.getElementById("aiResult");

// ============================
// EVENTS
// ============================

sportSelect.addEventListener("change", () => {
  leagueSelect.innerHTML = `<option value="">Select League</option>`;

  const leagues = leaguesBySport[sportSelect.value];
  if (!leagues) return;

  leagues.forEach(league => {
    const option = document.createElement("option");
    option.value = league;
    option.textContent = league;
    leagueSelect.appendChild(option);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const sport = sportSelect.value;
  const league = leagueSelect.value;
  const matchup = document.getElementById("matchup").value;

  if (!sport || !league || !matchup) {
    alert("Please complete all fields.");
    return;
  }

  generatePrediction(sport, league, matchup);
});

// ============================
// AI PREDICTION ENGINE (Mock)
// ============================

function generatePrediction(sport, league, matchup) {
  const probability = randomBetween(52, 68);
  const betType = betTypes[Math.floor(Math.random() * betTypes.length)];
  const confidence = getConfidence(probability);

  resultBox.style.display = "block";
  resultBox.innerHTML = `
    <h3>AI Prediction</h3>
    <p><strong>Sport:</strong> ${sport} (${league})</p>
    <p><strong>Matchup:</strong> ${matchup}</p>
    <p><strong>Suggested Bet:</strong> ${betType}</p>
    <p><strong>Estimated Win Probability:</strong> ${probability}%</p>
    <p><strong>AI Confidence:</strong> ${confidence}</p>

    <a href="YOUR_AFFILIATE_LINK" class="btn primary">
      Bet on ${matchup} at BetUS
    </a>

    <p class="disclaimer">
      This prediction is generated for informational purposes only and does not guarantee any outcome.
    </p>
  `;
}

// ============================
// HELPERS
// ============================

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getConfidence(probability) {
  if (probability >= 65) return "High";
  if (probability >= 58) return "Medium";
  return "Low";
}
