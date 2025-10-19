import { RedisClient } from '@devvit/redis';
import { Player } from "../../shared/types";
import { GameStatus } from "../../shared/types";

// Redis key builders
const keys = {
  player: (username: string) => `players:${username}`,
  skips: (postId: string) => `post:${postId}:skips`,
  wrongs: (postId: string) => `post:${postId}:wrongs`,
  gameState: (username: string, postId: string) => `game:${postId}:${username}`,
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

  static async createPlayer(redis: RedisClient, username: string, countryCode: string): Promise<void> {
    try {
      const playerKey = `players:${username}`;

      // Convert post object to Redis hash format
      const playerData: Record<string, string> = {
        username: username,
        countryCode: countryCode
      };

      await redis.hSet(playerKey, playerData);
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

  /**
   * Get complete game status for a player
   */
  static async getGameStatus(redis: RedisClient, username: string, postId: string): Promise<GameStatus> {
    try {
      const skipsRemaining = await this.getSkips(redis, username, postId);
      const wrongAnswers = await this.getWrongs(redis, username, postId);
      const isGameOver = wrongAnswers >= 5;

      return {
        username,
        skips: skipsRemaining,
        gameover: isGameOver
      };
    } catch (error) {
      console.error(`Error getting game status for ${username}:`, error);
      throw new Error(
        `Failed to get game status: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Check if player's game is over (5 wrong answers)
   */
  static async isGameOver(redis: RedisClient, username: string, postId: string): Promise<boolean> {
    try {
      const wrongAnswers = await this.getWrongs(redis, username, postId);
      return wrongAnswers >= 5;
    } catch (error) {
      console.error(`Error checking game over status for ${username}:`, error);
      return false;
    }
  }

  /**
   * Reset player's game state for a new post/session
   */
  static async resetGameState(redis: RedisClient, username: string, postId: string): Promise<void> {
    try {
      // Remove player from skips and wrongs leaderboards for this post
      await redis.zRem(keys.skips(postId), [username]);
      await redis.zRem(keys.wrongs(postId), [username]);
    } catch (error) {
      console.error(`Error resetting game state for ${username}:`, error);
      throw new Error(
        `Failed to reset game state: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get player statistics across all posts
   */
  static async getPlayerStats(redis: RedisClient, username: string): Promise<{
    totalCorrectAnswers: number;
    totalWrongAnswers: number;
    totalSkipsUsed: number;
    gamesPlayed: number;
  }> {
    try {
      const player = await this.getPlayer(redis, username);
      if (!player) {
        throw new Error('Player not found');
      }

      // Get player's total points (correct answers) from their country leaderboard
      const totalCorrectAnswers = await redis.zScore(`points:${player.countryCode}`, username) || 0;

      // For now, we'll return basic stats. In a full implementation, 
      // you might want to track these separately across all posts
      return {
        totalCorrectAnswers,
        totalWrongAnswers: 0, // Would need to aggregate across all posts
        totalSkipsUsed: 0,    // Would need to aggregate across all posts
        gamesPlayed: totalCorrectAnswers > 0 ? 1 : 0 // Simple approximation
      };
    } catch (error) {
      console.error(`Error getting player stats for ${username}:`, error);
      throw new Error(
        `Failed to get player stats: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Check if player has reached skip limit
   */
  static async hasSkipsRemaining(redis: RedisClient, username: string, postId: string): Promise<boolean> {
    try {
      const skipsRemaining = await this.getSkips(redis, username, postId);
      return skipsRemaining > 0;
    } catch (error) {
      console.error(`Error checking skips remaining for ${username}:`, error);
      return false;
    }
  }

  /**
   * Increment wrong answer count and check if game should end
   */
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
