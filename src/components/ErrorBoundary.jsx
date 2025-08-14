import React from 'react';
import { useLanguage } from '../context/LanguageContext';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(_error, errorInfo) {
    this.setState({
      error: _error,
      errorInfo: errorInfo
    });
    
    // Log error for monitoring (in production, send to error reporting service)
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback 
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          resetError={() => this.setState({ hasError: false, error: null, errorInfo: null })}
        />
      );
    }

    return this.props.children;
  }
}

const ErrorFallback = ({ error, resetError }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg px-4">
      <div className="max-w-md w-full bg-white dark:bg-dark-surface rounded-xl shadow-lg p-8 text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {t('error.title')}
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t('error.description')}
        </p>

        {process.env.NODE_ENV === 'development' && error && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 mb-2">
              {t('error.technicalDetails')}
            </summary>
            <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-auto max-h-32">
              {error && typeof error.toString === 'function' ? error.toString() : 'Unknown error'}
            </pre>
          </details>
        )}

        <div className="space-y-3">
          <button
            onClick={resetError}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            {t('error.tryAgain')}
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            {t('error.reloadPage')}
          </button>
          
          <a
            href="#contact"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors text-decoration-none"
          >
            {t('error.contactSupport')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;