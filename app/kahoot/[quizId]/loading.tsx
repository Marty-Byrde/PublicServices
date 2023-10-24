import { Quiz, QuizAnswer, QuizQuestion } from "@/typings/kahoot/kahoot"
import KahootQuiz from "@/components/kahoot/KahootQuiz"

export default function LoadingKahootQuiz(): JSX.Element {
  const createDummyQuiz = (): Quiz => ({
    quizzId: Math.random().toString(),
    questions: Array.from({ length: 10 }, (_, i) : QuizQuestion => ({
      question: Math.random().toString(),
      answers: Array.from({ length: 4 }, (_, i): QuizAnswer => ({
        text: Math.random().toString(),
        isCorrect: false
      }))
    }))
  })

  // @ts-ignore
  return <KahootQuiz quiz={createDummyQuiz()} isPending />
}