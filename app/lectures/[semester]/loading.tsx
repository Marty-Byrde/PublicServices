import LectureList from "@/app/(components)/[semster]/LectureList"
import { BasicLecture } from "campus-scraper"

export default async function Loading() {
  const dummyBasic = (): BasicLecture => ({
    id: '',
    coursePage: '',
    type: '',
    sws: 0,
    name: '',
    teachers: Array(3).fill(''),
  })
  const dummyLectures = Array(30).fill(dummyBasic())

  return <LectureList isPending lectures={dummyLectures} sessionData={null} semester={null} semesters={null}/>
}