import { GetStudiesResponse } from "@/api/studies/route"
import { Curricular, StudyPlan } from "@/api/studies/retrieval"
import Card from "@/components/Cards/Card"
import Link from "next/link"
import useSessionData, { SessionData } from "@/components/Auth/useSessionData"
import StudyTable, { TableCategory, TableProps } from "@/app/lectures/[study]/StudyTable"
import StudySearch from "@/app/lectures/[study]/StudySearch"
import { FilteringProvider } from "@/components/Shared/Filtering/FilteringProvider"

export default async function StudySelection() {
  const { studies } = await fetch(`${process.env.API_BASE}/studies`, {next: {revalidate: 60}}).then(res => res.json() as Promise<GetStudiesResponse>)
  const { user, data } = await useSessionData()
  const subRoute = '/lectures'
  const semester = user ? data?.lectureStore?.semester ?? process.env.DEFAULT_LECTURES_SEMESTER : process.env.DEFAULT_LECTURES_SEMESTER

  const tableStudies: TableCategory[] = studies.map(study => {

    return {
      name: study.type,
      items: study.curriculars.map(curricular => {
        return {
          values: [curricular.name, curricular.details.version ?? '20XX', curricular.details.ausgabe ? 'v'+curricular.details.ausgabe+'.0' : '?.?', curricular.details.duration ?? '? Semester', curricular.details.skz ?? '???'],
          href: `${subRoute}/${curricular.id}/${semester}`
        }
      })
    }
  })


  let settings: TableProps = {
    columns: ['Study-Name', 'Publication', 'Version', 'Estimation', 'ID', ''],
    categories: tableStudies
  }

  return (
    <FilteringProvider items={studies}>
      <div className='flex items-center justify-between gap-12'>
        <h1 className='flex-1 whitespace-nowrap text-gray-700 dark:text-gray-200 font-semibold text-center text-3xl tracking-wider mt-3'>Study Selection</h1>
        <div className='hidden xs:block sm:hidden pt-3 2sm:hidden'><StudySearch semester={semester} studies={studies} iconOnly/></div>
        <div className='hidden xs:hidden sm:hidden pt-3 2sm:block 2sm:flex-1'><StudySearch semester={semester} studies={studies} customization={{box: {containerClassName: 'w-full'}}}/></div>
      </div>


        <div className='hidden sm:block max-w-5xl mx-auto mt-6'><StudySearch semester={semester} studies={studies} customization={{ box: { containerClassName: 'w-full' } }}/></div>

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