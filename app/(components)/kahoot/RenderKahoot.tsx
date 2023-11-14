import KahootQuiz from "@/components/kahoot/KahootQuiz"
import { notFound } from "next/navigation"
import useSessionData from "@/hooks/useSessionData"
import Forbidden from "@/components/Shared/Session/Forbidden"
import getQuiz from "@/lib/kahoot/Quiz"

interface RenderKahootProps {
  quizzId: string
}

export default async function RenderKahoot({ quizzId }: RenderKahootProps) {
  const { user, data } = await useSessionData()
  if(!user || !data?.kahootStore?.access) return Forbidden()

  const quiz = await getQuiz({ quizId: quizzId })
  if(!quiz) return notFound()

  return <KahootQuiz quiz={quiz} isPending={false}/>
}