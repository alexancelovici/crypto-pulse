import { Link, NavLink } from "react-router-dom";

const navItems = [
  { label: "Markets", href: "/#markets" },
  { label: "Insights", href: "/#insights" },
];

const Navbar = () => (
  <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0B1020]/80 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <Link to="/" className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-400 shadow-lg shadow-indigo-500/20">
          <span className="text-sm font-semibold text-white">CP</span>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-sky-300/70">
            Crypto Dashboard
          </p>
          <p className="text-lg font-semibold text-white">CryptoPulse</p>
        </div>
      </Link>

      <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `rounded-full px-4 py-2 text-sm transition ${
              isActive
                ? "bg-white text-slate-950"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          Overview
        </NavLink>
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <Link
        to="/"
        className="inline-flex items-center rounded-full border border-white/10 bg-gradient-to-r from-indigo-500 to-sky-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-900/30 transition hover:opacity-90"
      >
        Live Markets
      </Link>
    </div>
  </header>
);

export default Navbar;
