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
            <strong>Disqualified!</strong> 5 wrong answers cost you this match. Represent your country again in the next session!
          </p>
        </div>

        <div className="game-over-actions">
          <Button 
            variant="primary" 
            onClick={onNavigateToLeaderboard}
          >
            <MdLeaderboard aria-hidden="true" />
            Check Leaderboard
          </Button>
        </div>
      </div>
    </Card>
  );
};
