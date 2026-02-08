import { NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { query } from "@/lib/db"
import bcrypt from "bcryptjs"

interface AdminUser {
  id: number
  password_hash: string
}

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 })
    }

    const { currentPassword, newPassword } = await request.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Alle Felder sind erforderlich" }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "Passwort muss mindestens 6 Zeichen lang sein" }, { status: 400 })
    }

    const users = await query<AdminUser>("SELECT id, password_hash FROM admin_users WHERE id = ?", [session.userId])
    if (users.length === 0) {
      return NextResponse.json({ error: "Benutzer nicht gefunden" }, { status: 404 })
    }

    const valid = await bcrypt.compare(currentPassword, users[0].password_hash)
    if (!valid) {
      return NextResponse.json({ error: "Aktuelles Passwort ist falsch" }, { status: 401 })
    }

    const hash = await bcrypt.hash(newPassword, 12)
    await query("UPDATE admin_users SET password_hash = ? WHERE id = ?", [hash, session.userId])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Change password error:", error)
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 })
  }
}
