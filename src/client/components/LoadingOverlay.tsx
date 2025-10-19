import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  transparent?: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  message = 'Loading...',
  transparent = false,
}) => {
  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        transparent ? 'bg-black/20' : 'bg-white/90'
      } backdrop-blur-sm`}
    >
      <div className="text-center">
        <LoadingSpinner 
          size="xl" 
          color={transparent ? 'white' : 'primary'} 
          className="mx-auto mb-4" 
        />
        <p className={`text-game-body font-semibold uppercase tracking-wide ${
          transparent ? 'text-white drop-shadow-lg' : 'text-gray-700'
        }`}>
          {message}
        </p>
      </div>
    </div>
  );
};