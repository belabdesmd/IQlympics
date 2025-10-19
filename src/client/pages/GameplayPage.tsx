import React, { useState, useEffect } from 'react';
import { QuestionCard } from '../components';
import { QuestionSkeleton } from '../components/QuestionSkeleton';
import { LoadingButton } from '../components/LoadingButton';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { useGameplay } from '../hooks';

interface GameplayPageProps {
  onNavigateToLeaderboard: () => void;
  onGameOver: () => void;
}

export const GameplayPage: React.FC<GameplayPageProps> = ({
  onNavigateToLeaderboard,
  onGameOver,
}) => {
  const { question, status, loading, error, retryable, answerQuestion, skipQuestion, retry } = useGameplay();
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);

  // Check for game over condition
  useEffect(() => {
    if (status?.gameover) {
      onGameOver();
    }
  }, [status?.gameover, onGameOver]);

  const handleAnswer = async (selectedIndex: number) => {
    if (!question || isAnswering) return;

    setIsAnswering(true);
    const isCorrect = await answerQuestion(selectedIndex, question.correctIndex);
    
    // Update counters
    setQuestionsAnswered(prev => prev + 1);
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
    setIsAnswering(false);
  };

  const handleSkip = async () => {
    if (isSkipping) return;
    
    setIsSkipping(true);
    await skipQuestion();
    setQuestionsAnswered(prev => prev + 1);
    setIsSkipping(false);
  };

  const skipsRemaining = status ? Math.max(0, 3 - status.skips) : 0;
  const canSkip = skipsRemaining > 0 && !loading;

  if (error) {
    return (
      <div className="game-container bg-error bg-pattern-diagonal">
        <div className="game-content">
          <div className="game-card text-center game-mobile-padding">
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="text-game-title text-red-600 mb-6">ERROR</h1>
            <p className="text-game-body text-gray-700 mb-8">{error}</p>
            <div className="space-y-4">
              {retryable && (
                <button
                  onClick={retry}
                  disabled={loading}
                  className="btn-game-error w-full"
                >
                  {loading ? 'Retrying...' : 'Try Again'}
                </button>
              )}
              <button
                onClick={() => window.location.reload()}
                className="btn-game-secondary w-full"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gameplay bg-pattern-grid flex flex-col">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 bg-white/20 backdrop-blur-game border-b border-white/20">
        <div className="flex-1"></div>
        
        {/* Logo/Title */}
        <div className="flex-1 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="text-2xl">🌍</div>
            <h1 className="game-logo text-game-subtitle text-white drop-shadow-lg">
              Country Trivia
            </h1>
            <div className="text-2xl">🏆</div>
          </div>
        </div>
        
        {/* Leaderboard Button */}
        <div className="flex-1 flex justify-end">
          <LoadingButton
            onClick={onNavigateToLeaderboard}
            disabled={isAnswering || isSkipping}
            className="bg-game-yellow hover:bg-yellow-600 active:bg-yellow-700 text-white font-bold py-2 px-4 rounded-game text-game-sm uppercase tracking-wide transition-all duration-200 shadow-game"
          >
            Leaderboard
          </LoadingButton>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        {loading && !question ? (
          <QuestionSkeleton />
        ) : question ? (
          <QuestionCard
            question={question}
            onAnswer={handleAnswer}
            disabled={isAnswering || isSkipping}
          />
        ) : (
          <div className="card-texture-subtle text-center px-4 py-6 rounded-2xl shadow-xl">
            <p className="text-base font-semibold text-gray-600">No question available</p>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-center p-4 bg-white/20 backdrop-blur-game border-t border-white/20">
        {/* Progress Counter */}
        <div className="flex-1">
          <div className="bg-white/30 rounded-game px-4 py-2 text-white font-bold text-center backdrop-blur-sm">
            <span className="text-green-200 text-game-lg">{correctAnswers}</span>
            <span className="mx-2 text-game-base">/</span>
            <span className="text-game-lg">{questionsAnswered}</span>
          </div>
        </div>

        <div className="flex-1"></div>

        {/* Skip Button */}
        <div className="flex-1 flex justify-end">
          <LoadingButton
            onClick={handleSkip}
            disabled={!canSkip}
            loading={isSkipping}
            loadingText="Skipping..."
            className={`font-bold py-2 px-4 rounded-game text-game-sm uppercase tracking-wide transition-all duration-200 shadow-game ${
              canSkip && !isSkipping
                ? 'bg-game-orange hover:bg-orange-600 active:bg-orange-700 text-white'
                : 'btn-game-disabled'
            }`}
          >
            Skip ({skipsRemaining})
          </LoadingButton>
        </div>
      </div>

      {/* Loading Overlay for answer processing */}
      <LoadingOverlay 
        isVisible={isAnswering}
        message="Processing answer..."
        transparent
      />
    </div>
  );
};
