import useSessionData from "@/components/Auth/useSessionData"
import { GetLecturesResponse } from "@/api/lectures/route"
import LectureList from "@/components/[semster]/LectureList"

export default async function SemesterLecturePage({ params }) {
  const { semester }: { semester: string } = params
  const { data } = await useSessionData()
  const response = await fetch(`http://localhost/api/lectures`,
    {
      cache: "no-cache",
      method: 'POST',
      body: JSON.stringify({
        semester: data?.lectureStore?.semester ?? process.env.DEFAULT_LECTURES_SEMESTER
      }),
      next:{
        tags: ["lecture-fetch"]
      }
    }).then(res => res.json() as Promise<GetLecturesResponse>)

  return (
    <LectureList lectures={response.lectures} sessionData={data} semester={semester} semesters={response?.semesters}/>
  )
}