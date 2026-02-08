import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { getSession } from "@/lib/session"
import { put, del } from "@vercel/blob"

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
    const imageFile = formData.get("image") as File | null

    if (!date || !title || !content) {
      return NextResponse.json({ error: "Fehlende Felder" }, { status: 400 })
    }

    let imageUrl: string | null = null

    if (imageFile && imageFile.size > 0) {
      if (imageFile.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "Bild darf maximal 5MB gross sein" }, { status: 400 })
      }
      const blob = await put(`termine/${Date.now()}-${imageFile.name}`, imageFile, {
        access: "public",
      })
      imageUrl = blob.url
    }

    await query("INSERT INTO termine (date, title, content, image, alt) VALUES (?, ?, ?, ?, ?)", [
      date,
      title,
      content,
      imageUrl,
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
    const alt = (formData.get("alt") as string) || title
    const imageFile = formData.get("image") as File | null

    if (!id) {
      return NextResponse.json({ error: "ID erforderlich" }, { status: 400 })
    }

    if (imageFile && imageFile.size > 0) {
      if (imageFile.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "Bild darf maximal 5MB gross sein" }, { status: 400 })
      }

      // Delete old image from blob storage if it exists
      const existing = await query<TerminRow>("SELECT image FROM termine WHERE id=?", [id])
      if (existing[0]?.image && existing[0].image.includes("blob.vercel-storage.com")) {
        try {
          await del(existing[0].image)
        } catch {
          // ignore deletion errors for old images
        }
      }

      const blob = await put(`termine/${Date.now()}-${imageFile.name}`, imageFile, {
        access: "public",
      })

      await query("UPDATE termine SET date=?, title=?, content=?, image=?, alt=? WHERE id=?", [
        date,
        title,
        content,
        blob.url,
        alt,
        id,
      ])
    } else {
      await query("UPDATE termine SET date=?, title=?, content=?, alt=? WHERE id=?", [date, title, content, alt, id])
    }

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

    // Delete image from blob storage
    const existing = await query<TerminRow>("SELECT image FROM termine WHERE id=?", [id])
    if (existing[0]?.image && existing[0].image.includes("blob.vercel-storage.com")) {
      try {
        await del(existing[0].image)
      } catch {
        // ignore deletion errors
      }
    }

    await query("DELETE FROM termine WHERE id=?", [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting termin:", error)
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 })
  }
}
