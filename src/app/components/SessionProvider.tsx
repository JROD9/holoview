"use client"

import { SessionProvider as Provider } from "next-auth/react"
import type React from "react" // Import React

type Props = {
  children: React.ReactNode
  session: any
}

export default function SessionProvider({ children, session }: Props) {
  return <Provider session={session}>{children}</Provider>
}

