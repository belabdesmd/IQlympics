import React, { useState, useEffect } from 'react';
import { apiClient } from '../../services/api';
import { GameStatus, Question, Player } from '../../../shared/types';
import { Loading } from '../shared/Loading';
import { Error } from '../shared/Error';
import { MdSkipNext, MdLeaderboard } from 'react-icons/md';

interface GameplayProps {
  player: Player;
  gameStatus: GameStatus;
  onNavigateToLeaderboard: () => void;
  onGameOver: () => void;
  onError: (error: string) => void;
}

interface GameplayState {
  gameStatus: GameStatus | null;
  currentQuestion: Question | null;
  isLoading: boolean;
  error: string | null;
  selectedAnswer: number | null;
  showFeedback: boolean;
  isSubmitting: boolean;
}

const Gameplay: React.FC<GameplayProps> = ({
                                             gameStatus,
                                             onNavigateToLeaderboard,
                                             onGameOver,
                                             onError
                                           }) => {
  const [state, setState] = useState<GameplayState>({
    gameStatus: gameStatus,
    currentQuestion: null,
    isLoading: true,
    error: null,
    selectedAnswer: null,
    showFeedback: false,
    isSubmitting: false,
  });

  // Fetch initial game status and current question
  const fetchGameStatus = async () => {
    setState(prev => ({...prev, isLoading: true, error: null}));

    try {
      const response = await apiClient.getGameStatus();

      if (response.status === 'success' && response.data) {
        const data = response.data;

        // Check if game is over
        if (data.gameover) {
          onGameOver();
          return;
        }

        setState(prev => ({
          ...prev,
          gameStatus: data,
          currentQuestion: data.question || null,
          isLoading: false,
        }));
      } else {
        const errorMessage = response.error || 'Failed to load game status';
        setState(prev => ({
          ...prev,
          error: errorMessage,
          isLoading: false,
        }));
        onError(errorMessage);
      }
    } catch (error) {
      const errorMessage = 'Network error occurred';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      onError(errorMessage);
    }
  };

  // Initial load
  useEffect(() => {
    fetchGameStatus();
  }, []);

  // Handle answer selection and submission
  const handleAnswerSelect = async (optionIndex: number) => {
    if (state.showFeedback || state.isSubmitting || !state.currentQuestion) return;

    setState(prev => ({
      ...prev,
      selectedAnswer: optionIndex,
      isSubmitting: true
    }));

    try {
      // Check if answer is correct
      const isCorrect = optionIndex === state.currentQuestion.correctIndex;

      // Submit answer
      const response = await apiClient.submitAnswer(isCorrect, state.currentQuestion.id);

      if (response.status === 'success' && response.data) {
        const data = response.data;

        // Show feedback for 2 seconds
        setState(prev => ({...prev, showFeedback: true, isSubmitting: false}));

        setTimeout(() => {
          if (data.gameover) {
            onGameOver();
          } else {
            // Update with next question
            setState(prev => ({
              ...prev,
              currentQuestion: data.nextQuestion!,
              selectedAnswer: null,
              showFeedback: false,
            }));
          }
        }, 2000);
      } else {
        const errorMessage = response.error || 'Failed to answer question';
        setState(prev => ({
          ...prev,
          error: errorMessage,
          isSubmitting: false,
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Network error occurred',
        isSubmitting: false,
      }));
    }
  };

  // Handle skip question
  const handleSkip = async () => {
    if (state.isSubmitting || !state.gameStatus) return;

    setState(prev => ({...prev, isSubmitting: true}));

    try {
      const response = await apiClient.skipQuestion();

      if (response.status === 'success' && response.data) {
        const data = response.data;

        setState(prev => ({
          ...prev,
          currentQuestion: data.nextQuestion,
          selectedAnswer: null,
          showFeedback: false,
          isSubmitting: false,
          gameStatus: prev.gameStatus ? {
            ...prev.gameStatus,
            skips: data.remainingSkips,
          } : null,
        }));
      } else {
        const errorMessage = response.error || 'Failed to skip question';
        setState(prev => ({
          ...prev,
          error: errorMessage,
          isSubmitting: false,
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Network error occurred',
        isSubmitting: false,
      }));
    }
  };

  // Retry function for error state
  const handleRetry = () => {
    fetchGameStatus();
  };

  if (state.isLoading) {
    return <Loading/>;
  }

  if (state.error) {
    return <Error message={state.error} onRetry={handleRetry}/>;
  }

  if (!state.currentQuestion) {
    return <Error message="No question available" onRetry={handleRetry}/>;
  }

  const {
    currentQuestion,
    gameStatus: stateGameStatus,
    selectedAnswer,
    showFeedback,
    isSubmitting
  } = state;

  return (
    <>
      {/* Header with game controls - outside the card */}
      <div className="gameplay-header">
        <button
          onClick={handleSkip}
          disabled={isSubmitting || (stateGameStatus?.skips ?? 3) <= 0}
          className="gameplay-icon-button"
        >
          <MdSkipNext/>
          <span className="skip-count">{stateGameStatus?.skips ?? 3}</span>
        </button>
        <button
          onClick={onNavigateToLeaderboard}
          disabled={isSubmitting}
          className="gameplay-icon-button"
        >
          <MdLeaderboard/>
        </button>
      </div>

      {/* Compact Card with question and options */}
      <div className="card gameplay-card">
        <div className="gameplay-content">
          {/* Question display */}
          <div className="question-container">
            <h2 className="question-text">{currentQuestion.question}</h2>
          </div>

          {/* Answer options - one below the other */}
          <div className="answer-options">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = 'answer-button';
              const isSelected = selectedAnswer === index;
              const isLoading = isSelected && isSubmitting && !showFeedback;

              if (showFeedback && isSelected) {
                // Show feedback colors based on correctness
                const isCorrect = currentQuestion.correctIndex === index;
                buttonClass += isCorrect ? ' answer-correct' : ' answer-incorrect';
              } else if (isSelected && !showFeedback) {
                buttonClass += ' answer-selected';
              }

              if (isLoading) {
                buttonClass += ' loading';
              }

              return (
                <button
                  key={index}
                  className={buttonClass}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback || isSubmitting}
                >
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      {option}
                    </>
                  ) : (
                    option
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gameplay;
