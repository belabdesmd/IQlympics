export interface Question {
  id: number;
  question: string;
  options: readonly [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
}

export interface Answer {
  gameover: boolean;
  nextQuestion?: Question;
}

export interface Skip {
  remainingSkips: number;
  nextQuestion: Question;
}
