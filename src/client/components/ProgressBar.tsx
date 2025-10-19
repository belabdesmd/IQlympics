import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  percentage?: number;
  label?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  percentage,
  label,
  className = '',
}) => {
  // Calculate percentage if not provided
  const progressPercentage = percentage !== undefined 
    ? percentage 
    : total > 0 ? (current / total) * 100 : 0;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-3">
          <span className="text-game-caption text-gray-700">{label}</span>
          <span className="text-game-caption text-gray-500 font-bold">
            {percentage !== undefined 
              ? `${Math.round(progressPercentage)}%`
              : `${current}/${total}`
            }
          </span>
        </div>
      )}
      
      <div className="progress-bar-enhanced">
        <div
          className="progress-fill-enhanced"
          style={{ width: `${Math.min(100, Math.max(0, progressPercentage))}%` }}
        />
      </div>
      
      {!label && (
        <div className="flex justify-between items-center mt-2">
          <span className="text-game-caption text-gray-500 font-medium">
            {percentage !== undefined 
              ? `${Math.round(progressPercentage)}%`
              : `${current} of ${total}`
            }
          </span>
        </div>
      )}
    </div>
  );
};