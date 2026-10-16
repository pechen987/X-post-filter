// Settings popup. Depends on shared.js (loaded first).

const $ = (id) => document.getElementById(id);
let settings;

async function persist() {
  await saveSettings(settings);
  updateStatus();
}

function updateStatus() {
  const active =
    PRESET_PHRASES.filter((p) => settings.presets[p.phrase]).length +
    settings.custom.filter((c) => c.on).length;

  $("main").classList.toggle("off", !settings.enabled);
  $("status").textContent = !settings.enabled
    ? "Filtering is paused."
    : active === 0
      ? "Nothing to filter yet. Switch on a phrase below."
      : `Hiding posts that contain any of ${active} active ${active === 1 ? "phrase" : "phrases"}.`;
}

// Builds one row: [switch] phrase [optional remove button]
function makeRow(phrase, checked, onToggle, onRemove) {
  const li = document.createElement("li");

  const sw = document.createElement("label");
  sw.className = "switch";
  const input = document.createElement("input");
  input.type = "checkbox";
  input.setAttribute("role", "switch");
  input.setAttribute("aria-label", `Filter "${phrase}"`);
  input.checked = checked;
  input.addEventListener("change", () => onToggle(input.checked));
  const track = document.createElement("span");
  track.className = "track";
  track.setAttribute("aria-hidden", "true");
  sw.append(input, track);

  const label = document.createElement("span");
  label.className = "phrase";
  label.textContent = phrase; // textContent, never innerHTML: user text stays inert

  li.append(sw, label);

  if (onRemove) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "remove";
    btn.textContent = "×";
    btn.setAttribute("aria-label", `Remove "${phrase}"`);
    btn.addEventListener("click", onRemove);
    li.append(btn);
  }
  return li;
}

function renderPresets() {
  const ul = $("presets");
  ul.replaceChildren(
    ...PRESET_PHRASES.map(({ phrase }) =>
      makeRow(phrase, !!settings.presets[phrase], (on) => {
        settings.presets[phrase] = on;
        persist();
      })
    )
  );
}

function renderCustom() {
  const ul = $("custom");
  ul.replaceChildren(
    ...settings.custom.map((item, i) =>
      makeRow(
        item.phrase,
        item.on,
        (on) => {
          settings.custom[i].on = on;
          persist();
        },
        () => {
          settings.custom.splice(i, 1);
          persist();
          renderCustom();
        }
      )
    )
  );
  $("empty").hidden = settings.custom.length > 0;
}

function showError(msg) {
  $("error").textContent = msg;
}

function addWord(raw) {
  const phrase = raw.trim().replace(/\s+/g, " ");
  if (!phrase) return showError("Type a word or phrase first.");
  if (phrase.length > MAX_WORD_LENGTH)
    return showError(`Keep it under ${MAX_WORD_LENGTH} characters.`);
  if (settings.custom.length >= MAX_CUSTOM_WORDS)
    return showError(`You can add up to ${MAX_CUSTOM_WORDS} words.`);

  const lower = phrase.toLowerCase();
  const exists =
    PRESET_PHRASES.some((p) => p.phrase.toLowerCase() === lower) ||
    settings.custom.some((c) => c.phrase.toLowerCase() === lower);
  if (exists) return showError("That one is already in the list.");

  showError("");
  settings.custom.push({ phrase, on: true });
  $("newWord").value = "";
  persist();
  renderCustom();
  $("newWord").focus();
}

async function init() {
  settings = await loadSettings();

  $("enabled").checked = settings.enabled;
  $("enabled").addEventListener("change", (e) => {
    settings.enabled = e.target.checked;
    persist();
  });

  $("caseSensitive").checked = settings.caseSensitive;
  $("caseSensitive").addEventListener("change", (e) => {
    settings.caseSensitive = e.target.checked;
    persist();
  });

  $("addForm").addEventListener("submit", (e) => {
    e.preventDefault();
    addWord($("newWord").value);
  });
  $("newWord").addEventListener("input", () => showError(""));

  renderPresets();
  renderCustom();
  updateStatus();
}

init();
