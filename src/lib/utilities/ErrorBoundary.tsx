import React, { Component, ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <section>
            <h1>Something went wrong.</h1>
            <p>
              <strong>Leave me, save yourself!</strong>
            </p>
            <p>But before you do, can you let me know what happened?</p>
            <a href="mailto:paul@hanaoka.co">Email Me</a>
          </section>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
