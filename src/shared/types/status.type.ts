import { Question } from "./question.type";

export interface GameStatus {
  gameover: boolean;
  skips?: number | undefined;        // Number of skips remaining
  question?: Question | undefined;
}
