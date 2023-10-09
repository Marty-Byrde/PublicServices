import { useSearchSettingsProps } from "@/components/Shared/Filtering/DialogSubcomponents/hooks/useSearchSettings"
import { Suspense, useCallback, useContext, useEffect, useRef } from "react"
import { useAutocomplete, useAutocompleteResultProps } from "@/components/Shared/Filtering/DialogSubcomponents/hooks/useAutoComplete"
import CloseOnNavigation from "@/components/Shared/Filtering/DialogSubcomponents/CloseOnNavigation"
import { Dialog } from "@headlessui/react"
import { SearchInput } from "@/components/Shared/Filtering/DialogSubcomponents/SearchInput"
import SearchResults from "@/components/Shared/Filtering/DialogSubcomponents/SearchResults"
import { SearchContext } from "@/components/Shared/Filtering/Search"

export default function SearchDialog({ open, setOpen, handler }: useSearchSettingsProps["dialogProps"]) {
  const { kbdKey } = useContext(SearchContext)

  let formRef = useRef(null)
  let panelRef = useRef(null)
  let inputRef = useRef(null)

  let close = useCallback(
    (autocomplete: useAutocompleteResultProps["autocomplete"]) => {
      setOpen(false)
      autocomplete.setQuery('')
    },
    [setOpen],
  )

  let { autocomplete, autocompleteState } = useAutocomplete({
    handler,
    close() {
      close(autocomplete)
    },
  })

  useEffect(() => {
    if (open) return;


    function onKeyDown(event) {
      if (event.key === kbdKey.toLowerCase() && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, setOpen])

  return (
    <>
      <Suspense fallback={null}>
        <CloseOnNavigation close={close} autocomplete={autocomplete}/>
      </Suspense>
      <Dialog open={open} onClose={() => close(autocomplete)} className={'fixed inset-0 z-50'}>
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur"/>

        <div className="fixed inset-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-20 md:py-32 lg:px-8 lg:py-[15vh]">
          <Dialog.Panel className="mx-auto transform-gpu overflow-hidden rounded-xl bg-white shadow-xl dark:bg-slate-800 dark:ring-1 dark:ring-slate-700 sm:max-w-xl">
            <div {...autocomplete.getRootProps({})}>
              <form ref={formRef}
                    {...autocomplete.getFormProps({
                      inputElement: inputRef.current,
                    })}>

                <SearchInput ref={inputRef} autocomplete={autocomplete} autocompleteState={autocompleteState} onClose={() => setOpen(false)}/>

                <div ref={panelRef} {...autocomplete.getPanelProps({})}
                     className="border-t border-slate-200 bg-white px-2 py-3 empty:hidden dark:border-slate-400/10 dark:bg-slate-800">

                  {autocompleteState.isOpen && (
                    <SearchResults autocomplete={autocomplete} query={autocompleteState.query} collection={autocompleteState.collections[0]}/>
                  )}
                </div>
              </form>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}