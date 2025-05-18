import { NextResponse } from "next/server"
import pool from "@/lib/db"
import { getAdminUser } from "@/lib/auth"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const admin = await getAdminUser()

    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    const [rows] = await pool.execute("SELECT * FROM documents WHERE id = ?", [id])

    if (!(rows as any[]).length) {
      return NextResponse.json({ message: "Document not found" }, { status: 404 })
    }

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error(`Error fetching document with id ${params.id}:`, error)
    return NextResponse.json({ message: "An error occurred while fetching the document" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const admin = await getAdminUser()

    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const id = params.id
    const body = await request.json()
    const { title, description, file_size, file_type, category, image, link_fille } = body

    if (!title) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 })
    }

    // Check if document exists
    const [existingRows] = await pool.execute("SELECT id FROM documents WHERE id = ?", [id])

    if (!(existingRows as any[]).length) {
      return NextResponse.json({ message: "Document not found" }, { status: 404 })
    }

    await pool.execute(
      "UPDATE documents SET title = ?, description = ?, file_size = ?, file_type = ?, category = ?, image = ?, link_fille = ? WHERE id = ?",
      [title, description, file_size, file_type, category, image, link_fille, id],
    )

    return NextResponse.json({ message: "Document updated successfully" })
  } catch (error) {
    console.error(`Error updating document with id ${params.id}:`, error)
    return NextResponse.json({ message: "An error occurred while updating the document" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const admin = await getAdminUser()

    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    // Check if document exists
    const [existingRows] = await pool.execute("SELECT id FROM documents WHERE id = ?", [id])

    if (!(existingRows as any[]).length) {
      return NextResponse.json({ message: "Document not found" }, { status: 404 })
    }

    await pool.execute("DELETE FROM documents WHERE id = ?", [id])

    return NextResponse.json({ message: "Document deleted successfully" })
  } catch (error) {
    console.error(`Error deleting document with id ${params.id}:`, error)
    return NextResponse.json({ message: "An error occurred while deleting the document" }, { status: 500 })
  }
}
