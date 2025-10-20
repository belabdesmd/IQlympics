import { useEffect, useCallback } from 'react';
import { usePlayer } from '../hooks';
import { useNavigationContext } from '../contexts/NavigationContext';
import { LoadingCard } from './LoadingCard';
import {
  CountrySelectionPage,
  GameplayPage,
  LeaderboardPage,
  GameOverPage,
  ErrorPage
} from '../pages';

export const AppRouter = () => {
  const {player, loading: playerLoading, error: playerError} = usePlayer();
  const {currentPage, navigateTo, setError} = useNavigationContext();

  // Navigation handlers
  const handlePlayerCreated = useCallback(() => {
    navigateTo('gameplay');
  }, [navigateTo]);

  const handleNavigateToLeaderboard = useCallback(() => {
    navigateTo('leaderboard');
  }, [navigateTo]);

  const handleBackToGameplay = useCallback(() => {
    navigateTo('gameplay');
  }, [navigateTo]);

  const handleGameOver = useCallback(() => {
    navigateTo('game-over');
  }, [navigateTo]);

  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  // Handle automatic routing based on player existence
  useEffect(() => {
    if (playerLoading) return;

    // Handle player errors
    if (playerError) {
      setError(playerError);
      navigateTo('error');
      return;
    }

    // Route based on player existence
    if (!player) {
      // No player exists, must go to country selection
      if (currentPage !== 'country-selection') {
        navigateTo('country-selection');
      }
    } else {
      // Player exists, default to gameplay unless explicitly on leaderboard
      if (currentPage === 'country-selection') {
        navigateTo('gameplay');
      }
    }

  }, [player, playerLoading, playerError, navigateTo, setError, currentPage]);

  // Show loading state while checking player
  if (playerLoading) {
    return (
      <div className="game-container bg-country-selection bg-pattern-dots">
        <div className="game-content">
          <LoadingCard
            message="Initializing game..."
            className="max-w-md mx-auto"
          />
        </div>
      </div>
    );
  }

  // Render current page
  switch (currentPage) {
    case 'country-selection':
      return <CountrySelectionPage onPlayerCreated={handlePlayerCreated}/>;

    case 'gameplay':
      return (
        <GameplayPage
          onNavigateToLeaderboard={handleNavigateToLeaderboard}
          onGameOver={handleGameOver}
        />
      );

    case 'leaderboard':
      return <LeaderboardPage onBackToGameplay={handleBackToGameplay}/>;

    case 'game-over':
      return <GameOverPage/>;

    case 'error':
      return <ErrorPage onRetry={handleRetry}/>;

    default:
      return <ErrorPage onRetry={handleRetry}/>;
  }
};
