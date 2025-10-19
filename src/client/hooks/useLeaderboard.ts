import { useCallback, useEffect, useState } from 'react';
import type { Leaderboard } from '../../shared/types';
import { ErrorHandler } from '../utils/errorHandling';

interface LeaderboardState {
  leaderboard: Leaderboard | null;
  loading: boolean;
  error: string | null;
  retryable: boolean;
}

export const useLeaderboard = () => {
  const [state, setState] = useState<LeaderboardState>({
    leaderboard: null,
    loading: true,
    error: null,
    retryable: false,
  });

  // Fetch leaderboard data
  const fetchLeaderboard = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null, retryable: false }));
      
      /*const result = await RetryHandler.withRetry(async () => {
        const res = await fetch('/api/leaderboard');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const data: LeaderboardResponse = await res.json();
        if (!data.success || !data.data) {
          throw new Error(data.error || 'Failed to fetch leaderboard');
        }
        
        return data.data;
      });*/
      const result: Leaderboard = {
        topCountries: [{countryCode: "dz", points: 112}, {countryCode: "ma", points: 111}, {countryCode: "fr", points: 110},{countryCode: "dz", points: 112}, {countryCode: "ma", points: 111}, {countryCode: "fr", points: 110}],
        yourCountry: {
          countryCode: "dz",
          points: 112,
          position: 1
        },
        contribution: 12,
      }
      
      setState({ leaderboard: result, loading: false, error: null, retryable: false });
      return result;
    } catch (err) {
      console.error('Failed to fetch leaderboard', err);
      const appError = ErrorHandler.normalize(err);
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: appError.message,
        retryable: appError.retryable
      }));
      throw err;
    }
  }, []);

  // Auto-fetch on mount
  useEffect(() => {
    void fetchLeaderboard();
  }, [fetchLeaderboard]);

  // Refresh leaderboard (alias for fetchLeaderboard for clarity)
  const refreshLeaderboard = useCallback(() => {
    return fetchLeaderboard();
  }, [fetchLeaderboard]);

  // Retry failed operations
  const retry = useCallback(async () => {
    if (state.error && state.retryable) {
      await fetchLeaderboard();
    }
  }, [state.error, state.retryable, fetchLeaderboard]);

  return {
    ...state,
    refreshLeaderboard,
    retry,
  } as const;
};
