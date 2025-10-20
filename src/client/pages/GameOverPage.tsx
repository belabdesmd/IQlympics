import React from 'react';

interface GameOverPageProps {
  onReturnToStart?: () => void;
}

export const GameOverPage: React.FC<GameOverPageProps> = ({ onReturnToStart }) => {
  return (
    <div className="country-selection-container bg-country-selection-image">
      <div className="country-selection-card">
        <div className="card-texture-subtle px-4 py-6 rounded-2xl shadow-xl h-full flex flex-col">
          <div className="text-center mb-6 flex-shrink-0">
            {/* Game Over Image */}
            <div className="text-6xl mb-6">💀</div>
            <h1 className="text-3xl font-black uppercase tracking-wider text-center text-gray-900 mb-4">
              GAME OVER
            </h1>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <p className="text-game-body text-gray-700 text-center mb-8 leading-relaxed">
              You answered wrong 5 times in this post, you can't play anymore
            </p>

            {/* Optional return button */}
            {onReturnToStart && (
              <div className="flex-shrink-0">
                <button
                  onClick={onReturnToStart}
                  className="w-full btn-game-primary"
                >
                  RETURN TO START
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};