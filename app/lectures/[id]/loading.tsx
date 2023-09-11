import { Lecture } from "campus-scraper"
import { LectureDetailsDisplay } from "@/app/lectures/[id]/page"

export default function LoadingLectureDetails(){

  return (
    <div>
      <LectureDetailsDisplay lecture={null} isPending/>
    </div>
  )
}