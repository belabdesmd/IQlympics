import { RedisClient } from '@devvit/redis';
import { Player } from "../../shared/types";

// Redis key builders
const keys = {
  player: (username: string) => `players:${username}`,
  skips: (postId: string) => `post:${postId}:skips`,
  wrongs: (postId: string) => `post:${postId}:wrongs`,
  question: (postId: string, username: string) => `post:${postId}:question:${username}`,
} as const;

export class PlayersServices {

  static async getPlayer(redis: RedisClient, username: string): Promise<Player | null> {
    try {
      const playerKey = keys.player(username);
      const playerData = await redis.hGetAll(playerKey);

      // Check if post exists
      if (!playerData || Object.keys(playerData).length === 0) {
        return null;
      }

      // Reconstruct Player object
      return {
        username: username,
        countryCode: playerData.countryCode!
      };
    } catch (error) {
      console.error(`Error getting player ${username}:`, error);
      throw new Error(
        `Failed to get player: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  static async createPlayer(redis: RedisClient, username: string, countryCode: string): Promise<Player> {
    try {
      const playerKey = `players:${username}`;

      // Convert post object to Redis hash format
      const playerData: Record<string, string> = {
        username: username,
        countryCode: countryCode
      };

      await redis.hSet(playerKey, playerData);

      return {username: username, countryCode: countryCode};
    } catch (error) {
      console.error(`Error creating player ${username}:`, error);
      throw new Error(
        `Failed to create player: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  static async addSkip(redis: RedisClient, postId: string, username: string): Promise<void> {
    await redis.zIncrBy(keys.skips(postId), username, 1);
  }

  static async getSkips(redis: RedisClient, username: string, postId: string): Promise<number> {
    const skipsUsed = (await redis.zScore(keys.skips(postId), username)) || 0;
    return Math.max(0, 3 - skipsUsed); // Return remaining skips (3 total - used)
  }

  static async addWrong(redis: RedisClient, postId: string, username: string): Promise<void> {
    await redis.zIncrBy(keys.wrongs(postId), username, 1);
  }

  static async getWrongs(redis: RedisClient, username: string, postId: string): Promise<number> {
    return (await redis.zScore(keys.wrongs(postId), username)) || 0;
  }

  static async setQuestion(redis: RedisClient, username: string, postId: string, questionId: number): Promise<void> {
    await redis.set(keys.question(postId, username), questionId.toString())
  }

  static async incrementWrongAnswers(redis: RedisClient, username: string, postId: string): Promise<{
    wrongAnswers: number;
    gameOver: boolean;
  }> {
    try {
      await this.addWrong(redis, postId, username);
      const wrongAnswers = await this.getWrongs(redis, username, postId);
      const gameOver = wrongAnswers >= 5;

      return {
        wrongAnswers,
        gameOver
      };
    } catch (error) {
      console.error(`Error incrementing wrong answers for ${username}:`, error);
      throw new Error(
        `Failed to increment wrong answers: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

}
