'use client'
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { KahootSearchContext } from "@/components/kahoot/KahootSearchProvider"
import checkValidity from "@/lib/kahoot/ValidityCheck"
import { toast } from "react-toastify"

export default function KahootQuizSearch() {
  const { searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: (query: string) => void } = useContext(KahootSearchContext)
  const [warned, setWarned] = useState<boolean>(false)

  const router = useRouter()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validity = checkValidity({ quizId: searchQuery })
    if (!warned && validity.valid === false) {
      setWarned(true)
      return toast(validity.reason, {
        type: "warning",
        autoClose: 5000,
        closeButton: true,
      })
    }

    router.push(`kahoot/${searchQuery}`)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setWarned(false)
  }

  return (
    <form onSubmit={onSubmit} className='max-w-md w-full'>
      <input defaultValue={searchQuery} type='text'
             onChange={onChange}
             placeholder='Enter your value here...'
             className='px-4 py-2 dark:bg-neutral-700 ring-2 dark:ring-neutral-500 rounded-lg max-w-md w-full text-gray-700 dark:text-gray-200'/>
    </form>
  )
}