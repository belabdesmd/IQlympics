import React from 'react';
import ReactCountryFlag from 'react-country-flag';

interface CountryFlagProps {
  countryCode: string;
  countryName?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({
  countryCode,
  countryName,
  size = 'medium',
  className = '',
}) => {
  const sizeMap = {
    small: '1em',
    medium: '1.5em',
    large: '2em',
  };

  const flagSize = sizeMap[size];

  return (
    <div className={`country-flag-container ${className}`}>
      <ReactCountryFlag
        countryCode={countryCode}
        svg
        style={{
          width: flagSize,
          height: flagSize,
        }}
        title={countryName || countryCode}
        aria-label={`${countryName || countryCode} flag`}
      />
    </div>
  );
};
