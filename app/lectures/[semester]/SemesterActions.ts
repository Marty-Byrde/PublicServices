'use server'

import useSessionData from "@/app/(components)/Auth/useSessionData"

export async function updateSemesterSelection({ selection }: { selection: string }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { update } = await useSessionData()
  await update({ lectureStore: { semester: selection }})
}