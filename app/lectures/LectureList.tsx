import LectureListProvider from "@/app/lectures/LectureListProvider"
import SemesterSelection, { SemesterProps } from "@/app/lectures/[semester]/SemesterSelection"
import { SessionData } from "@/app/(components)/Auth/useSessionData"
import { BasicLecture } from "campus-scraper"
import LectureSearch from "@/app/lectures/LectureSearch"
import { LectureListItem } from "@/app/(components)/Lectures/LectureListItem"

interface LectureListProps {
  lectures: BasicLecture[],
  semesters: SemesterProps[],
  sessionData: SessionData,
  semester: string | "22W",
  isPending?: boolean,
}

export default function LectureList({ lectures, semesters, sessionData, semester, isPending }: LectureListProps) {


  return <LectureListProvider lectures={lectures}>
    <div className='flex flex-row-reverse gap-4 mb-12 mt-4'>
      <SemesterSelection initialSelection={sessionData?.lectureStore?.semester} semesters={semesters}/>
      <div className='flex-1'>
        <LectureSearch />
      </div>
    </div>
    <div className='columns-sm space-y-6 gap-6'>
      {lectures.map((lecture) => <LectureListItem detailsHref={`/lectures/${semester}/${lecture?.coursePage?.split("/")?.at(-1)?.split(';').at(0)}`} key={lecture.id} lecture={lecture} isPending={isPending}/>)}
    </div>
  </LectureListProvider>
}