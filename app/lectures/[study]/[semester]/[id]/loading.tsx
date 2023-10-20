import LectureDetailsDisplay from "@/components/[semster]/[id]/LectureDetails"

export default function LoadingLectureDetails(){

  return (
    <div>
      <LectureDetailsDisplay lecture={null} isPending/>
    </div>
  )
}