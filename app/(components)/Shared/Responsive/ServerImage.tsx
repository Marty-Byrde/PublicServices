import { ResponsiveElementProps } from "@/components/Shared/Responsive/Text"
import Image from "next/image"
import { StaticImageData } from "next/image"
import defaultImage from "@/public/lectureIcons/star.svg"

interface StaticImport {
  default: StaticImageData
}

interface ServerImageProps extends ResponsiveElementProps {
  src: StaticImageData | StaticImport | JSX.Element,
  alt: string,
  width: number,

  skImage?: StaticImageData | StaticImport,
}

export default function ServerImage(props: ServerImageProps) {
  const { src, alt, width, isPending, className, } = props
  const { skeletonClassName, skWidth, skDarkBackground, skBackground, skHeight, skImage } = props

  if (isPending) {
    return (
      <div className='animate-pulse '>
        <svg className={`
            ${skWidth || "w-10"}
            ${skHeight || "h-10"}
            ${skBackground || "bg-gray-200"}
            ${skDarkBackground || "dark:bg-gray-500"}
            rounded-full
             ${skeletonClassName}`}
             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
          <path
            d="M17 9a1 1 0 0 0-1 1 6.994 6.994 0 0 1-11.89 5H7a1 1 0 0 0 0-2H2.236a1 1 0 0 0-.585.07c-.019.007-.037.011-.055.018-.018.007-.028.006-.04.014-.028.015-.044.042-.069.06A.984.984 0 0 0 1 14v5a1 1 0 1 0 2 0v-2.32A8.977 8.977 0 0 0 18 10a1 1 0 0 0-1-1ZM2 10a6.994 6.994 0 0 1 11.89-5H11a1 1 0 0 0 0 2h4.768a.992.992 0 0 0 .581-.07c.019-.007.037-.011.055-.018.018-.007.027-.006.04-.014.028-.015.044-.042.07-.06A.985.985 0 0 0 17 6V1a1 1 0 1 0-2 0v2.32A8.977 8.977 0 0 0 0 10a1 1 0 1 0 2 0Z"/>
        </svg>
      </div>
    )
  }

  return typeof src === 'object' ? (src as JSX.Element) : <Image src={src} alt={alt} width={width} className={className}/>
}