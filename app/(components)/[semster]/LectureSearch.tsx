'use client'
import { SyntheticEvent, useContext, useEffect, useState } from "react"
import { BasicLecture } from "campus-scraper"
import { LectureListContext } from "@/components/[semster]/LectureListProvider"

interface SearchProps {
  lectures: BasicLecture[],
  setLectures: (lectures: BasicLecture[]) => void
}


interface FilterOption {
  label: string,
  value: string,
  type: "lecture-type" | string
}
const options: FilterOption[] = [
  {
    label: "All",
    value: "all",
    type: "lecture-type"
  },
  {
    label: "VO",
    value: "VO",
    type: "lecture-type"
  },
  {
    label: "UE",
    value: "UE",
    type: "lecture-type"
  },
  {
    label: "KS",
    value: "KS",
    type: "lecture-type"
  },
  {
    label: "SE",
    value: "SE",
    type: "lecture-type"
  },
  {
    label: "TU",
    value: "TU",
    type: "lecture-type"
  }
]


export default function LectureSearch(){
  const { initialLectures, lectures, setLectures }: {initialLectures: BasicLecture[], lectures: BasicLecture[], setLectures: (prev: BasicLecture[]) => void} = useContext(LectureListContext)

  const [isOptionOpen, setIsOptionOpen] = useState(false)
  const [filter, setFilter] = useState<number>(0)
  const [input, setInput] = useState<string>(null)

  const FilterOption = ({label}) => {
    return (
      <li>
        <button onClick={() => {setFilter(options.indexOf(options.find(o => o.label === label))); setIsOptionOpen(false)}} type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{label}</button>
      </li>
    )
  }

  useEffect(() => handleSearch(), [filter])

  const handleSearch = (e?: SyntheticEvent) => {
    e?.preventDefault()
    if(!initialLectures || !setLectures) return;

    setIsOptionOpen(false)

    let preFiltered = initialLectures;


    const selectedFilter = options[filter]
    if(selectedFilter.type === "lecture-type" && filter !== 0){
      preFiltered = preFiltered.filter(lecture => lecture.type.toLowerCase() === options[filter].value.toLowerCase())
    }

    if(!input || input.trim().length === 0) return setLectures(preFiltered)

    const compareStrings = (firstValue: string, secondValue: string) =>  firstValue && secondValue && firstValue.toLowerCase().trim().includes(secondValue.toLowerCase().trim())

    const filtered = preFiltered.filter(lecture => {
      if(compareStrings(lecture.name, input)) return true;
      if(compareStrings(lecture.id, input)) return true;
      if(compareStrings(lecture.id.replace(".", ""), input)) return true;

      return false;
    })
    setLectures(filtered)
  }

  return (

    <form onSubmit={handleSearch} className='max-w-7xl mx-auto'>
      <div className="flex relative ">
        <button onClick={(e) => setIsOptionOpen(prev => !prev)}
                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center
                text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none
                focus:ring-gray-100 dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">{options[filter].label}<svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg></button>
        <div className={` z-10 ${isOptionOpen ? "absolute" : "hidden"} top-[42px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-stone-600`}>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
            {options.map(option => <FilterOption key={option.label} label={option.label} />)}
          </ul>
        </div>
        <div className="relative w-full">


          <input type="search" onChange={(e) => setInput(e.target.value)} className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500
                 dark:bg-stone-700 dark:border-l-stone-700 dark:border-neutral-500 dark:placeholder-gray-400 dark:text-white pr-10 shadow-2xl"
                 placeholder="Search Lectures by Name, Prof., ID and more..."  />


            <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search</span>
            </button>
        </div>
      </div>
    </form>

)
}