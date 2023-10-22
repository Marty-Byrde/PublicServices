import { GetStudiesResponse } from "@/api/studies/route"
import { Curricular, StudyPlan } from "@/api/studies/retrieval"
import Card from "@/components/Cards/Card"
import Link from "next/link"
import useSessionData from "@/components/Auth/useSessionData"
import StudyTable, { TableCategory, TableProps } from "@/components/[study]/StudyTable"
import StudySearch, { StudySearchProps } from "@/components/[study]/StudySearch"
import { FilteringProvider } from "@/components/Shared/Filtering/FilteringProvider"

interface StudySelectionProps {
  studies: StudyPlan[]
  routing: {
    prefixRoute: string | '/lectures'
    semester: string | '23W'
  }
  isPending?: boolean
}

export default async function Generic_StudySelection_Display({ routing, studies, isPending }: StudySelectionProps) {
  const searchProps: Omit<StudySearchProps, 'iconOnly' | 'customization'> = { semester: routing.semester, studies }

  const tableStudies: TableCategory[] = studies.map(study => {
    return {
      name: study.type,
      items: study.curriculars.map(curricular => {
        return {
          values: [curricular.name, curricular.details.version ?? '20XX', curricular.details.ausgabe ? 'v' + curricular.details.ausgabe + '.0' : '?.?', curricular.details.duration ?? '? Semester', curricular.details.skz ?? '???'],
          href: `${routing.prefixRoute}/${curricular.id}/${routing.semester}`
        }
      })
    }
  })


  let settings: TableProps = {
    columns: ['Study-Name', 'Publication', 'Version', 'Estimation', 'ID', ''],
    categories: tableStudies,
    isPending
  }

  return (
    <FilteringProvider items={studies}>
      <div className='flex items-center justify-between gap-12'>
        <h1 className='flex-1 whitespace-nowrap text-gray-700 dark:text-gray-200 font-semibold text-center text-3xl tracking-wider mt-3'>Study Selection</h1>
        <div className='hidden xs:block sm:hidden pt-3 2sm:hidden'><StudySearch {...searchProps} iconOnly/></div>
        <div className='hidden xs:hidden sm:hidden pt-3 2sm:block 2sm:flex-1'><StudySearch {...searchProps} customization={{ box: { containerClassName: 'w-full' } }}/></div>
      </div>


      <div className='hidden sm:block max-w-5xl mx-auto mt-6'><StudySearch {...searchProps} customization={{ box: { containerClassName: 'w-full' } }}/></div>

      <StudyTable {...settings}/>
    </FilteringProvider>
  )
}

function DisplayStudPlan({ curricular, type, prefixRoute, semester }: { prefixRoute: string, semester: string, curricular: Curricular, type: string }) {
  const useStudyPlan = () => {

    let backgroundColor = 'bg-blue-400';
    if (type === 'Erweiterung') {
      backgroundColor = 'bg-indigo-800/60'
    }
    if (type === 'Lehramt') {
      backgroundColor = 'bg-red-900'
    }
    if (type === 'Doktorat') {
      backgroundColor = 'bg-orange-800'
    }
    if (type === 'Bachelor') {
      backgroundColor = 'bg-green-800'
    }
    if (type === 'Master') {
      backgroundColor = 'bg-blue-800'
    }
    if (type === 'Sonstiges') {
      backgroundColor = 'bg-fuchsia-800/70'
    }

    return { backgroundColor }
  }
  const { backgroundColor } = useStudyPlan()

  return (
    <div className='pt-5'>
      <Card preventBreakup className='relative'>

        <div className='header'>
          <div className={`icon px-3 py-1 ${backgroundColor} absolute -left-0 -top-5 rounded-2xl`}>
            {type}
          </div>
          <Link href={`${prefixRoute}/${curricular.id}/${semester}`} className='text-xl font-semibold line-clamp-2 hover:text-primary' title={curricular.name}>{curricular.name}</Link>
        </div>
        <div className='flex gap-x-6 flex-wrap'>
          <div className='text-md'>Version: {curricular.details.version}</div>
          <div className='text-md'>Ausgabe: {curricular.details.ausgabe}</div>
        </div>
      </Card>
    </div>
  )
}