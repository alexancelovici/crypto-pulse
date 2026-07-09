const StatsStrip = ({ stats }) => (
  <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {stats.map((stat) => (
      <article
        key={stat.label}
        className="rounded-2xl border border-white/10 bg-[#121A2B] p-5"
      >
        <p className="text-sm text-slate-400">{stat.label}</p>
        <p className="mt-3 text-2xl font-semibold text-white">{stat.value}</p>
        <p className="mt-2 text-sm text-sky-200/80">{stat.change}</p>
      </article>
    ))}
  </section>
);

export default StatsStrip;
