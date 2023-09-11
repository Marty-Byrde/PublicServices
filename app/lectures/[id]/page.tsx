import { Lecture, LectureDescription, LectureSchedule } from "campus-scraper"
import Link from "next/link"
import BackButton from "@/app/(components)/Navigation/BackButton"
import { Metadata } from "next"
import Card from "@/app/(components)/Cards/Card"
import { Text } from "@/app/(components)/ResponsiveTags/Text"

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function Schedule({ schedule }: { schedule: LectureSchedule }) {
  const beginning = new Date(Date.parse(schedule.start.toString()));
  const ending = new Date(Date.parse(schedule.end.toString()));

  if (!schedule?.type) return null

  const typeBackgroundColor = () => {
    if (schedule.type === "Weekly") return "bg-green-600/50"
    if (schedule.type === "PreliminaryMeeting") return "bg-pink-600/50"

    return "bg-sky-700"
  }

  const StatElement = ({ label, value, containerClassName, className }: { label: string, value: any, className?: string, containerClassName?: string }) => {
    if (!label || !value) return null;

    return (
      <div aria-description='statistic' className={`break-inside-avoid flex flex-col items-center justify-center ${containerClassName}`}>
        <span className='text-sm text-gray-600 dark:text-gray-300'>{label}</span>
        <span className={`text-lg shadow-2xl font-semibold text-gray-700 dark:text-gray-200 ${className}`}>{value}</span>
      </div>
    )
  }


  return (
    <div className='flex flex-col gap-3 p-3 bg-neutral-300 dark:bg-neutral-700/60 rounded-2xl'>
      <div aria-description='card-heading-section' className='border-b-2 border-b-slate-500 dark:border-b-white relative text-center tracking-wider pb-2 font-bold '>
        <div className={`${typeBackgroundColor()} p-2 py-1 rounded-full absolute -top-7 -left-8`}>
          <span className='text-md font-semibold'>{schedule.type.toString()}</span>
        </div>

        <div className='text-primary'>
          {beginning.toLocaleDateString().split(".").map(segment => segment.length === 1 ? `0${segment}` : segment).join(".")}
        </div>

      </div>

      <div className='flex flex-wrap gap-6 px-4 justify-center max-w-[180px]' aria-description='card-body-section'>
        <StatElement label='Start' value={beginning.toLocaleTimeString().split(":").slice(0, 2).join(":")}/>
        <StatElement label='End' value={ending.toLocaleTimeString().split(":").slice(0, 2).join(":")}/>
        <StatElement label='Week-Day' value={weekday[beginning.getDay()].substring(0, 3)}/>
        <StatElement label='Room' value={schedule.room}/>
        <StatElement label='Notes' value={schedule.notes} className='text-sm' containerClassName='w-full'/>
      </div>

      <div aria-description='card-footer-section'>

      </div>
    </div>
  )
}

export const metadata: Metadata = {};


/**
 * Returns an empty lecture object
 */
export function emptyLecture(): Lecture {
  return {
    id: "",
    name: "",
    type: "",
    sws: 0,
    ects: 0,
    maxRegistrations: 0,
    registrations: 0,
    registrationDeadline: new Date(),
    language: "DE",
    department: "",
    coursePage: "",
    moodlePage: "",

    teachers: Array(4).fill({ titles: [], name: "", fullName: "" }),
    description: Array(4).fill({ field: "", content: "" }),
    examDescriptions: Array(4).fill({ field: "", content: "" }),
    schedules: Array(8).fill({ start: new Date(), end: new Date(), type: "", room: "", notes: "" }),
    curriculars: Array(4).fill({ name: "", id: "" }),
  }
}

export default async function LectureDetails({ params }) {
  const { id }: { id: string } = params
  const lecture = await fetch("http://localhost/api/lectureDetails", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    cache: "no-store"
  }).then(res => res.json() as Promise<Lecture>)


  if (!lecture) return null
  metadata.title = `${lecture?.id} - ${lecture?.name}`

  return LectureDetailsDisplay({ lecture })
}


export function LectureDetailsDisplay({ lecture: _lecture, isPending }: { lecture: Lecture, isPending?: boolean }) {

  const isNoObject = (value: any) => typeof value !== "object"

  const lecture = _lecture || emptyLecture()
  const properties = Object.keys(lecture).map(k => k).filter(k => isNoObject(lecture[k]) && +lecture[k] !== -1)

  return (
    <div>
      <BackButton className='w-full mb-4'/>
      <div className='columns-3xl space-y-4 pb-12' aria-description='page-container'>
        <Card>
          <h1 className='text-xl tracking-wide mb-2 text-black dark:text-white font-bold'>Basic Informations</h1>
          <div className='flex gap-6 px-2 text-gray-700 dark:text-gray-200'>
            <div className='flex flex-col gap-2'>
              {properties.map(key => (<Text content={key} key={key} textSize='text-md' color='text-gray-700' darkColor='dark:text-gray-200'/>))}
            </div>

            <div className='flex flex-col gap-2'>
              {
                properties.map(key => {
                  if (lecture[key].toString().startsWith("http")) return (<Link target='_blank' className='underline text-secondary dark:text-gray-400' href={lecture[key].toString()}>{key}</Link>)

                  return <Text content={lecture[key]} className='line-clamp-1' isPending={isPending} skeletonClassName='my-2' key={lecture[key]} textSize='text-md' color='text-gray-700' darkColor='dark:text-gray-200'/>
                })
              }
            </div>
          </div>
        </Card>

        <Card hidden={lecture.description?.length === 0}>
          <h1 className='text-xl tracking-wide mb-2 text-black dark:text-white font-bold'>Description</h1>

          <LectureDescription description={lecture.description}/>
        </Card>

        <Card hidden={lecture.examDescriptions?.length === 0}>
          <h1 className='text-xl tracking-wide mb-2 text-black dark:text-white font-bold'>Exam-Description</h1>

          <LectureDescription description={lecture.examDescriptions}/>
        </Card>

        <Card preventBreakup>
          <h1 className='text-xl tracking-wide mb-6 text-black dark:text-white font-bold'>Time & Date</h1>
          <div className='flex flex-wrap gap-10 px-4 mt-4 justify-center items-center'>
            {lecture.schedules.map(schedule => <Schedule key={schedule.start.toString()} schedule={schedule}/>)}
          </div>
        </Card>


      </div>
    </div>
  )
}

/**
 * Displays a given Array of LectureDescription fields and their content.
 * @param description The description elements to display
 * @constructor
 */
function LectureDescription({ description }: { description: LectureDescription[] }) {
  return (
    <div className='flex flex-col gap-4'>
      {description?.map(desc => (
        <div key={desc.field} className='flex flex-col gap-2 md:flex-row md:gap-4 items-center bg-stone-300/60 dark:bg-neutral-700/30 rounded-2xl p-2 text-gray-700 dark:text-gray-200'>
          <div className='md:flex-2 md:w-[160px] md:break-words text-center font-semibold tracking-wider text-lg'>{desc.field}</div>
          <div className='md:flex-1 whitespace-pre-wrap break-all'>{desc.content}</div>
        </div>
      ))}
    </div>
  )
}