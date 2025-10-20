import React from 'react';
import { ProgressBar } from '../components';
import { LeaderboardSkeleton } from '../components/LeaderboardSkeleton';
import { LoadingButton } from '../components/LoadingButton';
import { useLeaderboard } from '../hooks';
import { findCountryByCode } from '../../shared';

interface LeaderboardPageProps {
  onBackToGameplay: () => void;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({onBackToGameplay}) => {
  const {leaderboard, loading, error, retryable, retry} = useLeaderboard();

  if (loading) {
    return (
      <div className="min-h-screen bg-leaderboard bg-pattern-dots p-4">
        {/* Top Bar Skeleton */}
        <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
          <div className="w-24 h-12 bg-white/30 rounded-game animate-pulse"></div>
          <div className="w-48 h-8 bg-white/30 rounded animate-pulse"></div>
          <div className="w-24"></div>
        </div>

        {/* Main Content Skeleton */}
        <LeaderboardSkeleton/>
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
    <div className="min-h-screen bg-leaderboard bg-pattern-dots p-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
        <LoadingButton
          onClick={onBackToGameplay}
          disabled={loading}
          className="bg-white/30 hover:bg-white/40 active:bg-white/50 text-white font-bold py-3 px-6 rounded-game transition-all duration-200 uppercase tracking-wide shadow-game backdrop-blur-sm"
        >
          ← BACK
        </LoadingButton>
        <h1 className="text-game-title text-white drop-shadow-lg">
          LEADERBOARD
        </h1>
        <div className="w-24"></div>
        {/* Spacer for centering */}
      </div>

      {/* Main Content Card */}
      <div className="game-card-lg game-mobile-padding max-w-2xl mx-auto">
        {/* Top 5 Countries */}
        <div className="mb-10">
          <h2 className="text-game-subtitle text-gray-800 mb-6 text-center">
            TOP 5 COUNTRIES
          </h2>
          <div className="space-y-4">
            {leaderboard.topCountries.map((country, index) => {
              const countryData = findCountryByCode(country.countryCode);
              return (
                <div
                  key={country.countryCode}
                  className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-game-lg border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 shadow-game"
                >
                  <div className="flex items-center space-x-5">
                    <div
                      className={`position-badge ${index === 0 ? 'first' : index === 1 ? 'second' : index === 2 ? 'third' : ''}`}>
                      {index + 1}
                    </div>
                    <div className="text-4xl">
                      {countryData?.flag || '🏳️'}
                    </div>
                    <div>
                      <p className="text-game-body text-gray-800">
                        {countryData?.name || country.countryCode}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-game-2xl font-black text-game-blue">
                      {country.points}
                    </p>
                    <p className="text-game-caption text-gray-500">POINTS</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Separator */}
        <div className="border-t-4 border-gray-200 my-10"></div>

        {/* Your Country Position */}
        <div className="mb-8">
          <h3 className="text-game-subtitle text-gray-800 mb-6 text-center">
            YOUR COUNTRY
          </h3>
          <div
            className="p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-game-lg border-2 border-blue-300 shadow-game-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-5">
                <div className="position-badge"
                     style={{width: '48px', height: '48px', fontSize: '18px'}}>
                  #{leaderboard.yourCountry.position}
                </div>
                <div className="text-5xl">
                  {findCountryByCode(leaderboard.yourCountry.countryCode)?.flag || '🏳️'}
                </div>
                <div>
                  <p className="text-game-lg text-gray-800">
                    {findCountryByCode(leaderboard.yourCountry.countryCode)?.name || leaderboard.yourCountry.countryCode}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-game-3xl font-black text-game-purple">
                  {leaderboard.yourCountry.points}
                </p>
                <p className="text-game-caption text-gray-500">POINTS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contribution Progress Bar */}
        <div className="mb-8">
          <h4 className="text-game-lg text-gray-800 mb-4 text-center">
            YOUR CONTRIBUTION
          </h4>
          <ProgressBar
            current={0}
            total={100}
            percentage={leaderboard.contribution}
            label="Contribution to your country's total points"
            className="mb-3"
          />
          <p className="text-center text-game-body text-gray-600">
            {Math.round(leaderboard.contribution)}% OF YOUR COUNTRY'S POINTS
          </p>
        </div>

        {/* Back Button */}
        <div className="text-center pt-6">
          <LoadingButton
            onClick={onBackToGameplay}
            disabled={loading}
            className="btn-game-primary transform hover:scale-105 shadow-game-lg"
          >
            BACK TO GAME
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};
