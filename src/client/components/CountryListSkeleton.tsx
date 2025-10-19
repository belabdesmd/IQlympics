import React from 'react';
import { SkeletonLoader } from './SkeletonLoader';

interface CountryListSkeletonProps {
  itemCount?: number;
}

export const CountryListSkeleton: React.FC<CountryListSkeletonProps> = ({
  itemCount = 5,
}) => {
  return (
    <div className="divide-y-2 divide-gray-100">
      {Array.from({ length: itemCount }).map((_, index) => (
        <div key={index} className="p-4 flex items-center space-x-4">
          {/* Radio button skeleton */}
          <SkeletonLoader variant="circular" width={20} height={20} />
          
          {/* Flag skeleton */}
          <SkeletonLoader variant="rectangular" width={32} height={24} />
          
          {/* Country name skeleton */}
          <div className="flex-1">
            <SkeletonLoader width="60%" height={16} />
          </div>
        </div>
      ))}
    </div>
  );
};