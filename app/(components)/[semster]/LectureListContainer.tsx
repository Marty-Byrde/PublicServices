import SemesterSelection, { SemesterProps } from "@/components/[semster]/SemesterSelection"
import { SessionData } from "@/components/Auth/useSessionData"
import { BasicLecture } from "campus-scraper"
import { LectureListItem } from "@/components/[semster]/LectureListItem"
import LectureSearch from "@/components/[semster]/LectureSearch"
import LectureListProvider from "@/components/[semster]/LectureListProvider"
import LectureList from "@/components/[semster]/LectureList"

interface LectureListProps {
  routeParams: {
    semester: string,
    study: string,
  }
  data: {
    lectures: BasicLecture[],
    semesters: SemesterProps[],
  },
  isPending?: boolean,
}

export default function LectureListContainer({ routeParams, data: { lectures, semesters }, isPending }: LectureListProps) {
  const { semester, study} = routeParams

  return <LectureListProvider lectures={lectures}>
    <div className='flex flex-wrap gap-4 mb-12 mt-4 justify-center '>
      <div className='flex-1'>
        <LectureSearch />
      </div>
      <SemesterSelection semesters={semesters} routeParams={routeParams}/>
    </div>
    <LectureList routeParams={routeParams} semester={semester} isPending={isPending}/>
  </LectureListProvider>
}