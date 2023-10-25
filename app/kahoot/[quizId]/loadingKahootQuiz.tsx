import { Quiz, QuizAnswer, QuizQuestion } from "@/typings/kahoot/kahoot"
import KahootQuiz from "@/components/kahoot/KahootQuiz"

export default function LoadingKahootQuiz({quizId}: {quizId: string}): JSX.Element {
  const createDummyQuiz = (): Quiz => ({
    quizzId: quizId,
    questions: Array.from({ length: 8 }, (_, i) : QuizQuestion => ({
      question: Math.random().toString(),
      answers: Array.from({ length: 4 }, (_, i): QuizAnswer => ({
        text: Math.random().toString(),
        isCorrect: false
      }))
    }))
  })

  return <KahootQuiz quiz={createDummyQuiz()} isPending />
}