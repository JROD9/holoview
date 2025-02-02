"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { ArrowRight } from "lucide-react"

export default function SetupInterview() {
  const [jobTitle, setJobTitle] = useState("")
  const [difficulty, setDifficulty] = useState("medium")
  const router = useRouter()
  const { status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-purple-500">Loading...</div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    router.push("/Login")
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store interview settings
    localStorage.setItem("interviewJobTitle", jobTitle)
    localStorage.setItem("interviewDifficulty", difficulty)
    router.push("/interview/practice")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="py-20 px-4 geometric-pattern">
        <div className="container mx-auto relative">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center hero-text">Set Up Your Interview</h1>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              Customize your interview experience to match your career goals.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto futuristic-panel">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="jobTitle" className="block mb-2 text-lg font-medium text-white">
                  What job are you preparing for?
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white text-lg rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-4"
                  placeholder="e.g. Software Engineer, Product Manager"
                  required
                />
              </div>
              <div>
                <label htmlFor="difficulty" className="block mb-2 text-lg font-medium text-white">
                  Select interview difficulty
                </label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white text-lg rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-4"
                >
                  <option value="easy">Easy - Entry Level</option>
                  <option value="medium">Medium - Mid Level</option>
                  <option value="hard">Hard - Senior Level</option>
                </select>
              </div>
              <button type="submit" className="futuristic-button w-full group text-lg">
                Start Interview
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

