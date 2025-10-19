import React from 'react';
import { SkeletonLoader } from './SkeletonLoader';

export const QuestionSkeleton: React.FC = () => {
  return (
    <div className="card-texture-subtle px-4 py-6 rounded-2xl shadow-xl max-w-2xl mx-auto">
      {/* Question text skeleton */}
      <div className="mb-8">
        <SkeletonLoader lines={2} height={20} className="mb-4" />
      </div>

      {/* Answer options skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="p-4 border-2 border-gray-200 rounded-game-lg">
            <SkeletonLoader width="80%" height={16} />
          </div>
        ))}
      </div>
    </div>
  );
};