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
    setQuestion(`Tell me about your experience with ${jobTitle} related projects.`)
    setAnswer("")
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 p-4 relative">
      {/* Stopwatch */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
        <Stopwatch />
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4">
        {/* Interviewer Side */}
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
            <p className="text-white text-lg">{question}</p>
          </div>
        </div>

        {/* User Camera Feed */}
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

      {/* User Response Area */}
      <div className="mt-4">
        <textarea
          className="w-full p-2 bg-gray-800 text-white rounded-lg border border-purple-500/50 resize-none h-24"
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></textarea>
        <button onClick={generateQuestion} className="mt-2 futuristic-button">
          Next Question
        </button>
      </div>
    </div>
  )
}

