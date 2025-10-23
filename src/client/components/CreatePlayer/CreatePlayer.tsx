import React, { useState, useEffect } from 'react';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';
import { CountryList } from './CountryList';
import { CountrySearch } from './CountrySearch';
import type { Country, Player, GameStatus } from '../../../shared/types';
import { getAllCountries, filterCountries } from '../../../shared';
import { apiClient } from '../../services/api';

interface CreatePlayerProps {
  onPlayerCreated: (player: Player, gameStatus: GameStatus) => void;
  onError: (error: string) => void;
}

interface CreatePlayerState {
  countries: Country[];
  filteredCountries: Country[];
  selectedCountry: string | null;
  searchTerm: string;
  isCreating: boolean;
  validationError: string | null;
}

const CreatePlayer: React.FC<CreatePlayerProps> = ({ onPlayerCreated, onError }) => {
  const [state, setState] = useState<CreatePlayerState>({
    countries: [],
    filteredCountries: [],
    selectedCountry: null,
    searchTerm: '',
    isCreating: false,
    validationError: null,
  });

  // Initialize countries on component mount
  useEffect(() => {
    const countries = getAllCountries();
    setState(prev => ({
      ...prev,
      countries,
      filteredCountries: countries,
    }));
  }, []);

  // Handle search term changes and filter countries
  const handleSearchChange = (searchTerm: string) => {
    const filteredCountries = filterCountries(state.countries, searchTerm);
    setState(prev => ({
      ...prev,
      searchTerm,
      filteredCountries,
    }));
  };

  // Handle country selection
  const handleCountrySelect = (countryCode: string) => {
    setState(prev => ({
      ...prev,
      selectedCountry: countryCode,
      validationError: null, // Clear validation error when country is selected
    }));
  };

  // Validate form before submission
  const validateForm = (): boolean => {
    if (!state.selectedCountry) {
      setState(prev => ({
        ...prev,
        validationError: 'Please select a country to continue'
      }));
      return false;
    }

    // Verify the selected country exists in our list
    const selectedCountryExists = state.countries.some(
      country => country.countryCode === state.selectedCountry
    );

    if (!selectedCountryExists) {
      setState(prev => ({
        ...prev,
        validationError: 'Selected country is invalid. Please choose from the list.'
      }));
      return false;
    }

    setState(prev => ({ ...prev, validationError: null }));
    return true;
  };

  // Handle player creation with retry logic
  const handleCreatePlayer = async () => {
    if (!validateForm()) {
      return;
    }

    setState(prev => ({ 
      ...prev, 
      isCreating: true, 
      validationError: null
    }));

    try {
      const response = await apiClient.createPlayer(state.selectedCountry!);
      
      if (response.status === 'success' && response.data) {
        // After creating player, get game status
        const gameStatusResponse = await apiClient.getGameStatus();
        
        if (gameStatusResponse.status === 'success' && gameStatusResponse.data) {
          // Success - notify parent component with both player and game status
          onPlayerCreated(response.data, gameStatusResponse.data);
        } else {
          const errorMessage = gameStatusResponse.error || 'Failed to load game status after creating player.';
          onError(errorMessage);
        }
      } else {
        // API returned an error
        const errorMessage = response.error || 'Failed to create player. Please try again.';
        onError(errorMessage);
      }
    } catch (error) {
      // Network or other error
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Network error. Please check your connection and try again.';
      onError(errorMessage);
    } finally {
      setState(prev => ({ ...prev, isCreating: false }));
    }
  };



  return (
    <Card>
      <div className="create-player">
        <div className="create-player-header">
          <h1 className="create-player-title">Choose Your Country</h1>
          <p className="create-player-subtitle">
            Select the country you want to represent in the IQlympics trivia competition
          </p>
        </div>

        <div className="create-player-content">
          <CountrySearch
            searchTerm={state.searchTerm}
            onSearchChange={handleSearchChange}
          />

          <CountryList
            countries={state.filteredCountries}
            selectedCountry={state.selectedCountry}
            onCountrySelect={handleCountrySelect}
          />
        </div>

        <div className="create-player-footer">
          {state.validationError && (
            <div className="create-player-validation-error">
              {state.validationError}
            </div>
          )}
          
          <Button
            variant="primary"
            onClick={handleCreatePlayer}
            disabled={state.isCreating}
            loading={state.isCreating}
          >
            {state.isCreating ? 'Creating Player...' : 'Create Player'}
          </Button>
          
          {state.selectedCountry && (
            <div className="create-player-selected-info">
              Selected: {state.countries.find(c => c.countryCode === state.selectedCountry)?.name}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export { CreatePlayer };
