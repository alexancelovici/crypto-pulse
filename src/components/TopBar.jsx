import { NavLink } from "react-router-dom";

const mobileNavLinkClasses = ({ isActive }) =>
  `rounded-full px-3 py-1.5 text-xs font-semibold transition ${
    isActive ? "bg-accent/15 text-accent" : "text-subtle hover:text-slate-100"
  }`;

const TopBar = ({ search, onSearchChange, onRefresh, refreshing }) => (
  <header className="flex h-[72px] flex-shrink-0 items-center justify-between gap-4 border-b border-white/[0.06] px-4 sm:px-8">
    <nav className="flex items-center gap-1 md:hidden">
      <NavLink to="/" end className={mobileNavLinkClasses}>
        Overview
      </NavLink>
      <NavLink to="/watchlist" className={mobileNavLinkClasses}>
        Watchlist
      </NavLink>
    </nav>

    <div className="flex w-full max-w-[340px] items-center gap-2.5 rounded-full border border-white/[0.07] bg-surface px-4 py-2.5">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
        <circle cx="11" cy="11" r="7" stroke="#5C6478" strokeWidth="2" />
        <path d="M21 21l-4.3-4.3" stroke="#5C6478" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search markets…"
        className="w-full bg-transparent text-[13px] text-slate-100 outline-none placeholder:text-muted"
      />
    </div>

    <div className="flex flex-shrink-0 items-center gap-3">
      <span className="rounded-full border border-white/[0.07] bg-surface px-3.5 py-1.5 text-xs font-bold text-subtle">
        USD
      </span>
      <button
        type="button"
        onClick={onRefresh}
        aria-label="Refresh prices"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.07] bg-surface text-subtle transition hover:text-accent disabled:opacity-50"
        disabled={refreshing}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className={refreshing ? "animate-spin" : ""}
        >
          <path
            d="M3 12a9 9 0 0 1 15.36-6.36L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.36 6.36L3 16M3 21v-5h5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  </header>
);

export default TopBar;
