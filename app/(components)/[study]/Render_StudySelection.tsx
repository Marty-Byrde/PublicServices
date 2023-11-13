import { GetStudiesResponse } from "@/api/studies/route"
import useSessionData from "@/hooks/useSessionData"
import Generic_StudySelection_Display from "@/components/[study]/Generic_StudySelection_Display"

export default async function Render_StudySelection(){
  const { studies } = await fetch(`${process.env.API_BASE}/studies`, {next: {revalidate: 3600 * 24 * 7 * 4.3}}).then(res => res.json() as Promise<GetStudiesResponse>)
  const { user, data } = await useSessionData()
  const subRoute = '/lectures'
  const semester = user ? data?.lectureStore?.semester ?? process.env.DEFAULT_LECTURES_SEMESTER : process.env.DEFAULT_LECTURES_SEMESTER

  // @ts-ignore
  return <Generic_StudySelection_Display studies={studies} routing={{prefixRoute: subRoute, semester}} />

}