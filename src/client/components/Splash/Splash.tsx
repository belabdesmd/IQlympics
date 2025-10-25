import React, { useState, useEffect } from 'react';
import { apiClient } from '../../services/api';
import { Loading } from '../shared/Loading';
import { Error } from '../shared/Error';
import { CountryFlag } from '../CountryFlag/CountryFlag';
import { findCountryByCode } from '../../../shared';

interface SplashProps {
  onJoinCompetition: () => void;
}

interface SplashState {
  topCountries: Array<{ countryCode: string, points: number }> | null;
  isLoading: boolean;
  error: string | null;
}

const Splash: React.FC<SplashProps> = ({onJoinCompetition}) => {
  const [state, setState] = useState<SplashState>({
    topCountries: null,
    isLoading: true,
    error: null,
  });

  // Fetch top 3 countries
  const fetchTop3Countries = async () => {
    setState(prev => ({...prev, isLoading: true, error: null}));

    try {
      const response = await apiClient.getTop3();

      if (response.status === 'success' && response.data) {
        setState(prev => ({
          ...prev,
          topCountries: response.data || [],
          isLoading: false,
        }));
      } else {
        setState(prev => ({
          ...prev,
          error: response.error || 'Failed to load top countries',
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
    fetchTop3Countries();
  }, []);

  // Retry function for error state
  const handleRetry = () => {
    fetchTop3Countries();
  };

  if (state.isLoading) {
    return <Loading message="Loading competition..."/>;
  }

  if (state.error) {
    return <Error message={state.error} onRetry={handleRetry}/>;
  }

  if (!state.topCountries || state.topCountries.length === 0) {
    return <Error message="No competition data available" onRetry={handleRetry}/>;
  }

  const {topCountries} = state;

  // Ensure we have at least 3 countries, pad with empty if needed
  const paddedCountries = [...topCountries];
  while (paddedCountries.length < 3) {
    paddedCountries.push({countryCode: '', points: 0});
  }

  // Arrange for podium: [1st, 2nd, 3rd] -> [2nd, 1st, 3rd]
  const podiumOrder = [
    paddedCountries[1], // Second place (left)
    paddedCountries[0], // First place (center, tallest)
    paddedCountries[2], // Third place (right)
  ];

  return (
    <div className="splash-container">
      <div className="splash-content">
        {/* Podium */}
        <div className="splash-podium">
          <div className="podium-container">
            {podiumOrder.map((country, index) => {
              const isFirst = index === 1; // Center position is first place
              const isSecond = index === 0; // Left position is second place
              const isThird = index === 2; // Right position is third place

              const countryData = country!.countryCode ? findCountryByCode(country!.countryCode) : null;

              return (
                <div key={index}
                     className={`podium-item ${isFirst ? 'first' : isSecond ? 'second' : 'third'}`}>
                  {country!.countryCode ? (
                    <>
                      {/* Medal */}
                      <div className="podium-medal">
                        {isFirst && '🥇'}
                        {isSecond && '🥈'}
                        {isThird && '🥉'}
                      </div>

                      {/* Country Info */}
                      <div className="podium-country-info">
                        <div className="podium-flag">
                          <CountryFlag
                            countryCode={country!.countryCode}
                            size="large"
                          />
                        </div>
                        <div className="podium-country-name">
                          {countryData?.name || country!.countryCode}
                        </div>
                        <div className="podium-points">
                          {country!.points} pts
                        </div>
                      </div>

                      {/* Podium Rectangle */}
                      <div className="podium-rectangle"></div>
                    </>
                  ) : (
                    <>
                      {/* Empty podium for missing countries */}
                      <div className="podium-medal">
                        {isFirst && '🥇'}
                        {isSecond && '🥈'}
                        {isThird && '🥉'}
                      </div>
                      <div className="podium-country-info">
                        <div className="podium-flag">🏳️</div>
                        <div className="podium-country-name">No Data</div>
                        <div className="podium-points">0 pts</div>
                      </div>
                      <div className="podium-rectangle"></div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Join Button */}
        <div className="splash-actions">
          <button
            className="btn btn-primary splash-join-button"
            onClick={onJoinCompetition}
          >
            🎮 Join Competition
          </button>
        </div>

        {/* Description */}
        <div className="splash-description">
          <p>Test your geography knowledge and compete with players worldwide!</p>
        </div>
      </div>
    </div>
  );
};

export default Splash;
