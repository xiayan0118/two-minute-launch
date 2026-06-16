# Two-Minute Launch

A tiny "just start" app. Type the one thing you're avoiding, hit **LAUNCH**,
watch the 5-4-3-2-1 rocket go — then do two minutes on it. You don't have to
finish; you have to start.

**Live:** https://xiayan0118.github.io/two-minute-launch/

It's a Progressive Web App (PWA), so you can install it to your phone's home
screen and run it full-screen, offline.

## Install on iOS (Add to Home Screen)

1. Open the live link above in **Safari** (must be Safari, not Chrome).
2. Tap the **Share** button (the square with an up-arrow).
3. Scroll down and tap **Add to Home Screen**.
4. Tap **Add**. The rocket icon now launches it full-screen, no browser chrome.

## Install on Android

Open the link in Chrome → menu (⋮) → **Install app** / **Add to Home screen**.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The entire app (HTML + CSS + JS, no build step) |
| `manifest.json` | PWA metadata: name, icons, colors, display mode |
| `sw.js` | Service worker — caches assets for offline use |
| `icon-180.png` | Apple touch icon (home-screen icon on iOS) |
| `icon-192.png` / `icon-512.png` | PWA icons (Android / install prompts) |

Pure static site — no dependencies, no build.
