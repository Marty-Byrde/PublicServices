'use client'

import { createContext, useState } from "react"

export const FilterProviderContext = createContext(null)

interface FilterProviderProps {
  items: any[],
  children: JSX.Element | JSX.Element[]
}
export interface FilterProviderContextProps<Type> {
  filter: Type[],
  setFilter: (filter: Type[]) => void,
  items: Type[],
}

export function FilteringProvider({ items, children }: FilterProviderProps) {
  const [filter, setFilter] = useState(items)

  return (
    <FilterProviderContext.Provider value={{ filter, setFilter, items }}>
      {children}
    </FilterProviderContext.Provider>
  )
}