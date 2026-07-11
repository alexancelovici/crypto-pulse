import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import AssetTable from "../components/AssetTable";
import useWatchlist from "../hooks/useWatchlist";

const WatchlistPage = () => {
  const { search, coins, loading } = useOutletContext();
  const { ids } = useWatchlist();

  const filteredCoins = useMemo(() => {
    const watched = coins.filter((coin) => ids.includes(coin.id));
    const query = search.trim().toLowerCase();
    if (!query) return watched;
    return watched.filter(
      (coin) =>
        coin.name.toLowerCase().includes(query) || coin.symbol.toLowerCase().includes(query)
    );
  }, [coins, ids, search]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-[28px] font-bold">Watchlist</h1>
        <p className="mt-1.5 text-sm text-subtle">
          {filteredCoins.length} asset{filteredCoins.length === 1 ? "" : "s"} you&apos;re tracking
        </p>
      </div>

      <section className="rounded-[20px] border border-white/[0.07] bg-surface">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5">
          <p className="text-[15px] font-bold">Watched Assets</p>
          <span className="text-xs text-muted">{filteredCoins.length} assets</span>
        </div>
        <AssetTable
          coins={filteredCoins}
          loading={loading}
          emptyMessage={
            ids.length
              ? `No watched assets match "${search}".`
              : "Star an asset from Overview to add it to your watchlist."
          }
        />
      </section>
    </div>
  );
};

export default WatchlistPage;
