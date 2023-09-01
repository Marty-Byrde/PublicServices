import { v4 as uuidV4 } from "uuid"

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
  content: string,

  textSize?: "text-sm" | string,
  color?: "text-black" | string,
  darkColor?: "text-white" | string,

  skLines?: number,
}

export function Text(props: TextProps) {
  const { content, isPending, color, darkColor, textSize, className } = props
  const { skeletonClassName, skWidth, skHeight, skBackground, skDarkBackground, skLines } = props

  if (isPending) {
    const Line = (<div key={uuidV4()} className={`
        ${skWidth || "w-48"}
        ${skHeight || "h-2"}
        ${skBackground || "bg-gray-200"}
        ${skDarkBackground || "dark:bg-gray-500"}
        
        rounded-full ${skeletonClassName}`} />)
    return (
      <div className='animate-pulse '>
        {skLines ? Array(skLines).fill(Line) : Line}
      </div>
    )
  }

  return (
    <div className={`${textSize || "text-lg"} ${color || "text-black"} ${darkColor || "dark:text-white"} ${className}`}>
      {content}
    </div>
  )
}


