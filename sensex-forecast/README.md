# Market Oracle — Sensex & Nifty AI Forecaster

This repository contains the standalone Market Oracle landing page for Sensex and Nifty forecasting.

## Files
- `index.html` — full static Market Oracle page
- `styles.css` — unused stylesheet (the page uses inline styles)
- `README.md` — this project description

## Usage
Open `index.html` in a browser to view the page.

## Deployment
This repo is configured for GitHub Pages from the `main` branch root.

The published site should be:
- `https://pawankalhansh.github.io/Share-market-forcast/`

## Notes
- The page is a static HTML dashboard based on your original Market Oracle design.
- The `RUN MARKET ANALYSIS` button now uses a local forecast simulation and does not require the Claude API.
- For live market quotes and news, the page can use a server-side proxy at `SERVER_PROXY_BASE` to avoid browser CORS restrictions.
