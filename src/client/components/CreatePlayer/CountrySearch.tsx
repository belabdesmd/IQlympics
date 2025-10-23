import React, { useRef } from 'react';
import { MdSearch, MdClose } from 'react-icons/md';

interface CountrySearchProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
}

export const CountrySearch: React.FC<CountrySearchProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  const handleClearSearch = () => {
    onSearchChange('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      handleClearSearch();
    }
  };

  return (
    <div className="country-search">
      <div className="country-search-wrapper">
        <div className="country-search-icon">
          <MdSearch aria-hidden="true" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          className="country-search-input"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoFocus
          aria-label="Search countries"
        />
        
        {searchTerm && (
          <button
            type="button"
            className="country-search-clear"
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            <MdClose aria-hidden="true" />
          </button>
        )}
      </div>
      
      {searchTerm && (
        <div className="country-search-hint">
          Press Escape to clear search
        </div>
      )}
    </div>
  );
};