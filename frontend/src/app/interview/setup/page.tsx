"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import React from "react"

export default function SetupInterview() {
  const [jobTitle, setJobTitle] = useState("")
  const [difficulty, setDifficulty] = useState("medium")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store interview settings
    localStorage.setItem("interviewJobTitle", jobTitle)
    localStorage.setItem("interviewDifficulty", difficulty)
    router.push("/interview/practice")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Set Up Your Interview</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-6">
          <label htmlFor="jobTitle" className="block mb-2 text-sm font-medium text-white">
            What job are you preparing for?
          </label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="difficulty" className="block mb-2 text-sm font-medium text-white">
            Select interview difficulty
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
          Start Interview
        </button>
      </form>
    </div>
  )
}

