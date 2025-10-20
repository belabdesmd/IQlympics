import { useCallback, useState } from 'react';
import type { AppPage, NavigationState } from '../types/navigation';

export const useNavigation = (initialPage: AppPage = 'country-selection') => {
  const [state, setState] = useState<NavigationState>({
    currentPage: initialPage,
    loading: false,
    error: null,
  });

  const navigateTo = useCallback((page: AppPage) => {
    setState(prev => ({
      ...prev,
      currentPage: page,
      error: null,
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  return {
    ...state,
    navigateTo,
    setLoading,
    setError,
  } as const;
};
