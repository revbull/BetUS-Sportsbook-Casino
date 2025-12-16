document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("internalLinks");
  if (!container) return;

  fetch("/BetUS-Sportsbook-Casino/data/internal-links.json")
    .then(r => r.json())
    .then(links => {
      Object.entries(links).forEach(([label, url]) => {
        const a = document.createElement("a");
        a.href = url;
        a.textContent = `${label} AI Predictions`;
        a.className = "internal-link";
        container.appendChild(a);
      });
    })
    .catch(() => {});
});
