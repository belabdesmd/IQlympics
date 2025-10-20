import { PlayersMockServices } from "./players.mock.services";
import redis from "../redis";
import { QuestionsMockServices } from "./questions.mock.services";

// Redis key builders
const keys = {
  points: (countryCode: string) => `points:${countryCode}`,
} as const;

export class PointsMockServices {

  static async answerQuestion(username: string, postId: string, correct: boolean, questionId: number): Promise<boolean> {
    try {
      const player = await PlayersMockServices.getPlayer(username);
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

        // remove question
        await QuestionsMockServices.removeQuestion(questionId);

        return true; // Can continue playing
      } else {
        // increment wrong answer
        const wrongResult = await PlayersMockServices.incrementWrongAnswers(username, postId);

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

}
