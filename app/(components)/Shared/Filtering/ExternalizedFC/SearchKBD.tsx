export default function SearchKBD({ modifier, kbdKey }: { modifier: 'Ctrl' | '⌘', kbdKey: string }) {
  if(!modifier) return null;

  return (
    <kbd className="ml-auto flex gap-1 font-medium text-slate-400 dark:text-slate-500">
      <kbd className="font-sans">{modifier}</kbd>
      <kbd className="font-sans">{kbdKey.toUpperCase()}</kbd>
    </kbd>
  )
}