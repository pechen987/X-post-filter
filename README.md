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

### From a browser store

Store links will be added here once the extension is published.

### Manually (Chrome, Edge, Brave and other Chromium browsers)

1. Download this repo (**Code → Download ZIP**) or the zip from the [Releases](../../releases) page, and unzip it somewhere you'll keep it.
2. Open `chrome://extensions` (or `edge://extensions`, `brave://extensions`).
3. Turn on **Developer mode**.
4. Click **Load unpacked** and select the folder that contains `manifest.json`.
5. Pin **Word Filter for X** from the puzzle-piece menu, then reload x.com.

### Manually (Firefox)

1. Open `about:debugging` and click **This Firefox**.
2. Click **Load Temporary Add-on** and pick `manifest.json`.

Firefox removes temporary add-ons when it restarts, so for permanent use install from Firefox Add-ons once it is listed.

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

## Support the project

Hi, I'm Igor, an open-source developer. Your support helps me maintain these projects:

1. **Trustless Wallet**: [apple.co/4vpMOrh](https://apple.co/4vpMOrh)
2. **Social housing map**: [socialmap.hd-apps.com](https://socialmap.hd-apps.com/)
3. **X post filter**: [github.com/pechen987/X-post-filter](https://github.com/pechen987/X-post-filter)

Ways to support:

- **Buy Me a Coffee**: <https://buymeacoffee.com/pechen>
- **Bitcoin Lightning**: `trustless@pay.hd-apps.com`
- **Bitcoin on-chain**: `bc1q835gw6aqf6jmgs5pja5xf5xzcp76w75cqfvek6`

Check the first and last characters of an address in your wallet before sending. The same addresses are shown on the extension's support page. If the two ever differ, do not send.

## License

[MIT](LICENSE)

This project is not affiliated with or endorsed by X Corp.
