import SearchResult from "@/components/Shared/Filtering/DialogSubcomponents/SearchResult"
import { AutoComplete_ResultItem, useAutocompleteResultProps } from "@/components/Shared/Filtering/DialogSubcomponents/hooks/useAutoComplete"

export default function SearchResults({ autocomplete, query, collection }: { autocomplete: useAutocompleteResultProps['autocomplete'], query: string, collection: any }) {
  if (!collection || collection?.items?.length === 0) {
    return (
      <p className="px-4 py-8 text-center text-sm text-slate-700 dark:text-slate-400">
        No results for &ldquo;
        <span className="break-words text-slate-900 dark:text-white">
          {query}
        </span>
        &rdquo;
      </p>
    )
  }

  return (
    <ul {...autocomplete.getListProps()}>
      {collection.items.map((result: AutoComplete_ResultItem) => (
        <SearchResult
          key={result.title+result?.description+result?.route+Math.random()}
          result={result}
          autocomplete={autocomplete}
          collection={collection}
          query={query}
        />
      ))}
    </ul>
  )
}