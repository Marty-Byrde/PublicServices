import { Lecture } from "campus-scraper"
import { Metadata } from "next"
import LectureDetailsDisplay from "@/app/lectures/[id]/LectureDetails"

export const metadata: Metadata = {};

export default async function LectureDetails({ params }) {
  const { id }: { id: string } = params
  const lecture = await fetch("http://localhost/api/lectureDetails", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    cache: "no-store"
  }).then(res => res.json() as Promise<Lecture>)


  if (!lecture) return null
  metadata.title = `${lecture?.id} - ${lecture?.name}`

  return LectureDetailsDisplay({ lecture })
}