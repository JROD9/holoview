"use client"

import { useEffect, useRef } from "react"
import AuthButton from "../components/AuthButton"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ArrowDown, Brain, Target, Clock, Users, Award, ChevronRight } from "lucide-react"

const data = [
  { name: "Jan", users: 4000, interviews: 2400 },
  { name: "Feb", users: 3000, interviews: 1398 },
  { name: "Mar", users: 2000, interviews: 9800 },
  { name: "Apr", users: 2780, interviews: 3908 },
  { name: "May", users: 1890, interviews: 4800 },
  { name: "Jun", users: 2390, interviews: 3800 },
]

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".reveal-on-scroll").forEach((element) => {
      observerRef.current?.observe(element)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <div className="flex flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="w-full min-h-[90vh] flex items-center justify-center relative geometric-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="hero-text mb-6">
              Master Your
              <br />
              Interview Skills
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Practice with our AI-powered 3D interviews and get real-time feedback to improve your chances of landing
              your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AuthButton href="/interview/setup" className="futuristic-button group">
                Start Practicing
                <ChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </AuthButton>
              <AuthButton href="/schedule" className="futuristic-button">
                Schedule Interview
              </AuthButton>
            </div>
            <div className="pt-12 animate-bounce">
              <ArrowDown className="mx-auto w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-24 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center neon-purple-subtle">Why Choose HoloView?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="futuristic-panel reveal-on-scroll">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white">AI-Powered Questions</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Get personalized interview questions based on your target role and experience level.
              </p>
            </div>
            <div className="futuristic-panel reveal-on-scroll" style={{ transitionDelay: "0.2s" }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white">3D Virtual Interviews</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Practice with realistic 3D interviewers in a comfortable virtual environment.
              </p>
            </div>
            <div className="futuristic-panel reveal-on-scroll" style={{ transitionDelay: "0.4s" }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white">Instant Feedback</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Receive real-time feedback on your responses and body language.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-24 px-4 geometric-pattern">
        <div className="container mx-auto relative">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center neon-purple-subtle">Our Impact</h2>
            <div className="futuristic-panel mb-12 reveal-on-scroll">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(var(--neon-purple), 0.2)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="rgba(var(--neon-purple), 0.8)" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="interviews" stroke="#4CAF50" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="futuristic-panel text-center reveal-on-scroll">
                <Users className="w-8 h-8 mx-auto mb-4 text-primary" />
                <h3 className="text-4xl font-bold text-white mb-2">10,000+</h3>
                <p className="text-gray-400">Users Trained</p>
              </div>
              <div className="futuristic-panel text-center reveal-on-scroll" style={{ transitionDelay: "0.2s" }}>
                <Award className="w-8 h-8 mx-auto mb-4 text-primary" />
                <h3 className="text-4xl font-bold text-white mb-2">95%</h3>
                <p className="text-gray-400">Success Rate</p>
              </div>
              <div className="futuristic-panel text-center reveal-on-scroll" style={{ transitionDelay: "0.4s" }}>
                <Target className="w-8 h-8 mx-auto mb-4 text-primary" />
                <h3 className="text-4xl font-bold text-white mb-2">50+</h3>
                <p className="text-gray-400">Industry Partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 px-4 geometric-pattern">
        <div className="container mx-auto text-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/90 backdrop-blur-sm" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 hero-text">Ready to Ace Your Next Interview?</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of successful candidates who have improved their interview skills with HoloView.
            </p>
            <AuthButton href="/interview/setup" className="futuristic-button text-lg px-8 py-3 group">
              Get Started Now
              <ChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </AuthButton>
          </div>
        </div>
      </section>
    </div>
  )
}

