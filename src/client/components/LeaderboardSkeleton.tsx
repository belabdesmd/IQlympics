import React from 'react';
import { SkeletonLoader } from './SkeletonLoader';

export const LeaderboardSkeleton: React.FC = () => {
  return (
    <div className="card-texture-subtle rounded-2xl shadow-xl h-full flex flex-col">
      {/* Fixed Header */}
      <div className="px-4 pt-4 pb-2 flex-shrink-0">
        <div className="text-center">
          <SkeletonLoader width="150px" height={20} className="mx-auto" />
        </div>
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 min-h-0">
        {/* Top 5 Countries Section */}
        <div className="space-y-3 mb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border-2 border-gray-200"
            >
              <div className="flex items-center space-x-3">
                {/* Position badge skeleton */}
                <SkeletonLoader variant="circular" width={32} height={32} />
                
                {/* Flag skeleton */}
                <SkeletonLoader variant="rectangular" width={32} height={24} />
                
                {/* Country name skeleton */}
                <SkeletonLoader width="100px" height={14} />
              </div>
              
              <div className="text-right">
                {/* Points skeleton */}
                <SkeletonLoader width="50px" height={18} className="mb-1" />
                <SkeletonLoader width="35px" height={10} />
              </div>
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="border-t-2 border-gray-200 my-4"></div>

        {/* Your Country Section */}
        <div className="mb-4">
          <div className="p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-lg border-2 border-blue-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Position badge skeleton */}
                <SkeletonLoader variant="circular" width={40} height={40} />
                
                {/* Flag skeleton */}
                <SkeletonLoader variant="rectangular" width={32} height={24} />
                
                {/* Country name skeleton */}
                <SkeletonLoader width="120px" height={16} />
              </div>
              
              <div className="text-right">
                {/* Points skeleton */}
                <SkeletonLoader width="60px" height={20} className="mb-1" />
                <SkeletonLoader width="40px" height={10} />
              </div>
            </div>
          </div>
        </div>

        {/* Contribution Section */}
        <div>
          {/* Progress bar skeleton */}
          <SkeletonLoader height={20} className="rounded-full" />
        </div>
      </div>
    </div>
  );
};