import React from 'react';
import { ProgressBar } from '../components';
import { LeaderboardSkeleton } from '../components/LeaderboardSkeleton';

import { useLeaderboard } from '../hooks';
import { findCountryByCode } from '../../shared';

interface LeaderboardPageProps {
  onBackToGameplay: () => void;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({onBackToGameplay}) => {
  const {leaderboard, loading, error, retryable, retry} = useLeaderboard();

  if (loading) {
    return (
      <div className="country-selection-container bg-country-selection-image">
        <div className="w-full max-w-lg mx-auto h-full max-h-[560px] flex flex-col overflow-hidden">
          {/* Top Bar Skeleton */}
          <div className="flex items-center justify-between p-2 flex-shrink-0">
            <div className="w-10 h-10 bg-white/30 rounded-full animate-pulse"></div>
            <div className="w-32 h-6 bg-white/30 rounded animate-pulse"></div>
            <div className="w-10"></div>
          </div>

          {/* Main Content Skeleton */}
          <div className="flex-1 p-4 pt-2 overflow-hidden">
            <LeaderboardSkeleton/>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="country-selection-container bg-country-selection-image">
        <div className="country-selection-card">
          <div className="card-texture-subtle px-4 py-6 rounded-2xl shadow-xl h-full flex flex-col">
            <div className="text-center mb-6 flex-shrink-0">
              <div className="text-6xl mb-6">❌</div>
              <h1 className="text-3xl font-black uppercase tracking-wider text-center text-gray-900 mb-4">ERROR</h1>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-game-body text-gray-700 text-center mb-8">{error}</p>
              <div className="space-y-4 flex-shrink-0">
                {retryable && (
                  <button
                    onClick={retry}
                    disabled={loading}
                    className="btn-game-primary w-full"
                  >
                    {loading ? 'Retrying...' : 'Try Again'}
                  </button>
                )}
                <button
                  onClick={onBackToGameplay}
                  className="btn-game-secondary w-full"
                >
                  BACK TO GAME
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!leaderboard) {
    return (
      <div className="country-selection-container bg-country-selection-image">
        <div className="country-selection-card">
          <div className="card-texture-subtle px-4 py-6 rounded-2xl shadow-xl h-full flex flex-col">
            <div className="text-center mb-6 flex-shrink-0">
              <div className="text-6xl mb-6">📊</div>
              <h1 className="text-3xl font-black uppercase tracking-wider text-center text-gray-900 mb-4">LEADERBOARD</h1>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-game-body text-gray-700 text-center">NO LEADERBOARD DATA</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="country-selection-container bg-country-selection-image">
      <div className="w-full max-w-lg mx-auto h-full max-h-[560px] flex flex-col overflow-hidden">
        {/* Top Bar with Back Icon */}
        <div className="flex items-center justify-between p-2 flex-shrink-0">
          <button
            onClick={onBackToGameplay}
            disabled={loading}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border-none shadow-lg bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
          <h1 className="text-3xl font-black uppercase tracking-wider text-white drop-shadow-lg">
            LEADERBOARD
          </h1>
          <div className="w-10"></div>
        </div>

        {/* Main Content Card */}
        <div className="flex-1 p-4 pt-2 min-h-0">
          <div className="card-texture-subtle rounded-2xl shadow-xl h-full flex flex-col max-h-[490px]">
            {/* Fixed Header */}
            <div className="px-4 pt-4 pb-2 flex-shrink-0">
              <h2 className="text-lg font-bold uppercase tracking-wide text-center text-gray-900">
                TOP 5 COUNTRIES
              </h2>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 pb-4 min-h-0">
              {/* Top 5 Countries */}
              <div className="space-y-3 mb-4">
                {leaderboard.topCountries.map((country, index) => {
                  const countryData = findCountryByCode(country.countryCode);
                  return (
                    <div
                      key={country.countryCode}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border-2 border-gray-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                            index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                          }`}>
                          {index + 1}
                        </div>
                        <img
                          src={countryData?.flag || 'https://flagcdn.com/w40/xx.png'}
                          alt={`${countryData?.name || country.countryCode} flag`}
                          className="country-flag-image"
                          loading="lazy"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {countryData?.name || country.countryCode}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-blue-600">
                          {country.points}
                        </p>
                        <p className="text-xs text-gray-500">POINTS</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Separator */}
              <div className="border-t-2 border-gray-200 my-4"></div>

              {/* Your Country Position */}
              <div className="mb-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-lg border-2 border-blue-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">
                        #{leaderboard.yourCountry.position}
                      </div>
                      <img
                        src={findCountryByCode(leaderboard.yourCountry.countryCode)?.flag || 'https://flagcdn.com/w40/xx.png'}
                        alt={`${findCountryByCode(leaderboard.yourCountry.countryCode)?.name || leaderboard.yourCountry.countryCode} flag`}
                        className="country-flag-image"
                        loading="lazy"
                      />
                      <div>
                        <p className="text-base font-semibold text-gray-800">
                          {findCountryByCode(leaderboard.yourCountry.countryCode)?.name || leaderboard.yourCountry.countryCode}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-purple-600">
                        {leaderboard.yourCountry.points}
                      </p>
                      <p className="text-xs text-gray-500">POINTS</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contribution Progress Bar */}
              <div>
                <ProgressBar
                  current={0}
                  total={100}
                  percentage={leaderboard.contribution}
                  label="Contribution to your country's total points"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
