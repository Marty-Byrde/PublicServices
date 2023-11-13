import RenderKahoot from "@/components/kahoot/RenderKahoot"
import { Suspense } from "react"
import LoadingKahootQuiz from "@/app/kahoot/[quizId]/loadingKahootQuiz"
import useSessionData from "@/hooks/useSessionData"
import Forbidden from "@/components/Shared/Session/Forbidden"

interface KahootPageProps {
  params: {
    quizId: string
  }
}

export default async function KahootPage({ params: { quizId } }: KahootPageProps) {
  const { user, data } = await useSessionData()
  if(!user || !data?.kahootStore?.access) return Forbidden()

  return (
    <Suspense fallback={LoadingKahootQuiz({quizId})}>
      {/*// @ts-ignore*/}
      <RenderKahoot quizzId={quizId}/>
    </Suspense>
  )
}