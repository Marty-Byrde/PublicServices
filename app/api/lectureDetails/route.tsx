import { NextResponse } from "next/server"
import { JSDOM } from "jsdom"
import { Curriculm, Lecture, LectureDescription, LectureExamDescription, LectureSchedule } from "campus-scraper"

export async function POST(req: Request) {
  const { id }: { id: string } = await req.json()
  const coursePage = `${process.env.LECTURE_COURSE_BASE}/${id}`
  const html = await fetch(coursePage, {next: {revalidate: 1800}}).then(res => res.text())
  const { window: { document } } = new JSDOM(html)

  const basic = parseBaseInformationSection(document)

  const registrationDeadline = parseRegistrationDeadline(document)
  basic.registrationDeadline = registrationDeadline

  const description = parseDescriptionSection(document)
  const examDescription = parseExamSection(document)
  const curriculars = parseCurriculumSection(document)

  const _bookingID = document.getElementById("eventsTreeContainer")?.getAttribute("data-booking-id")?.toString()
  const schedules = await retrieveScheduleSection(_bookingID)

  const lecture: Lecture = {
    ...basic,
    coursePage,
    description,
    examDescriptions: examDescription,
    curriculars,
    schedules
  }

  return NextResponse.json(lecture, { status: 200 })
}

function parseBaseInformationSection(document: Document): Omit<Lecture, "schedules" | "curriculars" | "description" | "examDescriptions" | "coursePage"> {
  const basic: Omit<Lecture, "schedules" | "curriculars" | "description" | "examDescriptions" | "coursePage"> = {
    id: null,
    name: null,
    type: null,
    sws: -1,


    registrationDeadline: -1,
    language: null,
    ects: -1,
    maxRegistrations: -1,
    registrations: -1,
    teachers: [],
    department: null,
    moodlePage: null,
  }

  const header = document?.getElementsByClassName("titlePage")[0]
  const title = header?.getElementsByTagName("h1")[0]?.textContent?.trim()
  const id = title?.split("(")?.at(0)?.trim()
  const name = title?.split(")")?.at(1)?.trim()

  basic.id = id
  basic.name = name

  const informationConainer = document.getElementById("card-content-uebersicht")
  const table = informationConainer?.getElementsByTagName("dl")[0]

  for (let i = 0; i < table?.children.length; i += 2) {
    const labelChild = table?.children.item(i)
    const dataChild = table?.children[i + 1]
    if (labelChild.tagName !== "DT" || dataChild.tagName !== "DD") continue

    const id = Math.random().toString() + "-" + labelChild?.getAttribute("title")
    dataChild.setAttribute("id", id)
    const dt = document.getElementById(id)
    const fieldName = labelChild?.getAttribute("title")
    const value = dt?.textContent?.toString().replace(labelChild?.getAttribute("title"), "").trim()

    /**
     * Depending on the field-name which is listed in the overview-section of a course, its value is inserted if it is valid.
     * @param raw_label
     */
    const insertValue = (raw_label: string) => {
      const isEquals = (value: string) => raw_label.toLowerCase() === value.toLowerCase()

      if (isEquals('semesterstunde/n')) basic.sws = parseFloat(value?.toString()?.replace(",", "."))
      if (isEquals("lv-art")) {
        let fullType: string = value
        if (fullType.includes("(")) fullType = fullType.split("(").at(0).trim()

        if (fullType === "Vorlesung") basic.type = "VO"
        if (fullType === "Proseminar") basic.type = "PS"
        if (fullType === "Tutorium") basic.type = "TU"
        if (fullType === "Übung") basic.type = "UE"
        if (fullType === "Seminar") basic.type = "SE"
        if (fullType === "Vorlesungs-kurs") basic.type = "VC"
        if (fullType === "Kolloquium") basic.type = "KQ"
        if (fullType === "Konversatorium") basic.type = "KV"

        if (fullType === "Vorlesung-Seminar") basic.type = "VS"
        if (fullType === "Praktikum") basic.type = "PR"
        if (fullType === "Vorlesung-Proseminar") basic.type = "VP"
        if (fullType === "Trainingsgruppe") basic.type = "TG"
        if (fullType === "Unbestimmt") basic.type = "XX"
        if (fullType === "Projektseminar") basic.type = "PM"
        if (fullType === "Vorlesung interaktiv") basic.type = "VI"
        if (fullType === "Privatissimum") basic.type = "PV"
        if (fullType === "Mandatory Excursion") basic.type = "EX"
        if (fullType === "Vorlesung-Übung") basic.type = "VU"
        if (fullType === "Graduierungskolleg") basic.type = "GK"
        if (fullType === "Präsenzlehrveranstaltung") basic.type = "SÜ"
        if (fullType === "Fachprüfung") basic.type = "FA"
        if (fullType === "Kurs mit Exkursion") basic.type = "KX"
        if (fullType === "Portfoliokurs") basic.type = "PK"
        if (fullType === "Arbeitsgemeinschaft") basic.type = "AG"
        if (fullType === "Propädeutikum") basic.type = "PP"
        if (fullType === "Proseminar mit Exkursion") basic.type = "PX"



      }
      if (isEquals("organisationseinheit")) basic.department = value
      if (isEquals("ects-anrechnungspunkte")) basic.ects = parseFloat(value?.toString()?.replace(",", "."))
      if (isEquals("anmeldungen")) {
        basic.registrations = parseInt(value?.toString()?.split("(")[0].trim())

        if (value.includes("max"))
          basic.maxRegistrations = parseInt(value?.toString()?.split("(")[1]?.split("max")[0]?.trim())
        else
          basic.maxRegistrations = -1
      }
      if (isEquals("unterrichtssprache")) basic.language = value?.toUpperCase().startsWith("EN") ? "EN" : "DE"
      if (isEquals("elearning")) basic.moodlePage = process.env.CAMPUS_BASE + dataChild.getElementsByTagName("a")[0]?.href?.split(";")?.at(0)
      if (isEquals("lehrende/r")) {
        basic.teachers = []
        const teachers = dataChild.getElementsByTagName("a")
        const findImage = (name: string): string => {
          const imageContainers = document?.getElementsByClassName("popover")
          for (let container of Array.from(imageContainers)) {
            if (container.getElementsByTagName("h3")[0].textContent === name) {
              return `https://campus.aau.at/${container.getElementsByTagName("img")[0]?.getAttribute("src")}`
            }
          }
        }

        for (let teacher of Array.from(teachers)) {
          const innerText = teacher?.textContent;
          let name = innerText.toString().split(" ").map((segment: string) => segment).filter((segment: string) => !segment.includes(".")).join(" ")
          name = name.toString().replace(/(BSc|DI|MA|BA|PgDip|Pt|Dr|M.Sc.|,)/g, "").trim()

          basic.teachers.push({
            titles: innerText.replace(name, "").trim().split(" "),
            name: name,
            fullName: teacher?.textContent,
            image: findImage(teacher.textContent)
          })
        }
      }

    }

    insertValue(fieldName)
  }

  return basic;
}

