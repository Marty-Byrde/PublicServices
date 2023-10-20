import { Lecture } from "campus-scraper"
import { Metadata } from "next"
import LectureDetailsDisplay from "@/components/[semster]/[id]/LectureDetails"

interface LectureDetailsProps {
  params: {
    id: string
  }
}
export async function generateMetadata({ params: { id } }: LectureDetailsProps): Promise<Metadata> {
  const lecture = await fetch("http://localhost/api/lectureDetails", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    next: {
      revalidate: 1800
    }
  }).then(res => res.json() as Promise<Lecture>)

  return {
    title: `${lecture.type ? `[${lecture.type}]` : ''} ${lecture.id} - ${lecture.name}`,
    description: `Detailed information about ${lecture.name}`
  }
}
export default async function LectureDetails({ params }) {
  const { id }: { id: string } = params
  const lecture = await fetch("http://localhost/api/lectureDetails", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    cache: "no-store"
  }).then(res => res.json() as Promise<Lecture>)


  if (!lecture) return null

  return LectureDetailsDisplay({ lecture })
}