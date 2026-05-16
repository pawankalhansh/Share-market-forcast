# Market Oracle — Sensex & Nifty Forecast

This repository contains the standalone Market Oracle page and a small proxy server used to fetch live market data.

## Structure

- `sensex-forecast/` — static page for Sensex and Nifty forecast analysis
- `proxy-server/` — simple Express proxy for Finnhub quote and news requests
- `README.md` — this project documentation

## Usage

### Run the proxy server

1. Open a terminal:
   ```bash
   cd proxy-server
   npm install
   ```
2. Set your Finnhub API key and start the proxy:
   ```bash
   set FINNHUB_API_KEY=your_api_key_here
   npm start
   ```
3. Configure `sensex-forecast/index.html`:
   - Set `SERVER_PROXY_BASE` to your proxy URL, for example `http://localhost:4000`
   - This enables live quote and news fetching through the proxy.

### Open the static forecast page

Open `sensex-forecast/index.html` in a browser to view the Market Oracle page.

## Deployment

The `sensex-forecast` page can be hosted as a static site, such as GitHub Pages.

### GitHub Pages deployment

1. Push this repository to GitHub.
2. Ensure `sensex-forecast/index.html` is accessible from the published branch.
3. If using `SERVER_PROXY_BASE`, deploy `proxy-server` separately to a hosting service that supports Node.js.

## Notes

- The page has a local forecast simulation mode and an optional live mode.
- Live live mode uses the proxy server to avoid browser CORS restrictions.
- The direct Finnhub API key in `sensex-forecast/index.html` is only for fallback and should not be relied on in production.

## Existing content

If the repository also contains other projects or a React app in the root, the primary Market Oracle deliverable is in `sensex-forecast/`.
