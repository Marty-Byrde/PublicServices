import { Fragment, useId } from "react"
import HighlightQuery from "@/components/Shared/Filtering/DialogSubcomponents/HighlightQuery"
import { AutoComplete_ResultItem, useAutocompleteResultProps } from "@/components/Shared/Filtering/DialogSubcomponents/hooks/useAutoComplete"
import { BaseItem } from "@algolia/autocomplete-core"

export default function SearchResult({ result, autocomplete, collection, query }: { result: AutoComplete_ResultItem, autocomplete: useAutocompleteResultProps['autocomplete'], collection: any, query: string }) {
  let id = useId()

  // @ts-ignore
  return (<li {...autocomplete.getItemProps({ item: (result as BaseItem), source: collection.source })}
              className="group block cursor-default rounded-lg px-3 py-2 aria-selected:bg-slate-100 dark:aria-selected:bg-slate-700/30"
              aria-labelledby={`${Math.random()}-hierarchy ${result.title}-title--${id}`}
    >

      <div id={`${result.title}-title-${id}`} aria-hidden="true"
           className="text-sm text-slate-700 group-aria-selected:text-sky-600 dark:text-slate-300 dark:group-aria-selected:text-sky-400">
        <HighlightQuery text={result.title} query={query}/>
      </div>

      <div id={`${result.title}-hierarchy-${id}`} aria-hidden="true"
           className="mt-0.5 truncate whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">

        <Fragment key={'SearchResultFragment' + id + result.title}>
          {result?.description && <HighlightQuery text={result?.description} query={query}/>}
          <span className={!result?.route ? 'sr-only' : 'mx-2 text-slate-300 dark:text-slate-700'}>
            {result?.route}
          </span>
        </Fragment>
      </div>
    </li>
  )
}