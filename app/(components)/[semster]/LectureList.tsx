import SemesterSelection, { SemesterProps } from "@/components/[semster]/SemesterSelection"
import { SessionData } from "@/components/Auth/useSessionData"
import { BasicLecture } from "campus-scraper"
import { LectureListItem } from "@/components/[semster]/LectureListItem"
import LectureSearch from "@/components/[semster]/LectureSearch"
import LectureListProvider from "@/components/[semster]/LectureListProvider"

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