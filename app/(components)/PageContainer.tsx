type PageContainerProps = {
  children: any
  width?: any
}

export default function PageContainer(props: PageContainerProps) {
  return (
    <div className={`px-6 lg:px-8 ${props.width ? `w-${props.width}` : "w-full"}`}>
      {props.children}
    </div>
  )
}