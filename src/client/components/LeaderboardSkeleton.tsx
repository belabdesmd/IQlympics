import React from 'react';
import { SkeletonLoader } from './SkeletonLoader';

export const LeaderboardSkeleton: React.FC = () => {
  return (
    <div className="game-card-lg game-mobile-padding max-w-2xl mx-auto">
      {/* Top 5 Countries Section */}
      <div className="mb-10">
        <div className="text-center mb-6">
          <SkeletonLoader width="200px" height={24} className="mx-auto" />
        </div>
        
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-game-lg border-2 border-gray-200"
            >
              <div className="flex items-center space-x-5">
                {/* Position badge skeleton */}
                <SkeletonLoader variant="circular" width={48} height={48} />
                
                {/* Flag skeleton */}
                <SkeletonLoader variant="rectangular" width={32} height={24} />
                
                {/* Country name skeleton */}
                <SkeletonLoader width="120px" height={16} />
              </div>
              
              <div className="text-right">
                {/* Points skeleton */}
                <SkeletonLoader width="60px" height={24} className="mb-1" />
                <SkeletonLoader width="40px" height={12} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Separator */}
      <div className="border-t-4 border-gray-200 my-10"></div>

      {/* Your Country Section */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <SkeletonLoader width="150px" height={24} className="mx-auto" />
        </div>
        
        <div className="p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-game-lg border-2 border-blue-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-5">
              {/* Position badge skeleton */}
              <SkeletonLoader variant="circular" width={48} height={48} />
              
              {/* Flag skeleton */}
              <SkeletonLoader variant="rectangular" width={40} height={30} />
              
              {/* Country name skeleton */}
              <SkeletonLoader width="140px" height={18} />
            </div>
            
            <div className="text-right">
              {/* Points skeleton */}
              <SkeletonLoader width="80px" height={28} className="mb-1" />
              <SkeletonLoader width="50px" height={12} />
            </div>
          </div>
        </div>
      </div>

      {/* Contribution Section */}
      <div className="mb-8">
        <div className="text-center mb-4">
          <SkeletonLoader width="180px" height={20} className="mx-auto" />
        </div>
        
        {/* Progress bar skeleton */}
        <div className="mb-3">
          <SkeletonLoader height={24} className="rounded-full" />
        </div>
        
        <div className="text-center">
          <SkeletonLoader width="200px" height={16} className="mx-auto" />
        </div>
      </div>

      {/* Back button skeleton */}
      <div className="text-center pt-6">
        <SkeletonLoader width="160px" height={48} className="mx-auto rounded-game-lg" />
      </div>
    </div>
  );
};