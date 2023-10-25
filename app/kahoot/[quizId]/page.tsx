import RenderKahoot from "@/components/kahoot/RenderKahoot"
import { Suspense } from "react"
import LoadingKahootQuiz from "@/app/kahoot/[quizId]/loadingKahootQuiz"

interface KahootPageProps {
  params: {
    quizId: string
  }
}

export default async function KahootPage({ params: { quizId } }: KahootPageProps) {

  return (
    <Suspense fallback={LoadingKahootQuiz({quizId})}>
      {/*// @ts-ignore*/}
      <RenderKahoot quizzId={quizId}/>
    </Suspense>
  )
}