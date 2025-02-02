"use client"

import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"

export default function Header() {
  const { status } = useSession()

  return (
    <header className="bg-black p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-purple-500">
          HoloView
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/interview/setup" className="text-white hover:text-purple-500">
            Practice
          </Link>
          <Link href="/schedule" className="text-white hover:text-purple-500">
            Schedule
          </Link>
          <Link href="/profile" className="text-white hover:text-purple-500">
            Profile
          </Link>
          {status === "loading" ? (
            <span className="text-white">Loading...</span>
          ) : status === "authenticated" ? (
            <button onClick={() => signOut()} className="futuristic-button bg-transparent border border-purple-500">
              Sign Out
            </button>
          ) : (
            <button onClick={() => signIn("google")} className="futuristic-button">
              Sign In
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}

