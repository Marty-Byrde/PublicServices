import LectureListProvider from "@/app/lectures/LectureListProvider"
import SemesterSelection, { SemesterProps } from "@/app/display/[semester]/SemesterSelection"
import { SessionData } from "@/app/(components)/Auth/useSessionData"
import { BasicLecture } from "campus-scraper"
import LectureSearch from "@/app/lectures/LectureSearch"
import { DisplayLecture } from "@/app/lectures/ClientPage"

interface LectureListProps {
  lectures: BasicLecture[],
  semesters: SemesterProps[],
  sessionData: SessionData
}

export default function LectureList({ lectures, semesters, sessionData }: LectureListProps) {


  return <LectureListProvider lectures={lectures}>
    <div className='flex flex-row-reverse gap-4 mb-12 mt-4'>
      <SemesterSelection initialSelection={sessionData?.lectureStore?.semester} semesters={semesters}/>
      <div className='flex-1'>
        <LectureSearch />
      </div>
    </div>
    <div className='columns-sm space-y-6 gap-6'>
      {lectures.map((lecture, index) => <DisplayLecture key={lecture.id} lecture={lecture} isPending={false} />)}
    </div>
  </LectureListProvider>
}