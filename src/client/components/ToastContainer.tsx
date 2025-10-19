import React, { useState, useCallback } from 'react';
import { Toast } from './Toast';

interface ToastData {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<ToastData, 'id'>) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
  }, []);

  const showSuccess = useCallback((message: string, duration?: number) => {
    showToast({ message, type: 'success', ...(duration !== undefined && { duration }) });
  }, [showToast]);

  const showError = useCallback((message: string, duration?: number) => {
    showToast({ message, type: 'error', ...(duration !== undefined && { duration }) });
  }, [showToast]);

  const showWarning = useCallback((message: string, duration?: number) => {
    showToast({ message, type: 'warning', ...(duration !== undefined && { duration }) });
  }, [showToast]);

  const showInfo = useCallback((message: string, duration?: number) => {
    showToast({ message, type: 'info', ...(duration !== undefined && { duration }) });
  }, [showToast]);

  const contextValue: ToastContextType = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="fixed top-0 right-0 z-50 p-4 space-y-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration || 4000}
            onClose={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};