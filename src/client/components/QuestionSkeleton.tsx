import React from 'react';
import { SkeletonLoader } from './SkeletonLoader';

export const QuestionSkeleton: React.FC = () => {
  return (
    <div className="card-texture-subtle px-4 py-4 w-full rounded-2xl shadow-xl flex-shrink-0">
      {/* Question text skeleton */}
      <div className="mb-6">
        <SkeletonLoader lines={2} height={20} className="mb-4" />
      </div>

      {/* Answer options skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="p-3 border-2 border-gray-200 rounded-lg">
            <SkeletonLoader width="90%" height={16} />
          </div>
        ))}
      </div>
    </div>
  );
};