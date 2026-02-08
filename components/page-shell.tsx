"use client"

import React from "react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"
import { AuthProvider } from "@/lib/auth-context"

interface PageShellProps {
  children: React.ReactNode
  backgroundImage?: string
}

export function PageShell({ children, backgroundImage = "/quallen.png" }: PageShellProps) {
  return (
    <AuthProvider>
      <LoginModal />
      <div
        className="flex flex-col min-h-screen w-full bg-cover bg-no-repeat"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </div>
    </AuthProvider>
  )
}
