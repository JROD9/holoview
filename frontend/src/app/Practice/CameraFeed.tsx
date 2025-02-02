"use client"

import { useState, useEffect, useRef } from "react"

export default function CameraFeed() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setHasPermission(true)
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
        setHasPermission(false)
      }
    }

    setupCamera()

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [])

  if (hasPermission === null) {
    return <div className="text-white">Requesting camera permission...</div>
  }

  if (hasPermission === false) {
    return <div className="text-white">Camera access denied. Please enable camera access to use this feature.</div>
  }

  return (
    <div className="mb-4">
      <video ref={videoRef} autoPlay playsInline muted className="w-full h-48 object-cover rounded" />
    </div>
  )
}

