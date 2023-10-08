import { twMerge } from "tailwind-merge"

export default function SearchKBD({ modifier, kbdKey, className }: { modifier: 'Ctrl' | '⌘', kbdKey: string, className?: string }) {
  if(!modifier) return null;

  return (
    <kbd key={className} className={twMerge('ml-auto flex gap-1 font-medium text-slate-400 dark:text-slate-500', className)}>
      <kbd className="font-sans">{modifier}</kbd>
      <kbd className="font-sans">{kbdKey.toUpperCase()}</kbd>
    </kbd>
  )
}