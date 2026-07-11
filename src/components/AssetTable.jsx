import { useNavigate } from "react-router-dom";
import { formatCurrency, formatCompactCurrency, formatPercent } from "../utils/format";
import { buildLinePath } from "../utils/chart";
import useWatchlist from "../hooks/useWatchlist";

const StarButton = ({ watched, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={watched ? "Remove from watchlist" : "Add to watchlist"}
    aria-pressed={watched}
    className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/5"
  >
    <svg width="17" height="17" viewBox="0 0 24 24" fill={watched ? "#4C7FF7" : "none"}>
      <path
        d="M12 3l2.6 5.6 6.1.6-4.5 4.2 1.2 6.1L12 16.8 6.6 19.5l1.2-6.1-4.5-4.2 6.1-.6L12 3z"
        stroke={watched ? "#4C7FF7" : "#8A93A6"}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

const AssetTable = ({ coins, loading, emptyMessage }) => {
  const navigate = useNavigate();
  const { isWatched, toggle } = useWatchlist();

  if (loading) {
    return (
      <div className="divide-y divide-white/[0.05]">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-16 animate-pulse bg-white/[0.02]" />
        ))}
      </div>
    );
  }

  if (!coins.length) {
    return <div className="px-6 py-12 text-center text-sm text-muted">{emptyMessage}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[860px] border-collapse text-left">
        <thead>
          <tr className="border-b border-white/[0.06] text-[11px] font-bold uppercase tracking-wider text-muted">
            <th className="w-11 px-6 py-2.5 font-bold">#</th>
            <th className="px-2 py-2.5 font-bold">Asset</th>
            <th className="px-2 py-2.5 text-right font-bold">Price</th>
            <th className="px-2 py-2.5 text-right font-bold">24h</th>
            <th className="px-2 py-2.5 text-right font-bold">Market Cap</th>
            <th className="px-2 py-2.5 text-right font-bold">Volume</th>
            <th className="w-[110px] px-2 py-2.5 text-right font-bold">7d</th>
            <th className="w-9 px-2 py-2.5" />
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => {
            const change = coin.price_change_percentage_24h ?? 0;
            const isPositive = change >= 0;
            const sparkline = coin.sparkline_in_7d?.price;
            const sparklinePositive =
              sparkline && sparkline.length ? sparkline[sparkline.length - 1] >= sparkline[0] : isPositive;
            const watched = isWatched(coin.id);

            return (
              <tr
                key={coin.id}
                onClick={() => navigate(`/coin/${coin.id}`)}
                className="cursor-pointer border-b border-white/[0.04] transition hover:bg-white/[0.03]"
              >
                <td className="px-6 py-4 text-[13px] text-muted">{coin.market_cap_rank}</td>
                <td className="px-2 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">{coin.name}</p>
                      <p className="text-[11px] tracking-wide text-muted">
                        {coin.symbol?.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-4 text-right font-display text-sm font-bold tabular-nums">
                  {formatCurrency(coin.current_price)}
                </td>
                <td className="px-2 py-4 text-right">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                      isPositive ? "bg-success/[0.13] text-success" : "bg-danger/[0.13] text-danger"
                    }`}
                  >
                    {formatPercent(change)}
                  </span>
                </td>
                <td className="px-2 py-4 text-right text-[13px] tabular-nums text-subtle">
                  {formatCompactCurrency(coin.market_cap)}
                </td>
                <td className="px-2 py-4 text-right text-[13px] tabular-nums text-subtle">
                  {formatCompactCurrency(coin.total_volume)}
                </td>
                <td className="px-2 py-4">
                  {sparkline?.length ? (
                    <svg width="100" height="32" viewBox="0 0 100 32" className="ml-auto">
                      <path
                        d={buildLinePath(sparkline, 100, 32)}
                        fill="none"
                        stroke={sparklinePositive ? "#2FBF83" : "#F0576B"}
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </td>
                <td className="px-2 py-4" onClick={(event) => event.stopPropagation()}>
                  <StarButton watched={watched} onClick={() => toggle(coin.id)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AssetTable;
