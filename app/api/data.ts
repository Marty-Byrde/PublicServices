import { Lecture } from "campus-scraper"

/**
 * Returns an empty lecture object
 */
export function emptyLecture(): Lecture {
  return {
    id: "",
    name: "",
    type: "",
    sws: 0,
    ects: 0,
    maxRegistrations: 0,
    registrations: 0,
    registrationDeadline: new Date(),
    language: "DE",
    department: "",
    coursePage: "",
    moodlePage: "",

    teachers: Array(4).fill({ titles: [], name: "", fullName: "" }),
    description: Array(3).fill({ field: "", content: "" }),
    examDescriptions: Array(2).fill({ field: "", content: "" }),
    schedules: Array(8).fill({ start: new Date(), end: new Date(), type: "", room: "", notes: "" }),
    curriculars: Array(4).fill({ name: "", id: "" }),
  }
}