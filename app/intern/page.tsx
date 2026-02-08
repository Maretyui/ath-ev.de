"use client"

import { PageShell } from "@/components/page-shell"
import { useAuth } from "@/lib/auth-context"
import { useState } from "react"
import { MembersTable } from "@/components/intern/members-table"
import { MemberManagement } from "@/components/intern/member-management"
import { UserManagement } from "@/components/intern/user-management"
import { UserSettings } from "@/components/intern/user-settings"

function InternContent() {
  const { user, loading } = useAuth()
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
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--text-accent)" }}>Interner Bereich</h1>
          <p style={{ color: "var(--text-secondary)" }}>Bitte melden Sie sich an, um auf den internen Bereich zuzugreifen.</p>
        </div>
      </main>
    )
  }

  const isAdmin = user.role === "admin" || user.role === "manager"
  const isManager = user.role === "manager"

  const tabs = [
    { id: "members", label: "Mitgliederliste", show: true },
    { id: "manage-members", label: "Mitglieder verwalten", show: isAdmin },
    { id: "manage-users", label: "Benutzerverwaltung", show: isManager },
    { id: "settings", label: "Einstellungen", show: true },
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
        <div className="gradient-bg text-white p-8 rounded-2xl mb-8 text-center shadow-lg">
          <h1 className="text-4xl max-[800px]:text-3xl font-light mb-2">Interner Bereich</h1>
          <p className="text-xl opacity-90">
            Willkommen, {user.email} ({user.role})
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {tabs
            .filter((t) => t.show)
            .map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-5 py-3 rounded-lg font-semibold border-none cursor-pointer text-sm transition-all
                  ${activeTab === tab.id ? "btn-gradient text-white shadow-lg" : "text-white hover:opacity-80"}
                `}
                style={activeTab !== tab.id ? { backgroundColor: "var(--bg-teaser)", color: "var(--text-secondary)" } : {}}
              >
                {tab.label}
              </button>
            ))}
        </div>

        {activeTab === "members" && <MembersTable />}
        {activeTab === "manage-members" && isAdmin && <MemberManagement />}
        {activeTab === "manage-users" && isManager && <UserManagement />}
        {activeTab === "settings" && <UserSettings />}
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
