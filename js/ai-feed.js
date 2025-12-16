document.addEventListener("DOMContentLoaded", () => {
  fetch("/feeds/ai-predictions.json")
    .then(res => res.json())
    .then(items => {
      const feed = document.getElementById("aiFeed");
      if (!feed || !Array.isArray(items)) return;

      feed.innerHTML = "";

      items.slice(0, 5).forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${item.sport}:</strong> ${item.matchup} –
          <span>${item.market} · ${item.confidence} confidence</span>
          <a href="${item.url}">
            View Prediction
          </a>
        `;
        feed.appendChild(li);
      });
    })
    .catch(() => {
      /* silent fail – SSR fallback remains */
    });
});
