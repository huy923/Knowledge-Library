import { type NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"
import { RowDataPacket, ResultSetHeader } from "mysql2"

interface DocumentRow extends RowDataPacket {
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    // Build query conditions
    let query = "SELECT * FROM documents"
    const conditions = []
    const params = []

    if (category) {
      conditions.push("category = ?")
      params.push(category)
    }

    if (search) {
      conditions.push("(title LIKE ? OR description LIKE ?)")
      params.push(`%${search}%`, `%${search}%`)
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ")
    }

    // Add pagination
    query += " ORDER BY created_at DESC LIMIT ? OFFSET ?"
    params.push(limit, offset)

    // Get total count
    const [countResult] = await pool.execute<RowDataPacket[]>(
      `SELECT COUNT(*) as total FROM documents ${conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : ""}`,
      params.slice(0, -2) 
    )
    const total = countResult[0].total

    // Get documents
    const [documents] = await pool.execute<DocumentRow[]>(query, params)

    return NextResponse.json({
      documents,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching documents:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO documents (
        title, description, file_size, file_type, category, 
        image, link_file
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        body.title,
        body.description,
        body.fileSize,
        body.fileType,
        body.category,
        body.image || "/placeholder.svg",
        body.linkFile,
      ]
    )

    return NextResponse.json({ success: true, id: result.insertId }, { status: 201 })
  } catch (error) {
    console.error("Error creating document:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET_mysql() {
  try {
    const [rows] = await pool.execute<DocumentRow[]>(
      "SELECT * FROM documents ORDER BY created_at DESC"
    )

    return NextResponse.json(rows)
  } catch (error) {
    console.error("Error fetching documents:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
