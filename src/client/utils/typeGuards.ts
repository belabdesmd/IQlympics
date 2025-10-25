import type {
  ApiResponse,
  Player,
  GameStatus,
  Leaderboard,
  Question,
  Answer,
  Skip
} from '../../shared/types';

/**
 * Type guard utilities for validating API responses and ensuring type safety
 */

/**
 * Validates if a value is a valid ApiResponse structure
 */
export function isApiResponse<T>(value: any): value is ApiResponse<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.status === 'string' &&
    (value.status === 'success' || value.status === 'failure') &&
    (value.data === undefined || value.data !== null) &&
    (value.error === undefined || typeof value.error === 'string')
  );
}

/**
 * Validates if a value is a valid Player object
 */
export function isPlayer(value: any): value is Player {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.username === 'string' &&
    typeof value.countryCode === 'string'
  );
}

/**
 * Validates if a value is a valid Question object
 */
export function isQuestion(value: any): value is Question {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.id === 'number' &&
    typeof value.question === 'string' &&
    Array.isArray(value.options) &&
    value.options.length === 4 &&
    value.options.every((option: any) => typeof option === 'string') &&
    typeof value.correctIndex === 'number' &&
    (value.correctIndex === 0 || value.correctIndex === 1 || value.correctIndex === 2 || value.correctIndex === 3)
  );
}

/**
 * Validates if a value is a valid GameStatus object
 */
export function isGameStatus(value: any): value is GameStatus {
  return (
    typeof value === 'object' &&
    value !== null &&
    (value.question === undefined || isQuestion(value.question)) &&
    (value.skips === undefined || typeof value.skips === 'number') &&
    typeof value.gameover === 'boolean'
  );
}

/**
 * Validates if a value is a valid Answer object
 */
export function isAnswer(value: any): value is Answer {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.gameover === 'boolean' &&
    isQuestion(value.nextQuestion)
  );
}

/**
 * Validates if a value is a valid Skip object
 */
export function isSkip(value: any): value is Skip {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.remainingSkips === 'number' &&
    isQuestion(value.nextQuestion)
  );
}

/**
 * Validates if a value is a valid Leaderboard object
 */
export function isLeaderboard(value: any): value is Leaderboard {
  return (
    typeof value === 'object' &&
    value !== null &&
    Array.isArray(value.topCountries) &&
    value.topCountries.every((entry: any) =>
      typeof entry === 'object' &&
      entry !== null &&
      typeof entry.countryCode === 'string' &&
      typeof entry.points === 'number'
    ) &&
    typeof value.yourCountry === 'object' &&
    value.yourCountry !== null &&
    typeof value.yourCountry.position === 'number' &&
    typeof value.yourCountry.countryCode === 'string' &&
    typeof value.yourCountry.points === 'number' &&
    value.yourCountry.topPlayer !== null &&
    typeof value.yourCountry.topPlayer.username === 'string' &&
    typeof value.yourCountry.topPlayer.contribution === 'number' &&
    typeof value.contribution === 'number'
  );
}

/**
 * Validates API response and ensures the data matches the expected type
 */
export function validateApiResponse<T>(
  response: any,
  dataValidator: (data: any) => data is T
): ApiResponse<T> {
  if (!isApiResponse(response)) {
    return {
      status: 'failure',
      error: 'Invalid API response format'
    };
  }

  if (response.status === 'failure') {
    return {
      status: 'failure',
      error: response.error || 'Unknown error'
    };
  }

  if (response.data !== undefined && !dataValidator(response.data)) {
    return {
      status: 'failure',
      error: 'Invalid response data format'
    };
  }

  return response as ApiResponse<T>;
}

/**
 * Error handling utilities for API responses
 */
export class ApiErrorHandler {
  /**
   * Extracts a user-friendly error message from an API response
   */
  static getErrorMessage(response: ApiResponse<any>): string {
    if (response.status === 'success') {
      return '';
    }

    return response.error || 'An unexpected error occurred';
  }

  /**
   * Determines if an error is a network-related issue
   */
  static isNetworkError(error: string): boolean {
    const networkErrorPatterns = [
      'fetch',
      'network',
      'connection',
      'timeout',
      'offline',
      'ECONNREFUSED',
      'ENOTFOUND'
    ];

    return networkErrorPatterns.some(pattern =>
      error.toLowerCase().includes(pattern.toLowerCase())
    );
  }

  /**
   * Determines if an error is retryable
   */
  static isRetryableError(error: string): boolean {
    const retryablePatterns = [
      'timeout',
      'network',
      'connection',
      '500',
      '502',
      '503',
      '504'
    ];

    return retryablePatterns.some(pattern =>
      error.toLowerCase().includes(pattern.toLowerCase())
    );
  }

  /**
   * Creates a standardized error response
   */
  static createErrorResponse<T>(message: string): ApiResponse<T> {
    return {
      status: 'failure',
      error: message
    };
  }
}
