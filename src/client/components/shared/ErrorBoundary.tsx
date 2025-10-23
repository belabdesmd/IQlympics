import { Component, ErrorInfo, ReactNode } from 'react';
import { Error } from './Error';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: globalThis.Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: globalThis.Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: globalThis.Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Error
          message="A component error occurred. Please refresh the page or try again."
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}
