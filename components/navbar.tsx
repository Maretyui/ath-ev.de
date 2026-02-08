"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/lib/auth-context"

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
      className="flex items-center justify-between sticky top-0 z-50"
      style={{
        padding: "1.25rem 3.1rem",
        backgroundColor: "var(--bg-nav)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Link
        href="/"
        className="no-underline"
        style={{
          fontSize: "1.9rem",
          fontWeight: 300,
          letterSpacing: "2px",
          textTransform: "uppercase",
          background: "linear-gradient(45deg, #3d6fef, #e040bf)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        ATH-EV
      </Link>

      <ul
        className={`
          flex list-none m-0 p-0 relative items-center
          max-[1000px]:fixed max-[1000px]:top-0 max-[1000px]:h-screen max-[1000px]:w-[70%] max-[1000px]:max-w-[300px]
          max-[1000px]:flex-col max-[1000px]:items-center max-[1000px]:justify-center max-[1000px]:gap-8
          max-[1000px]:z-[1000] max-[1000px]:backdrop-blur-xl
          max-[1000px]:border-l max-[1000px]:border-white/10
          max-[1000px]:transition-[right] max-[1000px]:duration-300
          ${mobileOpen ? "max-[1000px]:right-0" : "max-[1000px]:right-[-100%]"}
        `}
        style={{
          gap: "40px",
        }}
        data-mobile-nav
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="no-underline transition-colors duration-300"
                style={{
                  fontSize: "1.5rem",
                  fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
                  fontWeight: 300,
                  ...(isActive
                    ? {
                        background: "linear-gradient(45deg, #3d6fef, #e040bf)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        paddingBottom: "2px",
                        borderBottom: "2px solid",
                        borderImage: "linear-gradient(to right, #3d6fef, #e040bf) 1",
                      }
                    : {
                        color: "var(--nav-text)",
                      }),
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.target as HTMLElement).style.color = "var(--nav-text-hover)"
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.target as HTMLElement).style.color = "var(--nav-text)"
                }}
              >
                {item.label}
              </Link>
            </li>
          )
        })}

        {/* Auth actions in nav */}
        <li>
          {user ? (
            <div className="flex items-center gap-3 max-[1000px]:flex-col">
              <Link
                href="/intern"
                onClick={() => setMobileOpen(false)}
                className="no-underline transition-colors duration-300 text-sm font-medium px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: "var(--blue-accent)",
                  color: "#ffffff",
                }}
              >
                Intern
              </Link>
              <button
                onClick={() => {
                  logout()
                  setMobileOpen(false)
                }}
                className="bg-transparent border-none cursor-pointer transition-colors duration-300 text-sm font-medium px-3 py-2 rounded-lg"
                style={{ color: "var(--nav-text)" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--nav-text-hover)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--nav-text)")}
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
              className="bg-transparent border-none cursor-pointer transition-colors duration-300"
              style={{
                fontSize: "1.5rem",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
                fontWeight: 300,
                color: "var(--nav-text)",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--nav-text-hover)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--nav-text)")}
            >
              Login
            </button>
          )}
        </li>
      </ul>

      {/* Mobile hamburger menu */}
      <button
        className="hidden max-[1000px]:flex flex-col cursor-pointer z-[1001] bg-transparent border-none p-0"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
      >
        <span
          className="block w-[25px] h-[3px] my-[3px] transition-transform duration-300 origin-center"
          style={{
            backgroundColor: "var(--text-primary)",
            transform: mobileOpen ? "rotate(45deg) translate(6px, 6px)" : "none",
          }}
        />
        <span
          className="block w-[25px] h-[3px] my-[3px] transition-opacity duration-300"
          style={{
            backgroundColor: "var(--text-primary)",
            opacity: mobileOpen ? 0 : 1,
          }}
        />
        <span
          className="block w-[25px] h-[3px] my-[3px] transition-transform duration-300 origin-center"
          style={{
            backgroundColor: "var(--text-primary)",
            transform: mobileOpen ? "rotate(-45deg) translate(7px, -6px)" : "none",
          }}
        />
      </button>
    </nav>
  )
}
