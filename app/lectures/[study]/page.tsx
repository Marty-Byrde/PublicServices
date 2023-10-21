import { Suspense } from "react"
import StudySelection from "@/app/lectures/[study]/StudySelection"

export default function StudySelectionPage(){
  return (
    <Suspense fallback={<div>Loading Study Selection page...</div>}>
      {/*// @ts-ignore*/}
      <StudySelection/>
    </Suspense>
  )
}