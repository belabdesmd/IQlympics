import React, { Component, ReactNode } from 'react';
import { ErrorPage } from '../pages';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReturnToStart = () => {
    // Reset error state and reload the page to start fresh
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  override render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error page
      return (
        <ErrorPage
          error={this.state.error?.message || 'An unexpected error occurred'}
          onRetry={this.handleRetry}
          onReturnToStart={this.handleReturnToStart}
        />
      );
    }

    return this.props.children;
  }
}
