import ColorModeSwitcher from "@/app/(components)/ColorModeSwitcher"
import * as React from "react"
import SessionProfile from "@/app/(components)/Navigation/SessionProfile"
import ClickableCategory, { ClickableCategoryProps, Item } from "@/app/(components)/Menu/ExpandableMenu"
import MobileNavbarProvider from "@/app/(components)/Navigation/Mobile/MobileNavbarProvider"
import MobileNavigationBar from "@/app/(components)/Navigation/Mobile/MobileNavigation"
import HamburgerMenu from "@/app/(components)/Navigation/Mobile/HamburgerMenu"

export interface NavigationBarProps {
  title: string,
  items: Array<Item>
}

export default function NavigationBar({ title, items }: NavigationBarProps): JSX.Element {
  const args: ClickableCategoryProps = {
    items: items,
    config: {
      action: 'hover',
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

        <div aria-label='page-title' className='flex flex-1 justify-center md:justify-start items-center'>
          <div className='text-black font-medium tracking-wider dark:text-white text-xl text-center md:text-left'>
            {title}
          </div>

          <div aria-describedby='Displayed on Desktop. ' className='hidden md:flex ml-10'>
            <ClickableCategory config={args.config} items={args.items}/>
          </div>
        </div>

        <div className='flex items-center justify-self-end mt-1 mr-3'>
          <SessionProfile _session={null}/>
          <ColorModeSwitcher/>
        </div>

      </div>

      <MobileNavigationBar />

    </MobileNavbarProvider>
  )
}