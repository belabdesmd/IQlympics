import { Leaderboard } from "../../shared/types";
import { PlayersServices } from "./players.services";
import { redis } from "@devvit/web/server";

// Redis key builders
const keys = {
  points: (countryCode: string) => `points:${countryCode}`
} as const;

export class LeaderboardServices {

  static async getLeaderboard(username: string): Promise<Leaderboard> {
    try {
      // Get player to find their country
      const player = await PlayersServices.getPlayer(username);
      if (!player) {
        throw new Error('Player not found');
      }

      // Get top 5 countries from global points leaderboard
      const allCountriesData = await redis.zRange('points', 0, -1);
      const countriesWithScores = await Promise.all(
        allCountriesData.map(async (item: any) => {
          const countryCode = typeof item === 'string' ? item : item.member;
          return {
            countryCode,
            points: await redis.zScore('points', countryCode) || 0
          };
        })
      );
      
      // Sort by points descending and take top 5
      const topCountries = countriesWithScores
        .sort((a, b) => b.points - a.points)
        .slice(0, 5);

      // Get player's country position and points
      const playerCountryPoints = await redis.zScore('points', player.countryCode) || 0;
      
      // Calculate position by counting countries with higher scores
      const higherScoringCountries = await Promise.all(
        allCountriesData.map(async (item: any) => {
          const countryCode = typeof item === 'string' ? item : item.member;
          const score = await redis.zScore('points', countryCode) || 0;
          return score > playerCountryPoints ? 1 : 0;
        })
      );
      const playerCountryRank = higherScoringCountries.reduce((sum: number, val: number) => sum + val, 0);
      
      // Get player's individual contribution to their country
      const playerPoints = await redis.zScore(keys.points(player.countryCode), username) || 0;
      const contributionPercentage = playerCountryPoints > 0 ? (playerPoints / playerCountryPoints) * 100 : 0;

      // Get Top Player
      const pointsKey = keys.points(player.countryCode);
      const totalCount = await redis.zCard(pointsKey);
      const startIndex = Math.max(0, totalCount - 1);
      const endIndex = totalCount - 1;
      const topPlayer = await redis.zRange(pointsKey, startIndex, endIndex);

      // Setup Data
      const yourCountry = {
        countryCode: player.countryCode,
        points: playerCountryPoints,
        position: playerCountryRank + 1, // Convert 0-based rank to 1-based position
        topPlayer: {
          username: topPlayer.length > 0 ? topPlayer[0]!.member : "",
          contribution: topPlayer.length > 0 ? Math.round(topPlayer[0]!.score * 100) / 100 : 0,
        }
      };

      return {
        topCountries,
        yourCountry,
        contribution: Math.round(contributionPercentage * 100) / 100 // Round to 2 decimal places
      };
    } catch (error) {
      console.error('Error getting leaderboard:', error);
      throw new Error(
        `Failed to get leaderboard: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  static async getTop3Countries() {
    // Get top 3 countries from global points leaderboard
    const allCountriesData = await redis.zRange('points', 0, -1);
    const countriesWithScores = await Promise.all(
      allCountriesData.map(async (item: any) => {
        const countryCode = typeof item === 'string' ? item : item.member;
        return {
          countryCode,
          points: await redis.zScore('points', countryCode) || 0
        };
      })
    );

    // Sort by points descending and take top 3
    return countriesWithScores
      .sort((a, b) => b.points - a.points)
      .slice(0, 3);
  }

}
