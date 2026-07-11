import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import StatsStrip from "../components/StatsStrip";
import AssetTable from "../components/AssetTable";
import { formatCompactCurrency, formatPercent } from "../utils/format";

const HomePage = () => {
  const { search, coins, loading } = useOutletContext();

  const dashboardStats = useMemo(() => {
    if (!coins.length) {
      return [
        { label: "Market Cap", value: "$0", change: "Tracking live pricing", tone: "neutral" },
        { label: "24h Volume", value: "$0", change: "Across major assets", tone: "neutral" },
        { label: "BTC Dominance", value: "0%", change: "Share of tracked market", tone: "neutral" },
        { label: "Gainers (24h)", value: "0", change: "Trending positive", tone: "neutral" },
      ];
    }

    const totalMarketCap = coins.reduce((sum, coin) => sum + (coin.market_cap ?? 0), 0);
    const totalVolume = coins.reduce((sum, coin) => sum + (coin.total_volume ?? 0), 0);
    const btcMarketCap =
      coins.find((coin) => coin.symbol?.toLowerCase() === "btc")?.market_cap ?? 0;
    const btcDominance = totalMarketCap ? (btcMarketCap / totalMarketCap) * 100 : 0;
    const gainers = coins.filter((coin) => (coin.price_change_percentage_24h ?? 0) > 0).length;
    const averageChange =
      coins.reduce((sum, coin) => sum + (coin.price_change_percentage_24h ?? 0), 0) /
      coins.length;

    return [
      {
        label: "Market Cap",
        value: formatCompactCurrency(totalMarketCap),
        change: `${formatPercent(averageChange)} avg 24h`,
        tone: averageChange >= 0 ? "positive" : "negative",
      },
      {
        label: "24h Volume",
        value: formatCompactCurrency(totalVolume),
        change: "Across tracked assets",
        tone: "neutral",
      },
      {
        label: "BTC Dominance",
        value: `${btcDominance.toFixed(1)}%`,
        change: "Share of market",
        tone: "neutral",
      },
      {
        label: "Gainers (24h)",
        value: `${gainers} / ${coins.length}`,
        change: "Trending positive",
        tone: "positive",
      },
    ];
  }, [coins]);

  const filteredCoins = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return coins;
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(query) || coin.symbol.toLowerCase().includes(query)
    );
  }, [coins, search]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-[28px] font-bold">Overview</h1>
        <p className="mt-1.5 text-sm text-subtle">
          Updated moments ago · {coins.length} assets tracked
        </p>
      </div>

      <StatsStrip stats={dashboardStats} />

      <section className="rounded-[20px] border border-white/[0.07] bg-surface">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5">
          <p className="text-[15px] font-bold">Assets</p>
          <span className="text-xs text-muted">{filteredCoins.length} assets</span>
        </div>
        <AssetTable
          coins={filteredCoins}
          loading={loading}
          emptyMessage={`No assets match "${search}".`}
        />
      </section>
    </div>
  );
};

export default HomePage;
