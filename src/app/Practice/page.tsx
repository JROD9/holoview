"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, BarChart2, BriefcaseIcon, Users } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import AuthButton from "@/components/AuthButton"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const interviewData = [
  { month: "Jan", interviews: 120, hires: 20 },
  { month: "Feb", interviews: 150, hires: 25 },
  { month: "Mar", interviews: 200, hires: 35 },
  { month: "Apr", interviews: 180, hires: 30 },
  { month: "May", interviews: 220, hires: 40 },
  { month: "Jun", interviews: 250, hires: 45 },
]

const skillsData = [
  { name: "Communication", value: 30 },
  { name: "Technical", value: 25 },
  { name: "Problem Solving", value: 20 },
  { name: "Leadership", value: 15 },
  { name: "Adaptability", value: 10 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"]

export default function PracticePage() {
  const [isClient, setIsClient] = useState(false)
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center hero-text">Master Your Interview Skills</h1>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              Our AI-powered practice sessions and personalized feedback will help you ace your next interview and land
              your dream job.
            </p>
            <div className="flex justify-center">
              <AuthButton href="/interview/setup" className="futuristic-button group text-lg">
                Start Interview
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </AuthButton>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center neon-purple-subtle">How We Help You Succeed</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="futuristic-panel">
              <BriefcaseIcon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">Tailored Practice</h3>
              <p className="text-gray-400">
                Our AI generates interview questions specific to your industry and experience level, ensuring
                you&apos;re prepared for anything.
              </p>
            </div>
            <div className="futuristic-panel">
              <BarChart2 className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">Performance Analytics</h3>
              <p className="text-gray-400">
                Get detailed insights into your performance, including areas of strength and opportunities for
                improvement.
              </p>
            </div>
            <div className="futuristic-panel">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">Expert Feedback</h3>
              <p className="text-gray-400">
                Receive personalized feedback from AI and industry professionals to refine your interview skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 geometric-pattern">
        <div className="container mx-auto relative">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative">
            <h2 className="text-3xl font-bold mb-12 text-center neon-purple-subtle">Our Impact</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="futuristic-panel">
                <h3 className="text-2xl font-bold mb-6 text-center">Interview Success Rate</h3>
                {isClient && (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={interviewData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "1px solid rgba(var(--neon-purple), 0.2)",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="interviews"
                        stroke="rgba(var(--neon-purple), 0.8)"
                        name="Interviews"
                      />
                      <Line type="monotone" dataKey="hires" stroke="#4CAF50" name="Hires" />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div className="futuristic-panel">
                <h3 className="text-2xl font-bold mb-6 text-center">Skills Improved</h3>
                {isClient && (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={skillsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {skillsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center neon-purple-subtle">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="futuristic-panel">
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="User Avatar"
                width={100}
                height={100}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-400 mb-4">
                &ldquo;Thanks to HoloView, I felt confident and well-prepared for my interview. I landed my dream job at
                a top tech company!&rdquo;
              </p>
              <p className="font-bold">Sarah T. - Software Engineer</p>
            </div>
            <div className="futuristic-panel">
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="User Avatar"
                width={100}
                height={100}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-400 mb-4">
                &ldquo;The personalized feedback I received helped me identify and improve my weaknesses. It made all
                the difference in my interviews.&rdquo;
              </p>
              <p className="font-bold">Michael R. - Product Manager</p>
            </div>
            <div className="futuristic-panel">
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="User Avatar"
                width={100}
                height={100}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-400 mb-4">
                &ldquo;I was nervous about technical interviews, but HoloView&apos;s practice sessions boosted my
                confidence. I aced my interviews!&rdquo;
              </p>
              <p className="font-bold">Emily L. - Data Scientist</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 geometric-pattern">
        <div className="container mx-auto text-center relative">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 hero-text">Ready to Ace Your Next Interview?</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of successful candidates who have improved their interview skills with HoloView.
            </p>
            <AuthButton href="/interview/setup" className="futuristic-button text-lg px-8 py-3 group">
              Start Your Journey
              <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </AuthButton>
          </div>
        </div>
      </section>
    </div>
  )
}

