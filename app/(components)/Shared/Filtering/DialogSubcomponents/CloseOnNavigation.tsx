import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function CloseOnNavigation({ close, autocomplete }) {
  let pathname = usePathname()
  let searchParams = useSearchParams()

  useEffect(() => {
    close(autocomplete)
  }, [pathname, searchParams, close, autocomplete])

  return null
}
