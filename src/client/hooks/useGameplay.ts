import { useCallback, useEffect, useState } from 'react';
import type { Question, GameStatus } from '../../shared/types';
import { ErrorHandler } from '../utils/errorHandling';

interface GameplayState {
  question: Question | null;
  status: GameStatus | null;
  loading: boolean;
  error: string | null;
  retryable: boolean;
}

export const useGameplay = () => {
  const [state, setState] = useState<GameplayState>({
    question: null,
    status: null,
    loading: true,
    error: null,
    retryable: false,
  });

  // Fetch game status
  const fetchStatus = useCallback(async () => {
    try {
      // TODO: uncomment this
      /*const result = await RetryHandler.withRetry(async () => {
        const res = await fetch('/api/status');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const data: GameStatusResponse = await res.json();
        if (!data.success || !data.data) {
          throw new Error(data.error || 'Failed to fetch status');
        }
        
        return data.data;
      });*/

      const result : GameStatus = {
        username: "doularkos",
        skips: 0,
        gameover: false
      }
      setState(prev => ({ ...prev, status: result || null, error: null, retryable: false }));
      return result;
    } catch (err) {
      console.error('Failed to fetch status', err);
      const appError = ErrorHandler.normalize(err);
      setState(prev => ({ 
        ...prev, 
        error: appError.message,
        retryable: appError.retryable
      }));
      throw err;
    }
  }, []);

  // Fetch new question
  const fetchQuestion = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null, retryable: false }));

      // TODO: uncomment this
      /*const result = await RetryHandler.withRetry(async () => {
        const res = await fetch('/api/gameplay/question');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const data: QuestionResponse = await res.json();
        if (!data.success || !data.data) {
          throw new Error(data.error || 'Failed to fetch question');
        }
        
        return data.data;
      });*/

      const result: Question = {
        question: "How are you",
        options: ["good", "fine", "bad", "haha"],
        correctIndex: 3
      }
      setState(prev => ({ 
        ...prev, 
        question: result || null, 
        loading: false, 
        error: null,
        retryable: false
      }));
      return result;
    } catch (err) {
      console.error('Failed to fetch question', err);
      const appError = ErrorHandler.normalize(err);
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: appError.message,
        retryable: appError.retryable
      }));
      throw err;
    }
  }, []);

  // Initialize gameplay (fetch status and first question)
  useEffect(() => {
    const initGameplay = async () => {
      try {
        await fetchStatus();
        await fetchQuestion();
      } catch (err) {
        // Error handling is done in individual functions
      }
    };

    void initGameplay();
  }, [fetchStatus, fetchQuestion]);

  // Submit answer
  const answerQuestion = useCallback(async (selectedIndex: number, correctIndex: number): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null, retryable: false }));
      
      const isCorrect = selectedIndex === correctIndex;

      // TODO: uncomment this
      /*const result = await RetryHandler.withRetry(async () => {
        const res = await fetch('/api/gameplay/answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ correct: isCorrect }),
        });
        
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const data: AnswerResponse = await res.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to submit answer');
        }
        
        return data.data;
      });*/
      const result = isCorrect;
      
      // Refresh status after answering
      await fetchStatus();
      
      // If game is not over, fetch next question
      if (result !== false) {
        await fetchQuestion();
      } else {
        setState(prev => ({ ...prev, loading: false }));
      }
      
      return result || false;
    } catch (err) {
      console.error('Failed to submit answer', err);
      const appError = ErrorHandler.normalize(err);
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: appError.message,
        retryable: appError.retryable
      }));
      return false;
    }
  }, [fetchStatus, fetchQuestion]);

  // Skip question
  const skipQuestion = useCallback(async (): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null, retryable: false }));
      
      /*const result = await RetryHandler.withRetry(async () => {
        const res = await fetch('/api/gameplay/skip');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const data: QuestionResponse = await res.json();
        if (!data.success || !data.data) {
          throw new Error(data.error || 'Failed to skip question');
        }
        
        return data.data;
      });*/
      const result : Question = {
        question: "How are you",
        options: ["good", "fine", "bad", "haha"],
        correctIndex: 3
      }
      
      // Update status and question
      await fetchStatus();
      setState(prev => ({ 
        ...prev, 
        question: result || null, 
        loading: false, 
        error: null,
        retryable: false
      }));
      
      return true;
    } catch (err) {
      console.error('Failed to skip question', err);
      const appError = ErrorHandler.normalize(err);
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: appError.message,
        retryable: appError.retryable
      }));
      return false;
    }
  }, [fetchStatus]);

  // Retry failed operations
  const retry = useCallback(async () => {
    if (state.error && state.retryable) {
      try {
        // Try to refresh both status and question
        await fetchStatus();
        if (!state.question) {
          await fetchQuestion();
        }
      } catch (err) {
        // Error handling is done in individual functions
      }
    }
  }, [state.error, state.retryable, state.question, fetchStatus, fetchQuestion]);

  return {
    ...state,
    fetchQuestion,
    answerQuestion,
    skipQuestion,
    refreshStatus: fetchStatus,
    retry,
  } as const;
};
