import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY || '';

if (!FINNHUB_API_KEY) {
  console.error('Missing FINNHUB_API_KEY environment variable.');
  process.exit(1);
}

app.use(cors());
app.use(express.json());

app.get('/api/quote', async (req, res) => {
  const symbol = req.query.symbol;
  if (!symbol) return res.status(400).json({ error: 'symbol query parameter is required' });

  try {
    const endpoint = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    console.error('Quote proxy error', err);
    return res.status(500).json({ error: 'Proxy fetch failed' });
  }
});

app.get('/api/news', async (req, res) => {
  try {
    const endpoint = `https://finnhub.io/api/v1/news?category=general&token=${FINNHUB_API_KEY}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    console.error('News proxy error', err);
    return res.status(500).json({ error: 'Proxy fetch failed' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});
