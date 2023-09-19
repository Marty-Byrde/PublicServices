import ClientPage from "@/app/lectures/ClientPage"
import { GetLecturesResponse } from "@/app/api/lectures/route"
import useSessionData from "@/app/(components)/Auth/useSessionData"
import { SemesterProps } from "@/app/display/[semester]/SemesterSelection"
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
  // const semesters: SemesterProps[] = [{ year: 2023, season: 'W' }, { year: 2023, season: 'S' }, { year: 2022, season: 'W' }, { year: 2022, season: 'S' }, { year: 2021, season: 'W' }, { year: 2021, season: 'S' }]

  return (
    <LectureList lectures={response.lectures} sessionData={data} semesters={response?.semesters}/>
  )
}