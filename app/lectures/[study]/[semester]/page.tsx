import { Suspense } from "react"
import SemesterLectures from "@/app/lectures/[study]/[semester]/SemesterLectures"
import LoadingSemesterSelection from "@/app/lectures/[study]/[semester]/loading"

export default async function SemesterLecturePage({ params }) {
  return (
    <Suspense fallback={LoadingSemesterSelection()}>
      {/*// @ts-ignore*/}
      <SemesterLectures params={params}/>
    </Suspense>
  )
}