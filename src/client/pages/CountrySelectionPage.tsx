import React, { useState, useMemo } from 'react';
import { CountryListItem } from '../components';
import { CountryListSkeleton } from '../components/CountryListSkeleton';
import { LoadingButton } from '../components/LoadingButton';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { usePlayer } from '../hooks';
import { searchCountries } from '../../shared';
import type { Country } from '../../shared';

interface CountrySelectionPageProps {
  onPlayerCreated: () => void;
}

export const CountrySelectionPage: React.FC<CountrySelectionPageProps> = ({
  onPlayerCreated,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('');
  const [isCreatingPlayer, setIsCreatingPlayer] = useState(false);
  const { createPlayer, loading, error } = usePlayer();

  // Filter countries based on search query
  const filteredCountries = useMemo(() => {
    return searchCountries(searchQuery);
  }, [searchQuery]);

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountryCode(countryCode);
  };

  const handlePickCountry = async () => {
    if (!selectedCountryCode) return;

    setIsCreatingPlayer(true);
    const success = await createPlayer(selectedCountryCode);
    if (success) onPlayerCreated();
    setIsCreatingPlayer(false);
  };

  return (
    <div className="country-selection-container bg-country-selection-image">
      <div className="country-selection-card">
        <div className="card-texture-subtle px-4 py-6 rounded-2xl shadow-xl h-full flex flex-col">
          <div className="text-center mb-6 flex-shrink-0">
            <h1 className="text-3xl font-black uppercase tracking-wider text-center text-gray-900 mb-4">
              SELECT YOUR COUNTRY
            </h1>
          </div>

          {/* Search Bar */}
          <div className="mb-4 flex-shrink-0">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="game-input"
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-game flex-shrink-0">
              <p className="text-game-body font-semibold mb-3">{error}</p>
            </div>
          )}

          {/* Country List */}
          <div className="mb-6 country-list-container border-2 border-gray-200 rounded-game-lg">
            {loading && !error ? (
              <CountryListSkeleton itemCount={6} />
            ) : filteredCountries.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-game-body text-gray-500">
                  {searchQuery ? `No countries found matching "${searchQuery}"` : 'No countries available'}
                </p>
              </div>
            ) : (
              <div className="divide-y-2 divide-gray-100">
                {filteredCountries.map((country: Country) => (
                  <CountryListItem
                    key={country.countryCode}
                    country={country}
                    selected={selectedCountryCode === country.countryCode}
                    onSelect={handleCountrySelect}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Pick Button */}
          <div className="flex-shrink-0">
            <LoadingButton
              onClick={handlePickCountry}
              disabled={!selectedCountryCode}
              loading={isCreatingPlayer}
              loadingText="Creating Player..."
              variant="success"
              className="w-full"
            >
              Pick Country
            </LoadingButton>
          </div>
        </div>

        {/* Loading Overlay for initial load */}
        <LoadingOverlay
          isVisible={loading && !error && filteredCountries.length === 0}
          message="Loading countries..."
          transparent
        />
      </div>
    </div>
  );
};
