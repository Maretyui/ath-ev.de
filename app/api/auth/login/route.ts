import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { createSession } from "@/lib/session"
import bcrypt from "bcryptjs"

interface AdminUser {
  id: number
  email: string
  password_hash: string
  role: "user" | "admin" | "manager"
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "E-Mail und Passwort sind erforderlich" }, { status: 400 })
    }

    const users = await query<AdminUser>("SELECT id, email, password_hash, role FROM admin_users WHERE email = ?", [
      email,
    ])

    if (users.length === 0) {
      return NextResponse.json({ error: "Ungültige Anmeldedaten" }, { status: 401 })
    }

    const user = users[0]
    const validPassword = await bcrypt.compare(password, user.password_hash)

    if (!validPassword) {
      return NextResponse.json({ error: "Ungültige Anmeldedaten" }, { status: 401 })
    }

    await createSession({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    return NextResponse.json({
      user: { id: user.id, email: user.email, role: user.role },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 })
  }
}
