import LectureDetailsDisplay from "@/components/[study]/[semester]/[id]/LectureDetails"

export default function LoadingLectureDetails(){

  return (
    <div>
      <LectureDetailsDisplay lecture={null} isPending/>
    </div>
  )
}