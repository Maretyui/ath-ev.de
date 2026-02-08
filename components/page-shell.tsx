"use client"

import React from "react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AdminBar } from "@/components/admin-bar"
import { LoginModal } from "@/components/login-modal"
import { AuthProvider } from "@/lib/auth-context"

interface PageShellProps {
  children: React.ReactNode
  backgroundImage?: string
  adminBarChildren?: React.ReactNode
}

export function PageShell({ children, backgroundImage = "/quallen.png", adminBarChildren }: PageShellProps) {
  return (
    <AuthProvider>
      <LoginModal />
      <div
        className="flex flex-col min-h-screen w-full bg-cover bg-no-repeat"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        <Navbar />
        <AdminBar>{adminBarChildren}</AdminBar>
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <Footer />
      </div>
    </AuthProvider>
  )
}
