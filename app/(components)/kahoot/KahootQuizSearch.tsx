'use client'
import { FormEvent, useContext } from "react"
import { useRouter } from "next/navigation"
import { KahootSearchContext } from "@/components/kahoot/KahootSearchProvider"

export default function KahootQuizSearch() {
  const { searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: (query: string) => void } = useContext(KahootSearchContext)
  const router = useRouter()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`kahoot/${searchQuery}`)
  }


  return (
    <form onSubmit={onSubmit} className='max-w-md w-full'>
      <input defaultValue={searchQuery} type='text'
             onChange={(e) => setSearchQuery(e.target.value)}
             placeholder='d1851d1a-3376-42ce-bc3a-b344a112f971'
             className='px-4 py-2 dark:bg-neutral-700 ring-2 dark:ring-neutral-500 rounded-lg max-w-md w-full text-gray-700 dark:text-gray-200'/>
    </form>
  )
}