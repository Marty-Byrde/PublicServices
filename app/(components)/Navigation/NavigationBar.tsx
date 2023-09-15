'use client'
import { Collapse, Icon, Image, Link, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@chakra-ui/react"
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons"
import ColorModeSwitcher from "@/app/(components)/ColorModeSwitcher"
import * as React from "react"
import NextImage from "next/image"
import SessionProfile from "@/app/(components)/Navigation/SessionProfile"
import ClickableCategory, { ClickableCategoryProps } from "@/app/(components)/Menu/ExpandableMenu"
import MobileNavbarProvider from "@/app/(components)/Navigation/Mobile/MobileNavbarProvider"
import MobileNavigationBar from "@/app/(components)/Navigation/Mobile/MobileNavigation"
import HamburgerMenu from "@/app/(components)/Navigation/Mobile/HamburgerMenu"

export interface NavigationBarItem {
  label: string,
  image?: string | any,
  href?: string,
  subLabel?: string
  children?: Array<NavigationBarItem>,
}

export interface NavigationBarProps {
  title: string,
  items: Array<NavigationBarItem>
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
            {/*<DesktopNavigation items={args.items}/>*/}
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


function MobileNavigation({ items }: { items: NavigationBarItem[] }) {
  return (
    <div className='bg-stone-300 dark:bg-base-100 p-4 md:hidden border-b border-dashed border-black dark:border-white'>
      {items.map((item) => (
        <MobileNavigationItem key={item.label} item={item}>
          {item.children}
        </MobileNavigationItem>
      ))}
    </div>
  )
}

function MobileNavigationItem({ item, children }: { item: NavigationBarItem, children: NavigationBarItem[] }) {
  const { isOpen, onToggle } = useDisclosure();
  const { label, image, href } = item;

  return (
    <div className='flex flex-col gap-4' onClick={children && onToggle}>
      <a className='flex py-2 gap-2 items-center hover:no-underline' href={href ?? '#'}>
        <div className='flex gap-2 items-center'>
          {image && <Image src={image} w={16} h={16} alt='Navigation-Item-Image'/>}

          <div className='font-semibold text-gray-600 dark:text-gray-200 '>
            {label}
          </div>
        </div>

        {children?.length > 0 && (
          <Icon
            as={ChevronDownIcon}
            color={"black"}
            className={`${isOpen ? 'transform rotate-180' : ''} transition-all duration-100 ease-in-out`}
            w={16}
            h={16}
          />
        )}
      </a>

      <Collapse in={isOpen} animateOpacity className='-mt-4 mb-2'>
        <div aria-describedby='Mobile-Subitems-Container' className='flex flex-col gap-2 pl-4 border-l-1 border-l-solid border-gray-200 dark:border-gray-700 items-start'>
          {children &&
            children.map((child) => (
              <Link key={child.label} className='px-2 flex flex-row items-center gap-2' href={child.href}>
                {!child.image && <div className='w-1.5 h-1.5 bg-gray-700 dark:bg-white rounded-3xl mx-1'/>}
                {child.image && <Image src={child.image} w={16} h={16} className='mt-1' alt='Navigation-Item-Image'/>}

                <div className='text-gray-700 dark:text-white'>
                  {child.label}
                </div>
              </Link>
            ))}
        </div>
      </Collapse>

    </div>
  )
}



//! Desktop Navigation
function DesktopNavigation({ items }: { items: NavigationBarItem[] }) {
  return (
    <div className='flex flex-row gap-8'>
      {items.map((item) => (
        <div key={item.label} className='group/category z-50'>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link className='p-0 text-sm font-medium text-gray-600 dark:text-gray-200 hover:no-underline hover:text-gray-800 dark:hover:text-white' href={item.href ?? '#'}>
                <div className='flex flex-row items-center gap-2'>
                  {item.image && <NextImage width={20} height={20} className='rounded-xl' src={item.image} alt='Navitem-Image'/>}

                  {item.label}
                  <Icon
                    as={ChevronDownIcon}
                    className={`group-hover/category:transform group-hover/category:rotate-180 transition-all duration-300 ease-in-out -ml-1`}
                    w={22}
                    h={22}
                  />
                </div>
              </Link>
            </PopoverTrigger>

            {item.children && (
              <PopoverContent className='bg-stone-300 dark:bg-base-200 p-4 rounded-xl min-w-sm border-0 box-shadow-xl'>
                <div className='flex flex-col'>
                  {item.children.map((item) => (
                    <DesktopSubNavigation key={item.label} item={item}/>
                  ))}
                </div>
              </PopoverContent>
            )}

          </Popover>
        </div>
      ))}
    </div>
  )
}



function DesktopSubNavigation({ item }: { item: NavigationBarItem }) {
  const { label, subLabel, href } = item;

  return (
    <Link className='group block p-2 px-4 rounded-md hover:bg-base-200 dark:hover:bg-gray-900' href={href}>
      <div className='flex flex-row items-center'>
        <div className='chakra-box'>
          <div className='transition-colors duration-200 ease-linear font-medium group-hover:text-secondary group-hover:font-semibold dark:group-hover:text-pink-400'>
            {label}
          </div>
          <div className='text-sm'>
            {subLabel}
          </div>
        </div>

        <div className='flex flex-1 items-center justify-end
              opacity-50 group-hover:opacity-100
              group-hover:translate-x-[10px] ml-2
              transition-all duration-300 ease-linear'>
          <Icon color={'pink.400'} w={24} h={24} as={ChevronRightIcon}/>
        </div>
      </div>

    </Link>
  )
}