function parseRegistrationDeadline(document: Document): number {
  const container = document.getElementById("card-content-infoLV")
  const innerContainer = container?.children[0]

  const reg_text: string = innerContainer?.children[1]?.textContent
  if (reg_text?.trim()?.length > 0) {
    const format = reg_text.split(" ")[0].split(".").reverse().join(".") + " " + reg_text.split(" ")[1]
    const date = Date.parse(format)
    return date;
  }

  return null;
}

function parseDescriptionSection(document: Document): LectureDescription[] {
  const tabs = document.getElementById("lzk-lang-tabs")
  if (!tabs || tabs?.children?.length === 0) {
    return; //* There is no description
  }

  const description: LectureDescription[] = []
  const container = tabs.children[0]
  for (let element of Array.from(container.children)) {
    if (description.length === 0 && element.tagName !== "H2") {
      description.push({
        field: "initial",
        content: [element?.textContent]
      })
      continue;
    }

    if (element.tagName === "H2") {
      description.push({
        field: element?.textContent,
        content: []
      })
      continue;
    }

    //? Add paragraph to the last field
    description.at(-1).content.push(element?.textContent)
  }

  return description
}

function parseExamSection(document: Document): LectureExamDescription[] {
  const tabs = document.getElementById("exam-lang-tabs")
  if (!tabs || tabs?.children?.length === 0) {
    return; //? There is no examDescription.
  }

  const examDescriptions: LectureExamDescription[] = []
  const container = tabs?.children[0]
  for (let element of Array.from(container.children)) {
    if (examDescriptions.length === 0 && element.tagName !== "H3") {
      examDescriptions.push({
        field: "initial",
        content: [element?.textContent]
      })

      if (examDescriptions.at(-1).content[0].trim().length === 0) {
        examDescriptions.at(-1).content.pop()
      }
      continue;
    }

    if (element.tagName === "H3") {
      if (examDescriptions.find(ed => ed.field === "initial")?.content.length === 0) {
        //? in case the inital field is empty, remove it
        examDescriptions.splice(examDescriptions.indexOf(examDescriptions.find(ed => ed.field === "initial")), 1)
      }
      examDescriptions.push({
        field: element?.textContent,
        content: []
      })
      continue;
    }

    //? Add paragraph to the last field
    examDescriptions.at(-1).content.push(element?.textContent)
  }

  return examDescriptions
}

