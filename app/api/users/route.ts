import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { getSession } from "@/lib/session"
import bcrypt from "bcryptjs"

interface UserRow {
  id: number
  email: string
  role: string
  created_at: string
}

export async function GET() {
  const session = await getSession()
  if (!session || session.role !== "manager") {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  }

  try {
    const rows = await query<UserRow>("SELECT id, email, role, created_at FROM admin_users ORDER BY email ASC")
    return NextResponse.json({ users: rows })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ users: [] })
  }
}

export async function POST(request: Request) {
  const session = await getSession()
  if (!session || session.role !== "manager") {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  }

  try {
    const { email, password, role } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "E-Mail und Passwort sind erforderlich" }, { status: 400 })
    }

    if (!["user", "admin", "manager"].includes(role)) {
      return NextResponse.json({ error: "Ungültige Rolle" }, { status: 400 })
    }

    const existing = await query("SELECT id FROM admin_users WHERE email = ?", [email])
    if (existing.length > 0) {
      return NextResponse.json({ error: "E-Mail existiert bereits" }, { status: 409 })
    }

    const hash = await bcrypt.hash(password, 12)
    await query("INSERT INTO admin_users (email, password_hash, role) VALUES (?, ?, ?)", [email, hash, role])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const session = await getSession()
  if (!session || session.role !== "manager") {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  }

  try {
    const { id, role, password } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "ID erforderlich" }, { status: 400 })
    }

    if (role && !["user", "admin", "manager"].includes(role)) {
      return NextResponse.json({ error: "Ungültige Rolle" }, { status: 400 })
    }

    if (password) {
      const hash = await bcrypt.hash(password, 12)
      await query("UPDATE admin_users SET role=?, password_hash=? WHERE id=?", [role, hash, id])
    } else if (role) {
      await query("UPDATE admin_users SET role=? WHERE id=?", [role, id])
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const session = await getSession()
  if (!session || session.role !== "manager") {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  }

  try {
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({ error: "ID erforderlich" }, { status: 400 })
    }

    if (id === session.userId) {
      return NextResponse.json({ error: "Sie können sich nicht selbst löschen" }, { status: 400 })
    }

    await query("DELETE FROM admin_users WHERE id=?", [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 })
  }
}
