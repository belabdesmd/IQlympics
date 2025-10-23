import type {
  ApiResponse,
  Player,
  GameStatus,
  Leaderboard,
  Answer, Skip
} from '../../shared/types';
import {
  validateApiResponse,
  isPlayer,
  isGameStatus,
  isLeaderboard,
  ApiErrorHandler, isAnswer, isSkip
} from '../utils';

/**
 * API Client service for handling all HTTP requests to the backend
 * Provides methods for player management, gameplay, and leaderboard operations
 * TODO: update endpoints (use only /api/**)
 */
export class APIClient {
  private readonly baseUrl: string;
  private readonly enableLogging: boolean;

  constructor(baseUrl: string = '', enableLogging: boolean = false) {
    this.baseUrl = baseUrl;
    this.enableLogging = enableLogging;
  }

  /**
   * Generic fetch wrapper with error handling, logging, and response validation
   */
  private async fetchWithErrorHandling<T>(
    endpoint: string,
    options: RequestInit = {},
    dataValidator?: (data: any) => data is T
  ): Promise<ApiResponse<T>> {
    console.log(endpoint);
    const url = `${this.baseUrl}${endpoint}`;

    if (this.enableLogging) {
      console.log(`[API] ${options.method || 'GET'} ${url}`, {
        headers: options.headers,
        body: options.body
      });
    }

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        if (this.enableLogging) {
          console.error(`[API] JSON parse error for ${url}:`, parseError);
        }
        return ApiErrorHandler.createErrorResponse('Invalid response format');
      }

      if (this.enableLogging) {
        console.log(`[API] Response ${response.status}:`, data);
      }

      if (!response.ok) {
        return ApiErrorHandler.createErrorResponse(
          data.error || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      // Validate response structure and data if validator provided
      if (dataValidator && data.data !== undefined) {
        return validateApiResponse(data, dataValidator);
      }

      // For successful responses, wrap the data in the expected format
      if (data.status === 'success') {
        return data as ApiResponse<T>;
      }

      // If no explicit status, assume success and wrap the data
      return {
        status: 'success',
        data: data
      } as ApiResponse<T>;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown network error';

      if (this.enableLogging) {
        console.error(`[API] Error for ${url}:`, error);
      }

      return ApiErrorHandler.createErrorResponse(errorMessage);
    }
  }

  /**
   * Check if a player exists for the current user
   */
  async getPlayer(): Promise<ApiResponse<Player>> {
    return this.fetchWithErrorHandling<Player>('http://localhost:3000/api/player', {}, isPlayer);
  }

  /**
   * Create a new player with the specified country
   */
  async createPlayer(countryCode: string): Promise<ApiResponse<Player>> {
    if (!countryCode) {
      return ApiErrorHandler.createErrorResponse('Country code is required');
    }

    return this.fetchWithErrorHandling<Player>('http://localhost:3000/api/player/create', {
      method: 'POST',
      body: JSON.stringify({countryCode})
    }, isPlayer);
  }

  /**
   * Get the current game status including question and game state
   */
  async getGameStatus(): Promise<ApiResponse<GameStatus>> {
    return this.fetchWithErrorHandling<GameStatus>('http://localhost:3000/api/gameplay/status', {}, isGameStatus);
  }

  /**
   * Submit an answer for the current question
   */
  async submitAnswer(isCorrect: boolean, questionId: number): Promise<ApiResponse<Answer>> {
    return this.fetchWithErrorHandling<Answer>('http://localhost:3000/api/gameplay/answer', {
      method: 'POST',
      body: JSON.stringify({questionId, isCorrect})
    }, isAnswer);
  }

  /**
   * Skip the current question and get the next one
   */
  async skipQuestion(): Promise<ApiResponse<Skip>> {
    return this.fetchWithErrorHandling<Skip>('http://localhost:3000/api/gameplay/skip', {}, isSkip);
  }

  /**
   * Get the current leaderboard data
   */
  async getLeaderboard(): Promise<ApiResponse<Leaderboard>> {
    return this.fetchWithErrorHandling<Leaderboard>('http://localhost:3000/api/leaderboard', {}, isLeaderboard);
  }
}

// Export a default instance for use throughout the application
export const apiClient = new APIClient();
