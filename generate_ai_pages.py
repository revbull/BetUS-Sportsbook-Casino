import os

BASE_URL = "https://revbull.github.io/BetUS-Sportsbook-Casino"
OUTPUT_DIR = "ai-sports-predictions"

SPORTS = [
    {
        "slug": "nfl",
        "name": "NFL",
        "desc": "AI-powered NFL betting predictions for spreads, totals, and matchups."
    },
    {
        "slug": "nba",
        "name": "NBA",
        "desc": "AI-based NBA betting predictions and basketball matchup analysis."
    },
    {
        "slug": "mlb",
        "name": "MLB",
        "desc": "AI MLB predictions for baseball betting markets and totals."
    },
    {
        "slug": "nhl",
        "name": "NHL",
        "desc": "AI NHL betting predictions for hockey matchups."
    },
    {
        "slug": "ufc",
        "name": "UFC",
        "desc": "AI UFC fight predictions for informational analysis."
    }
]

TEMPLATE = """<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="UTF-8">
  <title>{SPORT} AI Predictions | Free AI Picks for BetUS</title>

  <meta name="description"
    content="{DESC} Informational use only for US bettors." />

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="index, follow">

  <link rel="canonical"
    href="{BASE}/ai-sports-predictions/{SLUG}/">

  <link rel="preload" href="../../css/style.css" as="style" onload="this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="../../css/style.css"></noscript>
</head>

<body>

<header class="hero">
  <div class="container">
    <span class="eyebrow">{SPORT} Betting Insights</span>
    <h1>{SPORT} AI Predictions</h1>
    <p class="subtitle">
      {DESC} Compare betting markets before wagering at BetUS.
    </p>

    <div class="cta-group">
      <a href="/BetUS-Sportsbook-Casino/#ai-predictions?sport={SPORT}"
         class="btn btn--primary">
        Generate {SPORT} Prediction
      </a>
      <a href="https://www.betus.com"
         class="btn btn--ghost"
         rel="nofollow sponsored">
        Bet on {SPORT} at BetUS
      </a>
    </div>
  </div>
</header>

<main>

<section class="section">
  <div class="container">
    <h2>How {SPORT} AI Predictions Work</h2>
    <p>
      Our AI analyzes historical performance, matchup context,
      and common betting market structures.
      Predictions are for informational purposes only.
    </p>
  </div>
</section>

<section class="section section--alt">
  <div class="container center">
    <a href="/BetUS-Sportsbook-Casino/"
       class="btn btn--subtle">
      ← Back to BetUS Review
    </a>
  </div>
</section>

</main>

<footer class="footer">
  <div class="container">
    <p class="fineprint">
      AI predictions are informational only and do not guarantee outcomes.
      Gambling involves risk. 21+ only.
    </p>
  </div>
</footer>

<script src="../../js/main.js" defer></script>
</body>
</html>
"""

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for sport in SPORTS:
        folder = os.path.join(OUTPUT_DIR, sport["slug"])
        os.makedirs(folder, exist_ok=True)

        html = TEMPLATE.format(
            SPORT=sport["name"],
            SLUG=sport["slug"],
            DESC=sport["desc"],
            BASE=BASE_URL
        )

        with open(os.path.join(folder, "index.html"), "w", encoding="utf-8") as f:
            f.write(html)

    print("✅ AI sport pages generated successfully.")

if __name__ == "__main__":
    main()
