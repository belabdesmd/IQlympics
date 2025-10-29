export function questionPrompt(about: string, nextId: number) {
  return `Generate 20 trivia questions ${about}with 4 multiple-choice options each. 
  Follow these rules strictly:
  
  - Each question must have:
    - "id": auto-generated, starting from ${nextId} and incrementing by 1.
    - "question": a clear, factual question.
    - "options": an array of 4 short options (max 3–4 words each).
    - "correctIndex": the index (0–3) of the correct option.
    
  - The correct answer must be *verifiably true based on real-world facts* (no made-up information).
  - Double-check that the correct answer is **undisputed** (e.g., capital of France = Paris, not Lyon).
  - Avoid ambiguous, opinion-based, or trick questions.
  - If unsure about a fact, **skip that question** and replace it with a fully verified one.
  - Format output as a JSON array of objects.
  
  Example structure:
  [
    {
      "id": 101,
      "question": "What is the capital of France?",
      "options": ["Paris", "Berlin", "Rome", "Madrid"],
      "correctIndex": 0
    },
    ...
    ]
`;
}
