// Runs on x.com / twitter.com. Depends on shared.js (loaded first).

let pattern = null;

function processPost(article) {
  // The "row" is the whole timeline cell, so hiding it leaves no blank gap.
  const row = article.closest('[data-testid="cellInnerDiv"]') || article;
  if (row.dataset.xbfHidden === "1") return;

  // Include quoted posts, which have their own text block inside the article.
  const text = Array.from(article.querySelectorAll('[data-testid="tweetText"]'))
    .map((el) => el.innerText)
    .join("\n");

  if (text && pattern.test(text)) {
    row.style.display = "none";
    row.dataset.xbfHidden = "1";
  }
}

function scan() {
  if (!pattern) return;
  document
    .querySelectorAll('article[data-testid="tweet"]')
    .forEach(processPost);
}

// Un-hide everything we hid, so changed settings take effect immediately.
function resetAll() {
  document.querySelectorAll('[data-xbf-hidden="1"]').forEach((row) => {
    row.style.display = "";
    delete row.dataset.xbfHidden;
  });
}

function applySettings(settings) {
  pattern = settings.enabled ? buildPattern(settings) : null;
  resetAll();
  scan();
}

// X loads posts dynamically as you scroll, so watch for new ones.
let scheduled = false;
const observer = new MutationObserver(() => {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    scan();
  });
});

async function init() {
  applySettings(await loadSettings());
  observer.observe(document.body, { childList: true, subtree: true });

  // Pick up changes made in the settings popup (or synced from another device).
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && changes.settings) {
      loadSettings().then(applySettings);
    }
  });
}

init();
