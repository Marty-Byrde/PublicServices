import { Quiz, QuizAnswer, QuizQuestion } from "@/typings/kahoot/kahoot"
import KahootQuiz from "@/components/kahoot/KahootQuiz"
import { notFound } from "next/navigation"

interface RenderKahootProps {
  quizzId: string
}

export default async function RenderKahoot({ quizzId }: RenderKahootProps) {
  const quiz = await getQuiz(quizzId)
  if(!quiz) return notFound()

  return <KahootQuiz quiz={quiz} isPending={false}/>
}

interface KahootAPIResponse {
  success: boolean,
  answers: KahootAPIAnswer[],
}
interface KahootAPIAnswer {
  question: string,
  options: KahootAPIOption[],
  answer: number[],
}
interface KahootAPIOption {
  text: string,
}

async function getQuiz(quizzId: string): Promise<Quiz> {
  const response = await fetch(process.env.KAHOOT_ANSWERS_ENDPOINT.replace("%s", quizzId), {
    headers: {
      'Cookie': process.env.KAHOOT_ANSWERS_COOKIES
    },
    next: {
      revalidate: 30
    }
  }).then(res => res.json())
  const questions: QuizQuestion[] = response.answers.map((originalQuestion: KahootAPIResponse['answers'][0]) => {
    const answers: QuizAnswer[] = originalQuestion.options.map((option: KahootAPIResponse['answers'][0]['options'][0], i): QuizAnswer => ({
      text: option.text,
      isCorrect: originalQuestion.answer.includes(i),
    }))

    return {
      question: originalQuestion.question,
      answers,
    }
  })

  return {
    quizzId,
    questions
  }
}