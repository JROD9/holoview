"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import type React from "react"

interface AuthButtonProps {
  href?: string
  onClick?: () => void
  className?: string
  children: React.ReactNode
}

export default function AuthButton({ href, onClick, className, children }: AuthButtonProps) {
  const { status } = useSession()
  const router = useRouter()

  const handleClick = () => {
    if (status === "authenticated") {
      if (href) {
        router.push(href)
      } else if (onClick) {
        onClick()
      }
    } else {
      router.push("/Login")
    }
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}

