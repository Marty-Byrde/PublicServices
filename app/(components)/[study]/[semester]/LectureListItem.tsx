import { BasicLecture } from "campus-scraper"
import Link from "next/link"
import { Text } from "@/components/Shared/Responsive/Text"
import ServerImage from "@/components/Shared/Responsive/ServerImage"
import SpeakerIcon from "@/components/Shared/Icons/SpeakerIcon"


interface LectureListItemProps {
  lecture: BasicLecture,
  isPending: boolean,
  detailsHref: string
}

export function LectureListItem({ lecture, isPending, detailsHref }: LectureListItemProps) {
  return (
    <div className='break-inside-avoid-column pt-3'>
      <div className="relative bg-stone-200 dark:bg-neutral-700/70 py-3 px-6 rounded-3xl shadow-2xl break-inside-avoid-column">
      <LectureTypeIcon lecture={lecture} isPending={isPending}/>
      <div className="mt-6">
        <div className='my-2 flex items-center'>
          <Link href={detailsHref}>
            <Text content={lecture?.name}
                  isPending={isPending}
                  color='text-black'
                  skBackground='bg-gray-400' skHeight='h-2.5' skWidth='w-[20rem]' skLines={2} skeletonClassName={'mb-2'}
                  className='text-lg font-semibold line-clamp-2 hover:text-primary dark:hover:text-primary'
            />
          </Link>
        </div>
        <div className="border-t-2"></div>

        <div className='mt-2 flex justify-between items-center gap-8'>
          <div className="font-semibold text-gray-700 dark:text-neutral-300 text-center">Speaker{lecture?.teachers?.length > 0 ? "s" : ""}:</div>
          <div className={`text-gray-600 dark:text-gray-400 font-semibold flex flex-col gap-x-4 gap-y-2 `}>
            {lecture?.teachers?.map(teacher => (
              <div key={teacher} className='flex flex-row flex-nowrap items-center gap-2'>
                <ServerImage src={SpeakerIcon({className: 'w-5 h-5 stroke-sky-700 dark:stroke-sky-600'})}
                             alt='user'
                             width={14}
                             isPending={false}

                             skBackground='bg-inherit'
                             skDarkBackground='bg-inherit'
                             skeletonClassName='text-gray-500 dark:text-gray-400'
                             skWidth='w-3'
                             skHeight='h-3'/>

                <Text content={teacher?.split(" ")?.reverse()?.join(" ")}
                      color='text-gray-600'
                      darkColor='dark:text-gray-400'
                      textSize='text-sm'
                      className='font-semibold line-clamp-1'

                      skBackground='bg-gray-400'
                      skWidth='w-48'
                      isPending={isPending}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}


function LectureTypeIcon({ lecture, isPending }: { lecture: BasicLecture, isPending: boolean }) {
  if (!lecture?.type) return null
  const backgrounds = {
    attendance: "bg-yellow-700",
    noAttendance: "bg-green-700",
    volunatary: "bg-blue-700"
  }

  let background = backgrounds.attendance;

  if (lecture.type === "VO") background = backgrounds.noAttendance
  if (lecture.type === "TU") background = backgrounds.volunatary

  let getRandomBackground = () => {
    const colors = Object.keys(backgrounds);
    return backgrounds[colors[ colors.length * Math.random() << 0]];
  };
  if(isPending) background = getRandomBackground()

  return (
    <div className={`text-white flex items-center absolute rounded-full py-2 px-2 shadow-xl ${background} left-0 -top-0 -translate-y-1/4`}>
      <Text content={lecture?.type} textSize='text-xl' className='font-bold px-1' isPending={isPending} skHeight='h-6' skWidth='w-12' />
    </div>
  )
}