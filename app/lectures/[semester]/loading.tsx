import LectureListContainer from "@/components/[semster]/LectureListContainer"
import { BasicLecture } from "campus-scraper"

export default async function Loading() {
  const dummyBasic = (): BasicLecture => ({
    id: Math.random().toString(),
    coursePage: '',
    type: '',
    sws: 0,
    name: '',
    teachers: Array(3).fill(''),
  })
  const dummyLectures = Array(30).map(() => dummyBasic())

  return <LectureListContainer isPending lectures={dummyLectures} sessionData={null} semester={null} semesters={null}/>
}