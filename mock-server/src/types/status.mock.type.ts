export interface GameStatus {
  username: string;
  wrongAnswersNumber?: number;
  skips: number;        // Number of skips already used
  gameover: boolean;
}
