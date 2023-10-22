import SemesterSelection, { SemesterProps } from "@/components/[semster]/SemesterSelection"
import { BasicLecture } from "campus-scraper"
import LectureSearch from "@/components/[semster]/LectureSearch"
import LectureList from "@/components/[semster]/LectureList"
import { FilteringProvider } from "@/components/Shared/Filtering/FilteringProvider"

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
  const { semester, study } = routeParams

  return <FilteringProvider items={lectures}>
    <div className='flex flex-wrap gap-4 mb-12 mt-4 justify-center items-center'>
      <div className='flex-1'>
        <LectureSearch />
      </div>
      <SemesterSelection semesters={semesters} routeParams={routeParams} isPending={isPending}/>
    </div>
    <LectureList routeParams={routeParams} semester={semester} isPending={isPending}/>
  </FilteringProvider>
}