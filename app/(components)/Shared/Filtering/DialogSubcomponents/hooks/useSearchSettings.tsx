import { MutableRefObject, useCallback, useRef, useState } from "react"
import { AutoCompleteHandler } from "@/components/Shared/Filtering/DialogSubcomponents/hooks/useAutoComplete"

export interface useSearchSettingsProps {
    buttonProps: {
        ref: MutableRefObject<HTMLButtonElement>
        onClick: () => void
    },
    dialogProps: {
        open: boolean
        setOpen: (open: boolean) => void,
        className?: string,
        handler: AutoCompleteHandler
    }
}

export default function useSearchSettings({ handler }: { handler: AutoCompleteHandler }): useSearchSettingsProps {
    let buttonRef = useRef(null)
    let [open, setOpen] = useState(false)

    return {
        buttonProps: {
            ref: buttonRef,
            onClick() {
                setOpen(true)
            },
        },
        dialogProps: {
            open,
            setOpen: useCallback((open) => {
                let { width = 0, height = 0 } =
                buttonRef.current?.getBoundingClientRect() ?? {}
                if (!open || (width !== 0 && height !== 0)) {
                    setOpen(open)
                }
            }, []),
            handler,
        },
    }
}