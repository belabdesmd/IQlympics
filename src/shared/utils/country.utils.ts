import type { Country } from '../types';
import { 
  COUNTRIES, 
  searchCountries, 
  filterCountries, 
  findCountryByCode, 
  findCountryByName, 
  getAllCountries, 
  isValidCountryCode 
} from '../data/countries';

// Re-export all country utilities for easy access
export {
  COUNTRIES,
  searchCountries,
  filterCountries,
  findCountryByCode,
  findCountryByName,
  getAllCountries,
  isValidCountryCode
};

/**
 * Get country display name with flag emoji
 * @param country - Country object
 * @returns Formatted string with flag and name
 */
export function getCountryDisplayName(country: Country): string {
  return `${country.flag} ${country.name}`;
}

/**
 * Sort countries alphabetically by name
 * @param countries - Array of countries to sort
 * @returns New array sorted by country name
 */
export function sortCountriesByName(countries: readonly Country[]): Country[] {
  return [...countries].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get countries starting with a specific letter
 * @param letter - First letter to filter by
 * @returns Array of countries starting with the specified letter
 */
export function getCountriesByFirstLetter(letter: string): Country[] {
  if (!letter || letter.length !== 1) {
    return [];
  }

  const normalizedLetter = letter.toLowerCase();
  
  return COUNTRIES.filter(country => 
    country.name.toLowerCase().startsWith(normalizedLetter)
  );
}

/**
 * Get a random country from the dataset
 * @returns Random country object
 */
export function getRandomCountry(): Country {
  const randomIndex = Math.floor(Math.random() * COUNTRIES.length);
  // We know COUNTRIES is not empty, so this will always return a valid country
  return COUNTRIES[randomIndex]!;
}

/**
 * Get multiple random countries (without duplicates)
 * @param count - Number of random countries to return
 * @returns Array of random countries
 */
export function getRandomCountries(count: number): Country[] {
  if (count <= 0) {
    return [];
  }

  if (count >= COUNTRIES.length) {
    return [...COUNTRIES];
  }

  const shuffled = [...COUNTRIES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Check if two countries are the same
 * @param country1 - First country to compare
 * @param country2 - Second country to compare
 * @returns True if countries have the same country code
 */
export function areCountriesEqual(country1: Country, country2: Country): boolean {
  return country1.countryCode === country2.countryCode;
}
