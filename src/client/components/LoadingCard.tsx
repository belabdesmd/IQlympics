import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface LoadingCardProps {
  message?: string;
  showSpinner?: boolean;
  className?: string;
}

export const LoadingCard: React.FC<LoadingCardProps> = ({
  message = 'Loading...',
  showSpinner = true,
  className = '',
}) => {
  return (
    <div className={`card-texture-subtle text-center px-4 py-6 rounded-2xl shadow-xl ${className}`}>
      {showSpinner && (
        <div className="mb-6">
          <LoadingSpinner size="lg" className="mx-auto" />
        </div>
      )}
      <p className="text-game-body text-gray-600 font-semibold uppercase tracking-wide">
        {message}
      </p>
    </div>
  );
};