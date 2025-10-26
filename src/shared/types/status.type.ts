import { Question } from "./question.type";

export interface GameStatus {
  gameover: boolean;
  wrongAnswersNumber?: number;
  skips?: number | undefined;        // Number of skips remaining
  question?: Question | undefined;
}
