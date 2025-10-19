import React, { useEffect, useState } from 'react';

export interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type,
  duration = 4000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in
    const showTimer = setTimeout(() => setIsVisible(true), 10);
    
    // Auto close
    const closeTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300);
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, [id, duration, onClose]);

  const typeStyles = {
    success: 'bg-green-500 border-green-600',
    error: 'bg-red-500 border-red-600',
    warning: 'bg-yellow-500 border-yellow-600',
    info: 'bg-blue-500 border-blue-600',
  };

  const typeIcons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 max-w-sm w-full
        ${typeStyles[type]} text-white
        border-l-4 rounded-game shadow-game-lg
        transform transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div className="p-4 flex items-start space-x-3">
        <div className="flex-shrink-0 text-xl">
          {typeIcons[type]}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose(id), 300);
          }}
          className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};