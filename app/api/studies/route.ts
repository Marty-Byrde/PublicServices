import { JSDOM } from "jsdom"
import { NextResponse } from "next/server"
import getStudies, { StudyPlan } from "@/api/studies/retrieval"

export interface GetStudiesResponse {
  studies: StudyPlan[]
}
export async function GET(res: Request) {
  const html = await fetch(`${process.env.STUDIES_ENDPOINT}`, {
    next: { revalidate: 3600 * 24 * 7 * 4.3 * 4 } // 4 months
  }).then(res => res.text())
  const { window: { document } } = new JSDOM(html)

  let studies = await getStudies(document)

  for(let study of studies){
    study.curriculars = study.curriculars.filter((crr, index, self) => self.indexOf(self.find(c => c.id === crr.id && c.details.version === crr.details.version && c.details.ausgabe === crr.details.ausgabe)) === index)
  }


  return NextResponse.json({ studies }, { status: 200 })
}