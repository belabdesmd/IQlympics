import React, { useState, useEffect } from 'react';
import { QuestionCard } from '../components';
import { QuestionSkeleton } from '../components/QuestionSkeleton';

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
  const {question, status, loading, error, answerQuestion, skipQuestion} = useGameplay();
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);

  // Check for game over condition
  useEffect(() => {
    if (status?.gameover) onGameOver();
  }, [status?.gameover]);

  const handleAnswer = async (selectedIndex: number) => {
    if (!question || isAnswering) return;

    setIsAnswering(true);
    const isCorrect = await answerQuestion(selectedIndex, question.correctIndex, question.id);

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

  const skipsRemaining = status ? Math.max(0, status.skips) : 0;
  const canSkip = skipsRemaining > 0 && !loading;

  if (error) {
    return (
      <div className="country-selection-container bg-country-selection-image">
        <div className="country-selection-card">
          <div className="card-texture-subtle px-4 py-6 rounded-2xl shadow-xl h-full flex flex-col">
            <div className="text-center mb-6 flex-shrink-0">
              <div className="text-6xl mb-6">⚠️</div>
              <h1 className="text-3xl font-black uppercase tracking-wider text-center text-gray-900 mb-4">ERROR</h1>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-game-body text-gray-700 text-center mb-8">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="country-selection-container bg-country-selection-image">
      <div className="w-full max-w-lg mx-auto h-full max-h-[500px] flex flex-col">
        {/* Top Bar with Icon Buttons */}
        <div className="flex justify-between items-center p-4 flex-shrink-0">
          {/* Skip Button with Count */}
          <div className="flex items-center gap-3">
            <span className="text-white text-xl font-bold drop-shadow-lg">{skipsRemaining}</span>
            <button
              onClick={handleSkip}
              disabled={!canSkip || isSkipping}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border-none ${
                canSkip && !isSkipping
                  ? 'bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 cursor-pointer shadow-lg'
                  : 'bg-gray-400 text-gray-600 cursor-not-allowed'
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
              </svg>
            </button>
          </div>

          {/* Leaderboard Button */}
          <button
            onClick={onNavigateToLeaderboard}
            disabled={isAnswering || isSkipping}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border-none shadow-lg ${
              isAnswering || isSkipping
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 cursor-pointer'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4 overflow-hidden">
          {loading && !question ? (
            <QuestionSkeleton/>
          ) : question ? (
            <>
              <QuestionCard
                question={question}
                onAnswer={handleAnswer}
                disabled={isAnswering || isSkipping}
              />
              
              {/* Progress Counter - Simplified */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg flex-shrink-0">
                <div className="text-center">
                  <span className="text-green-600 text-xl font-black">{correctAnswers}</span>
                  <span className="mx-2 text-gray-600 text-lg font-bold">/</span>
                  <span className="text-gray-800 text-xl font-black">{questionsAnswered}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="country-selection-card">
              <div className="card-texture-subtle px-4 py-6 rounded-2xl shadow-xl h-full flex flex-col">
                <div className="text-center mb-6 flex-shrink-0">
                  <div className="text-6xl mb-6">❓</div>
                  <h1 className="text-3xl font-black uppercase tracking-wider text-center text-gray-900 mb-4">NO QUESTION</h1>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-game-body text-gray-700 text-center">No question available</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Loading Overlay for answer processing */}
        <LoadingOverlay
          isVisible={isAnswering}
          message="Processing answer..."
          transparent
        />
      </div>
    </div>
  );
};
