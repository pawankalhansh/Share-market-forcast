# 📡 Share Market Forecast
**AI-Powered Sensex & Nifty 50 Forecaster**

![Live](https://img.shields.io/badge/Live-GitHub%20Pages-brightgreen?style=for-the-badge&logo=github)
![AI](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-blue?style=for-the-badge&logo=google)
![Data](https://img.shields.io/badge/Data-Yahoo%20Finance-purple?style=for-the-badge)
![Built with Claude](https://img.shields.io/badge/Built%20with-Claude%20AI-orange?style=for-the-badge)
![PWA](https://img.shields.io/badge/PWA-Installable-teal?style=for-the-badge)

🔗 **[pawankalhansh.github.io/Share-market-forecast](https://pawankalhansh.github.io/Share-market-forecast/)**

---

## 🚀 Features

| Feature | Description |
|---|---|
| 📊 **Live Market Data** | Sensex & Nifty 50 real-time prices via Yahoo Finance |
| 🔮 **AI Forecast** | Tomorrow's upside/downside targets with confidence score |
| 🌐 **Global Markets** | Dow Jones, S&P 500, Nasdaq, Nikkei, Hang Seng, FTSE, DAX & more |
| 🔍 **Stock Search** | Search any NSE/BSE stock — live price shown instantly, click to open chart |
| 📈 **TradingView Charts** | Interactive live charts — switch between indices, stocks & commodities |
| 🏦 **Indian Banks** | HDFC, ICICI, SBI, Axis, Kotak & more in chart selector |
| 🌍 **Global Indices** | NASDAQ 100, S&P 500, Dow Jones, Hang Seng, Nikkei 225, FTSE 100, DAX |
| 🛢️ **Global Commodities** | Gold, Silver, Crude Oil (WTI), Natural Gas, Copper — live charts |
| 🤖 **AI Chatbot** | Gemini 2.5 Flash powered — answers in Hinglish |
| 📅 **Economic Calendar** | RBI MPC, FOMC, GDP & key market events |
| 🎯 **F&O Levels** | Call/Put resistance, Max Pain, Stop Loss levels |
| 💡 **Trading Strategy** | Intraday, Swing & Beginner mode strategies |
| 🌡️ **Market Sentiment** | AI gauge with Local + Global + News mood factors |
| 🌙 **3 Themes** | Midnight, Pro Light, Aurora |
| 🇮🇳 **Hinglish Mode** | Analysis output in Hindi-English mix |
| 📱 **PWA** | Installable as mobile/desktop app (works offline) |

---

## 📈 Chart Selector — What You Can View

```
📊 INDIAN INDEX
   └── SENSEX

🌍 GLOBAL INDICES
   ├── NASDAQ 100 (US)
   ├── S&P 500 (US)
   ├── DOW JONES (US)
   ├── HANG SENG (HK)
   ├── NIKKEI 225 (JP)
   ├── FTSE 100 (GB)
   └── DAX (GERMANY)

🛢️ GLOBAL COMMODITIES
   ├── GOLD (Spot)
   ├── SILVER (Spot)
   ├── CRUDE OIL (WTI)
   ├── NATURAL GAS
   └── COPPER

🏦 BANKS
   ├── HDFC BANK
   ├── ICICI BANK
   ├── SBI
   ├── AXIS BANK
   └── KOTAK BANK

💻 IT | 🚗 AUTO | 💊 PHARMA | 🍃 FMCG | ⚡ ENERGY | 🚀 NEW AGE TECH
```

---

## 🛠️ Tech Stack

```
Frontend    →  HTML5, CSS3, Vanilla JavaScript (single file, no framework)
Charts      →  TradingView Lightweight Widgets
Market Data →  Yahoo Finance API via Cloudflare Worker proxy
AI Chatbot  →  Google Gemini 2.5 Flash (via secure backend)
Backend     →  Cloudflare Workers (Edge serverless, zero cold start)
Hosting     →  GitHub Pages (free, static, CDN-backed)
PWA         →  Service Worker + Web App Manifest
Built with  →  Claude AI by Anthropic
```

---

## 🗂️ Project Structure

```
Share-market-forecast/
├── index.html          ← Main dashboard (complete single-page app)
├── manifest.json       ← PWA manifest (installable app config)
├── service-worker.js   ← PWA offline caching
├── styles.css          ← Extended styles
├── backend/            ← Cloudflare Worker source
│   └── worker.js       ← Secure market quotes + Gemini chat API
└── README.md           ← This file
```

---

## ⚡ Quick Start — Local Preview

```bash
# Clone the repo
git clone https://github.com/pawankalhansh/Share-market-forecast.git
cd Share-market-forecast

# Start local server (Python required)
py -m http.server 4173 --bind 127.0.0.1
```

Open in browser: **`http://127.0.0.1:4173/index.html`**

---

## ☁️ Backend Deployment (Cloudflare Worker)

The app runs in **simulation mode** without backend. For live AI chatbot + guaranteed market data:

**Step 1 — Deploy Worker:**
```bash
cd backend
npx wrangler deploy
```

**Step 2 — Add API secret:**
```bash
npx wrangler secret put GEMINI_API_KEY
```

**Step 3 — Set Worker URL in browser (one time):**
```js
localStorage.setItem('smf-api-base', 'https://your-worker.workers.dev')
```

> Current production Worker: `https://market-proxy.pawankalhansh.workers.dev`

---

## 🔒 Security

- ✅ No API keys in frontend code — all secrets via Cloudflare Worker
- ✅ No database, no login — stateless and privacy-first
- ✅ CORS handled server-side via dedicated Worker proxy
- ✅ Auto-deploy via GitHub Pages on every push to `main`

---

## ⚠️ Disclaimer

> This tool is for **educational purposes only.**
> Not SEBI-registered. Not financial advice.
> Always consult a certified financial advisor before trading.
> Past forecasts do not guarantee future results.

---

## 🤖 Built With Claude AI

This project was designed and developed using **[Claude AI by Anthropic](https://claude.ai)** — demonstrating what AI-assisted creation looks like for non-developers in 2025.

> *"Not replacing skills. Supercharging them."*

---

Made with ❤️ by [Pawan Kumar Singh](https://github.com/pawankalhansh) — ⭐ Star if useful!
