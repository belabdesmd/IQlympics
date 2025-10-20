export interface Leaderboard {
  topCountries: Array<{
    countryCode: string;
    points: number;
  }>;
  yourCountry: {
    countryCode: string;
    points: number;
    position: number;
  };
  contribution: number;  // Player's contribution percentage
}