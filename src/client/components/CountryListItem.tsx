import React from 'react';
import type { Country } from '../../shared';

interface CountryListItemProps {
  country: Country;
  selected: boolean;
  onSelect: (countryCode: string) => void;
}

export const CountryListItem: React.FC<CountryListItemProps> = ({
  country,
  selected,
  onSelect,
}) => {
  return (
    <div 
      className={`country-item ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(country.countryCode)}
    >
      <input
        type="radio"
        name="country"
        value={country.countryCode}
        checked={selected}
        onChange={() => onSelect(country.countryCode)}
        className="game-radio"
      />
      <img 
        src={country.flag}
        alt={`${country.name} flag`}
        className="country-flag-image"
        loading="lazy"
      />
      <span className="text-game-body text-gray-900 flex-1">
        {country.name}
      </span>
    </div>
  );
};
