import { JSDOM } from "jsdom"
import { NextResponse } from "next/server"
import getStudies from "@/api/studies/retrieval"

export async function GET(res: Request) {
  const html = await fetch(`${process.env.STUDIES_ENDPOINT}`, {
    next: { revalidate: 3600 * 24 * 7 * 4.3 * 4 } // 4 months
  }).then(res => res.text())
  const { window: { document } } = new JSDOM(html)

  const studies = await getStudies(document)
  return NextResponse.json({ studies }, { status: 200 })
}