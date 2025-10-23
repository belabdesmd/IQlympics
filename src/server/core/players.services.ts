import { Player } from "../../shared/types";
import { redis } from "@devvit/web/server";

// Redis key builders
const keys = {
  player: (username: string) => `players:${username}`,
  skips: (postId: string) => `post:${postId}:skips`,
  wrongs: (postId: string) => `post:${postId}:wrongs`,
  question: (postId: string) => `post:${postId}:question`,
} as const;

export class PlayersServices {

  static async getPlayer(username: string): Promise<Player | null> {
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

  static async createPlayer(username: string, countryCode: string): Promise<Player> {
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

  static async addSkip(username: string, postId: string): Promise<void> {
    await redis.zIncrBy(keys.skips(postId), username, 1);
  }

  static async getRemainingSkips(username: string, postId: string): Promise<number> {
    const skipsUsed = (await redis.zScore(keys.skips(postId), username)) || 0;
    return Math.max(0, 3 - skipsUsed); // Return remaining skips (3 total - used)
  }

  static async addWrong(username: string, postId: string): Promise<boolean> {
    await redis.zIncrBy(keys.wrongs(postId), username, 1);
    return await this.isGameOver(username, postId);
  }

  static async isGameOver(username: string, postId: string): Promise<boolean> {
    return (await redis.zScore(keys.wrongs(postId), username) || 0) >= 5;
  }

  static async setQuestion(username: string, postId: string, questionId: number): Promise<void> {
    await redis.hSet(keys.question(postId), {[username]: questionId.toString()});
  }

  static async getQuestionId(username: string, postId: string): Promise<number> {
    return parseInt((await redis.hGet(keys.question(postId), username)) || "-1");
  }

  static async purgePostRelated(postId: string): Promise<void> {
    await redis.del(keys.skips(postId)); // all skips for postId
    await redis.del(keys.wrongs(postId)); // all wrongs for postId
    await redis.del(keys.question(postId)); // all question ids
  }

}
