// API Response wrapper types for consistent error handling
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}

// Specific API response types
export interface PlayerResponse extends ApiResponse<Player> {}
export interface QuestionResponse extends ApiResponse<Question> {}
export interface GameStatusResponse extends ApiResponse<GameStatus> {}
export interface LeaderboardResponse extends ApiResponse<Leaderboard> {}
export interface AnswerResponse extends ApiResponse<boolean> {}

// Import types for use in API responses
import type { Player } from './player.type';
import type { Question } from './question.type';
import type { GameStatus } from './status.type';
import type { Leaderboard } from './leaderboard.type';
