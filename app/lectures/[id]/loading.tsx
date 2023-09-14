import LectureDetailsDisplay from "@/app/lectures/[id]/LectureDetails"

export default function LoadingLectureDetails(){

  return (
    <div>
      <LectureDetailsDisplay lecture={null} isPending/>
    </div>
  )
}