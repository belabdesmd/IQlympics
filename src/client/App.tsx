import React, { useState, useEffect } from 'react';
import { Loading, Error, CreatePlayer, Gameplay, Leaderboard, GameOver } from './components';
import { apiClient } from './services/api';
import type { Player, GameStatus } from '../shared/types';

// App state type definition
type AppView = 'loading' | 'createPlayer' | 'gameplay' | 'leaderboard' | 'gameOver' | 'error';

interface AppState {
  currentView: AppView;
  player: Player | null;
  error: string | null;
  isLoading: boolean;
}

export const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentView: 'loading',
    player: null,
    error: null,
    isLoading: true
  });

  // Run the initialization logic
  const initializeApp = async () => {
    try {
      setState(prev => ({...prev, isLoading: true, error: null}));

      // Check if player exists (Requirement 1.1)
      const playerResponse = await apiClient.getPlayer();

      if (playerResponse.status === 'success' && playerResponse.data) {
        // Player exists, go to Gameplay
        setState(prev => ({
          ...prev,
          player: playerResponse.data!,
          currentView: 'gameplay',
          isLoading: false
        }));
      } else {
        // No player exists, show create player screen
        setState(prev => ({
          ...prev,
          currentView: 'createPlayer',
          isLoading: false
        }));
      }
    } catch (err) {
      const error = err as Error;
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to initialize app',
        currentView: 'error',
        isLoading: false
      }));
    }
  };

  // Initial player check and routing logic - runs only once
  useEffect(() => {
    initializeApp();
  }, []);

  // Navigation functions
  const navigateToGameplay = (player: Player, gameStatus: GameStatus) => {
    setState(prev => ({
      ...prev,
      player,
      gameStatus,
      currentView: gameStatus.gameover ? 'gameOver' : 'gameplay',
      error: null
    }));
  };

  const navigateToLeaderboard = () => {
    setState(prev => ({
      ...prev,
      currentView: 'leaderboard',
      error: null
    }));
  };

  const navigateBackToGameplay = () => {
    setState(prev => ({
      ...prev,
      currentView: 'gameplay',
      error: null
    }));
  };

  const handleGameOver = () => {
    setState(prev => ({
      ...prev,
      currentView: 'gameOver'
    }));
  };

  const handleError = (error: string) => {
    setState(prev => ({
      ...prev,
      error,
      currentView: 'error'
    }));
  };

  const retryInitialization = React.useCallback(() => {
    setState(prev => ({
      ...prev,
      currentView: 'loading',
      error: null,
      isLoading: true
    }));

    initializeApp();
  }, []);

  // Render current view based on app state
  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'loading':
        return <Loading/>;

      case 'createPlayer':
        return (
          <CreatePlayer
            onPlayerCreated={navigateToGameplay}
            onError={handleError}
          />
        );

      case 'gameplay':
        return (
          <Gameplay
            player={state.player!}
            onNavigateToLeaderboard={navigateToLeaderboard}
            onGameOver={handleGameOver}
            onError={handleError}
          />
        );

      case 'leaderboard':
        return (
          <Leaderboard
            player={state.player!}
            onNavigateBack={navigateBackToGameplay}
            onError={handleError}
          />
        );

      case 'gameOver':
        return (
          <GameOver
            onNavigateToLeaderboard={navigateToLeaderboard}
            onNavigateToGameplay={navigateBackToGameplay}
          />
        );

      case 'error':
        return (
          <Error
            message={state.error || 'An unexpected error occurred'}
            onRetry={retryInitialization}
          />
        );

      default:
        return <Loading/>;
    }
  };

  return (
    <div className="app-container">
      {renderCurrentView()}
    </div>
  );
};
