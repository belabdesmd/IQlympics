// Navigation types for the trivia game
export type AppPage = 
  | 'country-selection'
  | 'gameplay' 
  | 'leaderboard'
  | 'game-over'
  | 'error';

export interface NavigationState {
  currentPage: AppPage;
  loading: boolean;
  error: string | null;
}