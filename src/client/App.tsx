import { NavigationProvider } from './contexts/NavigationContext';
import { AppRouter } from './components';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './components/ToastContainer';

export const App = () => {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <NavigationProvider>
          <AppRouter />
        </NavigationProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
};
