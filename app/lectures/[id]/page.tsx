import { Lecture, LectureDescription, LectureSchedule } from "campus-scraper"
import Link from "next/link"
import BackButton from "@/app/(components)/Navigation/BackButton"
import { Metadata } from "next"

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

export default async function LectureDetails({ params }) {
  const { id }: { id: string } = params
  const lecture = await fetch("http://localhost/api/lectureDetails", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    cache: "no-store"
  }).then(res => res.json() as Promise<Lecture>)
  const isNoObject = (value: any) => typeof value !== "object"

  if (!lecture) return null
  metadata.title = `${lecture?.id} - ${lecture?.name}`

  function SectionCard({ children, hidden, className, keepTogether }: { children: any, hidden?: boolean, className?: string, keepTogether?: boolean }) {
    if (hidden) return null;

    return (
      <div className={`bg-stone-200 dark:bg-base-100 border-[1px] border-black p-4 shadow-2xl ${keepTogether ? "break-inside-avoid" : ""} ${className}`}>
        {children}
      </div>
    )
  }


  function DisplayLectureDescriptions({ description }: { description: LectureDescription[] }) {
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

  return (
    <div>
      <BackButton className='w-full mb-4'/>
      <div className='columns-3xl space-y-4 pb-12' aria-description='page-container'>
        <SectionCard>
          <h1 className='text-xl tracking-wide mb-2 text-black dark:text-white font-bold'>Basic Informations</h1>
          <div className='flex gap-6 px-2 text-gray-700 dark:text-gray-200'>
            <div className='flex flex-col gap-2' aria-description='labels'>
              {Object.keys(lecture).map(key => {
                const value = lecture[key]
                if (!isNoObject(value)) return null;
                if (key === "maxRegistrations" && value === -1) return null;

                return <span key={key} className='text-md'>{key}</span>
              })}
            </div>
            <div className='flex flex-col gap-2' aria-description='values'>
              {Object.keys(lecture).map(key => {
                let value = lecture[key]
                if (!isNoObject(value)) return null;
                if (key === "maxRegistrations" && value === -1) return null;

                if (key === "registrationDeadline") value = new Date(value).toLocaleDateString().split(".").map(segment => segment.length === 1 ? `0${segment}` : segment).join(".") + " " + new Date(value).toLocaleTimeString()

                if (value.toString().startsWith("http")) return (<Link target='_blank' className='underline text-secondary dark:text-gray-400' href={lecture[key].toString()}>{key}</Link>)

                return <span key={key} className='text-md line-clamp-1' title={lecture[key]}>{value}</span>
              })}
            </div>
          </div>
        </SectionCard>

        <SectionCard hidden={lecture.description?.length === 0}>
          <h1 className='text-xl tracking-wide mb-2 text-black dark:text-white font-bold'>Description</h1>

          <DisplayLectureDescriptions description={lecture.description}/>
        </SectionCard>

        <SectionCard hidden={lecture.examDescriptions?.length === 0}>
          <h1 className='text-xl tracking-wide mb-2 text-black dark:text-white font-bold'>Exam-Description</h1>

          <DisplayLectureDescriptions description={lecture.examDescriptions}/>
        </SectionCard>

        <SectionCard keepTogether>
          <h1 className='text-xl tracking-wide mb-6 text-black dark:text-white font-bold'>Time & Date</h1>
          <div className='flex flex-wrap gap-10 px-4 mt-4 justify-center items-center'>
            {lecture.schedules.map(schedule => <Schedule key={schedule.start.toString()} schedule={schedule}/>)}
          </div>
        </SectionCard>


      </div>
    </div>
  )
}