import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { getSession } from "@/lib/session"

interface TerminRow {
  id: number
  date: string
  title: string
  content: string
  image: string | null
  alt: string | null
}

export async function GET() {
  try {
    const rows = await query<TerminRow>("SELECT * FROM termine ORDER BY date ASC")
    return NextResponse.json({ termine: rows })
  } catch (error) {
    console.error("Error fetching termine:", error)
    return NextResponse.json({ termine: [] })
  }
}

export async function POST(request: Request) {
  const session = await getSession()
  if (!session || (session.role !== "admin" && session.role !== "manager")) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const date = formData.get("date") as string
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const alt = (formData.get("alt") as string) || title
    const image = "https://placehold.co/600x400"

    if (!date || !title || !content) {
      return NextResponse.json({ error: "Fehlende Felder" }, { status: 400 })
    }

    await query("INSERT INTO termine (date, title, content, image, alt) VALUES (?, ?, ?, ?, ?)", [
      date,
      title,
      content,
      image,
      alt,
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error adding termin:", error)
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const session = await getSession()
  if (!session || (session.role !== "admin" && session.role !== "manager")) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const id = formData.get("id") as string
    const date = formData.get("date") as string
    const title = formData.get("title") as string
    const content = formData.get("content") as string

    if (!id) {
      return NextResponse.json({ error: "ID erforderlich" }, { status: 400 })
    }

    await query("UPDATE termine SET date=?, title=?, content=? WHERE id=?", [date, title, content, id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating termin:", error)
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

    await query("DELETE FROM termine WHERE id=?", [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting termin:", error)
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 })
  }
}
