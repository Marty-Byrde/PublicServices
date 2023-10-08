import { forwardRef, MutableRefObject } from "react"
import clsx from "clsx"
import LoadingIcon from "@/components/Shared/Filtering/DialogSubcomponents/LoadingIcon"
import SearchIcon from "@/components/Shared/Filtering/DialogSubcomponents/SearchIcon"
import { useAutocompleteResultProps } from "@/components/Shared/Filtering/DialogSubcomponents/hooks/useAutoComplete"

export interface SearchInputProps extends useAutocompleteResultProps {
  onClose: () => void
}

export const SearchInput = forwardRef(function SearchInput({ autocomplete, autocompleteState, onClose }: SearchInputProps, inputRef: MutableRefObject<any>) {
  let inputProps = autocomplete.getInputProps({ inputElement: null })

  return (
    <div className="group relative flex h-12">
      <SearchIcon className="pointer-events-none absolute left-4 top-0 h-full w-5 fill-slate-400 dark:fill-slate-500"/>
      <input ref={inputRef} {...inputProps}
        className={clsx(
          'flex-auto appearance-none bg-transparent pl-12 text-slate-900 outline-none placeholder:text-slate-400 focus:w-full focus:flex-none dark:text-white sm:text-sm [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden',
          autocompleteState.status === 'stalled' ? 'pr-11' : 'pr-4')}

        onKeyDown={(event) => {
          if (event.key === 'Escape' && !autocompleteState.isOpen && autocompleteState.query === '') {
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur()
            }

            onClose()
          } else {
            inputProps.onKeyDown(event)
          }
        }}
      />
      {autocompleteState.status === 'stalled' && (
        <div className="absolute inset-y-0 right-3 flex items-center">
          <LoadingIcon className="h-6 w-6 animate-spin stroke-slate-200 text-slate-400 dark:stroke-slate-700 dark:text-slate-500"/>
        </div>
      )}
    </div>
  )
})