'use client'

import { LectureListItem } from "@/components/[semster]/LectureListItem"
import { useContext } from "react"
import { LectureListContext } from "@/components/[semster]/LectureListProvider"
import { BasicLecture } from "campus-scraper"

export default function LectureList({ semester, isPending }: { semester: string | '22W', isPending: boolean }) {
  const { lectures }: { lectures: BasicLecture[] } = useContext(LectureListContext)
  return (
    <div className='columns-sm space-y-3 gap-6'>
      {lectures.map((lecture) => <LectureListItem detailsHref={`/lectures/${semester}/${lecture?.coursePage?.split("/")?.at(-1)?.split(';').at(0)}`} key={lecture.id} lecture={lecture} isPending={isPending}/>)}
    </div>
  )
}