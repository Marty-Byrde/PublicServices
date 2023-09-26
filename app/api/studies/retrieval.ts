import { JSDOM } from "jsdom"

interface StudyPlan {
  type: string | 'Bachelorstudium' | 'Masterstudium',
  curriculars: Curricular[]
}
interface Curricular {
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

  const curriculars = await Promise.all(pages.map(async (studyPage, index): Promise<StudyPlan[]> => {
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

            studies.push({
              type: section.textContent?.trim(),
              curriculars
            })
          }

          return studies;
        }
      ).catch(err => {
        console.log(`Fetching study page ${index} failed!`, err)
        return []
      })
  }))

  //* Flattened the array from a 2D array to a 1D array
  return curriculars.reduce((acc: StudyPlan[], cur: StudyPlan[]) => [...acc, ...cur], [])
}

function createArray<T>(value: any) {
  if (!value) return []
  return Array.from(value) as T[]
}