# StockLens deployment checklist

## Vercel
1. Push this folder to GitHub.
2. Import the repository into Vercel.
3. Set `NEXT_PUBLIC_BASE_RPC_URL` (default: `https://mainnet.base.org`).
4. Keep `NEXT_PUBLIC_STOCKLENS_DEMO=true` for the first deploy if you have not yet populated the verified registry.
5. For live wallet reads, set `NEXT_PUBLIC_STOCKLENS_REGISTRY_JSON` with the exact token addresses verified against the current official Base stocks page.
6. Optionally set `OPENAI_API_KEY` and `OPENAI_MODEL` for an external explainer integration. The MVP remains functional without it.
7. Deploy.

## Render
Use `render.yaml` or create a Node Web Service with:
- Build: `npm install && npm run build`
- Start: `npm start`

## Before enabling live positions
- Verify every token address against `https://brand.base.org/stocks`.
- Verify the B20 ABI/version against the current Base B20 docs.
- Verify price-feed addresses if adding live Chainlink prices.
- Confirm jurisdiction/eligibility copy before any public launch.
- Keep U.S.-user trading absent from this quest MVP.

## Demo path
The demo data is intentionally self-contained and is used when no live registry is supplied. It mirrors the product board's information architecture and makes every screen usable without a wallet.
