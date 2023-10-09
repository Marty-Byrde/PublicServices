import { createAutocomplete } from "@algolia/autocomplete-core"
import { useContext, useId, useState } from "react"
import { FilterProviderContext, FilterProviderContextProps } from "@/components/Shared/Filtering/FilteringProvider"

export interface useAutocompleteResultProps {
  autocomplete: ReturnType<typeof createAutocomplete>,
  autocompleteState: any
}

export interface AutoCompleteHandler {
  ({ query }: { query: string }): Omit<AutoComplete_getSourcesProps, 'onSelect'>
}

export interface AutoComplete_ResultItem {
  title: string,
  description?: string,
  route?: string,
}

export interface AutoComplete_getSourcesProps {
  sourceId: string
  getItemInputValue: ({ item }) => string
  getItems: ({ query }: { query: string }) => AutoComplete_ResultItem[],
  onSelect: () => void
}

export function useAutocomplete({ handler, close }): useAutocompleteResultProps {
  const { items, setFilter, filter } = useContext<FilterProviderContextProps<any>>(FilterProviderContext)
  let id = useId()

  interface autoCompleteState {
    collections?: any[]
  }

  let [autocompleteState, setAutocompleteState] = useState<autoCompleteState>({})



  let [autocomplete] = useState(() =>
    createAutocomplete({
      id,
      placeholder: 'Find something...',
      defaultActiveItemId: 0,
      onStateChange({ state }) {
        setAutocompleteState(state)
      },
      shouldPanelOpen({ state }) {
        return state?.query !== ''
      },
      getSources({ query }) {
        return [{
          ...handler({ query }),
          // sourceId: 'searchId',
          // getItemInputValue({ item }) {
          //   item.title;
          //   return item?.title
          // },
          // getItems({ query }): AutoComplete_ResultItem[] {
          //   return items?.filter((item) => item?.name?.includes(query)) ?? []
          // },
          onSelect() {
            setFilter(items?.filter((item) => item?.name?.includes(query)) ?? [])
            close(autocomplete)
          }
        }]
      },
    }),
  )

  return { autocomplete, autocompleteState }
}