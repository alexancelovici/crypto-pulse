import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error capturado:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-canvas px-6 text-center text-slate-100">
          <p className="font-display text-2xl font-bold text-danger">Something went wrong</p>
          <p className="text-sm text-subtle">Please reload the page to continue.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-canvas transition hover:opacity-90"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
