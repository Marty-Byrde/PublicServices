import SemesterSelection from "@/components/[study]/[semester]/SemesterSelection"
import useSessionData from "@/hooks/useSessionData"
import { redirect } from "next/navigation"

export default async function SemesterNotFound() {
  const { data } = await useSessionData()
  redirect(`/lectures/${data?.lectureStore?.semester ?? process.env.DEFAULT_LECTURES_SEMESTER}`)
}