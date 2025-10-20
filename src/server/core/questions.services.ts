import { Question } from "../../shared/types";
import { RedisClient } from "@devvit/redis";
import { settings } from '@devvit/web/server';

// Redis key builders
const keys = {
  questions: () => `questions`,
  questionIndex: () => `questionIndex`
} as const;

export class QuestionsServices {

  static async fetchQuestionsRemotely(nextId: number): Promise<Question[]> {
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
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey as string,
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            {text: `Generate 10 trivia questions with 4 options and include the index of the correct option for each question (indexes start from 0). The id should be auto-generated starting from ${nextId}`}
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

  static async getQuestion(redis: RedisClient, questionId?: number): Promise<Question | undefined> {
    // get questions remaining
    const count = await redis.hLen(keys.questions());

    // refresh by adding more questions
    if (count < 10) {
      const nextId = parseInt(await redis.get(keys.questionIndex()) ?? "0");
      const newQuestions = await this.fetchQuestionsRemotely(nextId);
      const fields: Record<string, string> = {};
      for (const question of newQuestions) {
        fields[String(question.id)] = JSON.stringify(question);
      }
      await redis.hSet(keys.questions(), fields);
      redis.set(keys.questionIndex(), (nextId + newQuestions.length).toString());
    }

    // get random question
    if (questionId) {
      const questionData = await redis.hGet(keys.questions(), questionId.toString());
      return questionData ? JSON.parse(questionData) : undefined;
    } else {
      const ids = await redis.hKeys(keys.questions());
      const randomId = ids[Math.floor(Math.random() * ids.length)]!;
      return JSON.parse((await redis.hGet(keys.questions(), randomId))!);
    }
  }

  static async removeQuestion(redis: RedisClient, questionId: number): Promise<void> {
    await redis.hDel(keys.questions(), [questionId.toString()]);
  }

}
