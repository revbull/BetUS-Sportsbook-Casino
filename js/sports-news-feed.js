document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const sport = params.get("sport") || "NFL";

  const titleEl = document.getElementById("newsTitle");
  const introEl = document.getElementById("newsIntro");
  const feedEl = document.getElementById("newsFeed");

  if (!feedEl) return;

  titleEl.textContent = `Latest ${sport} News`;
  introEl.textContent = `Recent ${sport} headlines and matchup context.`;

  fetch("/BetUS-Sportsbook-Casino/feeds/sports-news.json")
    .then(res => res.json())
    .then(data => {
      const items = data[sport] || [];
      if (!items.length) return;

      feedEl.innerHTML = "";

      items.slice(0, 5).forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
          ${item.title}
          <a href="${item.link}" target="_blank" rel="nofollow noopener">
            Read
          </a>
        `;
        feedEl.appendChild(li);
      });
    })
    .catch(() => {
      /* silent fail */
    });
  {
  "NFL": [
    {
      "title": "Chiefs vs Bills playoff implications",
      "link": "https://www.cbssports.com/...",
      "published": "Mon, 16 Dec 2025 10:30:00 GMT",
      "source": "CBS"
    },
    {
      "title": "NFL Week 15 injury updates",
      "link": "https://sports.yahoo.com/...",
      "published": "",
      "source": "Yahoo"
    }
  ],
  "updated": "2025-12-16T09:40:12Z"
}

});
