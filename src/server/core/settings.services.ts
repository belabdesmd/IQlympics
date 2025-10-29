import { reddit, redis, scheduler } from "@devvit/web/server";
import { T3 } from "@devvit/web/shared";

// Redis key builders
const keys = {
  subreddits: (id: string) => `subreddits:${id}`,
  logsPost: (id: string) => `subreddits:${id}:logs:postId`,
  logsJob: (id: string) => `subreddits:${id}:logs:jobId`,
} as const;

export class SettingsServices {

  static async logsPost(subredditId: string, postId?: string) {
    if (postId) await redis.set(keys.logsPost(subredditId), postId);
    else await redis.del(keys.logsPost(subredditId));
  }

  static async logsJob(subredditId: string, jobId?: string) {
    if (jobId) await redis.set(keys.logsJob(subredditId), jobId);
    else await redis.del(keys.logsJob(subredditId));
  }

  static async getLogs(subredditId: string) {
    const postId = await redis.get(keys.logsPost(subredditId));
    const jobId = await redis.get(keys.logsJob(subredditId));
    return {postId: postId, jobId: jobId};
  }

  static async setTheme(subredditId: string, theme?: string): Promise<void> {
    theme ? await redis.set(keys.subreddits(subredditId), theme) : redis.del(keys.subreddits(subredditId));
  }

  static async getTheme(subredditId: string): Promise<string | undefined> {
    return await redis.get(keys.subreddits(subredditId));
  }

  static async createPost(subredditName: string) {
    return await reddit.submitCustomPost({
      title: "Join the IQlympics!",
      subredditName: subredditName,
      splash: {
        appDisplayName: 'IQlympics',
        backgroundUri: 'background.png', // HACK: Avoids default pattern
      },
    });
  }

  static async scheduleNextPost(hours: number) {
    let jobId: string | undefined;

    try {
      jobId = await scheduler.runJob({
        name: 'iqlympics-next-round',
        cron: `${(new Date()).getMinutes()} */${hours} * * *`,
      });

      return jobId;
    } catch (error) {
      console.error('Error creating scheduled job:', error);
      return;
    }
  }

  static async deletePost(postId?: string) {
    if (postId) {
      const post = await reddit.getPostById(T3(postId));
      if (!post.isRemoved()) await post.remove();
    }
  }

  static async cancelJob(jobId: string) {
    await scheduler.cancelJob(jobId);
  }
}
