import { type NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"
import { RowDataPacket } from "mysql2"

interface User extends RowDataPacket {
    id: number
    username: string
    password: string
    email: string
    created_at: Date
    updated_at: Date
    point: number
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
  
      const [rows] = await pool.execute<User[]>(
        'SELECT id, username, password, email, created_at, updated_at, point FROM users WHERE id = ?',
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
  
      const [rows] = await pool.execute<User[]>(
        'SELECT * FROM users WHERE id = ?',
        [id]
      )
  
      if (!rows.length) {
        return NextResponse.json({ error: "Document not found" }, { status: 404 })
      }
  
      await pool.execute(
        'DELETE FROM users WHERE id = ?',
        [id]
      )
  
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error("Error deleting document:", error)
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
  }
  