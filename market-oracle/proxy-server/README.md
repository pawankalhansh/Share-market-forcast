# Market Oracle Proxy Server

This simple Express proxy server forwards Finnhub quote and news requests to avoid browser CORS restrictions.

## Setup

1. Install dependencies:
   ```bash
   cd proxy-server
   npm install
   ```

2. Set your Finnhub API key and start the server:
   ```bash
   set FINNHUB_API_KEY=your_api_key_here
   npm start
   ```

3. Configure `sensex-forecast/index.html`:
   - Set `SERVER_PROXY_BASE` to your proxy URL, e.g. `http://localhost:4000`.
   - The page will use the proxy for `/api/quote` and `/api/news`.
