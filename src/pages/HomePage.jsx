import { useMemo } from "react";
import HeroSection from "../components/HeroSection";
import StatsStrip from "../components/StatsStrip";
import CoinCard from "../components/CoinCard";
import useFetchCoins from "../hooks/useFetchCoins";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  }).format(value ?? 0);

const formatCompactCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value ?? 0);

const formatPercent = (value) => {
  const normalizedValue = value ?? 0;
  const sign = normalizedValue > 0 ? "+" : "";

  return `${sign}${normalizedValue.toFixed(2)}%`;
};

const HomePage = () => {
  const { coins, loading } = useFetchCoins();

  const dashboardStats = useMemo(() => {
    if (!coins.length) {
      return [
        {
          label: "Market Cap",
          value: "$0",
          change: "Tracking live pricing",
        },
        {
          label: "24h Volume",
          value: "$0",
          change: "Across major assets",
        },
        {
          label: "BTC Dominance",
          value: "0%",
          change: "Share of tracked market",
        },
        {
          label: "Top Movers",
          value: "0",
          change: "Coins up over 5%",
        },
      ];
    }

    const totalMarketCap = coins.reduce(
      (sum, coin) => sum + (coin.market_cap ?? 0),
      0
    );
    const totalVolume = coins.reduce(
      (sum, coin) => sum + (coin.total_volume ?? 0),
      0
    );
    const btcMarketCap =
      coins.find((coin) => coin.symbol?.toLowerCase() === "btc")?.market_cap ?? 0;
    const btcDominance = totalMarketCap ? (btcMarketCap / totalMarketCap) * 100 : 0;
    const topMovers = coins.filter(
      (coin) => (coin.price_change_percentage_24h ?? 0) > 5
    ).length;
    const averageChange =
      coins.reduce(
        (sum, coin) => sum + (coin.price_change_percentage_24h ?? 0),
        0
      ) / coins.length;

    return [
      {
        label: "Market Cap",
        value: formatCompactCurrency(totalMarketCap),
        change: `${formatPercent(averageChange)} avg 24h`,
      },
      {
        label: "24h Volume",
        value: formatCompactCurrency(totalVolume),
        change: "Live aggregate flow",
      },
      {
        label: "BTC Dominance",
        value: `${btcDominance.toFixed(1)}%`,
        change: "Among tracked coins",
      },
      {
        label: "Top Movers",
        value: `${topMovers}`,
        change: "Coins up over 5%",
      },
    ];
  }, [coins]);

  const spotlightCoins = useMemo(
    () =>
      coins.slice(0, 6).map((coin) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image,
        price: formatCurrency(coin.current_price),
        marketCap: formatCompactCurrency(coin.market_cap),
        volume: formatCompactCurrency(coin.total_volume),
        change: coin.price_change_percentage_24h ?? 0,
        rank: coin.market_cap_rank,
      })),
    [coins]
  );

  return (
    <div className="min-h-screen bg-[#0B1020] text-slate-100">
      <div className="absolute inset-x-0 top-0 -z-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(91,95,255,0.22),transparent_42%),radial-gradient(circle_at_right,rgba(56,189,248,0.14),transparent_30%)]" />

      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-14 pt-6 sm:px-6 lg:px-8">
        <HeroSection coins={coins} loading={loading} />
        <StatsStrip stats={dashboardStats} />

        <section
          id="markets"
          className="rounded-3xl border border-white/10 bg-[#121A2B]/80 p-6 shadow-[0_20px_80px_rgba(7,11,22,0.45)] backdrop-blur"
        >
          <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-sky-300/70">
                Popular Coins
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Market leaders worth watching
              </h2>
            </div>
            <p className="max-w-xl text-sm text-slate-400">
              A compact view of the largest crypto assets by market cap, with quick
              links into detail pages and charts.
            </p>
          </div>

          {loading ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-64 animate-pulse rounded-2xl border border-white/10 bg-white/5"
                />
              ))}
            </div>
          ) : spotlightCoins.length ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {spotlightCoins.map((coin) => (
                <CoinCard key={coin.id} coin={coin} />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-white/5 px-6 py-10 text-center text-slate-400">
              Live market data is unavailable right now. Please try again in a moment.
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
