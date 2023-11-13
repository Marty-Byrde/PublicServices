import { Fragment } from 'react'
import Link from "next/link"
import { Text } from "@/components/Shared/Responsive/Text"


export interface TableCategory {
  name: string,
  items: {
    values: string[],
    href?: string
  }[]
}


export interface TableProps {
  columns: string[],
  categories: TableCategory[],
  isPending?: boolean
}




export default function StudyTable({ columns, categories, isPending }: TableProps) {
  const hideColumnsScreenSize = (index: number) => {
    if(index > 3) return 'hidden lg:table-cell'
    if(index > 2) return 'hidden md:table-cell'
    if(index > 1) return 'hidden sm:table-cell'
    if(index > 0) return 'hidden 2sm:table-cell'

    return ''
  }

  return (
    <div>
      <div className='mt-8 flow-root'>
        <div className='overflow-x-auto '>
          <div className='inline-block py-2 align-middle w-full'>
            <div className='p-0.5 rounded-lg bg-white dark:bg-neutral-700'>
              <table className='w-full'>
                <thead className='bg-white dark:bg-neutral-700 border-b-2 dark:border-gray-300'>
                <tr>
                  {
                    columns.map((column, index) => (<th key={column} scope='col' className={`whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm lg:text-base xl:text-lg 3xl:text-xl font-semibold text-gray-900 dark:text-gray-200 sm:pl-3 ${hideColumnsScreenSize(index)}`}>
                      {column}
                    </th>))
                  }
                </tr>
                </thead>
                <tbody className='bg-white dark:bg-neutral-800/70'>
                {
                  categories.map((category, index) => (
                    <Fragment key={category.name}>
                      <tr className='border-t border-gray-200 dark:border-gray-500'>
                        <th
                          colSpan={6}
                          scope='colgroup'
                          className={`bg-gray-200 py-2 pl-4 pr-3 text-left text-sm lg:text-base xl:text-lg 3xl:text-xl font-semibold text-gray-900 dark:text-gray-200 dark:bg-gray-700 sm:pl-3`}
                        >
                          {category.name}
                        </th>
                      </tr>
                      {category.items.map((item, index) => (
                        <tr key={index}
                            className={`${index === 0 ? 'border-gray-300 dark:border-gray-600' : 'border-gray-200 dark:border-gray-500'} border-t dark:hover:bg-gray-700/60 hover:bg-gray-200`}
                        >
                          {item.values.map((value, _item_index) => (
                            <td key={category.name + index + value}
                                className={`${_item_index > 0 ? 'whitespace-nowrap' : 'whitespace-pre-wrap w-full'} ${hideColumnsScreenSize(_item_index)}`}>
                              <Text content={value} isPending={isPending}  skWidth={_item_index === 0 ? 'w-[60%]' : 'w-12'} skeletonClassName={_item_index === 0 ? 'ml-2' : `${_item_index !== item.values.length -1 ? 'mx-auto' : 'mr-4'} mx-auto px-4`} color='text-gray-900' darkColor='dark:text-gray-200' textSize='text-sm lg:text-base xl:text-lg 3xl:text-cl' className={`font-medium sm:pl-3 pr-3 pl-4 py-4 ${_item_index > 0 ? 'whitespace-nowrap' : 'whitespace-pre-wrap'}`} />
                            </td>))}

                          <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm lg:text-base xl:text-lg 3xl:text-xl font-medium sm:pr-3 tracking-widest'>
                            <Link href={item?.href ?? '#'} className='text-indigo-600 dark:text-cyan-400 hover:text-indigo-900 dark:hover:text-cyan-600'>
                              Select
                              <span className='sr-only'>, {item?.href}</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
