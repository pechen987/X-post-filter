# Publishing "Word Filter for X"

This file lives in `docs/` and is not part of the store zip.

## Before you upload

1. `manifest.json` already has a Firefox ID (`x-post-filter@hd-apps.com`). Keep it as an ID you own and never change it after the first Firefox release.
2. Build the zip so `manifest.json` is at the top level (command in the README under Development).
3. If Chrome shows a warning about `browser_specific_settings`, it is harmless.
   You can remove that block from the copy you upload to Chrome/Edge.

## Where to publish

| Store | Reaches | Cost |
|---|---|---|
| Chrome Web Store | Chrome, Brave, Opera, Vivaldi, and Edge users | $5 one-time developer fee |
| Firefox Add-ons (addons.mozilla.org) | Firefox desktop and Android | Free |
| Microsoft Edge Add-ons | Edge | Free |

Safari requires converting the extension with Xcode and an Apple Developer
account (paid yearly), so do it last, if at all.

## Store listing checklist

- **Name:** Word Filter for X
- **Short description:** Hide posts on X containing words you choose, like BREAKING or JUST IN.
- **Screenshots:** the settings popup, plus a before/after of a timeline (1280x800 works for Chrome).
- **Single purpose** (Chrome asks for this): "Hides posts on X that contain words the user chooses."
- **Permission justification:** `storage` saves the user's word list and settings.
  The content script runs only on x.com and twitter.com to hide matching posts.
- **Data disclosure:** no data collected or transmitted.
- **Privacy policy URL:** `https://github.com/pechen987/X-post-filter/blob/main/PRIVACY.md`
- **Support page:** the extension links to donation options (Buy Me a Coffee, Bitcoin). Mention in the listing that the extension is free and donations are optional.
- Do not use the X logo or imply the extension is made or endorsed by X Corp.

## After launch

- X changes its page structure now and then. If filtering stops working, update the selectors
  in `content.js` (`article[data-testid="tweet"]`, `tweetText`, `cellInnerDiv`) and bump
  `version` in `manifest.json` before re-uploading.
- Review times vary: often a day or so on Chrome, and Firefox can take longer.
