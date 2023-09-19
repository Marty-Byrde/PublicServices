'use client'
import Card from "@/app/(components)/Cards/Card"
import { Text } from "@/app/(components)/ResponsiveTags/Text"
import { Context, createContext, useContext, useEffect, useState } from "react"
import { updateSemesterSelection } from "@/actions/[semester]/SemesterActions"
import Link from "next/link"

const SemesterSelectionContext: Context<any> = createContext(null)

export interface SemesterSelectionProps {
  initialSelection: string | "23W"
  semesters: SemesterProps[],
  showSubtiles?: boolean,
}
export interface SemesterProps {
  year: number,
  season: 'W' | 'S'
}

export default function SemesterSelection({ initialSelection, semesters, showSubtiles }: SemesterSelectionProps) {
  const [selectedSemester, setSelectedSemester] = useState<string>(initialSelection)
  const [initialRender, setInitialRender] = useState<boolean>(true)

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false)
      return
    }

    updateSemesterSelection({ selection: selectedSemester }).then();
  }, [selectedSemester])

  return (
    <SemesterSelectionContext.Provider value={{ selectedSemester, setSelectedSemester, showSubtiles }}>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-4 flex-wrap mx-auto'>
          {semesters?.map(({ year, season }) => <Semester key={`${year}${season}`} year={year} season={season}/>)}
        </div>
      </div>
    </SemesterSelectionContext.Provider>
  )
}

function Semester({ year, season }: { year: number, season: 'W' | 'S' }) {
  const { setSelectedSemester, selectedSemester, showSubtiles } = useContext(SemesterSelectionContext)
  const id = `${year.toString().slice(2)}${season}`

  const handleClick = () => {
    setSelectedSemester(`${year.toString().slice(2)}${season}`)
  }
  const classNames = [`${showSubtiles ?? 'p-2'}`, 'rounded-2xl', 'dark:hover:bg-neutral-700', 'dark:active:bg-neutral-600', 'hover:rounded-2xl', `${selectedSemester === id ? 'dark:bg-red-600 dark:hover:bg-red-500' : ""}`]

  return (
    <Link href={`/lectures/${id}`} onClick={handleClick}>
      <Card key={id + (selectedSemester === id)} className={classNames.join(" ")} preventBreakup>

        <div className='flex flex-col justify-center gap-2'>
          <Text content={`${year.toString().slice(2)}${season}`} textSize={`${showSubtiles ? 'text-3xl' : 'text-lg'}`} className='text-center'/>
          <div className={`${showSubtiles ? 'flex' : 'hidden'} gap-1 justify-center`}>
            <Text content={season === 'W' ? "Winter" : "Sommer"} textSize='text-sm'/>
            <Text content={year.toString()} textSize='text-sm'/>
          </div>
        </div>
      </Card>
    </Link>
  )
}