'use client'

import { FilterProviderContext, FilterProviderContextProps } from "@/components/Shared/Filtering/FilteringProvider"
import { useContext } from "react"

export function TestDisplay(){
  const { filter } = useContext<FilterProviderContextProps>(FilterProviderContext)
  return <div>
    <span>Filter set to: </span>
    <div className='flex flex-col gap-2 px-4'>
      {filter.map((item, index) => <div key={index}>{item.name}</div>)}
    </div>
  </div>
}