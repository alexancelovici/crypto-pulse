import { Link } from "react-router-dom";

const CoinCard = ({ coin }) => {
  const isPositive = coin.change >= 0;

  return (
    <article className="group rounded-2xl border border-white/10 bg-[#121A2B] p-5 transition duration-300 hover:-translate-y-1 hover:border-sky-400/30 hover:bg-[#162138]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={coin.image}
            alt={coin.name}
            className="h-12 w-12 rounded-full ring-1 ring-white/10"
          />
          <div>
            <p className="text-lg font-semibold text-white">{coin.name}</p>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
              {coin.symbol}
            </p>
          </div>
        </div>

        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
          #{coin.rank}
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">Price</p>
          <p className="mt-1 text-2xl font-semibold text-white">{coin.price}</p>
        </div>
        <div
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            isPositive
              ? "bg-emerald-500/10 text-emerald-300"
              : "bg-rose-500/10 text-rose-300"
          }`}
        >
          {isPositive ? "+" : ""}
          {coin.change.toFixed(2)}%
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Market Cap
          </p>
          <p className="mt-2 text-sm font-medium text-slate-200">{coin.marketCap}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Volume
          </p>
          <p className="mt-2 text-sm font-medium text-slate-200">{coin.volume}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          to={`/coin/${coin.id}`}
          className="flex-1 rounded-xl border border-white/10 bg-white px-4 py-3 text-center text-sm font-medium text-slate-950 transition hover:bg-slate-100"
        >
          View Details
        </Link>
        <Link
          to={`/chart/${coin.id}`}
          className="flex-1 rounded-xl border border-sky-400/20 bg-sky-400/10 px-4 py-3 text-center text-sm font-medium text-sky-200 transition hover:bg-sky-400/15"
        >
          Open Chart
        </Link>
      </div>
    </article>
  );
};

export default CoinCard;
