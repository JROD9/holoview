"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Stopwatch from "./Stopwatch"

export default function InterviewPractice() {
  const searchParams = useSearchParams()
  const [jobTitle, setJobTitle] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const interviewerVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setJobTitle(searchParams.get("job") || "")
    setDifficulty(searchParams.get("difficulty") || "")
  }, [searchParams])

  useEffect(() => {
    if (jobTitle && difficulty) {
      generateQuestion()
    }
  }, [jobTitle, difficulty])

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
        setCameraError("Camera access denied. Please enable camera access to use this feature.")
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

  useEffect(() => {
    if (interviewerVideoRef.current) {
      interviewerVideoRef.current.play()
    }
  }, [])

  const generateQuestion = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage: "Design a rate-limited API system handling 10,000 requests/sec. Explain architecture, scaling, and trade-offs."
        })
      });

      if (!response.ok) throw new Error('Failed to get question')
      
      const data = await response.json()
      setQuestion(data.reply || "Could not load question")
    } catch (err) {
      console.error('Error fetching question:', err)
      setError('Failed to load question. Please try again.')
      setQuestion("Explain the CAP theorem and its implications in distributed systems design.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 p-4 relative">
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
        <Stopwatch />
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2 aspect-video relative rounded-lg overflow-hidden border border-purple-500/50">
          <video
            ref={interviewerVideoRef}
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Recording%202025-02-02%20at%2010.05.30-JnILGtwCpzqEylwTc0ypuqgDGSlHy2.mov"
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-75">
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                <span className="text-white">Generating complex question...</span>
              </div>
            ) : error ? (
              <p className="text-red-400 text-sm">{error}</p>
            ) : (
              <p className="text-white text-lg">{question}</p>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 aspect-video relative rounded-lg overflow-hidden border border-purple-500/50">
          {cameraError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <p className="text-white text-center p-4 text-sm">{cameraError}</p>
            </div>
          ) : (
            <video ref={videoRef} id="userCamera" autoPlay playsInline muted className="w-full h-full object-cover" />
          )}
        </div>
      </div>

      <div className="mt-4">
        <textarea
          className="w-full p-2 bg-gray-800 text-white rounded-lg border border-purple-500/50 resize-none h-24"
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></textarea>
        <button 
          onClick={generateQuestion} 
          className="mt-2 futuristic-button"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Next Question'}
        </button>
      </div>
    </div>
  )
}