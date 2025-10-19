// Error handling utilities for consistent error management across the app

export interface AppError {
  message: string;
  type: 'network' | 'api' | 'validation' | 'unknown';
  statusCode?: number;
  retryable: boolean;
}

export class ErrorHandler {
  /**
   * Convert various error types into standardized AppError
   */
  static normalize(error: unknown): AppError {
    // Handle fetch/network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        message: 'Network connection failed. Please check your internet connection.',
        type: 'network',
        retryable: true,
      };
    }

    // Handle HTTP errors
    if (error instanceof Error && error.message.startsWith('HTTP ')) {
      const statusCode = parseInt(error.message.split(' ')[1] || '500', 10);
      return {
        message: this.getHttpErrorMessage(statusCode),
        type: 'api',
        statusCode,
        retryable: this.isRetryableStatus(statusCode),
      };
    }

    // Handle API response errors
    if (error instanceof Error) {
      return {
        message: error.message || 'An unexpected error occurred',
        type: 'api',
        retryable: false,
      };
    }

    // Handle unknown errors
    return {
      message: 'An unexpected error occurred. Please try again.',
      type: 'unknown',
      retryable: true,
    };
  }

  /**
   * Get user-friendly message for HTTP status codes
   */
  private static getHttpErrorMessage(statusCode: number): string {
    switch (statusCode) {
      case 400:
        return 'Invalid request. Please check your input and try again.';
      case 401:
        return 'Authentication failed. Please refresh the page and try again.';
      case 403:
        return 'Access denied. You may not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 429:
        return 'Too many requests. Please wait a moment and try again.';
      case 500:
        return 'Server error. Please try again in a few moments.';
      case 502:
      case 503:
      case 504:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return `Server error (${statusCode}). Please try again.`;
    }
  }

  /**
   * Determine if an HTTP status code indicates a retryable error
   */
  private static isRetryableStatus(statusCode: number): boolean {
    // Retry on server errors and rate limiting
    return statusCode >= 500 || statusCode === 429;
  }

  /**
   * Create a user-friendly error message with recovery suggestions
   */
  static getRecoveryMessage(error: AppError): string {
    switch (error.type) {
      case 'network':
        return 'Check your internet connection and try again.';
      case 'api':
        if (error.retryable) {
          return 'This appears to be a temporary issue. Please try again.';
        }
        return 'Please refresh the page or contact support if the problem persists.';
      case 'validation':
        return 'Please check your input and try again.';
      default:
        return 'Please refresh the page and try again.';
    }
  }
}

/**
 * Retry utility with exponential backoff
 */
export class RetryHandler {
  static async withRetry<T>(
    operation: () => Promise<T>,
    maxAttempts: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;

        const appError = ErrorHandler.normalize(error);

        // Don't retry if error is not retryable
        if (!appError.retryable) {
          throw error;
        }

        // Don't retry on last attempt
        if (attempt === maxAttempts) {
          throw error;
        }

        // Wait with exponential backoff
        const delay = baseDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError;
  }
}
