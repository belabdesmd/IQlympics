import { Question } from "../types/question.mock.type";
import redis from "../redis";
import { PlayersMockServices } from "./players.mock.services";

// Redis key builders
const keys = {
  questions: () => `questions`,
  questionIndex: () => `questionIndex`,
  points: (countryCode: string) => `points:${countryCode}`,
} as const;

export class QuestionsMockServices {

  private static async fetchQuestionsRemotely(nextId: number): Promise<Question[]> {
    // Make API call to generate caption image
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.API_KEY as string,
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

  static async getQuestion(questionId: number): Promise<Question | undefined> {
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
      await redis.set(keys.questionIndex(), (nextId + newQuestions.length).toString());
    }

    // get random question
    if (questionId !== -1) {
      const questionData = await redis.hGet(keys.questions(), questionId.toString());
      return questionData ? JSON.parse(questionData) : undefined;
    } else {
      const ids = await redis.hKeys(keys.questions());
      const randomId = ids[Math.floor(Math.random() * ids.length)]!;
      const questionData = await redis.hGet(keys.questions(), randomId);
      return questionData ? JSON.parse(questionData) : undefined;
    }
  }

  static async removeQuestion(questionId: number): Promise<void> {
    await redis.hDel(keys.questions(), [questionId.toString()]);
  }

  static async answerQuestion(username: string, postId: string, correct: boolean, questionId: number): Promise<Question | null | undefined> {
    try {
      const player = await PlayersMockServices.getPlayer(username);
      if (!player) {
        throw new Error(`Player ${username} does not exist`);
      }

      const pointsKey = keys.points(player.countryCode);
      const currentPlayerPoints = await redis.zScore(pointsKey, username) || 0;
      const currentCountryPoints = await redis.zScore("points", player.countryCode) || 0;

      if (correct) {
        // TODO: add answer as comment?

        // Add a point for correct answer
        await redis.zIncrBy(pointsKey, 1, username);
        await redis.zAdd("points", {
          value: player.countryCode,
          score: currentCountryPoints + 1
        });

        // remove question
        await this.removeQuestion(questionId);

        return this.getQuestion(-1); // return question
      } else {
        // Handle wrong answer
        const gameOver = await PlayersMockServices.addWrong(username, postId);

        // Subtract a point only if player has points to lose
        if (currentPlayerPoints > 0) {
          await redis.zIncrBy(pointsKey, -1, username);
          await redis.zAdd("points", {
            value: player.countryCode,
            score: Math.max(0, currentCountryPoints - 1)
          });
        }

        // Return either question (next gameplay) or null if gameover
        return !gameOver ? this.getQuestion(-1) : null;
      }
    } catch (error) {
      console.error(`Error processing answer for ${username}:`, error);
      throw new Error(
        `Failed to process answer: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

}
