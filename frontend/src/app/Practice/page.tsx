"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import Stopwatch from "./Stopwatch"

interface PerformanceScore {
  technical: number
  communication: number
  problemSolving: number
  overall: number
}

export default function InterviewPractice() {
  const searchParams = useSearchParams()
  const [jobTitle, setJobTitle] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [interviewEnded, setInterviewEnded] = useState(false)
  const [performanceScore, setPerformanceScore] = useState<PerformanceScore | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)

  // For the user's camera feed (copied from your first code)
  const videoRef = useRef<HTMLVideoElement>(null)
  // For the interviewer side (screen recording video)
  const interviewerVideoRef = useRef<HTMLVideoElement>(null)

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()

  // Generate the question using the job title (and reset the transcript)
  const generateQuestion = useCallback(() => {
    setQuestion(`Tell me about your experience with ${jobTitle} related projects.`)
    setAnswer("")
    resetTranscript()
  }, [jobTitle, resetTranscript])

  // Set job title and difficulty from search params
  useEffect(() => {
    setJobTitle(searchParams.get("job") || "Software Engineer")
    setDifficulty(searchParams.get("difficulty") || "medium")
  }, [searchParams])

  // Generate a question once jobTitle and difficulty are set
  useEffect(() => {
    if (jobTitle && difficulty) {
      generateQuestion()
    }
  }, [jobTitle, difficulty, generateQuestion])

  // Ensure the interviewer (screen recording) video plays
  useEffect(() => {
    if (interviewerVideoRef.current) {
      interviewerVideoRef.current.play()
    }
  }, [])

  // Set up the user's camera feed (copied from your first code)
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

  // Toggle speech recognition listening
  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening()
    } else {
      SpeechRecognition.startListening({ continuous: true })
    }
  }

  // End the interview, stop listening, and generate mock performance scores
  const endInterview = () => {
    SpeechRecognition.stopListening()
    setInterviewEnded(true)

    const technicalScore = Math.floor(Math.random() * 41) + 60 // 60-100
    const communicationScore = Math.floor(Math.random() * 41) + 60 // 60-100
    const problemSolvingScore = Math.floor(Math.random() * 41) + 60 // 60-100
    const overallScore = Math.floor((technicalScore + communicationScore + problemSolvingScore) / 3)

    setPerformanceScore({
      technical: technicalScore,
      communication: communicationScore,
      problemSolving: problemSolvingScore,
      overall: overallScore,
    })
  }

  if (!browserSupportsSpeechRecognition) {
    return <div className="text-white">Browser doesnt support speech recognition.</div>
  }

  if (interviewEnded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <h2 className="text-3xl font-bold mb-6 text-white">Interview Performance</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-white">Technical Skills</h3>
            <p className="text-2xl font-bold text-purple-500">{performanceScore?.technical}%</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-white">Communication</h3>
            <p className="text-2xl font-bold text-purple-500">{performanceScore?.communication}%</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-white">Problem Solving</h3>
            <p className="text-2xl font-bold text-purple-500">{performanceScore?.problemSolving}%</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-white">Overall Score</h3>
            <p className="text-3xl font-bold text-purple-500">{performanceScore?.overall}%</p>
          </div>
        </div>
        <button onClick={() => window.location.reload()} className="futuristic-button">
          Start New Interview
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 p-4 relative">
      {/* Stopwatch */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
        <Stopwatch />
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4">
        {/* Interviewer Side (Screen Recording) */}
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

        {/* User Camera Feed (using manual setup from the first code) */}
        <div className="w-full md:w-1/2 aspect-video relative rounded-lg overflow-hidden border border-purple-500/50">
          {cameraError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <p className="text-white text-center p-4 text-sm">{cameraError}</p>
            </div>
          ) : (
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          )}
        </div>
      </div>

      {/* Real-time Transcript Area */}
      <div className="mt-4 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-white font-semibold mb-2">Real-time Transcript:</h3>
        <p className="text-gray-300">{transcript}</p>
      </div>

      {/* User Response and Controls */}
      <div className="mt-4 flex gap-2">
        <textarea
          className="flex-grow p-2 bg-gray-800 text-white rounded-lg border border-purple-500/50 resize-none h-24"
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></textarea>
        <div className="flex flex-col gap-2">
          <button
            onClick={toggleListening}
            className={`futuristic-button ${listening ? "bg-red-500" : "bg-green-500"}`}
          >
            {listening ? "Stop Mic" : "Start Mic"}
          </button>
          <button onClick={generateQuestion} className="futuristic-button">
            Next Question
          </button>
          <button onClick={endInterview} className="futuristic-button bg-purple-500">
            End Interview
          </button>
        </div>
      </div>
    </div>
  )
}