function parseCurriculumSection(document: Document): Curriculm[] {
  const curriculars: Curriculm[] = []
  const container = document.getElementById("card-content-stp-stellung-header")
  if (!container) return null;

  const entries = container.children;

  const getTextOfListGroupElement = (list_group: Element) => {
    const text = list_group?.textContent
    const innerGroup = list_group?.getElementsByTagName("ul")[0]
    const innerText = innerGroup?.textContent
    return text.replace(innerText, "")
  }
  const getCurriculum = (group: Element): Curriculm => {
    const subgroups = group.getElementsByClassName("list-group")
    const texts = [getTextOfListGroupElement(group)]

    for (let subgroup of Array.from(subgroups)) texts.push(getTextOfListGroupElement(subgroup))

    const hasRecommendation = texts?.at(2).includes("\n")

    return {
      study: texts?.at(0),
      section: texts?.at(1),
      lecture: texts.at(2)?.split("\n")[0],
      recommendation: hasRecommendation ? texts.at(2).split("\n")[1] : undefined
    }
  }


  for (let entry of Array.from(entries)) {
    if (entry.tagName.toLowerCase() !== "ul") continue;

    curriculars.push(getCurriculum(entry))
  }

  return curriculars
}

async function retrieveScheduleSection(bookingID: string): Promise<LectureSchedule[]> {
  const html = await fetch(`${process.env.LECTURE_COURSE_SCHEDULE_BASE}?bookingId=${bookingID}`, { cache: "no-cache" }).then(res => res.text())
  const { window: { document } } = new JSDOM(html)
  const schedules: LectureSchedule[] = []

  const scheduleContainer = document.getElementById("weeklyEventsSparse")
  if (!scheduleContainer) return []; //? No schedules listed.


  for (let schedule of Array.from(scheduleContainer.children)) {
    const internalContainer = schedule.getElementsByClassName("date-time-child")[0]
    const baseDate = internalContainer.getElementsByClassName("inline-day-time")[0]?.textContent?.split("-")[1]?.trim()?.replace(/(\n)/g, "").trim()
    const baseTimes = internalContainer.getElementsByClassName("inline-day-time")[1]?.textContent?.split("-")?.map((e: string) => e?.toString()?.replace(/(\n)/g, "").trim())

    const scheduleStart: Date = new Date(Date.parse(`${baseDate.split(".").reverse().join(".")} ${baseTimes[0]}`))
    const scheduleEnd: Date = new Date(Date.parse(`${baseDate.split(".").reverse().join(".")} ${baseTimes[1]}`))

    const room = internalContainer.getElementsByClassName("inline-day-time")[2].getElementsByTagName("a")[0]?.textContent ?? "online"
    const onCampus = internalContainer.getElementsByClassName("inline-day-time")[2]?.getElementsByClassName("label")[0]?.textContent?.toLowerCase() === "Off Campus"

    const hasNotes = internalContainer.getElementsByClassName("inline-day-time")[3]?.getElementsByClassName("eventNotes")[0]?.getElementsByClassName("emptyNote").length === 0
    const notes = hasNotes ? internalContainer.getElementsByClassName("inline-day-time")[3]?.getElementsByClassName("eventNotes")[0]?.getElementsByTagName("span")[1]?.getAttribute("data-original-title")?.toString() : ""

    const type = internalContainer.getElementsByClassName("inline-day-time")[0]?.getElementsByClassName("label")[0]?.getAttribute("aria-label")?.toString()
    const parseType = (type: string) => {
      if (type === "Block") return type;
      if (type === "Wöchentlich") return "Weekly"
      if (type === "Vorbesprechung") return "PreliminaryMeeting"
    }

    const parseWeekDay = (day: number) => {
      if (day === 0) return "Sunday"
      if (day === 1) return "Monday"
      if (day === 2) return "Tuesday"
      if (day === 3) return "Wednesday"
      if (day === 4) return "Thursday"
      if (day === 5) return "Friday"
      if (day === 6) return "Saturday"
    }
    const session: LectureSchedule = {
      type: parseType(type),
      weekDay: parseWeekDay(scheduleStart.getDay()),
      start: scheduleStart,
      end: scheduleEnd,
      room: room?.replace(/(\n)/g, "")?.split("-")?.at(0).trim(),
      onCampus
    }

    if (hasNotes) session["notes"] = notes?.replace(/(\n)/g, "").trim()

    schedules.push(session)
  }


  return schedules
}


function PageLoadFailed(document: Document) : boolean {
  return document.textContent.toLowerCase().includes("es ist ein fehler aufgetreten")
}
