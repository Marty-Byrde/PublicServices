import ClientSemesterSelection, { SemesterProps } from "@/app/lectures/[semester]/SemesterSelection"
import useSessionData from "@/app/(components)/Auth/useSessionData"
import { GetLecturesResponse } from "@/app/api/lectures/route"
import LectureList from "@/app/lectures/LectureList"

export default async function SemesterLecturePage({ params }) {
  // @ts-ignore
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
  // const semesters: SemesterProps[] = [{ year: 2023, season: 'W' }, { year: 2023, season: 'S' }, { year: 2022, season: 'W' }, { year: 2022, season: 'S' }, { year: 2021, season: 'W' }, { year: 2021, season: 'S' }]

  console.log(`Rendering the lectures for a specific semester (${semester})`)
  return (
    <LectureList lectures={response.lectures} sessionData={data} selected={semester} semesters={response?.semesters}/>
  )
}