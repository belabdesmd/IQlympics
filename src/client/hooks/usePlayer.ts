import { useCallback, useEffect, useState } from 'react';
import type { Player, PlayerResponse } from '../../shared/types';
import { ErrorHandler, RetryHandler } from '../utils/errorHandling';

interface PlayerState {
  player: Player | null;
  loading: boolean;
  error: string | null;
}

export const usePlayer = () => {
  const [state, setState] = useState<PlayerState>({player: null, loading: true, error: null});

  // Fetch player data on mount
  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        setState(prev => ({...prev, loading: true, error: null}));

        // TODO: change endpoint
        const result = await RetryHandler.withRetry(async () => {
          const res = await fetch('http://localhost:3000/api/player');

          if (!res.ok) {
            if (res.status === 404) return null; // No player exists yet - this is expected, not an error
            throw new Error(`HTTP ${res.status}`);
          }

          const data: PlayerResponse = await res.json();
          if (data.status !== "success") throw new Error(data.error || 'Failed to fetch player');

          return data.data!;
        });
        setState({player: result, loading: false, error: null});
      } catch (err) {
        console.error('Failed to fetch player', err);
        const appError = ErrorHandler.normalize(err);
        setState(prev => ({
          ...prev,
          loading: false,
          error: appError.message
        }));
      }
    };
    void fetchPlayer();
  }, []);

  // Create new player
  const createPlayer = useCallback(async (countryCode: string): Promise<boolean> => {
    try {
      setState(prev => ({...prev, loading: true, error: null}));

      // TODO: change endpoint
      const result = await RetryHandler.withRetry(async () => {
        const res = await fetch('http://localhost:3000/api/player/create', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({countryCode}),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: PlayerResponse = await res.json();
        if (data.status !== "success" || !data.data) throw new Error(data.error || 'Failed to create player');

        return data.data;
      });
      setState({player: result, loading: false, error: null});
      return true;
    } catch (err) {
      console.error('Failed to create player', err);
      const appError = ErrorHandler.normalize(err);
      setState(prev => ({
        ...prev,
        loading: false,
        error: appError.message,
        retryable: appError.retryable
      }));
      return false;
    }
  }, []);

  return {
    ...state,
    createPlayer,
  } as const;
};
