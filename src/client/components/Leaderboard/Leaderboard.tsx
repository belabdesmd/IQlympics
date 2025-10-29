import React, { useState, useEffect } from 'react';
import { apiClient } from '../../services/api';
import { Leaderboard as LeaderboardType, Player } from '../../../shared/types';
import { Loading } from '../shared/Loading';
import { Error } from '../shared/Error';
import { CountryFlag } from '../CountryFlag/CountryFlag';
import { findCountryByCode } from '../../../shared';

interface LeaderboardProps {
  player: Player;
  onNavigateBack: () => void;
  onError: (error: string) => void;
}

interface LeaderboardState {
  leaderboard: LeaderboardType | null;
  isLoading: boolean;
  error: string | null;
}

const Leaderboard: React.FC<LeaderboardProps> = ({onNavigateBack}) => {
  const [state, setState] = useState<LeaderboardState>({
    leaderboard: null,
    isLoading: true,
    error: null,
  });

  // Fetch leaderboard data
  const fetchLeaderboard = async () => {
    setState(prev => ({...prev, isLoading: true, error: null}));

    try {
      const response = await apiClient.getLeaderboard();

      if (response.status === 'success' && response.data) {
        setState(prev => ({
          ...prev,
          leaderboard: response.data || null,
          isLoading: false,
        }));
      } else {
        setState(prev => ({
          ...prev,
          error: response.error || 'Failed to load leaderboard',
          isLoading: false,
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Network error occurred',
        isLoading: false,
      }));
    }
  };

  // Initial load
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // Retry function for error state
  const handleRetry = () => {
    fetchLeaderboard();
  };

  if (state.isLoading) {
    return <Loading message="Loading leaderboard..."/>;
  }

  if (state.error) {
    return <Error message={state.error} onRetry={handleRetry}/>;
  }

  if (!state.leaderboard) {
    return <Error message="No leaderboard data available" onRetry={handleRetry}/>;
  }

  const {leaderboard} = state;

  return (
    <>
      {/* Header with back button - outside the card */}
      <div className="leaderboard-header">
        <button
          onClick={onNavigateBack}
          className="leaderboard-back-button"
        >
          ➜
        </button>
      </div>

      {/* Compact Card with scrollable leaderboard content */}
      <div className="card leaderboard-card">
        <div className="leaderboard-content">
          {/* Top Countries Section */}
          <div className="leaderboard-section">
            <h2 className="leaderboard-section-title">TOP 5 COUNTRIES</h2>
            <div className="leaderboard-list">
              {leaderboard.topCountries.map((country, index) => {
                const countryData = findCountryByCode(country.countryCode);
                const positionClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';

                return (
                  <div key={country.countryCode} className="leaderboard-item">
                    <div className={`leaderboard-position ${positionClass}`}>
                      <span className="position-number">#{index + 1}</span>
                    </div>
                    <div className="leaderboard-flag">
                      <CountryFlag
                        countryCode={country.countryCode}
                        size="medium"
                      />
                    </div>
                    <div className="leaderboard-info">
                      <span
                        className="country-name">{countryData?.name || country.countryCode}</span>
                      <span className="country-points">{country.points} points</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Separator */}
          <div className="leaderboard-separator"></div>

          {/* Player's Country Section */}
          <div className="leaderboard-section">
            <div className="leaderboard-item leaderboard-item-player">
              <div className="leaderboard-position">
                <span className="position-number">#{leaderboard.yourCountry.position}</span>
              </div>
              <div className="leaderboard-flag">
                <CountryFlag
                  countryCode={leaderboard.yourCountry.countryCode}
                  size="medium"
                />
              </div>
              <div className="leaderboard-info">
                <span className="country-name">
                  {findCountryByCode(leaderboard.yourCountry.countryCode)?.name || leaderboard.yourCountry.countryCode}
                </span>
                <span className="country-points">{leaderboard.yourCountry.points} points</span>
              </div>
            </div>
          </div>

          {/* Player Contribution Section */}
          <div className="contribution-container">
            <div className="contribution-info">
              <span className="contribution-label">Your contribution</span>
              <span
                className="contribution-percentage">{leaderboard.contribution.toFixed(1)}%</span>
            </div>
            <div className="contribution-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{width: `${Math.min(leaderboard.contribution, 100)}%`}}
                />
              </div>
            </div>
          </div>

          {/* Top Player Section - only show if there's a valid top player */}
          {leaderboard.yourCountry.topPlayer &&
            (<div className="top-player-container">
              <div className="top-player-header">
                  <span className="top-player-title">
                    {leaderboard.yourCountry.topPlayer.contribution === leaderboard.contribution
                      ? "🏆 You are the top player from your country!"
                      : "🏆 Top Player from Your Country"}
                  </span>
              </div>
              <div className="top-player-info">
                <div className="top-player-avatar">
                  <span className="top-player-icon">👤</span>
                </div>
                <div className="top-player-details">
                  <span
                    className="top-player-username">{leaderboard.yourCountry.topPlayer.username}</span>
                  <span
                    className="top-player-score">{leaderboard.yourCountry.topPlayer.contribution.toFixed(1)}% contribution</span>
                </div>
                <div className="top-player-badge">
                  <span className="crown-icon">👑</span>
                </div>
              </div>
            </div>)
          }
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
