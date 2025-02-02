"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import AuthButton from "@/components/AuthButton"
import { useSession } from "next-auth/react"

export default function Schedule() {
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const router = useRouter()
  const { status } = useSession()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would integrate with Google Calendar API
    localStorage.setItem("interviewDate", date)
    localStorage.setItem("interviewTime", time)
    router.push("/Practice")
  }

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

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="py-20 px-4 geometric-pattern">
        <div className="container mx-auto relative">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center hero-text">Schedule Your Interview</h1>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              Choose a convenient time for your mock interview and get ready to shine!
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto futuristic-panel">
            <h2 className="text-2xl font-bold mb-6 text-center neon-purple-subtle">Select Your Interview Slot</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="date" className="block mb-2 text-sm font-medium text-white">
                  Select a date
                </label>
                <div className="relative">
                  <Calendar className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="time" className="block mb-2 text-sm font-medium text-white">
                  Select a time
                </label>
                <div className="relative">
                  <Clock className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="time"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5"
                    required
                  />
                </div>
              </div>
              <AuthButton onClick={handleSubmit} className="futuristic-button w-full group">
                Schedule Interview
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </AuthButton>
            </form>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 geometric-pattern">
        <div className="container mx-auto text-center relative">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 hero-text">Prepare for Success</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              After scheduling, take advantage of our practice sessions to hone your skills before the big day.
            </p>
            <AuthButton href="/Practice" className="futuristic-button text-lg px-8 py-3 group">
              Start Practicing Now
              <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </AuthButton>
          </div>
        </div>
      </section>
    </div>
  )
}

