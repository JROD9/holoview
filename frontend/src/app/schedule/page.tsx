"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Schedule() {
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would integrate with Google Calendar API
    localStorage.setItem("interviewDate", date)
    localStorage.setItem("interviewTime", time)
    router.push("/interview/practice")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Schedule Your Interview</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-6">
          <label htmlFor="date" className="block mb-2 text-sm font-medium text-white">
            Select a date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="time" className="block mb-2 text-sm font-medium text-white">
            Select a time
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
          Schedule Interview
        </button>
      </form>
    </div>
  )
}

