import React, { useRef, useEffect } from 'react';
import type { Country } from '../../../shared';
import { CountryFlag } from '../CountryFlag/CountryFlag';

interface CountryListProps {
  countries: Country[];
  selectedCountry: string | null;
  onCountrySelect: (countryCode: string) => void;
}

export const CountryList: React.FC<CountryListProps> = ({
  countries,
  selectedCountry,
  onCountrySelect,
}) => {
  const selectedItemRef = useRef<HTMLDivElement>(null);

  // Scroll to selected item when selection changes
  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedCountry]);

  const handleCountryClick = (countryCode: string) => {
    onCountrySelect(countryCode);
  };

  const handleKeyDown = (event: React.KeyboardEvent, countryCode: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCountryClick(countryCode);
    }
  };

  return (
    <div className="country-list">
      <div className="country-list-header">
        <span className="country-list-count">
          {countries.length} {countries.length === 1 ? 'country' : 'countries'} found
        </span>
      </div>
      
      <div className="country-list-container">
        {countries.map((country) => {
          const isSelected = selectedCountry === country.countryCode;
          
          return (
            <div
              key={country.countryCode}
              ref={isSelected ? selectedItemRef : null}
              className={`country-item ${isSelected ? 'country-item-selected' : ''}`}
              onClick={() => handleCountryClick(country.countryCode)}
              onKeyDown={(e) => handleKeyDown(e, country.countryCode)}
              tabIndex={0}
              role="radio"
              aria-checked={isSelected}
              aria-label={`Select ${country.name}`}
            >
              <div className="country-radio">
                <input
                  type="radio"
                  name="country"
                  value={country.countryCode}
                  checked={isSelected}
                  onChange={() => handleCountryClick(country.countryCode)}
                  className="country-radio-input"
                  tabIndex={-1}
                />
              </div>
              
              <div className="country-flag">
                <CountryFlag
                  countryCode={country.countryCode}
                  size="medium"
                />
              </div>
              
              <div className="country-name">
                {country.name}
              </div>
            </div>
          );
        })}
      </div>
      
      {countries.length === 0 && (
        <div className="country-list-empty">
          <div className="country-list-empty-icon">🔍</div>
          <div className="country-list-empty-text">
            No countries found matching your search.
          </div>
          <div className="country-list-empty-hint">
            Try adjusting your search terms.
          </div>
        </div>
      )}
    </div>
  );
};
