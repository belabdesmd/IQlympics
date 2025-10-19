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
    <div className="game-container bg-error bg-pattern-diagonal">
      <div className="game-content">
        <div className="text-center">
          {/* Error Image */}
          <div className="mb-10">
            <div className="error-warning mb-6">⚠️</div>
          </div>

          {/* Error Content */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30">
            <h1 className="text-4xl font-black text-white mb-8 drop-shadow-lg uppercase tracking-wider">
              ERROR
            </h1>
            
            <p className="text-white text-game-lg leading-relaxed mb-10">
              {error}
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="w-full bg-white/30 hover:bg-white/40 active:bg-white/50 text-white font-bold py-4 px-8 rounded-game-lg text-game-lg transition-all duration-200 uppercase shadow-game backdrop-blur-sm"
                >
                  TRY AGAIN
                </button>
              )}
              
              {onReturnToStart && (
                <button
                  onClick={onReturnToStart}
                  className="w-full bg-white/20 hover:bg-white/30 active:bg-white/40 text-white font-bold py-4 px-8 rounded-game-lg text-game-lg transition-all duration-200 uppercase shadow-game border-2 border-white/40 backdrop-blur-sm"
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