import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error capturado:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center mt-20 text-red-600 font-bold text-lg">
          ❌ Ocurrió un error inesperado. Por favor, recargá la página.
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
