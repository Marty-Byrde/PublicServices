import { NextResponse } from "next/server"
import { JSDOM } from "jsdom";
import { BasicLecture } from "campus-scraper"

export interface GetLecturesResponse {
  state: boolean,
  lectures: BasicLecture[]
}

export async function GET(res: Request) {
  const html = await fetch(process.env.LECTURE_ENDPOINT).then(res => res.text())
  const { window: { document } } = new JSDOM(html)
  const lectures: BasicLecture[] = [];

  const body = document.body;
  const outerTable = body.children[5]
  const innerTable = outerTable.getElementsByTagName("table")[0]
  const tbody = innerTable.getElementsByTagName("tbody")[0]
  const rows = tbody.children


  let lectureCount = outerTable.getElementsByTagName("td")[0]?.textContent
  const authCount = parseFloat(lectureCount?.replace(/[^0-9.]/g, ""))

  for (let i = 2; i < rows.length; i++) {
    const row = rows[i]
    const cells = row.children

    const id = cells[0]?.getElementsByTagName("a")[0]?.textContent
    const coursePage = cells[0]?.getElementsByTagName("a")[0]?.href

    const type = cells[1]?.textContent.toString()
    const name = cells[2].getElementsByTagName("b")[0].textContent
    const sws = cells[cells.length - 1]?.textContent ? parseFloat(cells[cells.length - 1]?.textContent.toString()?.replace(",", ".")) : 0
    lectures.push({
      id,
      type,
      name,
      sws,
      coursePage
    })
  }

  const success = lectures.length === authCount

  return NextResponse.json({ state: success, lectures: lectures }, { status: success ? 200 : 500 })
}