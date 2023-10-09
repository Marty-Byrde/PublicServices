'use client'

import Search from "@/components/Shared/Filtering/Search"
import { BasicLecture } from "campus-scraper"
import { useContext } from "react"
import { FilterProviderContext } from "@/components/Shared/Filtering/FilteringProvider"
import { AutoComplete_ResultItem, AutoCompleteHandler } from "@/components/Shared/Filtering/DialogSubcomponents/hooks/useAutoComplete"

export default function LectureSearchBar(){
  const { items } : {items: BasicLecture[]} = useContext(FilterProviderContext)

  const Handler: AutoCompleteHandler = ({ query }) => {
    return {
      getItems: ({ query }): AutoComplete_ResultItem[] => {
        return items.filter(l => l.name.includes(query)).map(l => ({ title: l.name, description: l.teachers.join(' '), baseItem: l }))
      },
      getItemInputValue: ({ item }) => {
        return item?.title
      },
      sourceId: "search"
    }
  }

  return <Search kbdKey='z' autoCompleteHandler={Handler} placeholder='Search for a lecture' customization={{box: {containerClassName: 'w-full'}}}/>
}