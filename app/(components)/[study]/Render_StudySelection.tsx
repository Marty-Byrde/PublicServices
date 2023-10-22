import { GetStudiesResponse } from "@/api/studies/route"
import useSessionData from "@/components/Auth/useSessionData"
import Generic_StudySelection_Display from "@/components/[study]/Generic_StudySelection_Display"

export default async function Render_StudySelection(){
  const { studies } = await fetch(`${process.env.API_BASE}/studies`, {cache: 'no-cache'}).then(res => res.json() as Promise<GetStudiesResponse>)
  const { user, data } = await useSessionData()
  const subRoute = '/lectures'
  const semester = user ? data?.lectureStore?.semester ?? process.env.DEFAULT_LECTURES_SEMESTER : process.env.DEFAULT_LECTURES_SEMESTER

  await new Promise(resolve => setTimeout(resolve, 10000))

  // @ts-ignore
  return <Generic_StudySelection_Display studies={studies} routing={{prefixRoute: subRoute, semester}} />

}