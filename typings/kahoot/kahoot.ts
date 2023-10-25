export interface Quiz {
  quizzId: string
  questions: QuizQuestion[]
}

export interface QuizQuestion {
  question: string,
  answers: QuizAnswer[]
}

export interface QuizAnswer {
  text: string,
  isCorrect: boolean
}