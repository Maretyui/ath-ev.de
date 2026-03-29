"use client"

import React from "react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"
import { AuthProvider } from "@/lib/auth-context"

interface PageShellProps {
  children: React.ReactNode
  showHero?: boolean
}

export function PageShell({ children, showHero = false }: PageShellProps) {
  return (
    <AuthProvider>
      <LoginModal />
      <div className="flex flex-col min-h-screen w-full bg-gradient-to-b from-cyan-50 via-white to-white">
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </div>
    </AuthProvider>
  )
}
