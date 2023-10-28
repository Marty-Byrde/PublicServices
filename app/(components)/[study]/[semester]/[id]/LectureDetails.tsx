import { Lecture } from "campus-scraper"
import { emptyLecture } from "@/app/api/data"
import BackButton from "@/app/(components)/Shared/Navigation/BackButton"
import Card from "@/app/(components)/Shared/Cards/Card"
import { Text } from "@/app/(components)/Shared/Responsive/Text"
import Link from "next/link"
import LectureDescription from "@/components/[study]/[semester]/[id]/LectureDescription"
import Schedule from "@/components/[study]/[semester]/[id]/LectureSchedule"

export default function LectureDetailsDisplay({ lecture: _lecture, isPending }: { lecture: Lecture, isPending?: boolean }) {

  const isNoObject = (value: any) => typeof value !== "object"

  const lecture = _lecture || emptyLecture()
  const properties = Object.keys(lecture).map(k => k).filter(k => isNoObject(lecture[k]) && +lecture[k] !== -1)

  return (
    <div>
      <BackButton className='w-full mb-4'/>
      <div className='columns-3xl space-y-4 pb-12'>
        <Card key='lecture-basicinfo'>
          <h1 className='text-xl tracking-wide mb-2 text-black dark:text-white font-bold'>Basic Informations</h1>
          <div className='flex gap-6 px-2 text-gray-700 dark:text-gray-200'>
            <div className='flex flex-col gap-2'>
              {properties.map(key => (<Text content={key} key={key} textSize='text-md' color='text-gray-700' darkColor='dark:text-gray-200'/>))}
            </div>

            <div className='flex flex-col gap-2'>
              {
                properties.map(key => {
                  if (lecture[key].toString().startsWith("http")) return (<Link target='_blank' className='underline text-secondary dark:text-gray-400' href={lecture[key].toString()}>{key}</Link>)

                  return <Text content={lecture[key]} title={lecture[key]} className='line-clamp-1' isPending={isPending} skeletonClassName='my-2' key={lecture[key]} textSize='text-md' color='text-gray-700' darkColor='dark:text-gray-200'/>
                })
              }
            </div>
          </div>
        </Card>

        <Card key='lecture-description' hidden={lecture.description?.length === 0}>
          <h1 className='text-xl tracking-wide mb-2 text-black dark:text-white font-bold'>Description</h1>

          <LectureDescription description={lecture.description} isPending={isPending}/>
        </Card>

        <Card key='lecture-examdescription' hidden={lecture.examDescriptions?.length === 0}>
          <h1 className='text-xl tracking-wide mb-2 text-black dark:text-white font-bold'>Exam-Description</h1>

          <LectureDescription description={lecture.examDescriptions} isPending={isPending}/>
        </Card>

        <Card key='lecture-schedules' preventBreakup hidden={lecture?.schedules?.length === 0}>
          <h1 className='text-xl tracking-wide mb-6 text-black dark:text-white font-bold'>Time & Date</h1>
          <div className='flex flex-wrap gap-10 px-4 mt-4 justify-center items-center'>
            {lecture.schedules.map(schedule => <Schedule isPending={isPending} key={schedule.start.toString()} schedule={schedule}/>)}
          </div>
        </Card>


      </div>
    </div>
  )
}