import ClientPage from "@/app/lectures/ClientPage"
import { GetLecturesResponse } from "@/app/api/lectures/route"

export default async function Lectures() {
  const response = await fetch("http://127.0.0.1/api/lectures").then(res => res.json() as Promise<GetLecturesResponse>)

  return (
    <ClientPage initialLectures={response.lectures}/>
  )
}