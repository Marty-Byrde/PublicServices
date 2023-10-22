import Generic_StudySelection_Display from "@/components/[study]/Generic_StudySelection_Display"
import { Curricular, StudyPlan } from "@/api/studies/retrieval"

export default function StudyLoading(){
  const studies = Array.from({length: 2}, (_, i): StudyPlan => ({
    type: i % 2 === 0 ? 'Bachelorstudien' : 'Masterstudien',
    curriculars: Array.from({length: 15}, (_, i): Curricular => ({
      id: Math.random().toString() + "-study-loading-curricular",
      name: 'Study Loading Curricular ' + i,
      details: {
        version: 'XXXX',
        duration: 'X Semester',
        ausgabe: "X",
        skz: "XXX"
      }
    })),
    _sortPriority: i,
  }))
  const subRoute = '/lectures'
  const semester = process.env.DEFAULT_LECTURES_SEMESTER
  const routing = {prefixRoute: subRoute, semester}

  // @ts-ignore
  return <Generic_StudySelection_Display studies={studies} routing={routing} isPending />
}