import LectureListContainer from "@/components/[semster]/LectureListContainer"
import { BasicLecture } from "campus-scraper"
import { SemesterProps } from "@/components/[semster]/SemesterSelection"

export default function LoadingSemesterSelection() {
  const dummyBasic = (): BasicLecture => ({
    id: Math.random().toString(),
    coursePage: Math.random().toString()+"////",
    type: Math.random().toString() + 'type-loading-placeholder',
    sws: 0,
    name: Math.random().toString() + 'lecture-loading-placeholder',
    teachers: Array(3).fill('').map(t => Math.random().toString()+"teacher-loading-placeholder"),
  })
  const dummyLectures = Array(30).fill(<div>Filled values...</div>).map(() => dummyBasic())
  const semesters: SemesterProps[] = Array(5).fill(('')).map(() => ({ year: Math.random(), season: 'W'}))

  return <LectureListContainer data={{ lectures: dummyLectures, semesters}} routeParams={{semester: '', study: ''}} isPending/>
}