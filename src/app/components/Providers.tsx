"use client"

import { SessionProvider } from "next-auth/react"
import React from "react"

type Props = {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  )
}

