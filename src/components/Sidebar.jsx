import { NavLink } from "react-router-dom";

const navItems = [
  {
    to: "/",
    label: "Overview",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    to: "/watchlist",
    label: "Watchlist",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3l2.6 5.6 6.1.6-4.5 4.2 1.2 6.1L12 16.8 6.6 19.5l1.2-6.1-4.5-4.2 6.1-.6L12 3z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const navLinkClasses = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
    isActive ? "bg-accent/15 text-accent" : "text-subtle hover:bg-white/5 hover:text-slate-100"
  }`;

const Sidebar = () => (
  <aside className="hidden w-[232px] flex-shrink-0 flex-col border-r border-white/[0.06] bg-sidebar md:flex">
    <NavLink to="/" className="flex h-[72px] items-center gap-3 border-b border-white/[0.06] px-6">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-accent">
        <span className="font-display text-sm font-bold text-canvas">CP</span>
      </div>
      <div>
        <p className="text-[15px] font-bold leading-tight">CryptoPulse</p>
        <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
          Pro Terminal
        </p>
      </div>
    </NavLink>

    <nav className="flex flex-col gap-1 p-3">
      {navItems.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.to === "/"} className={navLinkClasses}>
          {item.icon}
          {item.label}
        </NavLink>
      ))}
    </nav>

    <div className="mt-auto border-t border-white/[0.06] px-5 py-4">
      <p className="flex items-center gap-2 text-xs text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-success" />
        Live data via CoinGecko
      </p>
    </div>
  </aside>
);

export default Sidebar;
