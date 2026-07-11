import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useFetchCoinDetail from "../hooks/useFetchCoinDetail";
import useFetchCoinHistory from "../hooks/useFetchCoinHistory";
import useWatchlist from "../hooks/useWatchlist";
import { buildAreaPath, buildLinePath } from "../utils/chart";
import { formatCompactCurrency, formatCurrency, formatPercent } from "../utils/format";

const RANGES = [
  { key: "24H", days: 1 },
  { key: "7D", days: 7 },
  { key: "1M", days: 30 },
  { key: "3M", days: 90 },
  { key: "1Y", days: 365 },
];

const CHART_WIDTH = 760;
const CHART_HEIGHT = 240;

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { coin, loading } = useFetchCoinDetail(id);
  const { isWatched, toggle } = useWatchlist();
  const [range, setRange] = useState("7D");

  const activeRange = RANGES.find((option) => option.key === range) ?? RANGES[1];
  const { historyData, loading: historyLoading } = useFetchCoinHistory(id, activeRange.days);

  useEffect(() => {
    if (!loading && !coin) {
      const timeout = setTimeout(() => navigate("/"), 3000);
      return () => clearTimeout(timeout);
    }
  }, [loading, coin, navigate]);

  if (loading) {
    return <p className="text-center text-sm text-subtle">Loading coin details…</p>;
  }

  if (!coin) {
    return (
      <div className="text-center text-danger">
        <p className="font-bold">Coin not found.</p>
        <p className="mt-2 text-sm text-subtle">Redirecting to Overview…</p>
      </div>
    );
  }

  const price = coin.market_data?.current_price?.usd;
  const change = coin.market_data?.price_change_percentage_24h ?? 0;
  const isPositive = change >= 0;
  const watched = isWatched(coin.id);
  const prices = historyData.map((point) => point[1]);
  const linePath = buildLinePath(prices, CHART_WIDTH, CHART_HEIGHT, 12);
  const areaPath = buildAreaPath(linePath, CHART_WIDTH, CHART_HEIGHT);

  const coinStats = [
    { label: "Market Cap", value: formatCompactCurrency(coin.market_data?.market_cap?.usd) },
    { label: "24h Volume", value: formatCompactCurrency(coin.market_data?.total_volume?.usd) },
    {
      label: "Circulating Supply",
      value: coin.market_data?.circulating_supply
        ? `${coin.market_data.circulating_supply.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })} ${coin.symbol?.toUpperCase()}`
        : "—",
    },
    { label: "All-Time High", value: formatCurrency(coin.market_data?.ath?.usd) },
  ];

  return (
    <div className="flex max-w-[920px] flex-col gap-6">
      <Link to="/" className="flex w-fit items-center gap-1.5 text-sm font-semibold text-subtle hover:text-slate-100">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to Overview
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img src={coin.image?.large} alt={coin.name} className="h-[52px] w-[52px] rounded-full" />
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-2xl font-bold">{coin.name}</h1>
              <span className="rounded-full border border-white/[0.08] bg-surface px-2.5 py-1 text-xs font-bold text-muted">
                {coin.symbol?.toUpperCase()}
              </span>
              <span className="text-xs font-bold text-muted">Rank #{coin.market_cap_rank}</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => toggle(coin.id)}
          className={`flex items-center gap-2 rounded-full px-4 py-2.5 transition ${
            watched
              ? "bg-accent/[0.14] text-accent"
              : "border border-white/[0.08] bg-surface text-subtle hover:text-slate-100"
          }`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={watched ? "#4C7FF7" : "none"}>
            <path
              d="M12 3l2.6 5.6 6.1.6-4.5 4.2 1.2 6.1L12 16.8 6.6 19.5l1.2-6.1-4.5-4.2 6.1-.6L12 3z"
              stroke={watched ? "#4C7FF7" : "#8A93A6"}
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[13px] font-bold">{watched ? "Watching" : "Watch"}</span>
        </button>
      </div>

      <div className="flex flex-wrap items-baseline gap-3.5">
        <span className="font-display text-[42px] font-bold tabular-nums">
          {formatCurrency(price)}
        </span>
        <span
          className={`inline-flex rounded-full px-3 py-1.5 text-[13px] font-bold ${
            isPositive ? "bg-success/[0.13] text-success" : "bg-danger/[0.13] text-danger"
          }`}
        >
          {formatPercent(change)}
        </span>
        <span className="text-xs text-muted">24h change</span>
      </div>

      <div className="flex w-fit gap-1 rounded-xl border border-white/[0.07] bg-surface p-1">
        {RANGES.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => setRange(option.key)}
            className={`rounded-[9px] px-4 py-1.5 text-[13px] font-bold transition ${
              option.key === range ? "bg-accent text-canvas" : "text-subtle hover:text-slate-100"
            }`}
          >
            {option.key}
          </button>
        ))}
      </div>

      <div className="rounded-[20px] border border-white/[0.07] bg-surface p-6">
        {historyLoading ? (
          <div className="h-[240px] animate-pulse rounded-xl bg-white/[0.03]" />
        ) : prices.length ? (
          <svg
            width="100%"
            height={CHART_HEIGHT}
            viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4C7FF7" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#4C7FF7" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#chartFill)" stroke="none" />
            <path
              d={linePath}
              fill="none"
              stroke="#4C7FF7"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <p className="py-16 text-center text-sm text-muted">
            Price history is unavailable for this range.
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {coinStats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/[0.07] bg-surface p-4.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
              {stat.label}
            </p>
            <p className="mt-2 font-display text-lg font-bold tabular-nums">{stat.value}</p>
          </div>
        ))}
      </div>

      {coin.description?.en ? (
        <div className="rounded-[20px] border border-white/[0.07] bg-surface p-6">
          <p className="mb-3 text-[15px] font-bold">About {coin.name}</p>
          <p
            className="text-sm leading-7 text-subtle"
            dangerouslySetInnerHTML={{
              __html: coin.description.en.split(". ")[0]?.concat("."),
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default DetailPage;
