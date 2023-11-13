'use client'

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import * as React from "react"
import { useContext } from "react"
import { MobileNavbarContext } from "@/app/(components)/root/Navigation/Mobile/MobileNavbarProvider"


export default function HamburgerMenu(){
  const { isOpen, onToggle }: {isOpen: boolean, onToggle: () => void} = useContext(MobileNavbarContext)

  return (
    <div aria-label='hamburger-menu' className='-ml-2 flex md:hidden'>
      <button onClick={onToggle} className={'btn btn-ghost w-12 h-[24px]'}>
        {isOpen && <CloseIcon w={12} h={12}/>}
        {!isOpen && <HamburgerIcon w={24} h={24}/>}
      </button>
    </div>
  )
}