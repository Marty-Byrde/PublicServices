'use client'
import { Icon, Link, Placement, Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react"
import NextImage from "next/image"
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons"
import * as React from "react"
import { twMerge } from 'tailwind-merge'
import { useState } from "react"

declare type Logical = "start-start" | "start-end" | "end-start" | "end-end" | "start" | "end";
declare type PlacementWithLogical = Placement | Logical;

export interface ClickableCategoryProps {
  items: Array<Item>
  config?: ClickableCategoryConfig
}

export interface ClickableCategoryConfig {
  action?: 'click' | 'hover',
  containerPosition?: PlacementWithLogical,
  styles?: {
    popoverBackground?: 'bg-stone-300' | string,
    popoverBackgroundDark?: 'dark:bg-neutral-700' | string,

    popoverItemHoverBackground?: 'hover:bg-base-200' | string,
    popoverItemHoverBackgroundDark?: 'dark:hover:bg-gray-900' | string,

    categoryText?: {
      size?: 'text-lg' | string,
      color?: 'text-gray-600' | string,
      darkColor?: 'dark:text-gray-200' | string,
      className?: string,
    }
  }
}

const defaultProps: ClickableCategoryProps = {
  items: [],
  config: {
    action: 'hover',
    containerPosition: 'bottom-start'
  },
}

export interface Item {
  label: string
  image?: {
    src: any,
    imageWidth?: number,
    imageHeight?: number,
  }
  href?: string,
  subLabel?: string
  children?: Array<Item>,
}

/**
 * This component is used to create a category that can be hovered or clicked for its content/options to appear.
 * @param args
 */
export default function ClickableCategory(args: ClickableCategoryProps) {
  const [isActive, setIsActive] = useState(false)

  const props: ClickableCategoryProps = { ...defaultProps, ...args }
  const { items, config: _config } = props;
  const config: ClickableCategoryConfig = { ...defaultProps.config, ..._config, styles: { ...defaultProps.config.styles,  ..._config?.styles} }

  const { action, containerPosition, styles } = config;

  return (
    <div className='flex flex-row gap-8'>
      {items.map((item) => (
        <div key={item.label} className='group/category z-50'>
          <Popover trigger={action} onClose={() => setIsActive(false)} onOpen={() => setIsActive(true)}  placement={containerPosition} offset={[0, 10]}>
            <PopoverTrigger>
              <Link className={twMerge('text-lg font-medium text-gray-600 dark:text-gray-200 hover:no-underline hover:text-gray-800 dark:hover:text-white', `${config?.styles?.categoryText?.size ?? ""} ${config?.styles?.categoryText?.color ?? ""} ${config?.styles?.categoryText?.darkColor ?? ""} ${config?.styles?.categoryText?.className ?? ""}`)} href={item.href ?? '#'}>
                <div className='flex flex-row items-center gap-2'>
                  {item.image && <NextImage width={item.image.imageWidth ?? 20} height={item.image.imageHeight ?? 20} className='rounded-xl' src={item.image.src} alt='Navitem-Image'/>}

                  {item.label}
                  <Icon
                    as={ChevronDownIcon}
                    className={`group-hover/category:transform ${action === "hover" ? "group-hover/category:rotate-180" : `${isActive ? "rotate-180" : ""}`} transition-all duration-300 ease-in-out -ml-1`}
                    w={22}
                    h={22}
                  />
                </div>
              </Link>
            </PopoverTrigger>

            {item.children && (
              <PopoverContent className={twMerge(
                'bg-stone-300 dark:bg-neutral-700 p-4 rounded-xl min-w-sm border-0 box-shadow-xl',
                `${styles?.popoverBackground ?? ""} ${styles?.popoverBackgroundDark ?? ""}`
              )}>
                <div className='flex flex-col'>
                  {item.children.map((item) => (
                    <CategoryCollapseableContent key={item.label} item={item} config={config}/>
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

/**
 * This component is used to create a clickable item that is displayed when a category is clicked/hovered.
 * @param item - The item that should be displayed when the category is clicked/hovered, inside the newly appeared container
 */
function CategoryCollapseableContent({ item, config }: { item: Item, config: ClickableCategoryConfig }) {
  const { label, subLabel, href } = item;

  return (
    <Link className={twMerge('group block p-2 px-4 rounded-md hover:bg-base-200 dark:hover:bg-gray-900', `${config?.styles?.popoverItemHoverBackground ?? ""} ${config?.styles?.popoverItemHoverBackgroundDark ?? ""}`)} href={href}>
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