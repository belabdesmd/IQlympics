import React from 'react';
import type { Question } from '../../shared/types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (selectedIndex: number) => void;
  disabled?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  disabled = false,
}) => {
  return (
    <div className="card-texture-subtle px-4 py-6 max-w-2xl w-full rounded-2xl shadow-xl card-hover-float">
      <h2 className="text-xl font-bold uppercase tracking-wide text-center text-gray-900 mb-8 leading-relaxed">
        {question.question}
      </h2>
      
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            disabled={disabled}
            className={`question-option text-game-base ${
              disabled 
                ? 'opacity-50 cursor-not-allowed bg-gray-300' 
                : 'bg-game-blue hover:bg-blue-600 active:bg-blue-700 text-white hover:shadow-game transform hover:scale-[1.02]'
            }`}
          >
            <span className="font-black mr-4 text-game-lg">
              {String.fromCharCode(65 + index)}.
            </span>
            <span className="font-semibold">
              {option}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};