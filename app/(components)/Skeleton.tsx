import { DynamicMeasurement, FuncCompProps } from "@/typing"

type SkeletonProps = Partial<DynamicMeasurement> & FuncCompProps & {
  rounded?: string
}

/**
 * This component will return a Skeleton in which further Sekeleton-elements can be displayed.
 * @param props
 * @constructor
 */
export default function Skeleton(props: SkeletonProps = { rounded: "3xl", unit: "sm" }) {
  let { unit, rounded } = props
  let width = `max-w-sm w-full`

  if (unit) width = `max-w-${unit} w-full`
  if (!rounded) rounded = "3xl"

  return (
    <div role="status" className={`${width} h-md max-h-full h-60 p-4 border border-gray-200 rounded-${props.rounded} shadow animate-pulse md:p-6 dark:border-gray-700 bg-amber-50/20`}>
      {props.children}
    </div>
  )
}


export type SkeletonLineProps = {
  height?: number,
  width?: number,
}

/**
 * This function will return a Skeleton-line
 * @param props
 * @constructor
 */
export function SkeletonLine(props: SkeletonLineProps) {
  let { width, height } = props
  if (!height) height = 2

  let _width = "";  //? default max width
  if (width) _width = `w-${width}`

  return <div className={`h-${height} bg-gray-200 rounded-full dark:bg-gray-700 ${_width} my-3`}></div>
}



/**
 * This function will display a skeleton that combines and some skeleton lines next to it, given as its children.
 * @param props
 * @constructor
 */
export function SkeletonImageGroup(props: FuncCompProps) {
  return <div>
    <div className="flex items-center mt-4 space-x-3">
      <SkeletonImage/>
      <div className={""}>
        {props.children}
      </div>
    </div>
  </div>
}

/**
 * This function will return a Skeleton-image
 * @param width
 * @constructor
 */
export function SkeletonImage({ width }: { width?: number }) {
  if (!width) width = 14;
  return <svg className={`text-gray-200 w-${width} h-${width} dark:text-gray-700`} aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
  </svg>
}