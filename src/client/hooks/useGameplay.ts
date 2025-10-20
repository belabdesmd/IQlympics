import { useCallback, useEffect, useState } from 'react';
import type {
  Question,
  GameStatus,
  AnswerResponse,
  QuestionResponse,
  GameStatusResponse
} from '../../shared/types';
import { ErrorHandler, RetryHandler } from '../utils/errorHandling';

interface GameplayState {
  question: Question | null;
  status: GameStatus | null;
  loading: boolean;
  error: string | null;
}

export const useGameplay = () => {
  const [state, setState] = useState<GameplayState>({
    question: null,
    status: null,
    loading: true,
    error: null
  });

  // Fetch game status
  const fetchStatus = useCallback(async () => {
    try {
      // TODO: change endpoint
      const result = await RetryHandler.withRetry(async () => {
        const res = await fetch('http://localhost:3000/api/status');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: GameStatusResponse = await res.json();
        if (data.status !== "success" || !data.data) {
          throw new Error(data.error || 'Failed to fetch status');
        }

        return data.data;
      });

      setState(prev => ({...prev, status: result || null, error: null}));
      return result;
    } catch (err) {
      console.error('Failed to fetch status', err);
      const appError = ErrorHandler.normalize(err);
      setState(prev => ({
        ...prev,
        error: appError.message
      }));
      throw err;
    }
  }, []);

  // Fetch new question
  const fetchQuestion = useCallback(async () => {
    try {
      setState(prev => ({...prev, loading: true, error: null}));

      // TODO: update endpoint
      const result = await RetryHandler.withRetry(async () => {
        const res = await fetch('http://localhost:3000/api/gameplay/question');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: QuestionResponse = await res.json();
        if (data.status != "success" || !data.data) {
          throw new Error(data.error || 'Failed to fetch question');
        }

        return data.data;
      });

      setState(prev => ({
        ...prev,
        question: result || null,
        loading: false,
        error: null
      }));
      return result;
    } catch (err) {
      console.error('Failed to fetch question', err);
      const appError = ErrorHandler.normalize(err);
      setState(prev => ({
        ...prev,
        loading: false,
        error: appError.message
      }));
      throw err;
    }
  }, []);

  // Initialize gameplay (fetch status and first question)
  useEffect(() => {
    let cancelled = false;
    const initGameplay = async () => {
      if (!cancelled) {
        await fetchStatus();
        await fetchQuestion();
      }
    };
    void initGameplay();
    
    return () => {cancelled = true};
  }, [fetchStatus, fetchQuestion]);

  // Submit answer
  const answerQuestion = useCallback(async (selectedIndex: number, correctIndex: number): Promise<boolean> => {
    try {
      setState(prev => ({...prev, loading: true, error: null}));

      const isCorrect = selectedIndex === correctIndex;

      // TODO: change endpoint
      const result = await RetryHandler.withRetry(async () => {
        const res = await fetch('http://localhost:3000/api/gameplay/answer', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({correct: isCorrect}),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: AnswerResponse = await res.json();
        if (data.status !== "success") {
          throw new Error(data.error || 'Failed to submit answer');
        }

        return data.data;
      });

      // Refresh status after answering
      await fetchStatus();

      // If game is not over, fetch next question
      if (result !== false) {
        await fetchQuestion();
      }

      return isCorrect;
    } catch (err) {
      console.error('Failed to submit answer', err);
      const appError = ErrorHandler.normalize(err);
      setState(prev => ({
        ...prev,
        loading: false,
        error: appError.message
      }));
      return false;
    }
  }, [fetchStatus, fetchQuestion]);

  // Skip question
  const skipQuestion = useCallback(async (): Promise<boolean> => {
    try {
      setState(prev => ({...prev, loading: true, error: null}));

      // TODO: change endpoint
      const result = await RetryHandler.withRetry(async () => {
        const res = await fetch('http://localhost:3000/api/gameplay/skip');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: QuestionResponse = await res.json();
        if (data.status !== "success" || !data.data) {
          throw new Error(data.error || 'Failed to skip question');
        }

        return data.data;
      });

      // Update status and question
      await fetchStatus();
      setState(prev => ({
        ...prev,
        question: result || null,
        loading: false,
        error: null
      }));

      return true;
    } catch (err) {
      console.error('Failed to skip question', err);
      const appError = ErrorHandler.normalize(err);
      setState(prev => ({
        ...prev,
        loading: false,
        error: appError.message
      }));
      return false;
    }
  }, [fetchStatus]);

  return {
    ...state,
    fetchQuestion,
    answerQuestion,
    skipQuestion,
    refreshStatus: fetchStatus,
  } as const;
};
