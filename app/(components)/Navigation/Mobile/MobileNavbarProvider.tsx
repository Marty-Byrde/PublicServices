'use client'
import { createContext, ReactNode } from "react"
import { useDisclosure } from "@chakra-ui/react"
import { ClickableCategoryProps } from "@/components/Shared/Menu/ExpandableMenu"

export const MobileNavbarContext = createContext(null)

export default function MobileNavbarProvider({args, children }: { args: ClickableCategoryProps, children: ReactNode }) {
  const { isOpen, onToggle } = useDisclosure()


  return (
    <MobileNavbarContext.Provider value={{ isOpen, onToggle, args }}>
      {children}
    </MobileNavbarContext.Provider>
  )
}
