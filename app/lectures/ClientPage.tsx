'use client'

import { BasicLecture, Lecture } from "campus-scraper"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Star from "@/public/lectureIcons/star.svg"
import User from "@/public/lectureIcons/user.svg"
import Calendar from "@/public/lectureIcons/calendar.svg"
import BullHorn from "@/public/lectureIcons/bullhorn.svg"
import Checkmark from "@/public/lectureIcons/checkmark.png"
import Cross from "@/public/lectureIcons/cross.svg"
import SearchInput from "@/app/lectures/SearchInput"
import { Text } from "@/app/(components)/ResponsiveTags/Text"
import ServerImage from "@/app/(components)/ResponsiveTags/ServerImage"


export default function ClientPage({ initialLectures }: { initialLectures: BasicLecture[] }) {
  const [lectures, setLectures] = useState<BasicLecture[]>(initialLectures)

  return (
    <div>
      <div className='mb-8'>
        <SearchInput lectures={initialLectures} setLectures={setLectures}/>
      </div>

      <div className='flex flex-wrap gap-8 items-center justify-center mt-3'>
        {lectures.map((lecture, index) => <DisplayLecture key={index} lecture={lecture} isPending={false} />)}
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

  const BulletPoint = ({ img, value, className }: { img: any, value: string, className?: string }) => {
    if (value.trim().length === 0) return null;

    return (
      <div className="flex space-x-2 text-gray-600 dark:text-gray-400 text-sm items-center">
        <Image src={img} alt='svg' width={16} height={16}/>
        <Text content={value} isPending={isPending} className={className} textSize='text-sm' color='text-gray-600' darkColor='dark:text-gray-400' skWidth='w-24' skBackground='bg-gray-400'  />
      </div>
    )
  }

  const registrationPossible = () => true

  return (
    <div className="relative bg-stone-200 dark:bg-neutral-700/70 py-3 px-6 rounded-3xl shadow-2xl max-w-sm w-full self-stretch">
      <Icon/>
      <div className="mt-6 h-[90%]">
        <div className='my-2 h-14 flex items-center'>
          <Link href={`/lectures/${lecture?.id}`}>
            <Text content={lecture?.name} isPending={isPending} skBackground='bg-gray-400' skHeight='h-2.5' skWidth='w-[20rem]' color='text-black' skLines={2} skeletonClassName={'mb-2'}
                  className='text-lg font-semibold line-clamp-2 hover:text-primary dark:hover:text-primary' />
          </Link>
        </div>
        <div className='hidden flex flex-wrap w-full justify-between gap-x-8 gap-y-3 items-center my-3' aria-description='lecture-short-stats'>
          {/*<BulletPoint value={`${lecture?.ects} ECTS`} img={Star}/>*/}
          {/*<BulletPoint value={`${lecture?.registrations} Registrations`} img={User}/>*/}
          {/*<BulletPoint value={`${lecture?.schedules.length}x Sessions`} img={Calendar}/>*/}
          {/*<BulletPoint className='' value={lecture?.teachers?.at(0).name?.toString() ?? ""} img={BullHorn}/>*/}
        </div>
        <div className="border-t-2"></div>

        <div className="flex justify-between mt-2">
          <div className="flex flex-col gap-0 hidden ">
            <p className="font-semibold text-gray-700 dark:text-neutral-300">Curriculum</p>
            <div className='text-gray-600 dark:text-gray-400 tracking-widest'>

            </div>
          </div>
          <div className="flex flex-col gap-0">
            <p className="font-semibold text-gray-700 dark:text-neutral-300 ">Available</p>
            <div className={`text-gray-600 dark:text-gray-400 font-semibold flex gap-2 justify-center items-center ${isPending ? "mt-1.5" : ""}`}>
              <ServerImage src={registrationPossible() ? Checkmark : Cross}
                           alt='check'
                           width={20}
                           isPending={isPending}

                           className={!registrationPossible() ? "w-3.5 h-3.5" : ""}

                           skBackground='bg-inherit'
                           skDarkBackground='bg-inherit'
                           skeletonClassName='text-gray-500 dark:text-gray-400'
                           skWidth='w-3'
                           skHeight='h-3'/>

              <Text content={registrationPossible() ? "Yes" : "No"}
                    color='text-gray-600'
                    darkColor='dark:text-gray-400'
                    textSize='md'
                    className='font-semibold'

                    skBackground='bg-gray-400'
                    skWidth='w-16'
                    isPending={isPending}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}