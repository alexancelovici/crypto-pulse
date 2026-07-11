import { Link } from "react-router-dom";

const ErrorPage = () => (
  <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
    <h1 className="font-display text-5xl font-bold text-danger">404</h1>
    <p className="text-lg text-subtle">Page not found</p>
    <Link
      to="/"
      className="rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-canvas transition hover:opacity-90"
    >
      Back to Overview
    </Link>
  </div>
);

export default ErrorPage;
