"use client"

import { useState, useEffect } from "react"

export default function Stopwatch() {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="bg-gray-800 bg-opacity-75 text-lg font-bold neon-purple px-4 py-1 rounded-full">
      {formatTime(time)}
    </div>
  )
}

