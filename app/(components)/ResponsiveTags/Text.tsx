import { v4 as uuidV4 } from "uuid"
import { twMerge } from "tailwind-merge"

export interface ResponsiveElementProps {
  isPending?: boolean
  className?: string,


  skWidth?: "w-48" | string,
  skHeight?: "h-2" | string,
  skBackground?: "bg-gray-200" | string,
  skDarkBackground?: "dark:bg-gray-700" | string,
  skeletonClassName?: string,
}

interface TextProps extends  ResponsiveElementProps{
  content: string | string[],
  containerFullWidth?: boolean,
  title?: string,

  textSize?: "text-sm" | string,
  color?: "text-black" | string,
  darkColor?: "text-white" | string,

  skLines?: number,
}

export function Text(props: TextProps) {
  const { content, isPending, color, darkColor, textSize, className, title, containerFullWidth } = props
  const { skeletonClassName, skWidth, skHeight, skBackground, skDarkBackground, skLines } = props

  if (isPending) {
    const lines = []
    const makeLine = () => (<div key={Math.random().toString()+'-text-skeleton'} className={`
        ${skWidth || "w-48"}
        ${skHeight || "h-2"}
        ${skBackground || "bg-gray-200"}
        ${skDarkBackground || "dark:bg-gray-500"}
        
        rounded-full ${skeletonClassName}`} />)

    for (let i = 0; i < skLines; i++) {
      lines.push(makeLine())
    }

    return (
      <div className={`animate-pulse ${containerFullWidth ? "w-full" : ""}`}>
        {skLines ? lines : makeLine()}
      </div>
    )
  }

  return (
    <div title={title} className={twMerge('text-lg text-gray-900 dark:text-gray-200', className, textSize, color, darkColor)}>
      {content}
    </div>
  )
}


