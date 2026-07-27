# CryptoPulse

A responsive cryptocurrency market dashboard built with React. CryptoPulse combines live CoinGecko market data, sortable asset views, sparklines, detailed price charts, and a persistent local watchlist in a terminal-inspired interface.

[Open the live application](https://effortless-panda-51cfeb.netlify.app)

## Highlights

- Live market data for leading cryptocurrencies
- Sortable asset table with price movement and sparklines
- Detailed coin views with selectable chart ranges
- Watchlist persisted in the browser with `localStorage`
- Loading and error states for external API requests
- Responsive dashboard layout
- SPA routing configured for Netlify

## Tech stack

- React 19
- Vite
- Tailwind CSS 4
- React Router
- Axios
- Chart.js
- CoinGecko API
- Netlify

## Run locally

Requirements: a current Node.js LTS release and npm.

```bash
git clone https://github.com/alexancelovici/crypto-pulse.git
cd crypto-pulse
npm install
npm run dev
```

Open the local URL printed by Vite.

## Quality checks

```bash
npm run lint
npm run build
```

## Architecture

```text
src/
├── components/   # Shared interface components
├── hooks/        # Market-data fetching and reusable state
├── pages/        # Dashboard, watchlist, and asset detail views
├── router/       # Client-side routes
├── App.jsx
└── main.jsx
```

The application keeps network logic in custom hooks and UI behavior in focused React components. CoinGecko remains the source of truth for market information; availability and rate limits depend on its public API.

## Deployment

The production build is hosted on Netlify. The repository includes an SPA redirect rule so deep links resolve through the React application.

## Author

Built by [Alex Ancelovici](https://github.com/alexancelovici).
