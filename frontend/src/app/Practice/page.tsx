"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"
import Stopwatch from "./Stopwatch"
import CameraFeed from "./CameraFeed"
import axios from 'axios';

const SpeechRecognitionModule = dynamic(() => import("react-speech-recognition"), { ssr: false })

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
<<<<<<< HEAD
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
=======
  const [interviewEnded, setInterviewEnded] = useState(false)
  const [performanceScore, setPerformanceScore] = useState<PerformanceScore | null>(null)
>>>>>>> c2c9da458ddbfd096070817f05733ee4c5e95e6d
  const interviewerVideoRef = useRef<HTMLVideoElement>(null)
  const [isBrowserSupported, setIsBrowserSupported] = useState(true)
  const [transcript, setTranscript] = useState("")
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const response = await axios.get("http://localhost:8080/get-prompt/");
        setTranscript(response.data); // Set fetched data as transcript
      } catch (error) {
        console.error("Error fetching prompt:", error);
      }
    }
    fetchPrompt();
    let recognition: any 


    const setupSpeechRecognition = async () => {
      const SpeechRecognition = (await SpeechRecognitionModule).default
      const { useSpeechRecognition } = await SpeechRecognitionModule

      if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        setIsBrowserSupported(false)
        return
      }

      recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true

      recognition.onresult = (event: any) => {
        let interimTranscript = ""
        let finalTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          } else {
            interimTranscript += event.results[i][0].transcript
          }
        }

        setTranscript(finalTranscript + interimTranscript)
      }
    }

    setupSpeechRecognition()

    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  },[])

  const generateQuestion = useCallback(() => {
    setQuestion(`Tell me about your experience with ${jobTitle} related projects.`)
    setAnswer("")
    setTranscript("")
  }, [jobTitle])

  useEffect(() => {
    setJobTitle(searchParams.get("job") || "Software Engineer")
    setDifficulty(searchParams.get("difficulty") || "medium")
  }, [searchParams])

  useEffect(() => {
    if (jobTitle && difficulty) {
      generateQuestion()
    }
  }, [jobTitle, difficulty, generateQuestion])

  useEffect(() => {
    if (interviewerVideoRef.current) {
      interviewerVideoRef.current.play()
    }
    return () => {}
  }, [])

<<<<<<< HEAD
  // const toggleListening = async () => {
  //   const SpeechRecognition = (await SpeechRecognitionModule).default
  //   if (isListening) {
  //     SpeechRecognition.stopListening()
  //   } else {
  //     SpeechRecognition.startListening({ continuous: true })
  //   }
  //   setIsListening(!isListening)
  // }
=======
<<<<<<< HEAD
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
=======
  const toggleListening = async () => {
    const SpeechRecognition = (await SpeechRecognitionModule).default
    if (isListening) {
      SpeechRecognition.stopListening()
    } else {
      SpeechRecognition.startListening({ continuous: true })
    }
    setIsListening(!isListening)
  }
>>>>>>> 758df19da5afc7e5a3e29b3b38ca3ecdffb98a9f

  const endInterview = () => {
    setIsListening(false)
    setInterviewEnded(true)

    // Generate mock performance scores
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

  if (!isBrowserSupported) {
    return <div className="text-white">Browser doesn&apos;t support speech recognition.</div>
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
>>>>>>> c2c9da458ddbfd096070817f05733ee4c5e95e6d
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
          <CameraFeed />
        </div>
      </div>

<<<<<<< HEAD
      <div className="mt-4">
=======
      {/* Transcript Area */}
      <div className="mt-4 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-white font-semibold mb-2">Real-time Transcript:</h3>
        <p className="text-gray-300">{transcript}</p>
      </div>

      {/* User Response Area */}
      <div className="mt-4 flex gap-2">
>>>>>>> c2c9da458ddbfd096070817f05733ee4c5e95e6d
        <textarea
          className="flex-grow p-2 bg-gray-800 text-white rounded-lg border border-purple-500/50 resize-none h-24"
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></textarea>
<<<<<<< HEAD
        <button 
          onClick={generateQuestion} 
          className="mt-2 futuristic-button"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Next Question'}
        </button>
=======
        <div className="flex flex-col gap-2">
          <button
            onClick={toggleListening}
            className={`futuristic-button ${isListening ? "bg-red-500" : "bg-green-500"}`}
          >
            {isListening ? "Stop Mic" : "Start Mic"}
          </button>
          <button onClick={generateQuestion} className="futuristic-button">
            Next Question
          </button>
          <button onClick={endInterview} className="futuristic-button bg-purple-500">
            End Interview
          </button>
        </div>
>>>>>>> c2c9da458ddbfd096070817f05733ee4c5e95e6d
      </div>
    </div>
  )
}