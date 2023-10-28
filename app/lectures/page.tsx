import useSessionData from "@/hooks/useSessionData"
import { redirect } from "next/navigation"


export default async function LecturesPage(){
  const { data } = await useSessionData()

  const study = data?.lectureStore?.study
  if(!study) redirect("/lectures/select")

  redirect(`/lectures/${study}/${data?.lectureStore?.semester ?? process.env.DEFAULT_LECTURES_SEMESTER}`)
}