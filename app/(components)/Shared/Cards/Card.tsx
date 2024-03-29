import { twMerge } from "tailwind-merge"
interface CardProps {
  children: JSX.Element | JSX.Element[],
  hidden?: boolean,
  className?: string,
  preventBreakup?: boolean,
  onClick?: () => void
}

/**
 * A simple card component
 * @param children The content of the card
 * @param hidden Hides the card
 * @param className Additional classes
 * @param preventBreakup Prevents the card from breaking up its content into multiple columns
 */
export default function Card({ children, hidden, className: _modifiedClasses, preventBreakup, onClick }: CardProps) {
  if (hidden) return null;

  const defaultClassnames = ["bg-stone-200", "dark:bg-base-100", "border-[1px]", "border-black", " p-4", " shadow-2xl", `${preventBreakup ? "break-inside-avoid" : ""}`]
  const _className = twMerge(defaultClassnames.join(" "), _modifiedClasses)

  return (
    <div onClick={onClick} className={_className}>
      {children}
    </div>
  )
}