import React from 'react';

interface GameOverPageProps {
  onReturnToStart?: () => void;
}

export const GameOverPage: React.FC<GameOverPageProps> = ({ onReturnToStart }) => {
  return (
    <div className="game-container bg-game-over bg-pattern-diagonal">
      <div className="game-content">
        <div className="text-center">
          {/* Game Over Image */}
          <div className="mb-10">
            <div className="game-over-skull mb-6">💀</div>
          </div>

          {/* Game Over Text */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30">
            <h1 className="text-4xl font-black text-white mb-8 drop-shadow-lg uppercase tracking-wider">
              GAME OVER
            </h1>
            
            <p className="text-white text-game-lg leading-relaxed mb-10">
              You answered wrong 5 times in this post, you can't play anymore
            </p>

            {/* Optional return button - could be used for navigation if needed */}
            {onReturnToStart && (
              <button
                onClick={onReturnToStart}
                className="bg-white/30 hover:bg-white/40 active:bg-white/50 text-white font-bold py-4 px-8 rounded-game-lg text-game-lg transition-all duration-200 uppercase shadow-game backdrop-blur-sm border-2 border-white/40"
              >
                RETURN TO START
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};