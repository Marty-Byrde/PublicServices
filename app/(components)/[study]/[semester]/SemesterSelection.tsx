'use client'
import Card from "@/components/Cards/Card"
import { Text } from "@/components/Shared/Responsive/Text"
import { Context, createContext, useContext, useState } from "react"
import Link from "next/link"

const SemesterSelectionContext: Context<any> = createContext(null)

export interface SemesterSelectionProps {
  routeParams: {
    semester: string,
    study: string,
  }
  semesters: SemesterProps[],
  showSubtiles?: boolean,
  isPending?: boolean,
}
export interface SemesterProps {
  year: number,
  season: 'W' | 'S',
}

export default function SemesterSelection({ semesters, routeParams: {semester: initialSelection, study}, showSubtiles, isPending }: SemesterSelectionProps) {
  const [selectedSemester, setSelectedSemester] = useState<string>(initialSelection)

  return (
    <SemesterSelectionContext.Provider value={{ selectedSemester, setSelectedSemester, showSubtiles }}>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-4 flex-wrap mx-auto'>
          {semesters?.map((semester) => <Semester semester={semester} study={study} key={`${semester.year}${semester.season}${isPending ? (isPending+Math.random().toString()) : ''}`} isPending={isPending}/>)}
        </div>
      </div>
    </SemesterSelectionContext.Provider>
  )
}

function Semester({ semester: { year, season }, study, isPending }: {study: string, semester: SemesterProps, isPending?: boolean}) {
  const { selectedSemester, showSubtiles } = useContext(SemesterSelectionContext)
  const id = `${year.toString().slice(2)}${season}`
  const classNames = [`${showSubtiles ?? 'p-2'}`, 'rounded-2xl', 'dark:hover:bg-neutral-700', 'dark:active:bg-neutral-600', 'hover:rounded-2xl', `${selectedSemester === id ? 'dark:bg-red-600 dark:hover:bg-red-500' : ""}`]

  return (
    <Link href={`/lectures/${study}/${id}`}>
      <Card key={id + (selectedSemester === id) + (isPending ? (isPending+Math.random().toString()) : '')} className={classNames.join(" ")} preventBreakup>

        <div className='flex flex-col justify-center gap-2'>
          <Text content={`${year.toString().slice(2)}${season}`} textSize={`${showSubtiles ? 'text-3xl' : 'text-lg'}`} className='text-center' skWidth='w-10' skHeight='h-8' isPending={isPending}/>
          <div className={`${showSubtiles ? 'flex' : 'hidden'} gap-1 justify-center`}>
            <Text content={season === 'W' ? "Winter" : "Sommer"} textSize='text-sm' isPending={isPending} skWidth='w-6' skHeight='h-8'/>
            <Text content={year.toString()} textSize='text-sm' isPending={isPending} skWidth='w-4' skHeight='h-8'/>
          </div>
        </div>
      </Card>
    </Link>
  )
}