"use client"

import { useState } from "react"
import { Upload, ArrowRight } from "lucide-react"
import AuthButton from "@/components/AuthButton"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function ResumeBuilder() {
  const [jobTitle, setJobTitle] = useState("")
  const [atsScore, setAtsScore] = useState<number | null>(null)
  const [improvements, setImprovements] = useState<Array<{ category: string; items: string[] }>>([])
  const [mergedResume, setMergedResume] = useState<string | null>(null)

  const { status } = useSession()
  const router = useRouter()

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implement file upload logic
    console.log("File uploaded:", event.target.files[0])
  }

  const handleAtsAnalysis = () => {
    // TODO: Implement ATS analysis logic
    // This is a mock implementation
    setAtsScore(85)
    setImprovements([
      {
        category: "Keywords",
        items: ["Add more industry-specific terms", "Include relevant certifications", "Mention key technologies"],
      },
      {
        category: "Formatting",
        items: ["Use a single-column layout", "Ensure consistent font usage", "Limit to 1-2 pages"],
      },
      {
        category: "Content",
        items: [
          "Quantify achievements with metrics",
          "Tailor experience to job description",
          "Include a strong summary statement",
        ],
      },
    ])
  }

  const handleMergeResumes = () => {
    // TODO: Implement resume merging logic
    // This is a mock implementation
    setMergedResume("Merged resume content in LaTeX format...")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="py-20 px-4 geometric-pattern">
        <div className="container mx-auto relative">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center hero-text">Resume Builder & Analyzer</h1>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              Create, analyze, and optimize your resume to stand out from the competition and land your dream job.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="futuristic-panel">
              <h2 className="text-2xl font-bold mb-6">Upload & Analyze Resume</h2>
              <div className="mb-4">
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-400 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Enter the job title you're applying for"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="resumeUpload" className="block text-sm font-medium text-gray-400 mb-2">
                  Upload Resume
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="resumeUpload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOCX, or TXT (MAX. 5MB)</p>
                    </div>
                    <input id="resumeUpload" type="file" className="hidden" onChange={handleFileUpload} />
                  </label>
                </div>
              </div>
              <button onClick={handleAtsAnalysis} className="futuristic-button w-full">
                Analyze Resume
              </button>
            </div>
            <div className="futuristic-panel">
              <h2 className="text-2xl font-bold mb-6">ATS Analysis Results</h2>
              {atsScore !== null ? (
                <>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">ATS Compatibility Score</h3>
                    <div className="w-full bg-gray-700 rounded-full h-4">
                      <div className="bg-primary h-4 rounded-full" style={{ width: `${atsScore}%` }}></div>
                    </div>
                    <p className="text-right mt-2">{atsScore}%</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Areas for Improvement</h3>
                    {improvements.map((category, index) => (
                      <div key={index} className="mb-4">
                        <h4 className="text-lg font-medium mb-2">{category.category}</h4>
                        <ul className="list-disc list-inside">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-gray-400">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-400">Upload your resume and click Analyze Resume to see results.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 geometric-pattern">
        <div className="container mx-auto relative">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative">
            <h2 className="text-3xl font-bold mb-12 text-center neon-purple-subtle">Resume Merger</h2>
            <div className="futuristic-panel">
              <h3 className="text-2xl font-bold mb-6">Merge Multiple Resumes</h3>
              <p className="text-gray-400 mb-6">
                Upload multiple resumes and merge them into a single, comprehensive LaTeX file.
              </p>
              <div className="mb-6">
                <label htmlFor="multipleResumes" className="block text-sm font-medium text-gray-400 mb-2">
                  Upload Resumes
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="multipleResumes"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">Multiple PDF, DOCX, or TXT files</p>
                    </div>
                    <input id="multipleResumes" type="file" className="hidden" multiple onChange={handleFileUpload} />
                  </label>
                </div>
              </div>
              <button onClick={handleMergeResumes} className="futuristic-button w-full">
                Merge Resumes
              </button>
              {mergedResume && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-2">Merged Resume (LaTeX)</h4>
                  <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                    <code>{mergedResume}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 hero-text">Optimize Your Resume Today</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Use our powerful tools to create a standout resume that will impress recruiters and pass ATS scans.
          </p>
          <AuthButton href="https://www.overleaf.com" className="futuristic-button text-lg px-8 py-3 group">
            Start Building Your Resume
            <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
          </AuthButton>
        </div>
      </section>
    </div>
  )
}

