// Shared by the popup (settings panel) and the content script (the filter).

// Built-in phrases users can switch on or off. `on` = enabled by default.
const PRESET_PHRASES = [
  { phrase: "BREAKING", on: true },
  { phrase: "JUST IN", on: true },
  { phrase: "DEVELOPING", on: false },
  { phrase: "ALERT", on: false },
  { phrase: "URGENT", on: false },
  { phrase: "EXCLUSIVE", on: false },
  { phrase: "HAPPENING NOW", on: false },
  { phrase: "🚨", on: false },
];

const MAX_CUSTOM_WORDS = 50;
const MAX_WORD_LENGTH = 60;

const DEFAULT_SETTINGS = {
  enabled: true,
  caseSensitive: true,
  presets: Object.fromEntries(PRESET_PHRASES.map((p) => [p.phrase, p.on])),
  custom: [], // [{ phrase: "some words", on: true }]
};

async function loadSettings() {
  const { settings } = await chrome.storage.sync.get("settings");
  const s = settings || {};
  return {
    enabled: s.enabled ?? DEFAULT_SETTINGS.enabled,
    caseSensitive: s.caseSensitive ?? DEFAULT_SETTINGS.caseSensitive,
    presets: { ...DEFAULT_SETTINGS.presets, ...(s.presets || {}) },
    custom: Array.isArray(s.custom) ? s.custom : [],
  };
}

function saveSettings(settings) {
  return chrome.storage.sync.set({ settings });
}

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Builds one regex from every enabled phrase. Returns null if none are enabled.
// Phrases only match as whole words (so "ALERT" won't match "ALERTED"), and
// this also works for emoji, which \b can't handle.
function buildPattern(settings) {
  const phrases = [
    ...PRESET_PHRASES.map((p) => p.phrase).filter((p) => settings.presets[p]),
    ...settings.custom.filter((c) => c.on).map((c) => c.phrase),
  ];
  if (phrases.length === 0) return null;

  const body = phrases
    .map((p) => escapeRegex(p.trim()).replace(/\s+/g, "\\s+"))
    .join("|");

  return new RegExp(
    `(?<![\\p{L}\\p{N}_])(?:${body})(?![\\p{L}\\p{N}_])`,
    settings.caseSensitive ? "u" : "iu"
  );
}
