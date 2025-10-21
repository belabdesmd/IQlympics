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
    <div className="card-texture-subtle px-4 py-4 w-full rounded-2xl shadow-xl flex-shrink-0">
      <h2 className="text-lg font-bold uppercase tracking-wide text-center text-gray-900 mb-6 leading-relaxed">
        {question.question}
      </h2>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            disabled={disabled}
            className={`w-full p-3 text-left rounded-lg font-semibold transition-all duration-200 border-2 ${
              disabled 
                ? 'opacity-50 cursor-not-allowed bg-gray-300 border-gray-300 text-gray-600' 
                : 'bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white border-gray-800 hover:border-gray-600'
            }`}
          >
            <span className="font-black mr-3 text-base">
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