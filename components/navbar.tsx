"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/lib/auth-context"
import { Waves, Menu, X } from "lucide-react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/ausbildung", label: "Ausbildung" },
  { href: "/tauchspots", label: "Tauchspots" },
  { href: "/termine", label: "Termine" },
  { href: "/links", label: "Links" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const { user, setShowLogin, logout } = useAuth()

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return (
    <nav
      ref={navRef}
      className="flex items-center justify-between sticky top-0 z-50 px-6 py-4 md:px-12 bg-white/95 backdrop-blur-md border-b border-cyan-100 shadow-sm"
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 no-underline group"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-400 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
          <Waves className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-slate-800 tracking-tight">
          ATH<span className="text-cyan-600">.</span>
        </span>
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? "bg-cyan-50 text-cyan-700" 
                    : "text-slate-600 hover:text-cyan-700 hover:bg-cyan-50/50"
                  }`}
              >
                {item.label}
              </Link>
            </li>
          )
        })}

        {/* Auth actions */}
        <li className="ml-4 pl-4 border-l border-slate-200">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/intern"
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-400 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                Intern
              </Link>
              <button
                onClick={() => logout()}
                className="px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
              >
                Abmelden
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="px-4 py-2 text-sm font-medium text-cyan-700 hover:bg-cyan-50 rounded-lg transition-colors"
            >
              Login
            </button>
          )}
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-2 rounded-lg hover:bg-cyan-50 transition-colors"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
      >
        {mobileOpen ? (
          <X className="w-6 h-6 text-slate-700" />
        ) : (
          <Menu className="w-6 h-6 text-slate-700" />
        )}
      </button>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed inset-0 top-[73px] bg-white/98 backdrop-blur-lg z-50 transition-all duration-300 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <ul className="flex flex-col p-6 gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-lg font-medium transition-all
                    ${isActive 
                      ? "bg-cyan-50 text-cyan-700" 
                      : "text-slate-600 hover:text-cyan-700 hover:bg-cyan-50/50"
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}

          <li className="mt-4 pt-4 border-t border-slate-100">
            {user ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/intern"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 bg-gradient-to-r from-cyan-500 to-teal-400 text-white text-center text-lg font-medium rounded-xl shadow-md"
                >
                  Intern
                </Link>
                <button
                  onClick={() => {
                    logout()
                    setMobileOpen(false)
                  }}
                  className="px-4 py-3 text-lg font-medium text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Abmelden
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowLogin(true)
                  setMobileOpen(false)
                }}
                className="w-full px-4 py-3 text-lg font-medium text-cyan-700 bg-cyan-50 rounded-xl transition-colors"
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}
