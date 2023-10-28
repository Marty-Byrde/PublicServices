import ColorModeSwitcher from "@/app/(components)/root/Navigation/ColorModeSwitcher"
import * as React from "react"
import SessionProfile from "@/app/(components)/root/Navigation/SessionProfile"
import ClickableCategory, { ClickableCategoryProps, Item } from "@/components/Shared/Menu/ExpandableMenu"
import MobileNavbarProvider from "@/app/(components)/root/Navigation/Mobile/MobileNavbarProvider"
import MobileNavigationBar from "@/app/(components)/root/Navigation/Mobile/MobileNavigation"
import HamburgerMenu from "@/app/(components)/root/Navigation/Mobile/HamburgerMenu"
import { Session } from "next-auth"

export interface NavigationBarProps {
  title: string,
  items: Array<Item>
  session: Session
}

export default function NavigationBar({ title, items, session }: NavigationBarProps): JSX.Element {
  const args: ClickableCategoryProps = {
    items: items,
    config: {
      containerPosition: 'bottom-start',
      styles: {
        popoverItemHoverBackgroundDark: 'dark:hover:bg-neutral-600',
      }
    }
  }

  return (
    <MobileNavbarProvider args={args}>
      <div aria-label='navigation-bar' className='flex justify-center items-center
                      bg-base-300 dark:bg-base-100
                      text-black dark:text-white
                      min-h-[60px]
                      py-4 px-4
                      border-black dark:border-white
                      border-b-2
                      '>


        <HamburgerMenu />

        <div aria-label='page-title' className='flex flex-1 justify-center md:justify-start items-end'>
          <div className='text-black font-medium tracking-widest dark:text-white text-2xl text-center md:text-left'>
            {title}
          </div>

          <div aria-describedby='Displayed on Desktop. ' className='hidden md:flex ml-12'>
            <ClickableCategory config={args.config} items={args.items}/>
          </div>
        </div>

        <div className='flex items-center justify-self-end'>
          <SessionProfile session={session}/>
          <ColorModeSwitcher/>
        </div>

      </div>

      <MobileNavigationBar />

    </MobileNavbarProvider>
  )
}