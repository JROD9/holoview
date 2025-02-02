"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface CareerOutlook {
  year: number
  employment: number
  medianPay: number
}

interface JobResource {
  name: string
  url: string
  description: string
}

interface InterviewReport {
  id: string
  jobTitle: string
  date: string
  overallScore: number
  strengths: string[]
  areasForImprovement: string[]
}

export default function Profile() {
  const [careerOutlook, setCareerOutlook] = useState<CareerOutlook[]>([])
  const [jobResources, setJobResources] = useState<JobResource[]>([])
  const [interviewReports, setInterviewReports] = useState<InterviewReport[]>([])

  useEffect(() => {
    // Mock data for career outlook (simulating data from Bureau of Labor Statistics)
    setCareerOutlook([
      { year: 2022, employment: 1622200, medianPay: 109020 },
      { year: 2023, employment: 1659600, medianPay: 112180 },
      { year: 2024, employment: 1697800, medianPay: 115340 },
      { year: 2025, employment: 1736000, medianPay: 118500 },
      { year: 2026, employment: 1774200, medianPay: 121660 },
    ])

    // Mock data for job resources
    setJobResources([
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/jobs/",
        description: "Professional networking and job search platform",
      },
      {
        name: "Indeed",
        url: "https://www.indeed.com/",
        description: "Comprehensive job search engine",
      },
      {
        name: "Glassdoor",
        url: "https://www.glassdoor.com/Job/index.htm",
        description: "Job listings with company reviews and salary information",
      },
      {
        name: "Stack Overflow Jobs",
        url: "https://stackoverflow.com/jobs",
        description: "Tech-focused job board for developers",
      },
    ])

    // Mock data for interview reports
    setInterviewReports([
      {
        id: "1",
        jobTitle: "Senior Software Engineer",
        date: "2025-03-15",
        overallScore: 85,
        strengths: ["Technical knowledge", "Problem-solving skills", "System design"],
        areasForImprovement: ["Communication of complex ideas", "Behavioral question responses"],
      },
      {
        id: "2",
        jobTitle: "Product Manager",
        date: "2025-02-28",
        overallScore: 78,
        strengths: ["Product vision", "User empathy", "Market analysis"],
        areasForImprovement: ["Technical depth", "Data-driven decision making"],
      },
    ])
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Profile Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 neon-purple">Your Profile</h1>
        <p className="text-gray-400">user@example.com</p>
      </div>

      {/* Career Outlook Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 neon-purple">Career Outlook for Software Developers</h2>
        <div className="futuristic-panel">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={careerOutlook}>
              <XAxis dataKey="year" stroke="#fff" />
              <YAxis yAxisId="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
              <Line yAxisId="left" type="monotone" dataKey="employment" stroke="#8884d8" name="Employment" />
              <Line yAxisId="right" type="monotone" dataKey="medianPay" stroke="#82ca9d" name="Median Pay ($)" />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-400 mt-4">
            Source: Bureau of Labor Statistics (Projected data for Software Developers)
          </p>
        </div>
      </section>

      {/* Job Search Resources Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 neon-purple">Job Search Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobResources.map((resource) => (
            <a
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="futuristic-panel hover:bg-purple-900/30 transition-colors"
            >
              <h3 className="text-lg font-semibold text-purple-400 mb-2">{resource.name}</h3>
              <p className="text-sm text-gray-400">{resource.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Interview Reports Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 neon-purple">Your Interview Reports</h2>
        <div className="space-y-4">
          {interviewReports.map((report) => (
            <div key={report.id} className="futuristic-panel">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-purple-400">{report.jobTitle}</h3>
                  <p className="text-sm text-gray-400">
                    {new Date(report.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-purple-400">Overall Score</p>
                  <p className="text-2xl font-bold neon-purple">{report.overallScore}%</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-green-400 mb-2">Strengths</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {report.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">Areas for Improvement</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {report.areasForImprovement.map((area, index) => (
                      <li key={index}>{area}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

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

