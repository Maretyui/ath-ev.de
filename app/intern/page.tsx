"use client"

import { PageShell } from "@/components/page-shell"
import { useAuth } from "@/lib/auth-context"
import { useState } from "react"
import { MembersTable } from "@/components/intern/members-table"
import { MemberManagement } from "@/components/intern/member-management"
import { UserManagement } from "@/components/intern/user-management"
import { UserSettings } from "@/components/intern/user-settings"
import { NewsManagement } from "@/components/intern/news-management"
import { TermineManagement } from "@/components/intern/termine-management"

function InternContent() {
  const { user, loading, setShowLogin } = useAuth()
  const [activeTab, setActiveTab] = useState("members")

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <p style={{ color: "var(--text-secondary)" }}>Laden...</p>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="flex-1 flex items-center justify-center" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="text-center max-w-md px-8">
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
            style={{ backgroundColor: "var(--blue-accent)" }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            Interner Bereich
          </h1>
          <p className="mb-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Dieser Bereich ist nur fuer angemeldete Mitglieder zugaenglich. Bitte melden Sie sich an.
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="btn-gradient px-8 py-3 rounded-lg text-white font-semibold border-none cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg text-base"
          >
            Anmelden
          </button>
        </div>
      </main>
    )
  }

  const isAdmin = user.role === "admin" || user.role === "manager"
  const isManager = user.role === "manager"

  const tabs = [
    { id: "members", label: "Mitglieder", icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75", show: true },
    { id: "manage-members", label: "Mitglieder verwalten", icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM19 8v6M22 11h-6", show: isAdmin },
    { id: "news", label: "News verwalten", icon: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2M18 14h-8M15 18h-5M10 6h8", show: isAdmin },
    { id: "termine", label: "Termine verwalten", icon: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", show: isAdmin },
    { id: "manage-users", label: "Benutzer", icon: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z", show: isManager },
    { id: "settings", label: "Einstellungen", icon: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", show: true },
  ]

  return (
    <main
      className="flex-1 border-t-2 backdrop-blur-xl"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="max-w-[1400px] mx-auto p-5">
        {/* Header */}
        <div
          className="p-6 rounded-2xl mb-6 flex items-center justify-between flex-wrap gap-4"
          style={{
            backgroundColor: "var(--bg-teaser)",
            borderColor: "var(--border-color)",
            border: "1px solid var(--border-color)",
          }}
        >
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
              Interner Bereich
            </h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Angemeldet als <span className="font-semibold" style={{ color: "var(--blue-accent)" }}>{user.email}</span>
              <span
                className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: user.role === "manager" ? "#7c3aed" : user.role === "admin" ? "var(--blue-accent)" : "var(--text-tertiary)",
                  color: "#ffffff",
                }}
              >
                {user.role}
              </span>
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs
            .filter((t) => t.show)
            .map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium border-none cursor-pointer text-sm transition-all
                  ${activeTab === tab.id ? "shadow-lg" : "hover:opacity-80"}
                `}
                style={
                  activeTab === tab.id
                    ? { backgroundColor: "var(--blue-accent)", color: "#ffffff" }
                    : { backgroundColor: "var(--bg-teaser)", color: "var(--text-secondary)", border: "1px solid var(--border-color)" }
                }
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={tab.icon} />
                </svg>
                <span className="max-[600px]:hidden">{tab.label}</span>
              </button>
            ))}
        </div>

        {/* Tab Content */}
        <div
          className="rounded-2xl p-6 max-[600px]:p-4 border"
          style={{
            backgroundColor: "var(--bg-teaser)",
            borderColor: "var(--border-color)",
          }}
        >
          {activeTab === "members" && <MembersTable />}
          {activeTab === "manage-members" && isAdmin && <MemberManagement />}
          {activeTab === "news" && isAdmin && <NewsManagement />}
          {activeTab === "termine" && isAdmin && <TermineManagement />}
          {activeTab === "manage-users" && isManager && <UserManagement />}
          {activeTab === "settings" && <UserSettings />}
        </div>
      </div>
    </main>
  )
}

export default function InternPage() {
  return (
    <PageShell>
      <InternContent />
    </PageShell>
  )
}
