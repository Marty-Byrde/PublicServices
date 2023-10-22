import { Suspense } from "react"
import Render_StudySelection from "@/components/[study]/Render_StudySelection"
import StudyLoading from "@/app/lectures/[study]/StudyLoading"

export default function StudySelectionPage(){
  return (
    <Suspense fallback={StudyLoading()}>
      {/*// @ts-ignore*/}
      <Render_StudySelection/>
    </Suspense>
  )
}