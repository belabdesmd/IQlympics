import type { Country } from '../types';

// Static country dataset with ISO 3166-1 alpha-2 codes and names
// Flag images are loaded dynamically from flagcdn.com using the country code
const COUNTRY_DATA: readonly { countryCode: string; name: string }[] = [
    { countryCode: 'AD', name: 'Andorra' },
    { countryCode: 'AE', name: 'United Arab Emirates' },
    { countryCode: 'AF', name: 'Afghanistan' },
    { countryCode: 'AG', name: 'Antigua and Barbuda' },
    { countryCode: 'AI', name: 'Anguilla' },
    { countryCode: 'AL', name: 'Albania' },
    { countryCode: 'AM', name: 'Armenia' },
    { countryCode: 'AO', name: 'Angola' },
    { countryCode: 'AQ', name: 'Antarctica' },
    { countryCode: 'AR', name: 'Argentina' },
    { countryCode: 'AS', name: 'American Samoa' },
    { countryCode: 'AT', name: 'Austria' },
    { countryCode: 'AU', name: 'Australia' },
    { countryCode: 'AW', name: 'Aruba' },
    { countryCode: 'AX', name: 'Åland Islands' },
    { countryCode: 'AZ', name: 'Azerbaijan' },
    { countryCode: 'BA', name: 'Bosnia and Herzegovina' },
    { countryCode: 'BB', name: 'Barbados' },
    { countryCode: 'BD', name: 'Bangladesh' },
    { countryCode: 'BE', name: 'Belgium' },
    { countryCode: 'BF', name: 'Burkina Faso' },
    { countryCode: 'BG', name: 'Bulgaria' },
    { countryCode: 'BH', name: 'Bahrain' },
    { countryCode: 'BI', name: 'Burundi' },
    { countryCode: 'BJ', name: 'Benin' },
    { countryCode: 'BL', name: 'Saint Barthélemy' },
    { countryCode: 'BM', name: 'Bermuda' },
    { countryCode: 'BN', name: 'Brunei' },
    { countryCode: 'BO', name: 'Bolivia' },
    { countryCode: 'BQ', name: 'Caribbean Netherlands' },
    { countryCode: 'BR', name: 'Brazil' },
    { countryCode: 'BS', name: 'Bahamas' },
    { countryCode: 'BT', name: 'Bhutan' },
    { countryCode: 'BV', name: 'Bouvet Island' },
    { countryCode: 'BW', name: 'Botswana' },
    { countryCode: 'BY', name: 'Belarus' },
    { countryCode: 'BZ', name: 'Belize' },
    { countryCode: 'CA', name: 'Canada' },
    { countryCode: 'CC', name: 'Cocos Islands' },
    { countryCode: 'CD', name: 'Democratic Republic of the Congo' },
    { countryCode: 'CF', name: 'Central African Republic' },
    { countryCode: 'CG', name: 'Republic of the Congo' },
    { countryCode: 'CH', name: 'Switzerland' },
    { countryCode: 'CI', name: 'Côte d\'Ivoire' },
    { countryCode: 'CK', name: 'Cook Islands' },
    { countryCode: 'CL', name: 'Chile' },
    { countryCode: 'CM', name: 'Cameroon' },
    { countryCode: 'CN', name: 'China' },
    { countryCode: 'CO', name: 'Colombia' },
    { countryCode: 'CR', name: 'Costa Rica' },
    { countryCode: 'CU', name: 'Cuba' },
    { countryCode: 'CV', name: 'Cape Verde' },
    { countryCode: 'CW', name: 'Curaçao' },
    { countryCode: 'CX', name: 'Christmas Island' },
    { countryCode: 'CY', name: 'Cyprus' },
    { countryCode: 'CZ', name: 'Czech Republic' },
    { countryCode: 'DE', name: 'Germany' },
    { countryCode: 'DJ', name: 'Djibouti' },
    { countryCode: 'DK', name: 'Denmark' },
    { countryCode: 'DM', name: 'Dominica' },
    { countryCode: 'DO', name: 'Dominican Republic' },
    { countryCode: 'DZ', name: 'Algeria' },
    { countryCode: 'EC', name: 'Ecuador' },
    { countryCode: 'EE', name: 'Estonia' },
    { countryCode: 'EG', name: 'Egypt' },
    { countryCode: 'EH', name: 'Western Sahara' },
    { countryCode: 'ER', name: 'Eritrea' },
    { countryCode: 'ES', name: 'Spain' },
    { countryCode: 'ET', name: 'Ethiopia' },
    { countryCode: 'FI', name: 'Finland' },
    { countryCode: 'FJ', name: 'Fiji' },
    { countryCode: 'FK', name: 'Falkland Islands' },
    { countryCode: 'FM', name: 'Micronesia' },
    { countryCode: 'FO', name: 'Faroe Islands' },
    { countryCode: 'FR', name: 'France' },
    { countryCode: 'GA', name: 'Gabon' },
    { countryCode: 'GB', name: 'United Kingdom' },
    { countryCode: 'GD', name: 'Grenada' },
    { countryCode: 'GE', name: 'Georgia' },
    { countryCode: 'GF', name: 'French Guiana' },
    { countryCode: 'GG', name: 'Guernsey' },
    { countryCode: 'GH', name: 'Ghana' },
    { countryCode: 'GI', name: 'Gibraltar' },
    { countryCode: 'GL', name: 'Greenland' },
    { countryCode: 'GM', name: 'Gambia' },
    { countryCode: 'GN', name: 'Guinea' },
    { countryCode: 'GP', name: 'Guadeloupe' },
    { countryCode: 'GQ', name: 'Equatorial Guinea' },
    { countryCode: 'GR', name: 'Greece' },
    { countryCode: 'GS', name: 'South Georgia and the South Sandwich Islands' },
    { countryCode: 'GT', name: 'Guatemala' },
    { countryCode: 'GU', name: 'Guam' },
    { countryCode: 'GW', name: 'Guinea-Bissau' },
    { countryCode: 'GY', name: 'Guyana' },
    { countryCode: 'HK', name: 'Hong Kong' },
    { countryCode: 'HM', name: 'Heard Island and McDonald Islands' },
    { countryCode: 'HN', name: 'Honduras' },
    { countryCode: 'HR', name: 'Croatia' },
    { countryCode: 'HT', name: 'Haiti' },
    { countryCode: 'HU', name: 'Hungary' },
    { countryCode: 'ID', name: 'Indonesia' },
    { countryCode: 'IE', name: 'Ireland' },
    { countryCode: 'IL', name: 'Israel' },
    { countryCode: 'IM', name: 'Isle of Man' },
    { countryCode: 'IN', name: 'India' },
    { countryCode: 'IO', name: 'British Indian Ocean Territory' },
    { countryCode: 'IQ', name: 'Iraq' },
    { countryCode: 'IR', name: 'Iran' },
    { countryCode: 'IS', name: 'Iceland' },
    { countryCode: 'IT', name: 'Italy' },
    { countryCode: 'JE', name: 'Jersey' },
    { countryCode: 'JM', name: 'Jamaica' },
    { countryCode: 'JO', name: 'Jordan' },
    { countryCode: 'JP', name: 'Japan' },
    { countryCode: 'KE', name: 'Kenya' },
    { countryCode: 'KG', name: 'Kyrgyzstan' },
    { countryCode: 'KH', name: 'Cambodia' },
    { countryCode: 'KI', name: 'Kiribati' },
    { countryCode: 'KM', name: 'Comoros' },
    { countryCode: 'KN', name: 'Saint Kitts and Nevis' },
    { countryCode: 'KP', name: 'North Korea' },
    { countryCode: 'KR', name: 'South Korea' },
    { countryCode: 'KW', name: 'Kuwait' },
    { countryCode: 'KY', name: 'Cayman Islands' },
    { countryCode: 'KZ', name: 'Kazakhstan' },
    { countryCode: 'LA', name: 'Laos' },
    { countryCode: 'LB', name: 'Lebanon' },
    { countryCode: 'LC', name: 'Saint Lucia' },
    { countryCode: 'LI', name: 'Liechtenstein' },
    { countryCode: 'LK', name: 'Sri Lanka' },
    { countryCode: 'LR', name: 'Liberia' },
    { countryCode: 'LS', name: 'Lesotho' },
    { countryCode: 'LT', name: 'Lithuania' },
    { countryCode: 'LU', name: 'Luxembourg' },
    { countryCode: 'LV', name: 'Latvia' },
    { countryCode: 'LY', name: 'Libya' },
    { countryCode: 'MA', name: 'Morocco' },
    { countryCode: 'MC', name: 'Monaco' },
    { countryCode: 'MD', name: 'Moldova' },
    { countryCode: 'ME', name: 'Montenegro' },
    { countryCode: 'MF', name: 'Saint Martin' },
    { countryCode: 'MG', name: 'Madagascar' },
    { countryCode: 'MH', name: 'Marshall Islands' },
    { countryCode: 'MK', name: 'North Macedonia' },
    { countryCode: 'ML', name: 'Mali' },
    { countryCode: 'MM', name: 'Myanmar' },
    { countryCode: 'MN', name: 'Mongolia' },
    { countryCode: 'MO', name: 'Macao' },
    { countryCode: 'MP', name: 'Northern Mariana Islands' },
    { countryCode: 'MQ', name: 'Martinique' },
    { countryCode: 'MR', name: 'Mauritania' },
    { countryCode: 'MS', name: 'Montserrat' },
    { countryCode: 'MT', name: 'Malta' },
    { countryCode: 'MU', name: 'Mauritius' },
    { countryCode: 'MV', name: 'Maldives' },
    { countryCode: 'MW', name: 'Malawi' },
    { countryCode: 'MX', name: 'Mexico' },
    { countryCode: 'MY', name: 'Malaysia' },
    { countryCode: 'MZ', name: 'Mozambique' },
    { countryCode: 'NA', name: 'Namibia' },
    { countryCode: 'NC', name: 'New Caledonia' },
    { countryCode: 'NE', name: 'Niger' },
    { countryCode: 'NF', name: 'Norfolk Island' },
    { countryCode: 'NG', name: 'Nigeria' },
    { countryCode: 'NI', name: 'Nicaragua' },
    { countryCode: 'NL', name: 'Netherlands' },
    { countryCode: 'NO', name: 'Norway' },
    { countryCode: 'NP', name: 'Nepal' },
    { countryCode: 'NR', name: 'Nauru' },
    { countryCode: 'NU', name: 'Niue' },
    { countryCode: 'NZ', name: 'New Zealand' },
    { countryCode: 'OM', name: 'Oman' },
    { countryCode: 'PA', name: 'Panama' },
    { countryCode: 'PE', name: 'Peru' },
    { countryCode: 'PF', name: 'French Polynesia' },
    { countryCode: 'PG', name: 'Papua New Guinea' },
    { countryCode: 'PH', name: 'Philippines' },
    { countryCode: 'PK', name: 'Pakistan' },
    { countryCode: 'PL', name: 'Poland' },
    { countryCode: 'PM', name: 'Saint Pierre and Miquelon' },
    { countryCode: 'PN', name: 'Pitcairn' },
    { countryCode: 'PR', name: 'Puerto Rico' },
    { countryCode: 'PS', name: 'Palestine' },
    { countryCode: 'PT', name: 'Portugal' },
    { countryCode: 'PW', name: 'Palau' },
    { countryCode: 'PY', name: 'Paraguay' },
    { countryCode: 'QA', name: 'Qatar' },
    { countryCode: 'RE', name: 'Réunion' },
    { countryCode: 'RO', name: 'Romania' },
    { countryCode: 'RS', name: 'Serbia' },
    { countryCode: 'RU', name: 'Russia' },
    { countryCode: 'RW', name: 'Rwanda' },
    { countryCode: 'SA', name: 'Saudi Arabia' },
    { countryCode: 'SB', name: 'Solomon Islands' },
    { countryCode: 'SC', name: 'Seychelles' },
    { countryCode: 'SD', name: 'Sudan' },
    { countryCode: 'SE', name: 'Sweden' },
    { countryCode: 'SG', name: 'Singapore' },
    { countryCode: 'SH', name: 'Saint Helena' },
    { countryCode: 'SI', name: 'Slovenia' },
    { countryCode: 'SJ', name: 'Svalbard and Jan Mayen' },
    { countryCode: 'SK', name: 'Slovakia' },
    { countryCode: 'SL', name: 'Sierra Leone' },
    { countryCode: 'SM', name: 'San Marino' },
    { countryCode: 'SN', name: 'Senegal' },
    { countryCode: 'SO', name: 'Somalia' },
    { countryCode: 'SR', name: 'Suriname' },
    { countryCode: 'SS', name: 'South Sudan' },
    { countryCode: 'ST', name: 'São Tomé and Príncipe' },
    { countryCode: 'SV', name: 'El Salvador' },
    { countryCode: 'SX', name: 'Sint Maarten' },
    { countryCode: 'SY', name: 'Syria' },
    { countryCode: 'SZ', name: 'Eswatini' },
    { countryCode: 'TC', name: 'Turks and Caicos Islands' },
    { countryCode: 'TD', name: 'Chad' },
    { countryCode: 'TF', name: 'French Southern Territories' },
    { countryCode: 'TG', name: 'Togo' },
    { countryCode: 'TH', name: 'Thailand' },
    { countryCode: 'TJ', name: 'Tajikistan' },
    { countryCode: 'TK', name: 'Tokelau' },
    { countryCode: 'TL', name: 'Timor-Leste' },
    { countryCode: 'TM', name: 'Turkmenistan' },
    { countryCode: 'TN', name: 'Tunisia' },
    { countryCode: 'TO', name: 'Tonga' },
    { countryCode: 'TR', name: 'Turkey' },
    { countryCode: 'TT', name: 'Trinidad and Tobago' },
    { countryCode: 'TV', name: 'Tuvalu' },
    { countryCode: 'TW', name: 'Taiwan' },
    { countryCode: 'TZ', name: 'Tanzania' },
    { countryCode: 'UA', name: 'Ukraine' },
    { countryCode: 'UG', name: 'Uganda' },
    { countryCode: 'UM', name: 'United States Minor Outlying Islands' },
    { countryCode: 'US', name: 'United States' },
    { countryCode: 'UY', name: 'Uruguay' },
    { countryCode: 'UZ', name: 'Uzbekistan' },
    { countryCode: 'VA', name: 'Vatican City' },
    { countryCode: 'VC', name: 'Saint Vincent and the Grenadines' },
    { countryCode: 'VE', name: 'Venezuela' },
    { countryCode: 'VG', name: 'British Virgin Islands' },
    { countryCode: 'VI', name: 'U.S. Virgin Islands' },
    { countryCode: 'VN', name: 'Vietnam' },
    { countryCode: 'VU', name: 'Vanuatu' },
    { countryCode: 'WF', name: 'Wallis and Futuna' },
    { countryCode: 'WS', name: 'Samoa' },
    { countryCode: 'YE', name: 'Yemen' },
    { countryCode: 'YT', name: 'Mayotte' },
    { countryCode: 'ZA', name: 'South Africa' },
    { countryCode: 'ZM', name: 'Zambia' },
    { countryCode: 'ZW', name: 'Zimbabwe' },
] as const;

/**
 * Generate flag URL for a country code
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns Flag image URL from flagcdn.com
 */
function getFlagUrl(countryCode: string): string {
    return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
}

// Transform country data to include flag URLs
export const COUNTRIES: readonly Country[] = COUNTRY_DATA.map(country => ({
    ...country,
    flag: getFlagUrl(country.countryCode)
}));

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