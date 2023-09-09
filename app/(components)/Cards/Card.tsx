interface CardProps {
  children: JSX.Element | JSX.Element[],
  hidden?: boolean,
  className?: string,
  preventBreakup?: boolean,
}

/**
 * A simple card component
 * @param children The content of the card
 * @param hidden Hides the card
 * @param className Additional classes
 * @param preventBreakup Prevents the card from breaking up its content into multiple columns
 */
export default function Card({ children, hidden, className, preventBreakup }: CardProps) {
  if (hidden) return null;

  return (
    <div className={`bg-stone-200 dark:bg-base-100 border-[1px] border-black p-4 shadow-2xl ${preventBreakup ? "break-inside-avoid" : ""} ${className}`}>
      {children}
    </div>
  )
}