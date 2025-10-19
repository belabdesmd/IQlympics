import { useCallback, useState } from 'react';
import type { AppPage, NavigationState } from '../types/navigation';

export const useNavigation = (initialPage: AppPage = 'country-selection') => {
  const [state, setState] = useState<NavigationState>({
    currentPage: initialPage,
    loading: false,
    error: null,
  });

  const navigateTo = useCallback((page: AppPage) => {
    console.log(page)
    setState(prev => ({
      ...prev,
      currentPage: page,
      error: null,
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    console.log("CALLED LOADING")
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    console.log("CALLED ERROR")
    setState(prev => ({ ...prev, error }));
  }, []);

  return {
    ...state,
    navigateTo,
    setLoading,
    setError,
  } as const;
};
