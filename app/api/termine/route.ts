import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { getSession } from "@/lib/session"
import { writeFile, unlink, mkdir } from "fs/promises"
import path from "path"

interface TerminRow {
  id: number
  date: string
  title: string
  content: string
  image: string | null
  alt: string | null
}

async function saveUploadedFile(file: File, prefix: string): Promise<string> {
  const uploadDir = path.join(process.cwd(), "public", "uploads", prefix)
  await mkdir(uploadDir, { recursive: true })

  const ext = file.name.split(".").pop() || "jpg"
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const filePath = path.join(uploadDir, filename)

  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(filePath, buffer)

  return `/uploads/${prefix}/${filename}`
}

async function deleteUploadedFile(imageUrl: string) {
  if (!imageUrl || !imageUrl.startsWith("/uploads/")) return
  try {
    const filePath = path.join(process.cwd(), "public", imageUrl)
    await unlink(filePath)
  } catch {
    // ignore if file doesn't exist
  }
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
      imageUrl = await saveUploadedFile(imageFile, "termine")
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

      // Delete old image if it exists
      const existing = await query<TerminRow>("SELECT image FROM termine WHERE id=?", [id])
      if (existing[0]?.image) {
        await deleteUploadedFile(existing[0].image)
      }

      const newImageUrl = await saveUploadedFile(imageFile, "termine")

      await query("UPDATE termine SET date=?, title=?, content=?, image=?, alt=? WHERE id=?", [
        date,
        title,
        content,
        newImageUrl,
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

    // Delete image file
    const existing = await query<TerminRow>("SELECT image FROM termine WHERE id=?", [id])
    if (existing[0]?.image) {
      await deleteUploadedFile(existing[0].image)
    }

    await query("DELETE FROM termine WHERE id=?", [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting termin:", error)
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 })
  }
}
