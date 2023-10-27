'use client'

import { LectureListItem } from "@/components/[study]/[semester]/LectureListItem"
import { useContext } from "react"
import { BasicLecture } from "campus-scraper"
import { FilterProviderContext, FilterProviderContextProps } from "@/components/Shared/Filtering/FilteringProvider"

export default function LectureList({ isPending, routeParams: {semester, study} }: { routeParams: {study: string, semester: string}, semester: string | '22W', isPending: boolean }) {
  const { filter }: FilterProviderContextProps<BasicLecture> = useContext(FilterProviderContext)

  return (
    <div className='columns-sm space-y-3 gap-6'>
      {filter.map((lecture) => <LectureListItem detailsHref={`/lectures/${study}/${semester}/${lecture?.coursePage?.split("/")?.at(-1)?.split(';').at(0)}`} key={lecture.id} lecture={lecture} isPending={isPending}/>)}
    </div>
  )
}