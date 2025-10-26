import React from 'react';

interface CountryFlagProps {
  countryCode: string;
  size?: 'small' | 'medium' | 'large';
}

export const CountryFlag: React.FC<CountryFlagProps> = ({
                                                          countryCode,
                                                          size = 'medium',
                                                        }) => {
  const sizeMap = {
    small: '1em',
    medium: '1.5em',
    large: '2em',
  };

  const flagSize = sizeMap[size];

  return (
    <div className={`country-flag-container`}>
      <span className={`fi fi-${countryCode.toLowerCase()}`}
            style={{width: flagSize, height: flagSize}}></span>
    </div>
  );
};
