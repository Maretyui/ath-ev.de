import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { getSession } from "@/lib/session"

interface MemberRow {
  id: number
  name: string
  email: string
  adresse: string
  geburtstag: string
  telefon: string
  mitglied_seit: string
}

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 })
  }

  try {
    const rows = await query<MemberRow>(
      "SELECT id, name, email, adresse, geburtstag, telefon, mitglied_seit FROM members ORDER BY name ASC"
    )
    return NextResponse.json({ members: rows })
  } catch (error) {
    console.error("Error fetching members:", error)
    return NextResponse.json({ members: [] })
  }
}

export async function POST(request: Request) {
  const session = await getSession()
  if (!session || (session.role !== "admin" && session.role !== "manager")) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  }

  try {
    const { name, email, adresse, geburtstag, telefon, mitglied_seit } = await request.json()

    if (!name || !email) {
      return NextResponse.json({ error: "Name und E-Mail sind erforderlich" }, { status: 400 })
    }

    await query(
      "INSERT INTO members (name, email, adresse, geburtstag, telefon, mitglied_seit) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, adresse || "", geburtstag || null, telefon || "", mitglied_seit || null]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error adding member:", error)
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const session = await getSession()
  if (!session || (session.role !== "admin" && session.role !== "manager")) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  }

  try {
    const { id, name, email, adresse, geburtstag, telefon, mitglied_seit } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "ID erforderlich" }, { status: 400 })
    }

    await query(
      "UPDATE members SET name=?, email=?, adresse=?, geburtstag=?, telefon=?, mitglied_seit=? WHERE id=?",
      [name, email, adresse || "", geburtstag || null, telefon || "", mitglied_seit || null, id]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating member:", error)
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const session = await getSession()
  if (!session || (session.role !== "admin" && session.role !== "manager")) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  }

  try {
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({ error: "ID erforderlich" }, { status: 400 })
    }

    await query("DELETE FROM members WHERE id=?", [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting member:", error)
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 })
  }
}
