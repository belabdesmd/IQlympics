import React from 'react';
import { Card } from './shared/Card';
import { Button } from './shared/Button';
import { MdLeaderboard, MdCancel } from 'react-icons/md';

interface GameOverProps {
  onNavigateToLeaderboard: () => void;
  onNavigateToGameplay: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ 
  onNavigateToLeaderboard
}) => {
  return (
    <Card>
      <div className="game-over">
        <div className="game-over-content">
          <div className="game-over-icon">
            <MdCancel aria-label="Game Over" />
          </div>
          
          <h2 className="game-over-title">
            Game Over!
          </h2>
          
          <p className="game-over-message">
            You made 5 wrong answers and can't continue playing in this session.
          </p>
          
          <p className="game-over-replay-message">
            Check out the leaderboard to see how your country is performing. 
            You can play again in another post!
          </p>
        </div>

        <div className="game-over-actions">
          <Button 
            variant="primary" 
            onClick={onNavigateToLeaderboard}
          >
            <MdLeaderboard aria-hidden="true" />
            View Leaderboard
          </Button>
        </div>
      </div>
    </Card>
  );
};
