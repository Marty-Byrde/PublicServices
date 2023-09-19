import LectureDetailsDisplay from "@/app/lectures/[semester]/[id]/LectureDetails"

export default function LoadingLectureDetails(){

  return (
    <div>
      <LectureDetailsDisplay lecture={null} isPending/>
    </div>
  )
}