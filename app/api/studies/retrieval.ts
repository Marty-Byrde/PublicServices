import { JSDOM } from "jsdom"
import * as fs from "fs"

export interface StudyPlan {
  type: string | 'Bachelorstudium' | 'Masterstudium',
  curriculars: Curricular[],
  _sortPriority?: number,
}
export interface Curricular {
  id: string,
  name: string,
  details: {
    version: string | '2022',
    ausgabe: string | '1',
    duration: string | '6 Semester',
    skz: string | '642'
  }
}

/**
 * Parses the studies from the campus-left-navigation
 * @param document
 */
export default async function getStudies(document: Document): Promise<StudyPlan[]> {
  const navigation = document.getElementById("root") as HTMLUListElement
  const studienrichtungen = navigation?.children?.item(1) as HTMLUListElement

  const faculties = createArray<HTMLElement>(studienrichtungen.getElementsByTagName("ul").item(0)?.children)


  //* Some faculties like 'Lehramt der Universität' | 'Doktoratsprogramme der Universität' dont have visible study sections
  const validFaculties = faculties.filter(faculty => faculty && faculty.getElementsByTagName("ul")?.item(0)?.children?.length)
  //console.log(`There are ${faculties.length} faculties of which ${validFaculties.length} are valid faculties.`, validFaculties.map(faculty => [faculty?.getElementsByTagName("span")?.item(0)?.textContent?.trim(), faculty.getElementsByTagName("ul")?.item(0)?.children?.length]))

  //* Faculty Pages like: 'Fakultät ... Kultur-und-Bildungswissenschaften'
  const facultyChildren = validFaculties.map(faculty => faculty.getElementsByTagName("ul").item(0).children)

  //* Each valid faculty has a list of anchor tags which link to the study page
  let pages: string[] = []
  facultyChildren.forEach(children => pages.push(...createArray<HTMLElement>(children).map(child => child.getElementsByTagName("a").item(0)?.getAttribute("href"))))

  //* [ [StudyPlans of first Study-Page], [StudyPlans of second Study-Page], ... ]
  const promiseResults = await Promise.all(pages.map(async (studyPage, index): Promise<StudyPlan[]> => {
    const link = `${process.env.CAMPUS_BASE}${studyPage}`
    return fetch(link)
      .then(response => response.text())
      .then(html => {
          const { window: { document } } = new JSDOM(html)

          const studyPlansContainer = document.getElementById('card-content-curricula')

          const studies: StudyPlan[] = []
          for (let i = 0; i < studyPlansContainer?.children.length; i += 2) {
            const section = studyPlansContainer?.children.item(i) as HTMLElement
            const curricularContainer = studyPlansContainer?.children.item(i + 1) as HTMLElement

            const curricularsArray = createArray<HTMLLIElement>(curricularContainer?.children)
            const curriculars: Curricular[] = curricularsArray.map(curricular => {
              const anchor = curricular.getElementsByTagName("a").item(0).getAttribute('href')
              const id = anchor?.split("/")?.at(-1).split(";").at(0)
              const name = curricular.getElementsByTagName("a").item(0).textContent?.trim()
              let details = curricular.getElementsByTagName("small").item(0).textContent?.trim().split("\n")

              //* e.g. ['Version 2016', 'Ausgabe :2', 'Dauer : 6 Semester', 'SKZ : 642']
              details = details?.map(detail => detail.replace(",", "").trim()).filter(detail => detail.length)
              const parsedDetails = details.map(detail => {
                const seperator = detail.includes(":") ? ":" : " "
                const [key, value] = detail.split(seperator)

                return {
                  key: key?.trim()?.toLowerCase(),
                  value: value?.trim()
                }
              })

              return {
                id,
                name,
                details: {
                  version: parsedDetails.find(detail => detail.key === 'version')?.value,
                  ausgabe: parsedDetails.find(detail => detail.key === 'ausgabe')?.value,
                  duration: parsedDetails.find(detail => detail.key === 'dauer')?.value,
                  skz: parsedDetails.find(detail => detail.key === 'skz')?.value
                }
              }
            })

            const unifyType = () => {
              const text = section.textContent?.trim().toLowerCase()
              if (text.startsWith('bachelor')) return 'Bachelorstudien'
              if (text.startsWith('master')) return 'Masterstudien'
              if (text.startsWith('doktorat')) return 'Doktoratstudien'
              // if (text.startsWith('lehramt')) return 'Lehramt'
              // if (text.startsWith('erweiterung')) return 'Erweiterung'
              // if (text.startsWith('besonderer')) return 'Sonstiges'

              return section.textContent?.trim()
            }
            const evaluateSortPriority = () => {
              const type = section.textContent?.trim().toLowerCase()
              if (type.startsWith('bachelor')) return 1
              if (type.startsWith('master')) return 2
              if (type.startsWith('doktorat')) return 3
              if (type.startsWith('lehramt')) return 4
              if (type.startsWith('erweiterung')) return 5
              if (type.startsWith('besonderer')) return 6

              return 7
            }

            studies.push({
              type: unifyType(),
              curriculars,
              _sortPriority: evaluateSortPriority()
            })
          }

          return studies;
        }
      ).catch(err => {
        console.log(`Fetching study page ${index} failed!`, err)
        return []
      })
  }))

  const plans: StudyPlan[] = []
  promiseResults.forEach((pageResult) => {
    pageResult.forEach(studyPlan => {
      const existing = plans.find(plan => plan.type === studyPlan.type)

      if(!existing) plans.push(studyPlan)
      else existing.curriculars.push(...studyPlan.curriculars)
    })
  })

  const sorted = plans.sort((a, b) => a._sortPriority - b._sortPriority)

  sorted.forEach(plan => plan.curriculars = plan.curriculars.sort((a, b) => a.name.localeCompare(b.name) || parseInt(b.details.version) - parseInt(a.details.version)))

  return sorted
}

function createArray<T>(value: any) {
  if (!value) return []
  return Array.from(value) as T[]
}