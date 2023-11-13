import { twMerge } from "tailwind-merge"


interface LockIconProps {
  className?: string
}

export default function LockIcon({ className }: LockIconProps) {
  return (
    <svg key={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className={twMerge('w-48 h-48 dark:text-white text-black', className)}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
    </svg>
  )
}