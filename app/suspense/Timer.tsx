'use client'
import { useEffect, useState } from "react"

export default function Timer(){
  const [time, setTime] = useState<number>(0)

  useEffect(() => {
    const factor = 60;

    const interval = setInterval(() => {
      setTime((prev) => prev + (factor / 1000))
    }, factor)

    return () => clearInterval(interval)
  }, []);

  return <div>Timer: {time.toFixed(2)}s passed</div>
}