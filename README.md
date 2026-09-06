# StockLens

**The intelligence layer for Coinbase Tokenized Stocks on Base.**

StockLens turns raw B20 balances into understandable economic positions: raw balance, multiplier, derived share-equivalent exposure, portfolio concentration, verified event context, grounded explanations and safe simulations.

## What is included

- Premium dark fintech/onchain UI inspired by the supplied reference board.
- Landing page + demo mode.
- Base wallet connection using wagmi/viem.
- Network gate for Base.
- Portfolio dashboard.
- Position detail + B20 multiplier monitor + calculation drawer.
- Verified event detail.
- Grounded explainer API with deterministic fallback.
- What-if simulator that never signs or sends transactions.
- Settings / eligibility / source links.
- Configurable live asset registry and Chainlink price-feed support hooks.
- Vercel + Render deployment files.

## Important live-data note

The public Base stocks page is the authoritative source for the current Coinbase Tokenized Stock list and contract addresses. The repo intentionally does **not** invent or copy incomplete addresses from screenshots/search snippets. Before enabling live reads, populate `NEXT_PUBLIC_STOCKLENS_REGISTRY_JSON` from the current official Base stocks page and verify every address against the official source.

### Registry shape

```json
[
  {
    "id":"aapl",
    "symbol":"AAPLc",
    "name":"Apple",
    "tokenAddress":"0x...",
    "decimals":18,
    "issuer":"Coinbase",
    "verified":true,
    "sourceUrl":"https://brand.base.org/stocks",
    "priceFeed":"0x...",
    "icon":"",
    "color":"#dbeafe"
  }
]
```

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

Demo mode works without a wallet or API key.

## Deployment

### Vercel

Import the repo, set environment variables from `.env.example`, then deploy. `npm run build` is the build command and `npm start` is the start command.

### Render

Use the included `render.yaml` or create a Web Service with build command `npm ci && npm run build` and start command `npm start`.

## Guardrails

- Never request private keys, seed phrases or exchange passwords.
- Read-first MVP; no transaction execution.
- No U.S.-user trading flow.
- No investment recommendations.
- Never infer a multiplier from price movement.
- Missing price/event data is shown as unavailable rather than fabricated.
- Hypothetical outputs are clearly labeled as simulations.

## Source basis

The product direction follows the supplied StockLens Builder Quest Complete Build Pack. The B20 calculation model follows the current Base B20 documentation: raw balances remain separate from a WAD multiplier, and the multiplier scales the UI/derived view.
