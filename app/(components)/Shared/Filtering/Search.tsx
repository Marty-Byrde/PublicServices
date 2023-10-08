'use client'

import {
  createContext,
  useEffect,
  useState,
} from 'react'

import SearchIcon from "@/components/Shared/Filtering/DialogSubcomponents/SearchIcon"
import useSearchSettings from "@/components/Shared/Filtering/DialogSubcomponents/hooks/useSearchSettings"
import SearchDialog from "@/components/Shared/Filtering/SearchDialog"
import SearchKBD from "@/components/Shared/Filtering/ExternalizedFC/SearchKBD"
import { AutoCompleteHandler } from "@/components/Shared/Filtering/DialogSubcomponents/hooks/useAutoComplete"
import { twMerge } from "tailwind-merge"


export const SearchContext = createContext(null)

export interface SearchProps {
  kbdKey: string,
  autoCompleteHandler: AutoCompleteHandler,
  placeholder?: string
  customization?: {
    box?: {
      containerClassName?: string,
      iconClassName?: string,
      placeholderClassName?: string,
    }
  }
}

export default function Search({ kbdKey, autoCompleteHandler, placeholder, customization }: SearchProps) {
  let [modifierKey, setModifierKey] = useState<'Ctrl' | '⌘'>()
  let { buttonProps, dialogProps } = useSearchSettings({ handler: autoCompleteHandler })

  useEffect(() => {
    setModifierKey(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? '⌘' : 'Ctrl')
  }, [])

  return (
    <SearchContext.Provider value={{ kbdKey }}>
      <button type="button"{...buttonProps} key={customization?.box?.containerClassName ?? 'searchButton'}
              className={twMerge('group flex items-center justify-start h-auto w-80 flex-none rounded-lg py-2.5 pl-4 pr-3.5 text-sm ring-1 ring-slate-200 hover:ring-slate-300 dark:bg-slate-800/75 dark:ring-inset dark:ring-white/5 dark:hover:bg-slate-700/40 dark:hover:ring-slate-500 lg:w-96', customization?.box?.containerClassName)}>

        <SearchIcon key={customization?.box?.iconClassName ?? 'searchIcon'} className={twMerge('h-5 w-5 flex-none fill-slate-400 group-hover:fill-slate-500 dark:fill-slate-500 md:group-hover:fill-slate-400', customization?.box?.iconClassName)}/>

        <span key={customization?.box?.placeholderClassName ?? 'searchPlacehlder'} className={twMerge("ml-2 text-slate-500 dark:text-slate-400", customization?.box?.placeholderClassName)}>
                    {placeholder ?? 'Search'}
                </span>

        <SearchKBD key={kbdKey + modifierKey} kbdKey={kbdKey} modifier={modifierKey}/>

      </button>
      <SearchDialog {...dialogProps} />
    </SearchContext.Provider>
  )
}
