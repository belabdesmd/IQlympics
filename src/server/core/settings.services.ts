import { reddit, redis, scheduler } from "@devvit/web/server";
import { T3 } from "@devvit/web/shared";

// Redis key builders
const keys = {
  subreddits: (id: string) => `subreddits:${id}`,
  logs: (id: string) => `subreddits:${id}:logs`,
} as const;

export class SettingsServices {

  static async setLogs(subredditId: string, postId: string, jobId: string | undefined): Promise<void> {
    await redis.set(keys.logs(subredditId), JSON.stringify({postId: postId, jobId: jobId}));
  }

  static async getLogs(subredditId: string) {
    const logsData = await redis.get(keys.logs(subredditId));
    return logsData ? JSON.parse(logsData) as {postId: string, jobId: string} : undefined;
  }

  static async setTheme(subredditId: string, theme: string): Promise<void> {
    redis.set(keys.subreddits(subredditId), theme);
  }

  static async getTheme(subredditId: string): Promise<string | undefined> {
    return await redis.get(keys.subreddits(subredditId));
  }

  static async createPost(subredditName: string) {
    const post = await reddit.submitCustomPost({
      title: "Play IQlympics",
      subredditName: subredditName
    });

    return post.id;
  }

  static async scheduleNextPost(hours: number, postId: string) {
    let jobId: string | undefined;
    let hoursInMs;

    try {
      hoursInMs = Number(Math.abs(hours)) * 60 * 60 * 1000;
      const runAt = new Date(Date.now() + hoursInMs);
      jobId = await scheduler.runJob({
        name: 'iqlympics-next-round',
        data: {hours: hours, postId: postId},
        runAt,
      });

      return jobId;
    } catch (error) {
      console.error('Error creating scheduled job:', error);
      return;
    }
  }

  static async deletePost(postId: string) {
    const post = await reddit.getPostById(T3(postId));
    if(!post.isRemoved()) await post.remove();
  }

  static async cancelJob(jobId: string) {
    await scheduler.cancelJob(jobId);
  }
}
