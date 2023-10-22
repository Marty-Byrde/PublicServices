import LectureListContainer from "@/components/[semster]/LectureListContainer"
import { BasicLecture } from "campus-scraper"
// import { LectureListItem } from "@/components/[semster]/LectureListItem"
import LectureSearch from "@/components/[semster]/LectureSearch"
import SemesterSelection, { SemesterProps } from "@/components/[semster]/SemesterSelection"
import LectureList from "@/components/[semster]/LectureList"
import { FilteringProvider } from "@/components/Shared/Filtering/FilteringProvider"
import Link from "next/link"
import { Text } from "@/components/ResponsiveTags/Text"
import ServerImage from "@/components/ResponsiveTags/ServerImage"
import User from "@/public/lectureIcons/user.svg"
import { StudyPlan } from "@/api/studies/retrieval"

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