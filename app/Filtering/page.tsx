'use client'
import { FilteringProvider } from "@/components/Shared/Filtering/FilteringProvider"
import Search, { SearchProps } from "@/components/Shared/Filtering/Search"
import { TestDisplay } from "@/app/Filtering/TestDisplay"
import { AutoComplete_ResultItem, AutoCompleteHandler } from "@/components/Shared/Filtering/DialogSubcomponents/hooks/useAutoComplete"

export default function Page() {
  type Item = {
    name: string,
    age: number
  }
  const items: Item[] = [
    {
      name: "John",
      age: 24,
    },
    {
      name: "Jane",
      age: 22,
    },
    {
      name: "Josef",
      age: 22,
    },
    {
      name: "Hannes",
      age: 22,
    },
    {
      name: "Michael",
      age: 22,
    }
  ]

  const handler: AutoCompleteHandler = ({ query }) => {
    return {
      sourceId: 'searchId',
      getItemInputValue: ({ item }) => {
        return item?.title
      },
      getItems: ({ query }) => {
        return items.filter((item) => item?.name?.toLowerCase().includes(query.toLowerCase())).map(i => ({
          title: i.name,
          description: 'Some description',
          baseItem: i
        }))
      },

    }
  }


  return (
    <FilteringProvider items={items}>
      <div className='flex flex-col gap-4'>
        <Search autoCompleteHandler={handler} kbdKey={'z'} placeholder='Look for lectures'/>
        <TestDisplay/>
      </div>
    </FilteringProvider>
  )
}