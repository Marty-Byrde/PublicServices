import { Lecture } from "campus-scraper"
import { DBHandler } from "mongodb_handler"
import Link from "next/link"
import Image from "next/image"
import Checkmark from "@/public/checkmark.png"
import Star from "@/public/lectureIcons/star.svg"
import Calendar from "@/public/lectureIcons/calendar.svg"
import User from "@/public/lectureIcons/user.svg"
import BullHorn from "@/public/lectureIcons/bullhorn.svg"
import ClientPage from "@/app/lectures/ClientPage"

export default async function Lectures() {
  console.log('Retrieving Lectures from database...')
  const db = new DBHandler(process.env.HOST)
  await db.connect()
  const collection = await db.getCollection(process.env.DATABASE, process.env.COLLECTION)
  const lectures = await collection.findType<Lecture>({})


  return (
    <ClientPage initialLectures={lectures}/>
  )
}