import { NextResponse } from "next/server"
import { JSDOM } from "jsdom";
import { BasicLecture } from "campus-scraper"
import { SemesterProps } from "@/app/display/[semester]/SemesterSelection"

export interface GetLecturesResponse {
  state: boolean,
  lectures: BasicLecture[],
  semesters: SemesterProps[]
}

export async function POST(res: Request) {
  const { semester } = await res.json()
  const html = await fetch(`${process.env.LECTURE_ENDPOINT}&semester=${semester}`, { cache: "no-cache" }).then(res => res.text())
  const { window: { document } } = new JSDOM(html)
  const lectures: BasicLecture[] = [];

  const body = document.body;

  const semesterTable = body.children[3]
  const semesterTableRow = semesterTable?.getElementsByClassName("bg3box")[0]?.children
  const semesters: SemesterProps[] = Array.from(semesterTableRow)
    ?.slice(1, semesterTableRow.length - 1)
    ?.map(semester =>
    {
      const text = semester?.textContent?.toString()
      const season = text?.trim()?.startsWith("Winter") ? 'W' : 'S'
      const year = parseFloat(20+text?.trim()?.split(" ")[1])
      return { year, season }
    })

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
    const teacherField = Array.from(cells[4].getElementsByTagName("a")).map(anchor => anchor?.getAttribute("onclick").toString()?.split(",")?.at(-1)?.split("'")?.at(1))
    const sws = cells[cells.length - 1]?.textContent ? parseFloat(cells[cells.length - 1]?.textContent.toString()?.replace(",", ".")) : 0
    lectures.push({
      id,
      type,
      name,
      sws,
      coursePage,
      teachers: teacherField
    })
  }

  const success = lectures.length === authCount

  return NextResponse.json({ state: success, lectures: lectures, semesters: semesters }, { status: success ? 200 : 500 })
}