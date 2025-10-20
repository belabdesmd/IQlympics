import { PlayersServices } from "./players.services";
import redis from "../redis";

// Redis key builders
const keys = {
  points: (countryCode: string) => `points:${countryCode}`,
} as const;

export class PointsServices {

  static async answerQuestion(username: string, correct: boolean, postId: string): Promise<boolean> {
    try {
      const player = await PlayersServices.getPlayer(username);
      if (!player) {
        throw new Error(`Player ${username} does not exist`);
      }

      const pointsKey = keys.points(player.countryCode);
      const currentPlayerPoints = await redis.zScore(pointsKey, username) || 0;
      const currentCountryPoints = await redis.zScore("points", player.countryCode) || 0;

      if (correct) {
        // Add a point for correct answer
        await redis.zIncrBy(pointsKey, 1, username);
        await redis.zAdd("points", {
          value: player.countryCode,
          score: currentCountryPoints + 1
        });
        return true; // Can continue playing
      } else {
        // Handle wrong answer
        const wrongResult = await PlayersServices.incrementWrongAnswers(username, postId);

        // Subtract a point only if player has points to lose
        if (currentPlayerPoints > 0) {
          await redis.zIncrBy(pointsKey, -1, username);
          await redis.zAdd("points", {
            value: player.countryCode,
            score: Math.max(0, currentCountryPoints - 1)
          });
        }

        // Return false if game is over (5 wrong answers), true can continue
        return !wrongResult.gameOver;
      }
    } catch (error) {
      console.error(`Error processing answer for ${username}:`, error);
      throw new Error(
        `Failed to process answer: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get player's current points
   */
  static async getPlayerPoints(username: string): Promise<number> {
    try {
      const player = await PlayersServices.getPlayer(username);
      if (!player) {
        return 0;
      }

      const pointsKey = keys.points(player.countryCode);
      return await redis.zScore(pointsKey, username) || 0;
    } catch (error) {
      console.error(`Error getting player points for ${username}:`, error);
      return 0;
    }
  }

  /**
   * Get country's total points
   */
  static async getCountryPoints(countryCode: string): Promise<number> {
    try {
      return await redis.zScore("points", countryCode) || 0;
    } catch (error) {
      console.error(`Error getting country points for ${countryCode}:`, error);
      return 0;
    }
  }

}
