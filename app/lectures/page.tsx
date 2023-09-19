import { GetLecturesResponse } from "@/app/api/lectures/route"
import useSessionData from "@/app/(components)/Auth/useSessionData"
import LectureList from "@/app/lectures/LectureList"

export default async function Lectures() {
  const { data } = await useSessionData()
  const response = await fetch(`http://localhost/api/lectures`,
    {
      cache: "no-cache",
      method: 'POST',
      body: JSON.stringify({
        semester: data?.lectureStore?.semester ?? process.env.DEFAULT_LECTURES_SEMESTER
      })
    }).then(res => res.json() as Promise<GetLecturesResponse>)

  return (
    <LectureList lectures={response.lectures} sessionData={data} semester={data?.lectureStore?.semester ?? process.env.DEFAULT_LECTURES_SEMESTER} semesters={response?.semesters}/>
  )
}