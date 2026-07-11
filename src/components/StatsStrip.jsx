const StatsStrip = ({ stats }) => (
  <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {stats.map((stat) => (
      <article
        key={stat.label}
        className="rounded-2xl border border-white/[0.07] bg-surface p-5"
      >
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted">{stat.label}</p>
        <p className="mt-2.5 font-display text-2xl font-bold tabular-nums">{stat.value}</p>
        <span
          className={`mt-2.5 inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
            stat.tone === "positive"
              ? "bg-success/[0.13] text-success"
              : stat.tone === "negative"
              ? "bg-danger/[0.13] text-danger"
              : "bg-accent/[0.13] text-accent"
          }`}
        >
          {stat.change}
        </span>
      </article>
    ))}
  </section>
);

export default StatsStrip;
