"use client"

export function Footer() {
  return (
    <footer
      className="h-[50px] border-t flex items-center justify-center transition-colors duration-300"
      style={{
        borderColor: "var(--text-tertiary)",
        backgroundColor: "var(--bg-tertiary)",
        color: "var(--text-tertiary)",
      }}
    >
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Aquanautic-Taucher Hamburg e.V. - Alle Rechte vorbehalten
      </p>
    </footer>
  )
}
