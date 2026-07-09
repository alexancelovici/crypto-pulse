const HeroSection = ({ coins, loading }) => {
  const topCoin = coins[0];
  const gainers = coins.filter(
    (coin) => (coin.price_change_percentage_24h ?? 0) > 0
  ).length;

  return (
    <section className="grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
      <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#121A2B] p-6 shadow-[0_24px_80px_rgba(7,11,22,0.45)] sm:p-8">
        <div className="inline-flex rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.28em] text-sky-200">
          Market Overview
        </div>

        <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
          Track crypto momentum with a cleaner, faster dashboard.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
          Monitor top assets, scan momentum, and jump into coin-level details from
          one polished workspace built for daily market checks.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#markets"
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-950/30 transition hover:opacity-90"
          >
            Explore markets
          </a>
          <a
            href="#insights"
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
          >
            View insights
          </a>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="rounded-[28px] border border-white/10 bg-[#121A2B] p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-400">Top asset</p>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              Live
            </span>
          </div>

          {loading ? (
            <div className="mt-6 h-28 animate-pulse rounded-2xl bg-white/5" />
          ) : topCoin ? (
            <div className="mt-6">
              <div className="flex items-center gap-3">
                <img
                  src={topCoin.image}
                  alt={topCoin.name}
                  className="h-12 w-12 rounded-full ring-1 ring-white/10"
                />
                <div>
                  <p className="text-xl font-semibold text-white">{topCoin.name}</p>
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                    {topCoin.symbol}
                  </p>
                </div>
              </div>
              <p className="mt-6 text-3xl font-semibold text-white">
                ${topCoin.current_price?.toLocaleString()}
              </p>
              <p
                className={`mt-2 text-sm font-medium ${
                  (topCoin.price_change_percentage_24h ?? 0) >= 0
                    ? "text-emerald-300"
                    : "text-rose-300"
                }`}
              >
                {(topCoin.price_change_percentage_24h ?? 0) >= 0 ? "+" : ""}
                {(topCoin.price_change_percentage_24h ?? 0).toFixed(2)}% in the last
                24 hours
              </p>
            </div>
          ) : (
            <p className="mt-6 text-sm text-slate-400">
              Live pricing will appear here once the feed is available.
            </p>
          )}
        </div>

        <div
          id="insights"
          className="rounded-[28px] border border-white/10 bg-gradient-to-br from-indigo-500/15 via-transparent to-sky-400/10 p-6"
        >
          <p className="text-sm font-medium text-slate-300">Pulse snapshot</p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-3xl font-semibold text-white">{coins.length || 10}</p>
              <p className="mt-1 text-sm text-slate-400">Tracked assets</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white">{gainers}</p>
              <p className="mt-1 text-sm text-slate-400">24h gainers</p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-6 text-slate-400">
            Spot where capital is concentrating, compare leaders quickly, and move
            into deeper coin views without leaving the dashboard.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
