'use client'

import { createContext, useState } from "react"

export const FilterProviderContext = createContext(null)

interface FilterProviderProps {
  items: any[],
  children: JSX.Element | JSX.Element[]
}
export interface FilterProviderContextProps {
  filter: any[],
  setFilter: (filter: any[]) => void,
  items: any[]
}

export function FilteringProvider({ items, children }: FilterProviderProps) {
  const [filter, setFilter] = useState(items)

  return (
    <FilterProviderContext.Provider value={{ filter, setFilter, items }}>
      {children}
    </FilterProviderContext.Provider>
  )
}