# Word Filter for X

A free, open-source browser extension that hides posts on X (Twitter) containing words you choose, such as **BREAKING** or **JUST IN**. No account, no ads, no tracking.

## Features

- Hides matching posts from your timeline as you scroll, including posts that quote a match
- Built-in phrases you can switch on or off: BREAKING, JUST IN, DEVELOPING, ALERT, URGENT, EXCLUSIVE, HAPPENING NOW, 🚨
- Add your own words and phrases (up to 50), and switch or remove them any time
- **Match exact capitalization** toggle: on, "BREAKING" is hidden but "breaking" is not; off, any capitalization is hidden
- Master switch to pause filtering
- Changes apply instantly to open X tabs
- Whole-word matching, so "ALERT" does not hide "ALERTED"
- Keyboard and screen-reader friendly, with light and dark themes
- Private: everything stays in your browser

## Install

1. Open the latest release, download ZIP archive and unpack it.
2. Open `chrome://extensions` (or `edge://extensions`, `brave://extensions`).
3. Turn on **Developer mode**.
4. Click **Load unpacked** and upload the unpacked folder.
5. Pin **Word Filter for X** from the puzzle-piece menu, then reload x.com.

## Usage

Click the extension icon on any page to open the settings:

1. Use the top switch to turn filtering on or off.
2. Choose whether capitalization must match exactly.
3. Switch common phrases on or off.
4. Type your own word or phrase under **Your own words** and press **Add**.

Matching posts disappear right away, and anything you switch off comes back.

## How it works

A small content script runs only on `x.com` and `twitter.com`. It watches the timeline for new posts, checks each post's text against your enabled phrases, and hides the matching ones. Settings are saved with the browser's extension storage and may sync across your own devices if you use browser sync.

## Privacy

The extension collects no data and makes no network requests. See [PRIVACY.md](PRIVACY.md).

## Development

There is no build step. Edit the files and reload the extension from `chrome://extensions`.

| File | Purpose |
|---|---|
| `manifest.json` | Extension manifest (Manifest V3) |
| `content.js` | Hides matching posts on x.com |
| `shared.js` | Settings, preset phrases and matching logic |
| `popup.html`, `popup.css`, `popup.js` | Settings panel |
| `support.html`, `support.js` | Support page opened from the settings panel |
| `docs/PUBLISHING.md` | Store publishing notes |

X changes its page structure from time to time. If filtering stops working, update the selectors in `content.js` (`article[data-testid="tweet"]`, `tweetText`, `cellInnerDiv`).

To build the zip for a store upload:

```
zip -r word-filter-for-x.zip manifest.json shared.js content.js popup.html popup.css popup.js support.html support.js icons
```
