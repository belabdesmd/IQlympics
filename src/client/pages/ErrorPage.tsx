import React from 'react';

interface ErrorPageProps {
  error?: string;
  onRetry?: () => void;
  onReturnToStart?: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ 
  error = "Something went wrong. Please try again.", 
  onRetry,
  onReturnToStart 
}) => {
  return (
    <div className="country-selection-container bg-country-selection-image">
      <div className="country-selection-card">
        <div className="card-texture-subtle px-4 py-6 rounded-2xl shadow-xl h-full flex flex-col">
          <div className="text-center mb-6 flex-shrink-0">
            {/* Error Image */}
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="text-3xl font-black uppercase tracking-wider text-center text-gray-900 mb-4">
              ERROR
            </h1>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <p className="text-game-body text-gray-700 text-center mb-8 leading-relaxed">
              {error}
            </p>

            {/* Action Buttons */}
            <div className="space-y-4 flex-shrink-0">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="w-full btn-game-primary"
                >
                  TRY AGAIN
                </button>
              )}
              
              {onReturnToStart && (
                <button
                  onClick={onReturnToStart}
                  className="w-full btn-game-secondary"
                >
                  RETURN TO START
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};