import { createAutocomplete } from "@algolia/autocomplete-core"
import { useContext, useId, useState } from "react"
import { FilterProviderContext, FilterProviderContextProps } from "@/components/Shared/Filtering/FilteringProvider"
import { useRouter } from "next/navigation"

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
  const router = useRouter();
  let id = useId()

  interface autoCompleteState {
    collections?: any[]
  }

  let [autocompleteState, setAutocompleteState] = useState<autoCompleteState>({})


  function navigate({ itemUrl }) {
    if (!itemUrl) return

    router.push(itemUrl)

    if (itemUrl === window.location.pathname + window.location.search + window.location.hash) {
      close(autocomplete)
    }
  }

  let [autocomplete] = useState(() =>
    createAutocomplete({
      id,
      placeholder: 'Find something...',
      defaultActiveItemId: 0,
      navigator: {
        navigate,
      },
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
          onSelect({item}) {
            setFilter(items?.filter((item) => item?.name?.includes(query)) ?? [])
            navigate({ itemUrl: item?.href })
            close(autocomplete)
          }
        }]
      },
    }),
  )

  return { autocomplete, autocompleteState }
}