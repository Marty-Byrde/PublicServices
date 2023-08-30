'use client'

import { Lecture } from "campus-scraper"
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


export default function ClientPage({ initialLectures }: { initialLectures: Lecture[] }) {
  const [lectures, setLectures] = useState<Lecture[]>(initialLectures)

  return (
    <div>
      <div className='mb-8'>
        <SearchInput lectures={initialLectures} setLectures={setLectures}/>
      </div>

      <div className='flex flex-wrap gap-8 items-center justify-center mt-3'>
        {lectures.map((lecture, index) => <Lecture key={index} lecture={lecture} isPending={false} />)}
      </div>
    </div>
  )
}


function Lecture({lecture, isPending}: { lecture: Lecture, isPending: boolean }) {
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

  const registrationPossible = () => lecture.maxRegistrations === -1 || lecture.maxRegistrations > lecture.registrations

  return (
    <div className="relative bg-stone-200 dark:bg-neutral-700/70 py-3 px-6 rounded-3xl shadow-2xl max-w-sm w-full self-stretch">
      <Icon/>
      <div className="mt-6 h-[90%]">
        <div className='my-2 h-14 flex items-center'>
          <Link href={`/lectures/${lecture.id}`}>
            <Text content={lecture.name} isPending={isPending} skBackground='bg-gray-400' skHeight='h-2.5' skWidth='w-[20rem]' color='text-black' skLines={2} skeletonClassName={'mb-2'}
                  className='text-lg font-semibold line-clamp-2 hover:text-primary dark:hover:text-primary' />
          </Link>
        </div>
        <div className='flex flex-wrap w-full justify-between gap-x-8 gap-y-3 items-center my-3' aria-description='lecture-short-stats'>
          <BulletPoint value={`${lecture.ects} ECTS`} img={Star}/>
          <BulletPoint value={`${lecture.registrations} Registrations`} img={User}/>
          <BulletPoint value={`${lecture.schedules.length}x Sessions`} img={Calendar}/>
          <BulletPoint className='' value={lecture.teachers?.at(0).name?.toString() ?? ""} img={BullHorn}/>
        </div>
        <div className="border-t-2"></div>

        <div className="flex justify-between mt-2">
          <div className="flex flex-col gap-0">
            <p className="font-semibold text-gray-700 dark:text-neutral-300">Curriculum</p>
            <div className='text-gray-600 dark:text-gray-400 tracking-widest '>
              <Text content={lecture.curriculars.find(c => c.study.toLowerCase().includes("wirtschaftsinformatik")).section?.split("(").at(-1).split(")")[0]}
                    color='text-gray-600'
                    darkColor='dark:text-gray-400'
                    className='tracking-widest'
                    skeletonClassName='mt-3'
                    skBackground='bg-gray-400'
                    isPending={isPending}
              />
            </div>
          </div>
          <div className="flex flex-col gap-0">
            <p className="font-semibold text-gray-700 dark:text-neutral-300 ">Available</p>
            <div className="text-gray-600 dark:text-gray-400 font-semibold flex gap-2 justify-center items-center">
              {registrationPossible() ?
                  <Image src={Checkmark} alt={'check'} width={20} height={20}/> :
                  <Image src={Cross} alt={'cross'} width={14} className='w-3.5 h-3.5'/>
              }
              <p>{registrationPossible() ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}