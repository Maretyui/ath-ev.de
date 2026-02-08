"use client"

import React from "react"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

export function AdminBar({ children }: { children?: React.ReactNode }) {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <div className="bg-[#2c3e50] text-white px-4 py-4 flex items-center justify-between sticky top-[67px] z-40 flex-wrap gap-3">
      <div>
        <strong>
          Angemeldet als {user.email} ({user.role}){" "}
          <Link href="/intern" className="text-white underline">
            Interner Bereich
          </Link>
        </strong>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        {children}
        <button
          onClick={logout}
          className="btn-gradient px-4 py-2 rounded-lg text-sm text-white font-semibold cursor-pointer border-none transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          Abmelden
        </button>
      </div>
    </div>
  )
}
