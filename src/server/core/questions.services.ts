import { Question } from "../../shared/types";

export class QuestionsServices {
  
  // Sample trivia questions - in a real app, this would come from a database
  private static readonly QUESTIONS: Question[] = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctIndex: 2
    },
    {
      question: "Which country has the largest population?",
      options: ["India", "China", "United States", "Indonesia"],
      correctIndex: 1
    },
    {
      question: "What is the smallest country in the world?",
      options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
      correctIndex: 1
    },
    {
      question: "Which continent is Brazil located in?",
      options: ["North America", "South America", "Africa", "Asia"],
      correctIndex: 1
    },
    {
      question: "What is the currency of Japan?",
      options: ["Won", "Yuan", "Yen", "Rupee"],
      correctIndex: 2
    },
    {
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "Japan", "South Korea", "Thailand"],
      correctIndex: 1
    },
    {
      question: "What is the longest river in the world?",
      options: ["Amazon River", "Nile River", "Mississippi River", "Yangtze River"],
      correctIndex: 1
    },
    {
      question: "Which country has the most time zones?",
      options: ["Russia", "United States", "China", "Canada"],
      correctIndex: 0
    },
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correctIndex: 2
    },
    {
      question: "Which mountain range contains Mount Everest?",
      options: ["Andes", "Rocky Mountains", "Alps", "Himalayas"],
      correctIndex: 3
    },
    {
      question: "What is the official language of Brazil?",
      options: ["Spanish", "Portuguese", "English", "French"],
      correctIndex: 1
    },
    {
      question: "Which country is both in Europe and Asia?",
      options: ["Russia", "Turkey", "Kazakhstan", "All of the above"],
      correctIndex: 3
    },
    {
      question: "What is the largest desert in the world?",
      options: ["Sahara Desert", "Gobi Desert", "Antarctica", "Arabian Desert"],
      correctIndex: 2
    },
    {
      question: "Which country invented pizza?",
      options: ["Greece", "Italy", "France", "Spain"],
      correctIndex: 1
    },
    {
      question: "What is the capital of Canada?",
      options: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
      correctIndex: 3
    }
  ];

  static getRandomQuestion(): Question {
    const randomIndex = Math.floor(Math.random() * this.QUESTIONS.length);
    const question = this.QUESTIONS[randomIndex];
    if (!question) {
      throw new Error('No questions available');
    }
    return question;
  }

  static validateAnswer(question: Question, selectedIndex: number): boolean {
    return question.correctIndex === selectedIndex;
  }

}
