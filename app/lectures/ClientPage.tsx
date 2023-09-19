'use client'

import { BasicLecture } from "campus-scraper"
import { useState } from "react"
import Link from "next/link"
import User from "@/public/lectureIcons/user.svg"
import SearchInput from "@/app/lectures/SearchInput"
import { Text } from "@/app/(components)/ResponsiveTags/Text"
import ServerImage from "@/app/(components)/ResponsiveTags/ServerImage"
import SemesterSelection, { SemesterProps } from "@/app/lectures/[semester]/SemesterSelection"
import { SessionData } from "@/app/(components)/Auth/useSessionData"


export default function ClientPage({ initialLectures, data, semesters }: { initialLectures: BasicLecture[], data: SessionData, semesters: SemesterProps[] }) {
  const [lectures, setLectures] = useState<BasicLecture[]>(initialLectures)

  return (
    <div>
      <div className='mb-8'>
        <div className='mb-6'>
          <SemesterSelection initialSelection={data?.lectureStore?.semester} semesters={semesters}/>
        </div>
        <SearchInput lectures={initialLectures} setLectures={setLectures}/>
      </div>

      <div className='columns-sm space-y-6 gap-6'>
        {lectures.map((lecture, index) => <DisplayLecture key={lecture.id} lecture={lecture} isPending={false} />)}
      </div>
    </div>
  )
}


export function DisplayLecture({lecture, isPending}: { lecture: BasicLecture, isPending: boolean }) {
  const Icon = () => {
    if (!lecture?.type) return null
    const backgrounds = {
      attendance: "bg-yellow-600",
      noAttendance: "bg-green-700",
      volunatary: "bg-blue-700"
    }

    let background = backgrounds.attendance;

    if (lecture.type === "VO") background = backgrounds.noAttendance
    if (lecture.type === "TU") background = backgrounds.volunatary

    return (
      <div className={`text-white flex items-center absolute rounded-full py-2 px-2 shadow-xl ${background} left-4 -top-4`}>
        <span className='text-xl font-bold px-1'>{lecture.type}</span>
      </div>
    )
  }

  return (
    <div className="relative bg-stone-200 dark:bg-neutral-700/70 py-3 px-6 rounded-3xl shadow-2xl break-inside-avoid-column">
      <Icon/>
      <div className="mt-6">
        <div className='my-2 flex items-center'>
          <Link href={`/lectures/${lecture?.coursePage?.split("/")?.at(-1)?.split(';').at(0)}`}>
            <Text content={lecture?.name} isPending={isPending} skBackground='bg-gray-400' skHeight='h-2.5' skWidth='w-[20rem]' color='text-black' skLines={2} skeletonClassName={'mb-2'}
                  className='text-lg font-semibold line-clamp-2 hover:text-primary dark:hover:text-primary' />
          </Link>
        </div>
        <div className="border-t-2"></div>

        <div className='mt-2 flex justify-between items-center gap-8'>
          <div className="font-semibold text-gray-700 dark:text-neutral-300 text-center">Speaker{lecture?.teachers?.length > 0 ? "s" : ""}:</div>
          <div className={`text-gray-600 dark:text-gray-400 font-semibold flex flex-col gap-x-4 gap-y-2 `}>
            {lecture?.teachers?.map(teacher => (
              <div key={teacher} className='flex flex-row flex-nowrap items-center gap-2'>
                <ServerImage src={User}
                             alt='user'
                             width={14}
                             isPending={isPending}

                             skBackground='bg-inherit'
                             skDarkBackground='bg-inherit'
                             skeletonClassName='text-gray-500 dark:text-gray-400'
                             skWidth='w-3'
                             skHeight='h-3'/>

                <Text content={teacher.split(" ").reverse().join(" ")}
                      color='text-gray-600'
                      darkColor='dark:text-gray-400'
                      textSize='text-sm'
                      className='font-semibold line-clamp-1'

                      skBackground='bg-gray-400'
                      skWidth='w-16'
                      isPending={isPending}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}