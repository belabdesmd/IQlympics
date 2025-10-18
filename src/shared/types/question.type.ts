export interface Question {
  question: string;
  options: readonly [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
}
