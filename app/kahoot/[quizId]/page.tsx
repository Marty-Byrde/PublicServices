import RenderKahoot from "@/components/kahoot/RenderKahoot"
import { Suspense } from "react"
import LoadingKahootQuiz from "@/app/kahoot/[quizId]/loading"

interface KahootPageProps {
  params: {
    quizId: string
  }
}

export default async function KahootPage({ params: { quizId } }: KahootPageProps) {

  return (
    <Suspense fallback={LoadingKahootQuiz()}>
      {/*// @ts-ignore*/}
      <RenderKahoot quizzId={quizId}/>
    </Suspense>
  )
}