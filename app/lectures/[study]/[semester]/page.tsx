import useSessionData from "@/components/Auth/useSessionData"
import { GetLecturesResponse } from "@/api/lectures/route"
import LectureListContainer from "@/components/[semster]/LectureListContainer"
import SemesterSelection from "@/components/[semster]/SemesterSelection"
import LectureSearch from "@/components/[semster]/LectureSearch"
import LectureListProvider from "@/components/[semster]/LectureListProvider"
import { notFound, redirect } from "next/navigation"
import { Metadata } from "next"
import { GetStudiesResponse } from "@/api/studies/route"

interface SemesterLecturePageProps {
  params: {
    semester: string,
    study: string
  }
}

export async function generateMetadata({ params: { semester, study } }: SemesterLecturePageProps): Promise<Metadata> {
  const response = await fetch(`http://localhost/api/lectures`,
    {
      cache: "no-cache",
      method: 'POST',
      body: JSON.stringify({
        semester, study
      }),
      next: {
        tags: ["lecture-fetch"]
      }
    }).then(res => res.json() as Promise<GetLecturesResponse>)

  return {
    title: `Lectures of [${semester}] (${response.lectures.length})`,
    description: `Lectures of the semester ${semester}, ${response.lectures.length} lectures found`
  }
}

export default async function SemesterLecturePage({ params }) {
  const { semester, study }: { semester: string, study: string } = params
  const { studies } = await fetch("http://localhost/api/studies", {next: {revalidate: 3600 * 24 * 7 * 4.3 * 4}}).then(res => res.json() as Promise<GetStudiesResponse>)

  if(!studies.find(plan => plan.curriculars.find(curricular => curricular.id === study))) redirect("/lectures/select")
  let { update, user } = await useSessionData()

  if(user) await update({ lectureStore: { study } })

  const { lectures, semesters, error } = await fetch(`http://localhost/api/lectures`,
    {
      cache: "no-cache",
      method: 'POST',
      body: JSON.stringify({
        semester, study
      }),
      next:{
        tags: ["lecture-fetch"]
      }
    }).then(res => res.json() as Promise<GetLecturesResponse>)

  if(error?.type === "not-found") return notFound()

  const validSemester = semesters.map(s => s.year.toString().slice(2) + s.season).find(s => s === semester)
  if(!validSemester) redirect(`/lectures/${study}/${process.env.DEFAULT_LECTURES_SEMESTER}`)
  if(user) await update({ lectureStore: { semester, study } })

  return (
    <LectureListContainer data={{ lectures, semesters }} routeParams={{semester, study}}/>
  )
}