import ClientPage from "@/app/lectures/ClientPage"
import { GetLecturesResponse } from "@/app/api/lectures/route"

export default async function Lectures() {
  const response = await fetch("http://localhost/api/lectures", { cache: "no-cache" }).then(res => res.json() as Promise<GetLecturesResponse>)


  return (
    <ClientPage initialLectures={response.lectures}/>
  )
}