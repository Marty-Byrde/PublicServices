import { GetStudiesResponse } from "@/api/studies/route"
import { Curricular, StudyPlan } from "@/api/studies/retrieval"
import Card from "@/components/Cards/Card"

export default async function StudySelection() {
  const { studies } = await fetch("http://localhost/api/studies", {next: {revalidate: 3600 * 24 * 7 * 4.3 * 4}}).then(res => res.json() as Promise<GetStudiesResponse>)

  return (
    <div>
      <h1>Select your study:</h1>
      <div className='columns-sm gap-6 space-y-3'>
        {studies.map(plan => plan.curriculars.map((curricular) => (<DisplayStudPlan key={curricular.id} type={plan.type} curricular={curricular}/>)))}
      </div>
    </div>
  )
}

function DisplayStudPlan({ curricular, type }: { curricular: Curricular, type: string }) {
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
          <div className='text-xl font-semibold line-clamp-2' title={curricular.name}>{curricular.name}</div>
        </div>
        <div className='flex gap-x-6 flex-wrap'>
          <div className='text-md'>Version: {curricular.details.version}</div>
          <div className='text-md'>Ausgabe: {curricular.details.ausgabe}</div>
        </div>
      </Card>
    </div>
  )
}