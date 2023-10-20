import { Suspense } from "react"
import SomeSSRComponent from "@/app/suspense/SomeSSRComponent"
import LoadingFallback from "@/app/suspense/LoadingFallback"

export default async function SuspenseTest(){

  return <div>
    <h1>This is the Suspense page... </h1>

    <Suspense fallback={<LoadingFallback/>}>
      {/*// @ts-ignore*/}
      <SomeSSRComponent />
    </Suspense>

  </div>

}