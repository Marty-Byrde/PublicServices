import { GetStudiesResponse } from "@/api/studies/route"
import { Curricular, StudyPlan } from "@/api/studies/retrieval"
import Card from "@/components/Cards/Card"
import Link from "next/link"
import useSessionData, { SessionData } from "@/components/Auth/useSessionData"

export default async function StudySelection() {
  const { studies } = await fetch("http://localhost/api/studies", {next: {revalidate: 3600 * 24 * 7 * 4.3 * 4}}).then(res => res.json() as Promise<GetStudiesResponse>)
  const { user, data } = await useSessionData()
  const subRoute = '/lectures'
  const semester = user ? data?.lectureStore?.semester ?? process.env.DEFAULT_LECTURES_SEMESTER : process.env.DEFAULT_LECTURES_SEMESTER

  return (
    <div>
      <h1>Select your study:</h1>
      <div className='columns-sm gap-6 space-y-3'>
        {studies.map(plan => plan.curriculars.map((curricular) => (<DisplayStudPlan prefixRoute={subRoute} semester={semester} key={curricular.id} type={plan.type} curricular={curricular}/>)))}
      </div>
    </div>
  )
}

function DisplayStudPlan({ curricular, type, prefixRoute, semester }: {prefixRoute: string, semester: string, curricular: Curricular, type: string }) {
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