import { type NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"
import { RowDataPacket } from "mysql2"
import { link } from "fs"

interface Document extends RowDataPacket {
  id: number
  title: string
  description: string
  file_size: string
  file_type: string
  category: string
  created_at: Date
  updated_at: Date
  image: string
  link_file: string
}

function getIdFromUrl(request: NextRequest): string | null {
  const segments = request.nextUrl.pathname.split("/")
  const id = segments[segments.length - 1]
  return id || null
}
export async function GET(request: NextRequest) {
  try {
    const id = getIdFromUrl(request)
    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 })
    }

    const [rows] = await pool.execute<Document[]>(
      'SELECT id, title, description, file_size, file_type, category, created_at, updated_at, image, link_file FROM documents WHERE id = ?',
      [id]
    )

    if (!rows.length) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error("Error fetching document:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = getIdFromUrl(request)
    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 })
    }

    const [rows] = await pool.execute<Document[]>(
      'SELECT * FROM documents WHERE id = ?',
      [id]
    )

    if (!rows.length) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

    await pool.execute(
      'DELETE FROM documents WHERE id = ?',
      [id]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting document:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const id = getIdFromUrl(request)
    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 })
    }

    const [rows] = await pool.execute<Document[]>(
      'SELECT * FROM documents WHERE id = ?',
      [id]
    )

    if (!rows.length) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

    const body = await request.json()
    const { image, link_file } = body

    if (!image || !link_file) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await pool.execute(
      'UPDATE documents SET image = ?, link_file = ? WHERE id = ?',
      [image, link_file, id]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating document:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}