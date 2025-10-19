import type { Country } from '../types';

// Static country dataset with ISO 3166-1 alpha-2 codes, names, and flag emojis
export const COUNTRIES: readonly Country[] = [
    { countryCode: 'AD', name: 'Andorra', flag: '🇦🇩' },
    { countryCode: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
    { countryCode: 'AF', name: 'Afghanistan', flag: '🇦🇫' },
    { countryCode: 'AG', name: 'Antigua and Barbuda', flag: '🇦🇬' },
    { countryCode: 'AI', name: 'Anguilla', flag: '🇦🇮' },
    { countryCode: 'AL', name: 'Albania', flag: '🇦🇱' },
    { countryCode: 'AM', name: 'Armenia', flag: '🇦🇲' },
    { countryCode: 'AO', name: 'Angola', flag: '🇦🇴' },
    { countryCode: 'AQ', name: 'Antarctica', flag: '🇦🇶' },
    { countryCode: 'AR', name: 'Argentina', flag: '🇦🇷' },
    { countryCode: 'AS', name: 'American Samoa', flag: '🇦🇸' },
    { countryCode: 'AT', name: 'Austria', flag: '🇦🇹' },
    { countryCode: 'AU', name: 'Australia', flag: '🇦🇺' },
    { countryCode: 'AW', name: 'Aruba', flag: '🇦🇼' },
    { countryCode: 'AX', name: 'Åland Islands', flag: '🇦🇽' },
    { countryCode: 'AZ', name: 'Azerbaijan', flag: '🇦🇿' },
    { countryCode: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
    { countryCode: 'BB', name: 'Barbados', flag: '🇧🇧' },
    { countryCode: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
    { countryCode: 'BE', name: 'Belgium', flag: '🇧🇪' },
    { countryCode: 'BF', name: 'Burkina Faso', flag: '🇧🇫' },
    { countryCode: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
    { countryCode: 'BH', name: 'Bahrain', flag: '🇧🇭' },
    { countryCode: 'BI', name: 'Burundi', flag: '🇧🇮' },
    { countryCode: 'BJ', name: 'Benin', flag: '🇧🇯' },
    { countryCode: 'BL', name: 'Saint Barthélemy', flag: '🇧🇱' },
    { countryCode: 'BM', name: 'Bermuda', flag: '🇧🇲' },
    { countryCode: 'BN', name: 'Brunei', flag: '🇧🇳' },
    { countryCode: 'BO', name: 'Bolivia', flag: '🇧🇴' },
    { countryCode: 'BQ', name: 'Caribbean Netherlands', flag: '🇧🇶' },
    { countryCode: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { countryCode: 'BS', name: 'Bahamas', flag: '🇧🇸' },
    { countryCode: 'BT', name: 'Bhutan', flag: '🇧🇹' },
    { countryCode: 'BV', name: 'Bouvet Island', flag: '🇧🇻' },
    { countryCode: 'BW', name: 'Botswana', flag: '🇧🇼' },
    { countryCode: 'BY', name: 'Belarus', flag: '🇧🇾' },
    { countryCode: 'BZ', name: 'Belize', flag: '🇧🇿' },
    { countryCode: 'CA', name: 'Canada', flag: '🇨🇦' },
    { countryCode: 'CC', name: 'Cocos Islands', flag: '🇨🇨' },
    { countryCode: 'CD', name: 'Democratic Republic of the Congo', flag: '🇨🇩' },
    { countryCode: 'CF', name: 'Central African Republic', flag: '🇨🇫' },
    { countryCode: 'CG', name: 'Republic of the Congo', flag: '🇨🇬' },
    { countryCode: 'CH', name: 'Switzerland', flag: '🇨🇭' },
    { countryCode: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮' },
    { countryCode: 'CK', name: 'Cook Islands', flag: '🇨🇰' },
    { countryCode: 'CL', name: 'Chile', flag: '🇨🇱' },
    { countryCode: 'CM', name: 'Cameroon', flag: '🇨🇲' },
    { countryCode: 'CN', name: 'China', flag: '🇨🇳' },
    { countryCode: 'CO', name: 'Colombia', flag: '🇨🇴' },
    { countryCode: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
    { countryCode: 'CU', name: 'Cuba', flag: '🇨🇺' },
    { countryCode: 'CV', name: 'Cape Verde', flag: '🇨🇻' },
    { countryCode: 'CW', name: 'Curaçao', flag: '🇨🇼' },
    { countryCode: 'CX', name: 'Christmas Island', flag: '🇨🇽' },
    { countryCode: 'CY', name: 'Cyprus', flag: '🇨🇾' },
    { countryCode: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
    { countryCode: 'DE', name: 'Germany', flag: '🇩🇪' },
    { countryCode: 'DJ', name: 'Djibouti', flag: '🇩🇯' },
    { countryCode: 'DK', name: 'Denmark', flag: '🇩🇰' },
    { countryCode: 'DM', name: 'Dominica', flag: '🇩🇲' },
    { countryCode: 'DO', name: 'Dominican Republic', flag: '🇩🇴' },
    { countryCode: 'DZ', name: 'Algeria', flag: '🇩🇿' },
    { countryCode: 'EC', name: 'Ecuador', flag: '🇪🇨' },
    { countryCode: 'EE', name: 'Estonia', flag: '🇪🇪' },
    { countryCode: 'EG', name: 'Egypt', flag: '🇪🇬' },
    { countryCode: 'EH', name: 'Western Sahara', flag: '🇪🇭' },
    { countryCode: 'ER', name: 'Eritrea', flag: '🇪🇷' },
    { countryCode: 'ES', name: 'Spain', flag: '🇪🇸' },
    { countryCode: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
    { countryCode: 'FI', name: 'Finland', flag: '🇫🇮' },
    { countryCode: 'FJ', name: 'Fiji', flag: '🇫🇯' },
    { countryCode: 'FK', name: 'Falkland Islands', flag: '🇫🇰' },
    { countryCode: 'FM', name: 'Micronesia', flag: '🇫🇲' },
    { countryCode: 'FO', name: 'Faroe Islands', flag: '🇫🇴' },
    { countryCode: 'FR', name: 'France', flag: '🇫🇷' },
    { countryCode: 'GA', name: 'Gabon', flag: '🇬🇦' },
    { countryCode: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { countryCode: 'GD', name: 'Grenada', flag: '🇬🇩' },
    { countryCode: 'GE', name: 'Georgia', flag: '🇬🇪' },
    { countryCode: 'GF', name: 'French Guiana', flag: '🇬🇫' },
    { countryCode: 'GG', name: 'Guernsey', flag: '🇬🇬' },
    { countryCode: 'GH', name: 'Ghana', flag: '🇬🇭' },
    { countryCode: 'GI', name: 'Gibraltar', flag: '🇬🇮' },
    { countryCode: 'GL', name: 'Greenland', flag: '🇬🇱' },
    { countryCode: 'GM', name: 'Gambia', flag: '🇬🇲' },
    { countryCode: 'GN', name: 'Guinea', flag: '🇬🇳' },
    { countryCode: 'GP', name: 'Guadeloupe', flag: '🇬🇵' },
    { countryCode: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶' },
    { countryCode: 'GR', name: 'Greece', flag: '🇬🇷' },
    { countryCode: 'GS', name: 'South Georgia and the South Sandwich Islands', flag: '🇬🇸' },
    { countryCode: 'GT', name: 'Guatemala', flag: '🇬🇹' },
    { countryCode: 'GU', name: 'Guam', flag: '🇬🇺' },
    { countryCode: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼' },
    { countryCode: 'GY', name: 'Guyana', flag: '🇬🇾' },
    { countryCode: 'HK', name: 'Hong Kong', flag: '🇭🇰' },
    { countryCode: 'HM', name: 'Heard Island and McDonald Islands', flag: '🇭🇲' },
    { countryCode: 'HN', name: 'Honduras', flag: '🇭🇳' },
    { countryCode: 'HR', name: 'Croatia', flag: '🇭🇷' },
    { countryCode: 'HT', name: 'Haiti', flag: '🇭🇹' },
    { countryCode: 'HU', name: 'Hungary', flag: '🇭🇺' },
    { countryCode: 'ID', name: 'Indonesia', flag: '🇮🇩' },
    { countryCode: 'IE', name: 'Ireland', flag: '🇮🇪' },
    { countryCode: 'IL', name: 'Israel', flag: '🇮🇱' },
    { countryCode: 'IM', name: 'Isle of Man', flag: '🇮🇲' },
    { countryCode: 'IN', name: 'India', flag: '🇮🇳' },
    { countryCode: 'IO', name: 'British Indian Ocean Territory', flag: '🇮🇴' },
    { countryCode: 'IQ', name: 'Iraq', flag: '🇮🇶' },
    { countryCode: 'IR', name: 'Iran', flag: '🇮🇷' },
    { countryCode: 'IS', name: 'Iceland', flag: '🇮🇸' },
    { countryCode: 'IT', name: 'Italy', flag: '🇮🇹' },
    { countryCode: 'JE', name: 'Jersey', flag: '🇯🇪' },
    { countryCode: 'JM', name: 'Jamaica', flag: '🇯🇲' },
    { countryCode: 'JO', name: 'Jordan', flag: '🇯🇴' },
    { countryCode: 'JP', name: 'Japan', flag: '🇯🇵' },
    { countryCode: 'KE', name: 'Kenya', flag: '🇰🇪' },
    { countryCode: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬' },
    { countryCode: 'KH', name: 'Cambodia', flag: '🇰🇭' },
    { countryCode: 'KI', name: 'Kiribati', flag: '🇰🇮' },
    { countryCode: 'KM', name: 'Comoros', flag: '🇰🇲' },
    { countryCode: 'KN', name: 'Saint Kitts and Nevis', flag: '🇰🇳' },
    { countryCode: 'KP', name: 'North Korea', flag: '🇰🇵' },
    { countryCode: 'KR', name: 'South Korea', flag: '🇰🇷' },
    { countryCode: 'KW', name: 'Kuwait', flag: '🇰🇼' },
    { countryCode: 'KY', name: 'Cayman Islands', flag: '🇰🇾' },
    { countryCode: 'KZ', name: 'Kazakhstan', flag: '🇰🇿' },
    { countryCode: 'LA', name: 'Laos', flag: '🇱🇦' },
    { countryCode: 'LB', name: 'Lebanon', flag: '🇱🇧' },
    { countryCode: 'LC', name: 'Saint Lucia', flag: '🇱🇨' },
    { countryCode: 'LI', name: 'Liechtenstein', flag: '🇱🇮' },
    { countryCode: 'LK', name: 'Sri Lanka', flag: '🇱🇰' },
    { countryCode: 'LR', name: 'Liberia', flag: '🇱🇷' },
    { countryCode: 'LS', name: 'Lesotho', flag: '🇱🇸' },
    { countryCode: 'LT', name: 'Lithuania', flag: '🇱🇹' },
    { countryCode: 'LU', name: 'Luxembourg', flag: '🇱🇺' },
    { countryCode: 'LV', name: 'Latvia', flag: '🇱🇻' },
    { countryCode: 'LY', name: 'Libya', flag: '🇱🇾' },
    { countryCode: 'MA', name: 'Morocco', flag: '🇲🇦' },
    { countryCode: 'MC', name: 'Monaco', flag: '🇲🇨' },
    { countryCode: 'MD', name: 'Moldova', flag: '🇲🇩' },
    { countryCode: 'ME', name: 'Montenegro', flag: '🇲🇪' },
    { countryCode: 'MF', name: 'Saint Martin', flag: '🇲🇫' },
    { countryCode: 'MG', name: 'Madagascar', flag: '🇲🇬' },
    { countryCode: 'MH', name: 'Marshall Islands', flag: '🇲🇭' },
    { countryCode: 'MK', name: 'North Macedonia', flag: '🇲🇰' },
    { countryCode: 'ML', name: 'Mali', flag: '🇲🇱' },
    { countryCode: 'MM', name: 'Myanmar', flag: '🇲🇲' },
    { countryCode: 'MN', name: 'Mongolia', flag: '🇲🇳' },
    { countryCode: 'MO', name: 'Macao', flag: '🇲🇴' },
    { countryCode: 'MP', name: 'Northern Mariana Islands', flag: '🇲🇵' },
    { countryCode: 'MQ', name: 'Martinique', flag: '🇲🇶' },
    { countryCode: 'MR', name: 'Mauritania', flag: '🇲🇷' },
    { countryCode: 'MS', name: 'Montserrat', flag: '🇲🇸' },
    { countryCode: 'MT', name: 'Malta', flag: '🇲🇹' },
    { countryCode: 'MU', name: 'Mauritius', flag: '🇲🇺' },
    { countryCode: 'MV', name: 'Maldives', flag: '🇲🇻' },
    { countryCode: 'MW', name: 'Malawi', flag: '🇲🇼' },
    { countryCode: 'MX', name: 'Mexico', flag: '🇲🇽' },
    { countryCode: 'MY', name: 'Malaysia', flag: '🇲🇾' },
    { countryCode: 'MZ', name: 'Mozambique', flag: '🇲🇿' },
    { countryCode: 'NA', name: 'Namibia', flag: '🇳🇦' },
    { countryCode: 'NC', name: 'New Caledonia', flag: '🇳🇨' },
    { countryCode: 'NE', name: 'Niger', flag: '🇳🇪' },
    { countryCode: 'NF', name: 'Norfolk Island', flag: '🇳🇫' },
    { countryCode: 'NG', name: 'Nigeria', flag: '🇳🇬' },
    { countryCode: 'NI', name: 'Nicaragua', flag: '🇳🇮' },
    { countryCode: 'NL', name: 'Netherlands', flag: '🇳🇱' },
    { countryCode: 'NO', name: 'Norway', flag: '🇳🇴' },
    { countryCode: 'NP', name: 'Nepal', flag: '🇳🇵' },
    { countryCode: 'NR', name: 'Nauru', flag: '🇳🇷' },
    { countryCode: 'NU', name: 'Niue', flag: '🇳🇺' },
    { countryCode: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
    { countryCode: 'OM', name: 'Oman', flag: '🇴🇲' },
    { countryCode: 'PA', name: 'Panama', flag: '🇵🇦' },
    { countryCode: 'PE', name: 'Peru', flag: '🇵🇪' },
    { countryCode: 'PF', name: 'French Polynesia', flag: '🇵🇫' },
    { countryCode: 'PG', name: 'Papua New Guinea', flag: '🇵🇬' },
    { countryCode: 'PH', name: 'Philippines', flag: '🇵🇭' },
    { countryCode: 'PK', name: 'Pakistan', flag: '🇵🇰' },
    { countryCode: 'PL', name: 'Poland', flag: '🇵🇱' },
    { countryCode: 'PM', name: 'Saint Pierre and Miquelon', flag: '🇵🇲' },
    { countryCode: 'PN', name: 'Pitcairn', flag: '🇵🇳' },
    { countryCode: 'PR', name: 'Puerto Rico', flag: '🇵🇷' },
    { countryCode: 'PS', name: 'Palestine', flag: '🇵🇸' },
    { countryCode: 'PT', name: 'Portugal', flag: '🇵🇹' },
    { countryCode: 'PW', name: 'Palau', flag: '🇵🇼' },
    { countryCode: 'PY', name: 'Paraguay', flag: '🇵🇾' },
    { countryCode: 'QA', name: 'Qatar', flag: '🇶🇦' },
    { countryCode: 'RE', name: 'Réunion', flag: '🇷🇪' },
    { countryCode: 'RO', name: 'Romania', flag: '🇷🇴' },
    { countryCode: 'RS', name: 'Serbia', flag: '🇷🇸' },
    { countryCode: 'RU', name: 'Russia', flag: '🇷🇺' },
    { countryCode: 'RW', name: 'Rwanda', flag: '🇷🇼' },
    { countryCode: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
    { countryCode: 'SB', name: 'Solomon Islands', flag: '🇸🇧' },
    { countryCode: 'SC', name: 'Seychelles', flag: '🇸🇨' },
    { countryCode: 'SD', name: 'Sudan', flag: '🇸🇩' },
    { countryCode: 'SE', name: 'Sweden', flag: '🇸🇪' },
    { countryCode: 'SG', name: 'Singapore', flag: '🇸🇬' },
    { countryCode: 'SH', name: 'Saint Helena', flag: '🇸🇭' },
    { countryCode: 'SI', name: 'Slovenia', flag: '🇸🇮' },
    { countryCode: 'SJ', name: 'Svalbard and Jan Mayen', flag: '🇸🇯' },
    { countryCode: 'SK', name: 'Slovakia', flag: '🇸🇰' },
    { countryCode: 'SL', name: 'Sierra Leone', flag: '🇸🇱' },
    { countryCode: 'SM', name: 'San Marino', flag: '🇸🇲' },
    { countryCode: 'SN', name: 'Senegal', flag: '🇸🇳' },
    { countryCode: 'SO', name: 'Somalia', flag: '🇸🇴' },
    { countryCode: 'SR', name: 'Suriname', flag: '🇸🇷' },
    { countryCode: 'SS', name: 'South Sudan', flag: '🇸🇸' },
    { countryCode: 'ST', name: 'São Tomé and Príncipe', flag: '🇸🇹' },
    { countryCode: 'SV', name: 'El Salvador', flag: '🇸🇻' },
    { countryCode: 'SX', name: 'Sint Maarten', flag: '🇸🇽' },
    { countryCode: 'SY', name: 'Syria', flag: '🇸🇾' },
    { countryCode: 'SZ', name: 'Eswatini', flag: '🇸🇿' },
    { countryCode: 'TC', name: 'Turks and Caicos Islands', flag: '🇹🇨' },
    { countryCode: 'TD', name: 'Chad', flag: '🇹🇩' },
    { countryCode: 'TF', name: 'French Southern Territories', flag: '🇹🇫' },
    { countryCode: 'TG', name: 'Togo', flag: '🇹🇬' },
    { countryCode: 'TH', name: 'Thailand', flag: '🇹🇭' },
    { countryCode: 'TJ', name: 'Tajikistan', flag: '🇹🇯' },
    { countryCode: 'TK', name: 'Tokelau', flag: '🇹🇰' },
    { countryCode: 'TL', name: 'Timor-Leste', flag: '🇹🇱' },
    { countryCode: 'TM', name: 'Turkmenistan', flag: '🇹🇲' },
    { countryCode: 'TN', name: 'Tunisia', flag: '🇹🇳' },
    { countryCode: 'TO', name: 'Tonga', flag: '🇹🇴' },
    { countryCode: 'TR', name: 'Turkey', flag: '🇹🇷' },
    { countryCode: 'TT', name: 'Trinidad and Tobago', flag: '🇹🇹' },
    { countryCode: 'TV', name: 'Tuvalu', flag: '🇹🇻' },
    { countryCode: 'TW', name: 'Taiwan', flag: '🇹🇼' },
    { countryCode: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
    { countryCode: 'UA', name: 'Ukraine', flag: '🇺🇦' },
    { countryCode: 'UG', name: 'Uganda', flag: '🇺🇬' },
    { countryCode: 'UM', name: 'United States Minor Outlying Islands', flag: '🇺🇲' },
    { countryCode: 'US', name: 'United States', flag: '🇺🇸' },
    { countryCode: 'UY', name: 'Uruguay', flag: '🇺🇾' },
    { countryCode: 'UZ', name: 'Uzbekistan', flag: '🇺🇿' },
    { countryCode: 'VA', name: 'Vatican City', flag: '🇻🇦' },
    { countryCode: 'VC', name: 'Saint Vincent and the Grenadines', flag: '🇻🇨' },
    { countryCode: 'VE', name: 'Venezuela', flag: '🇻🇪' },
    { countryCode: 'VG', name: 'British Virgin Islands', flag: '🇻🇬' },
    { countryCode: 'VI', name: 'U.S. Virgin Islands', flag: '🇻🇮' },
    { countryCode: 'VN', name: 'Vietnam', flag: '🇻🇳' },
    { countryCode: 'VU', name: 'Vanuatu', flag: '🇻🇺' },
    { countryCode: 'WF', name: 'Wallis and Futuna', flag: '🇼🇫' },
    { countryCode: 'WS', name: 'Samoa', flag: '🇼🇸' },
    { countryCode: 'YE', name: 'Yemen', flag: '🇾🇪' },
    { countryCode: 'YT', name: 'Mayotte', flag: '🇾🇹' },
    { countryCode: 'ZA', name: 'South Africa', flag: '🇿🇦' },
    { countryCode: 'ZM', name: 'Zambia', flag: '🇿🇲' },
    { countryCode: 'ZW', name: 'Zimbabwe', flag: '🇿🇼' },
] as const;

/**
 * Search countries by name (case-insensitive partial matching)
 * @param query - Search query string
 * @returns Array of countries matching the search query
 */
export function searchCountries(query: string): Country[] {
    if (!query.trim()) {
        return [...COUNTRIES];
    }

    const normalizedQuery = query.toLowerCase().trim();

    return COUNTRIES.filter(country =>
        country.name.toLowerCase().includes(normalizedQuery)
    );
}

/**
 * Filter countries by name with exact or partial matching
 * @param countries - Array of countries to filter
 * @param query - Search query string
 * @returns Filtered array of countries
 */
export function filterCountries(countries: readonly Country[], query: string): Country[] {
    if (!query.trim()) {
        return [...countries];
    }

    const normalizedQuery = query.toLowerCase().trim();

    return countries.filter(country =>
        country.name.toLowerCase().includes(normalizedQuery)
    );
}

/**
 * Find a country by its ISO 3166-1 alpha-2 country code
 * @param countryCode - Two-letter country code (e.g., "US", "FR")
 * @returns Country object if found, undefined otherwise
 */
export function findCountryByCode(countryCode: string): Country | undefined {
    if (!countryCode || countryCode.length !== 2) {
        return undefined;
    }

    const normalizedCode = countryCode.toUpperCase();

    return COUNTRIES.find(country => country.countryCode === normalizedCode);
}

/**
 * Find a country by its exact name (case-insensitive)
 * @param name - Full country name
 * @returns Country object if found, undefined otherwise
 */
export function findCountryByName(name: string): Country | undefined {
    if (!name.trim()) {
        return undefined;
    }

    const normalizedName = name.toLowerCase().trim();

    return COUNTRIES.find(country =>
        country.name.toLowerCase() === normalizedName
    );
}

/**
 * Get all available countries
 * @returns Array of all countries
 */
export function getAllCountries(): Country[] {
    return [...COUNTRIES];
}

/**
 * Check if a country code is valid
 * @param countryCode - Two-letter country code to validate
 * @returns True if the country code exists, false otherwise
 */
export function isValidCountryCode(countryCode: string): boolean {
    return findCountryByCode(countryCode) !== undefined;
}
