import { Question } from "../../shared/types";
import { reddit, redis, settings } from '@devvit/web/server';
import { PlayersServices } from "./players.services";
import { SettingsServices } from "./settings.services";

// Redis key builders
const keys = {
  questions: (subredditId: string) => `questions:${subredditId}`,
  questionIndex: (subredditId: string) => `questionIndex:${subredditId}`,
  points: (countryCode: string) => `points:${countryCode}`,
} as const;

export class QuestionsServices {

  private static async fetchQuestionsRemotely(nextId: number): Promise<Question[]> {
    // Get API key from settings
    let apiKey;
    try {
      apiKey = await settings.get('API_KEY');
      if (!apiKey) {
        console.error('API_KEY not found in settings');
        return []; // TODO: handle Error properly
      }
    } catch (error) {
      console.error('Error getting API key from settings:', error);
      return [];
    }

    // Make API call to generate caption image
    const subreddit = await reddit.getCurrentSubreddit();
    const theme = await SettingsServices.getTheme(subreddit.name);
    const about = theme ? `about ${theme} ` : "";
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey as string,
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            {text: `Generate 10 trivia questions ${about}with 4 options and include the index of the correct option for each question (indexes start from 0). The id should be auto-generated starting from ${nextId}`}
          ]
        }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                id: {type: "INTEGER"},
                question: {type: "STRING"},
                options: {
                  type: "ARRAY",
                  items: {type: "STRING"}
                },
                correctIndex: {type: "INTEGER"},
              }
            }
          }
        }
      }),
    });

    if (!response.ok) console.error(`API call failed to generate questions: ${response.status} ${response.statusText}`);
    return JSON.parse(JSON.parse(await response.text()).candidates[0].content.parts[0].text) as Question[];
  }

  static async getQuestion(subredditId: string, questionId: number): Promise<Question | undefined> {
    // get questions remaining
    const count = await redis.hLen(keys.questions(subredditId));

    // refresh by adding more questions
    if (count < 10) {
      const nextId = parseInt(await redis.get(keys.questionIndex(subredditId)) ?? "0");
      const newQuestions = await this.fetchQuestionsRemotely(nextId);

      const fields: Record<string, string> = {};
      for (const question of newQuestions) {
        fields[String(question.id)] = JSON.stringify(question);
      }
      await redis.hSet(keys.questions(subredditId), fields);
      await redis.set(keys.questionIndex(subredditId), (nextId + newQuestions.length).toString());
    }

    // get random question
    if (questionId !== -1) {
      const questionData = await redis.hGet(keys.questions(subredditId), questionId.toString());
      return questionData ? JSON.parse(questionData) : undefined;
    } else {
      const ids = await redis.hKeys(keys.questions(subredditId));
      const randomId = ids[Math.floor(Math.random() * ids.length)]!;
      const questionData = await redis.hGet(keys.questions(subredditId), randomId);
      return questionData ? JSON.parse(questionData) : undefined;
    }
  }

  static async removeQuestion(subredditId: string, questionId: number): Promise<void> {
    await redis.hDel(keys.questions(subredditId), [questionId.toString()]);
  }

  static async answerQuestion(subredditId: string, username: string, postId: string, correct: boolean, questionId: number): Promise<Question | null | undefined> {
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
        await redis.zIncrBy(pointsKey, username, 1);
        await redis.zAdd("points", {
          member: player.countryCode,
          score: currentCountryPoints + 1
        });

        // remove question
        await QuestionsServices.removeQuestion(subredditId, questionId);

        return QuestionsServices.getQuestion(subredditId, -1); // return question
      } else {
        // Handle wrong answer
        const gameOver = await PlayersServices.addWrong(username, postId);

        // Subtract a point only if player has points to lose
        if (currentPlayerPoints > 0) {
          await redis.zIncrBy(pointsKey, username, -1);
          await redis.zAdd("points", {
            member: player.countryCode,
            score: Math.max(0, currentCountryPoints - 1)
          });
        }

        // Return either question (next gameplay) or null if gameover
        return !gameOver ? QuestionsServices.getQuestion(subredditId, -1) : null;
      }
    } catch (error) {
      console.error(`Error processing answer for ${username}:`, error);
      throw new Error(
        `Failed to process answer: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

}
