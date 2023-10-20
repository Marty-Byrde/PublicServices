import Timer from "@/app/suspense/Timer"

export default async function SomeSSRComponent(){
  const est = await new Promise((res) => setTimeout(() => res('done'), 15000))

  return <div>
    <span>CONTENT ...</span>
    <Timer />
  </div>
}