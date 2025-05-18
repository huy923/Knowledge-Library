import { NextResponse } from "next/server"
import pool from "@/lib/db"
import { getAdminUser } from "@/lib/auth"
import { RowDataPacket, ResultSetHeader } from "mysql2"

interface DocumentRow extends RowDataPacket {
  id: number
  title: string
  description: string
  file_size: string
  file_type: string
  category: string
  author: string
  pages: number
  downloads: number
  image: string
  link_file: string
  created_at: Date
  updated_at: Date
}

export async function GET() {
  try {
    const admin = await getAdminUser()

    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const [rows] = await pool.execute("SELECT * FROM documents ORDER BY created_at DESC")

    return NextResponse.json(rows)
  } catch (error) {
    console.error("Error fetching documents:", error)
    return NextResponse.json({ message: "An error occurred while fetching documents" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminUser()

    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, file_size, file_type, category, author, pages, image, link_file } = body

    if (!title) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 })
    }

    const [result] = await pool.execute(
      "INSERT INTO documents (title, description, file_size, file_type, category, author, pages, image, link_file) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [title, description, file_size, file_type, category, author, pages, image, link_file]
    )

    return NextResponse.json({
      message: "Document created successfully",
      id: (result as ResultSetHeader).insertId,
    })
  } catch (error) {
    console.error("Error creating document:", error)
    return NextResponse.json({ message: "An error occurred while creating the document" }, { status: 500 })
  }
}
