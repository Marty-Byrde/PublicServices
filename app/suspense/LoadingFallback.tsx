'use client'

import { useEffect, useState } from "react"

export default function LoadingFallback(){
  const [time, setTime] = useState<number>(0)

  useEffect(() => {
    const factor = 250;

    const interval = setInterval(() => {
      setTime((prev) => prev + (factor / 1000))
    }, factor)

    return () => clearInterval(interval)
  });

  return <div>Loading Suspense Content.... ({time.toFixed(2)}s passed</div>
}
