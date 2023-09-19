import useSessionData from "@/components/Auth/useSessionData"
import { redirect } from "next/navigation"


export default async function LecturesPage(){
  const { data } = await useSessionData()
  redirect(`/lectures/${data?.lectureStore?.semester ?? process.env.DEFAULT_LECTURES_SEMESTER}`)
}