'use client'
import { createContext, useState } from "react"

export const KahootSearchContext = createContext(null)

export default function KahootSearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState<string>('')

  return (
    <KahootSearchContext.Provider value={{searchQuery, setSearchQuery}}>
      {children}
    </KahootSearchContext.Provider>
  )
}