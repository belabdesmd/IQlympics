import { RedisClient } from '@devvit/redis';
import { PlayersServices } from "./players.services";
import { QuestionsServices } from "./questions.services";

// Redis key builders
const keys = {
  points: (countryCode: string) => `points:${countryCode}`,
} as const;

export class PointsServices {

  static async answerQuestion(redis: RedisClient, username: string, postId: string, correct: boolean, questionId: number): Promise<boolean> {
    try {
      const player = await PlayersServices.getPlayer(redis, username);
      if (!player) {
        throw new Error(`Player ${username} does not exist`);
      }

      const pointsKey = keys.points(player.countryCode);
      const currentPlayerPoints = await redis.zScore(pointsKey, username) || 0;
      const currentCountryPoints = await redis.zScore("points", player.countryCode) || 0;

      if (correct) {
        // Add a point for correct answer
        await redis.zIncrBy(pointsKey, username, 1);
        await redis.zAdd("points", {
          member: player.countryCode,
          score: currentCountryPoints + 1
        });

        // remove question
        await QuestionsServices.removeQuestion(redis, questionId);

        return true; // Can continue playing
      } else {
        // Handle wrong answer
        const wrongResult = await PlayersServices.incrementWrongAnswers(redis, username, postId);
        
        // Subtract a point only if player has points to lose
        if (currentPlayerPoints > 0) {
          await redis.zIncrBy(pointsKey, username, -1);
          await redis.zAdd("points", {
            member: player.countryCode,
            score: Math.max(0, currentCountryPoints - 1)
          });
        }

        // Return false if game is over (5 wrong answers), true if can continue
        return !wrongResult.gameOver;
      }
    } catch (error) {
      console.error(`Error processing answer for ${username}:`, error);
      throw new Error(
        `Failed to process answer: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

}
