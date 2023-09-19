'use client'
import { createContext, ReactNode, useState } from "react"
import { BasicLecture } from "campus-scraper"

export const LectureListContext = createContext(null)

interface LectureListProviderProps {
  lectures: BasicLecture[]
  children: ReactNode
}

export default function LectureListProvider({ children, lectures: initialLectures }: LectureListProviderProps) {
  const [lectures, setLectures] = useState<BasicLecture[]>(initialLectures)

  return (
    <LectureListContext.Provider value={{ initialLectures, lectures, setLectures }}>
      {children}
    </LectureListContext.Provider>
  )
}