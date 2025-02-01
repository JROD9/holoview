"use client"  // Add this at the very top of your file

import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useSession, signIn } from "next-auth/react"
import React from "react"


const data = [
  { name: "Jan", users: 4000, interviews: 2400 },
  { name: "Feb", users: 3000, interviews: 1398 },
  { name: "Mar", users: 2000, interviews: 9800 },
  { name: "Apr", users: 2780, interviews: 3908 },
  { name: "May", users: 1890, interviews: 4800 },
  { name: "Jun", users: 2390, interviews: 3800 },
]

export default function Home() {
  const { status } = useSession()

  return (
    <div className="flex flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="w-full py-24 px-4 bg-gradient-to-b from-black to-purple-900">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 neon-purple">Master Your Interview Skills</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12">
            Practice with our AI-powered 3D interviews and get real-time feedback to improve your chances of landing
            your dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/interview/setup" className="futuristic-button inline-block">
              Start Practicing
            </Link>
            <Link href="/schedule" className="futuristic-button bg-transparent border border-purple-500 inline-block">
              Schedule Interview
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 px-4 bg-black">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center neon-purple">Why Choose HoloView?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="futuristic-panel">
              <h3 className="text-xl font-bold text-purple-400 mb-3">AI-Powered Questions</h3>
              <p className="text-gray-300">
                Get personalized interview questions based on your target role and experience level.
              </p>
            </div>
            <div className="futuristic-panel">
              <h3 className="text-xl font-bold text-purple-400 mb-3">3D Virtual Interviews</h3>
              <p className="text-gray-300">
                Practice with realistic 3D interviewers in a comfortable virtual environment.
              </p>
            </div>
            <div className="futuristic-panel">
              <h3 className="text-xl font-bold text-purple-400 mb-3">Instant Feedback</h3>
              <p className="text-gray-300">Receive real-time feedback on your responses and body language.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-16 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center neon-purple">Our Impact</h2>
          <div className="futuristic-panel">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="interviews" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="futuristic-panel text-center">
              <h3 className="text-4xl font-bold text-purple-400 mb-2">10,000+</h3>
              <p className="text-gray-300">Users Trained</p>
            </div>
            <div className="futuristic-panel text-center">
              <h3 className="text-4xl font-bold text-purple-400 mb-2">95%</h3>
              <p className="text-gray-300">Success Rate</p>
            </div>
            <div className="futuristic-panel text-center">
              <h3 className="text-4xl font-bold text-purple-400 mb-2">50+</h3>
              <p className="text-gray-300">Industry Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 px-4 bg-gradient-to-t from-black to-purple-900">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 neon-purple">Ready to Ace Your Next Interview?</h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of successful candidates who have improved their interview skills with HoloView.
          </p>
          {status === "authenticated" ? (
            <Link href="/interview/setup" className="futuristic-button text-lg px-8 py-3 inline-block">
              Get Started Now
            </Link>
          ) : (
            <button onClick={() => signIn("google")} className="futuristic-button text-lg px-8 py-3">
              Sign In to Get Started
            </button>
          )}
        </div>
      </section>
    </div>
  )
}

