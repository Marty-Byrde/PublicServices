import { Quiz, QuizAnswer, QuizQuestion } from "@/typings/kahoot/kahoot"

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

export default async function getQuiz({ quizId }: { quizId: string }): Promise<Quiz> {
  const authResponse = await fetch(process.env.KAHOOT_API_KEY_URL, {next: {revalidate: 3600 * 24 * 7 * 2}})
  const cookies = authResponse.headers.get('set-cookie').split(";")
  const cookie = cookies.find(c => c.startsWith('token'))?.split(";")?.at(0)

  const response = await fetch(process.env.KAHOOT_ANSWERS_ENDPOINT.replace("%s", quizId), {
    headers: {
      'Cookie': cookie
    },
    next: {
      revalidate: 30
    }
  }).then(res => res.json())

  if(!response.success) return undefined

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
    quizzId: quizId,
    questions
  }
}