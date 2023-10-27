'use client'

import { Collapse, Icon, Image, Link, useDisclosure } from "@chakra-ui/react"
import * as React from "react"
import { useContext } from "react"
import { MobileNavbarContext } from "@/app/(components)/Navigation/Mobile/MobileNavbarProvider"
import { ClickableCategoryProps, Item } from "@/components/Shared/Menu/ExpandableMenu"
import { ChevronDownIcon } from "@chakra-ui/icons"


export default function MobileNavigationBar(){
  const { isOpen, args }: {isOpen: boolean, args: ClickableCategoryProps} = useContext(MobileNavbarContext)

  if(!args || !args.items) return null;

  return (
    <Collapse in={isOpen} animateOpacity aria-describedby='Children displayed on Mobile.'>
      <MobileNavigation items={args?.items}/>
    </Collapse>
  )
}





function MobileNavigation({ items }: { items: Item[] }) {
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


function MobileNavigationItem({ item, children }: { item: Item, children: Item[] }) {
  const { isOpen, onToggle } = useDisclosure();
  const { label, image, href } = item;

  return (
    <div className='flex flex-col gap-4' onClick={children && onToggle}>
      <a className='flex py-2 gap-2 items-center hover:no-underline' href={href ?? '#'}>
        <div className='flex gap-2 items-center'>
          {image && <Image src={image.src} w={16} h={16} alt='Navigation-Item-Image'/>}

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
                {child.image && <Image src={child.image.src} w={16} h={16} className='mt-1' alt='Navigation-Item-Image'/>}

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
