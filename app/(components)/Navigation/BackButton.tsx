'use client'
import { useRouter } from 'next/navigation'

export default function BackButton({ customLabel, className }: { customLabel?: string, className?: string }) {
  const { back } = useRouter()

  return (
    <div className={`btn btn-active btn-info dark:btn-ghost ${className}`} onClick={() => back()}>
      Back
    </div>
  )
}