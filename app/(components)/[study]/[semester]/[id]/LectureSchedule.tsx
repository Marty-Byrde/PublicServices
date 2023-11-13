import { LectureSchedule } from "campus-scraper"
import { Text } from "@/components/Shared/Responsive/Text"

const weekday = ["Sontag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

export default function Schedule({ schedule, isPending }: { schedule: LectureSchedule, isPending?: boolean }) {
  const beginning = new Date(Date.parse(schedule.start.toString()));
  const ending = new Date(Date.parse(schedule.end.toString()));

  if (!schedule?.type && !isPending) return null

  const typeBackgroundColor = () => {
    if (schedule.type === "Weekly") return "bg-green-600/50"
    if (schedule.type === "PreliminaryMeeting") return "bg-pink-600/50"

    if (isPending) return "bg-base-100"
    return "bg-sky-700"
  }

  const StatElement = ({ label, value, containerClassName, className }: { label: string, value: any, className?: string, containerClassName?: string }) => {
    if (!label || !value) return null;

    return (
      <div className={`break-inside-avoid flex flex-col items-center justify-center ${containerClassName}`}>
        <Text content={label} color='text-gray-700' darkColor='dark:text-gray-200' textSize='text-sm' isPending={false}/>
        <Text content={value} skWidth='w-12' skHeight='h-2.5' skeletonClassName='mt-2' color='text-gray-700' darkColor='dark:text-gray-200' className={`shadow-2xl font-semibold ${className}`} isPending={isPending}/>
      </div>
    )
  }


  return (
    <div className='flex flex-col gap-3 p-3 bg-neutral-300 dark:bg-neutral-700/60 rounded-2xl'>
      <div className='border-b-2 border-b-slate-500 dark:border-b-white relative text-center tracking-wider pb-2 font-bold '>
        <div className={`${typeBackgroundColor()} ${!isPending ? "p-2 py-1" : ""} rounded-full absolute -top-7 -left-8`}>
          <Text content={schedule.type.toString()} skWidth='w-20' skHeight='h-8' textSize='text-md' className='font-semibold' isPending={isPending}/>
        </div>

        <Text content={beginning.toLocaleDateString('de').split(".").map(segment => segment.length === 1 ? `0${segment}` : segment).join(".")} color='text-primary' darkColor='text-primary' skeletonClassName='my-2 mx-auto' skHeight='h-3' skWidth='w-24' isPending={isPending}/>


      </div>

      <div className='grid grid-cols-2 gap-6 px-4'>
        <StatElement label='Start' value={beginning.toLocaleTimeString('de').split(":").slice(0, 2).join(":")}/>
        <StatElement label='End' value={ending.toLocaleTimeString('de').split(":").slice(0, 2).join(":")}/>
        <StatElement label='Week-Day' value={weekday[beginning.getDay()].substring(0, 5) + '.'}/>
        <StatElement label='Room' value={schedule.room}/>
        <StatElement label='Notes' value={schedule.notes} className='text-sm' containerClassName='w-full'/>
      </div>
    </div>
  )
}