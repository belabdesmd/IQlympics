import React, { createContext, useContext, ReactNode } from 'react';
import { useNavigation } from '../hooks';
import type { AppPage } from '../types/navigation';

interface NavigationContextType {
  currentPage: AppPage;
  loading: boolean;
  error: string | null;
  navigateTo: (page: AppPage) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const navigation = useNavigation();

  return (
    <NavigationContext.Provider value={navigation}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigationContext must be used within a NavigationProvider');
  }
  return context;
};
