document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const sport = params.get("sport") || "NFL";

  const feedConfig = {
    NFL: {
      title: "Latest NFL News",
      intro: "Breaking NFL headlines, injuries, and matchup context.",
      rss: "https://www.espn.com/espn/rss/nfl/news"
    },
    NBA: {
      title: "Latest NBA News",
      intro: "Recent NBA headlines and game context.",
      rss: "https://www.espn.com/espn/rss/nba/news"
    }
  };

  const config = feedConfig[sport] || feedConfig.NFL;

  const titleEl = document.getElementById("newsTitle");
  const introEl = document.getElementById("newsIntro");
  const feedEl = document.getElementById("newsFeed");

  if (!feedEl) return;

  titleEl.textContent = config.title;
  introEl.textContent = config.intro;

  const apiUrl =
    "https://api.allorigins.win/get?url=" +
    encodeURIComponent(config.rss);

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data.contents, "text/xml");
      const items = Array.from(xml.querySelectorAll("item")).slice(0, 5);

      feedEl.innerHTML = "";

      items.forEach(item => {
        const title = item.querySelector("title")?.textContent;
        const link = item.querySelector("link")?.textContent;

        if (!title || !link) return;

        const li = document.createElement("li");
        li.innerHTML = `
          ${title}
          <a href="${link}" target="_blank" rel="nofollow noopener">
            Read
          </a>
        `;
        feedEl.appendChild(li);
      });
    })
    .catch(() => {
      // Fail silently – SSR fallback remains
    });
});
