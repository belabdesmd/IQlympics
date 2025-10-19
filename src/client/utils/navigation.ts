import type { AppPage } from '../types/navigation';

/**
 * Determines the appropriate page based on player and game state
 */
export const determineInitialPage = (
  hasPlayer: boolean,
  isGameOver: boolean,
  hasError: boolean
): AppPage => {
  if (hasError) return 'error';
  if (isGameOver) return 'game-over';
  if (!hasPlayer) return 'country-selection';
  return 'gameplay';
};

/**
 * Checks if navigation to a specific page is allowed based on current state
 */
export const canNavigateTo = (
  targetPage: AppPage,
  hasPlayer: boolean,
  isGameOver: boolean
): boolean => {
  switch (targetPage) {
    case 'country-selection':
      // Can only go to country selection if no player exists
      return !hasPlayer;
    
    case 'gameplay':
      // Can only go to gameplay if player exists and game is not over
      return hasPlayer && !isGameOver;
    
    case 'leaderboard':
      // Can only go to leaderboard if player exists
      return hasPlayer;
    
    case 'game-over':
      // Can only go to game over if game is actually over
      return isGameOver;
    
    case 'error':
      // Can always navigate to error page
      return true;
    
    default:
      return false;
  }
};

/**
 * Gets the fallback page if navigation to target page is not allowed
 */
export const getFallbackPage = (
  hasPlayer: boolean,
  isGameOver: boolean
): AppPage => {
  return determineInitialPage(hasPlayer, isGameOver, false);
};