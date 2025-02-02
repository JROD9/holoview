"use client"

import { useSession, signIn } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface InterviewRecord {
  id: string
  jobTitle: string
  date: string
  status: "completed" | "scheduled" | "cancelled"
  score?: number
}

export default function Profile() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [interviewHistory, setInterviewHistory] = useState<InterviewRecord[]>([])

  useEffect(() => {
    if (status === "authenticated") {
      // Mock data (replace with API call in production)
      setInterviewHistory([
        { id: "1", jobTitle: "Software Engineer", date: "2025-02-01", status: "completed", score: 85 },
        { id: "2", jobTitle: "Product Manager", date: "2025-02-15", status: "scheduled" },
        { id: "3", jobTitle: "Data Scientist", date: "2025-01-15", status: "completed", score: 92 },
      ])
    }
  }, [status])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-purple-500">Loading...</div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-bold mb-8 neon-purple">Profile Access</h1>
        <p className="text-xl text-gray-300 mb-8">Please sign in to view your profile</p>
        <button onClick={() => signIn("google")} className="futuristic-button text-lg px-8 py-3">
          Sign In
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Profile Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 neon-purple">Your Profile</h1>
        <p className="text-gray-400">{session?.user?.email}</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="futuristic-panel">
          <h3 className="text-lg font-semibold text-purple-400 mb-2">Total Interviews</h3>
          <p className="text-3xl font-bold neon-purple">{interviewHistory.length}</p>
        </div>
        <div className="futuristic-panel">
          <h3 className="text-lg font-semibold text-purple-400 mb-2">Average Score</h3>
          <p className="text-3xl font-bold neon-purple">
            {Math.round(
              interviewHistory
                .filter((interview) => interview.score)
                .reduce((acc, curr) => acc + (curr.score || 0), 0) /
                interviewHistory.filter((interview) => interview.score).length,
            )}
            %
          </p>
        </div>
        <div className="futuristic-panel">
          <h3 className="text-lg font-semibold text-purple-400 mb-2">Upcoming Interviews</h3>
          <p className="text-3xl font-bold neon-purple">
            {interviewHistory.filter((interview) => interview.status === "scheduled").length}
          </p>
        </div>
      </div>

      {/* Interview History */}
      <div className="futuristic-panel">
        <h2 className="text-2xl font-bold mb-6 neon-purple">Interview History</h2>
        <div className="space-y-4">
          {interviewHistory.map((interview) => (
            <div
              key={interview.id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-900/50 rounded-lg"
            >
              <div>
                <h3 className="font-semibold text-lg text-purple-400">{interview.jobTitle}</h3>
                <p className="text-gray-400">
                  {new Date(interview.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="mt-2 md:mt-0 flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    interview.status === "completed"
                      ? "bg-green-500/20 text-green-400"
                      : interview.status === "scheduled"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                </span>
                {interview.score && <span className="font-semibold text-purple-400">{interview.score}%</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/interview/setup" className="futuristic-button text-center">
          Start New Interview
        </Link>
        <Link href="/schedule" className="futuristic-button bg-transparent border border-purple-500 text-center">
          Schedule Interview
        </Link>
      </div>
    </div>
  )
}

