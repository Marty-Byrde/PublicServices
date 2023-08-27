type FlexGridProps = {
  children: any
  gapX?: number,
  gapY?: number,

}

export default function FlexGrid(props: FlexGridProps) {
  let { gapX, gapY } = props

  if(!gapX) gapX = 10
  if(!gapY) gapY = 10

  return (
    <div className={`flex flex-wrap w-full justify-center items-center gap-x-${gapX} gap-y-${gapY}`}>
      {props.children}
    </div>
  )
}