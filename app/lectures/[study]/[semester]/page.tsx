import useSessionData from "@/components/Auth/useSessionData"
import { GetLecturesResponse } from "@/api/lectures/route"
import LectureListContainer from "@/components/[semster]/LectureListContainer"
import SemesterSelection from "@/components/[semster]/SemesterSelection"
import LectureSearch from "@/components/[semster]/LectureSearch"
import LectureListProvider from "@/components/[semster]/LectureListProvider"
import { notFound } from "next/navigation"
import { Metadata } from "next"

interface SemesterLecturePageProps {
  params: {
    semester: string
  }
}

export async function generateMetadata({ params: { semester } }: SemesterLecturePageProps): Promise<Metadata> {
  const response = await fetch(`http://localhost/api/lectures`,
    {
      cache: "no-cache",
      method: 'POST',
      body: JSON.stringify({
        semester
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
  const { semester }: { semester: string } = params
  const { data } = await useSessionData()

  const response = await fetch(`http://localhost/api/lectures`,
    {
      cache: "no-cache",
      method: 'POST',
      body: JSON.stringify({
        semester
      }),
      next:{
        tags: ["lecture-fetch"]
      }
    }).then(res => res.json() as Promise<GetLecturesResponse>)

  if(response?.error?.type === "not-found") return notFound()

  return (
    <LectureListContainer lectures={response.lectures} sessionData={data} semester={semester} semesters={response?.semesters}/>
  )
}