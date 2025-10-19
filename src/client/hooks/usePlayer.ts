import { useCallback, useEffect, useState } from 'react';
import type { Player, PlayerResponse } from '../../shared/types';
import { ErrorHandler, RetryHandler } from '../utils/errorHandling';

interface PlayerState {
  player: Player | null;
  loading: boolean;
  error: string | null;
  retryable: boolean;
}

export const usePlayer = () => {
  const [state, setState] = useState<PlayerState>({
    player: null,
    loading: true,
    error: null,
    retryable: false,
  });

  // Fetch player data on mount
  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null, retryable: false }));

        // TODO: uncomment this
        /*const result = await RetryHandler.withRetry(async () => {
          const res = await fetch('/api/player');
          
          if (!res.ok) {
            if (res.status === 404) {
              // No player exists yet - this is expected, not an error
              return null;
            }
            throw new Error(`HTTP ${res.status}`);
          }
          
          const data: PlayerResponse = await res.json();
          if (!data.success || !data.data) {
            throw new Error(data.error || 'Failed to fetch player');
          }
          
          return data.data;
        });*/
        const result : Player = {username: "doularkos", countryCode: "dz"};
        
        setState({ player: result, loading: false, error: null, retryable: false });
      } catch (err) {
        console.error('Failed to fetch player', err);
        const appError = ErrorHandler.normalize(err);
        setState(prev => ({ 
          ...prev, 
          loading: false, 
          error: appError.message,
          retryable: appError.retryable
        }));
      }
    };

    void fetchPlayer();
  }, []);

  // Create new player
  const createPlayer = useCallback(async (countryCode: string): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null, retryable: false }));

      // TODO: uncomment this
      /*
      const result = await RetryHandler.withRetry(async () => {
        const res = await fetch('/api/player/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ countryCode }),
        });
        
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const data: PlayerResponse = await res.json();
        if (!data.success || !data.data) {
          throw new Error(data.error || 'Failed to create player');
        }
        
        return data.data;
      });*/
      const result : Player = {username: "doularkos", countryCode: countryCode};
      
      setState({ player: result, loading: false, error: null, retryable: false });
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

  // Retry failed operations
  const retry = useCallback(async () => {
    if (state.player === null && state.error) {
      // Retry fetching player
      const fetchPlayer = async () => {
        try {
          setState(prev => ({ ...prev, loading: true, error: null, retryable: false }));
          
          const result = await RetryHandler.withRetry(async () => {
            const res = await fetch('/api/player');
            
            if (!res.ok) {
              if (res.status === 404) {
                return null;
              }
              throw new Error(`HTTP ${res.status}`);
            }
            
            const data: PlayerResponse = await res.json();
            if (!data.success || !data.data) {
              throw new Error(data.error || 'Failed to fetch player');
            }
            
            return data.data;
          });
          
          setState({ player: result, loading: false, error: null, retryable: false });
        } catch (err) {
          console.error('Failed to retry fetch player', err);
          const appError = ErrorHandler.normalize(err);
          setState(prev => ({ 
            ...prev, 
            loading: false, 
            error: appError.message,
            retryable: appError.retryable
          }));
        }
      };

      await fetchPlayer();
    }
  }, [state.player, state.error]);

  return {
    ...state,
    createPlayer,
    retry,
  } as const;
};
