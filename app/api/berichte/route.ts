import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { getSession } from "@/lib/session"

interface BerichtRow {
  id: number
  date: string
  title: string
  content: string
  image: string | null
  alt: string | null
}

export async function GET() {
  try {
    const rows = await query<BerichtRow>("SELECT * FROM berichte ORDER BY date DESC")
    return NextResponse.json({ berichte: rows })
  } catch (error) {
    console.error("Error fetching berichte:", error)
    return NextResponse.json({ berichte: [] })
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

    await query("INSERT INTO berichte (date, title, content, image, alt) VALUES (?, ?, ?, ?, ?)", [
      date,
      title,
      content,
      image,
      alt,
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error adding bericht:", error)
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

    await query("UPDATE berichte SET date=?, title=?, content=? WHERE id=?", [date, title, content, id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating bericht:", error)
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

    await query("DELETE FROM berichte WHERE id=?", [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting bericht:", error)
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 })
  }
}
