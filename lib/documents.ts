import pool from "@/lib/db"
import type { Document } from "@/components/documents-table"
import type { RowDataPacket } from "mysql2"

export async function getDocuments(searchQuery = ""): Promise<Document[]> {
  try {
    let query = "SELECT * FROM documents"
    let params: string[] = []

    if (searchQuery) {
      query += " WHERE title LIKE ? OR description LIKE ? OR category LIKE ?"
      params = [`%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`]
    }

    query += " ORDER BY created_at DESC"

    const [rows] = await pool.execute<RowDataPacket[]>(query, params)
    return rows as Document[]
  } catch (error) {
    console.error("Error fetching documents:", error)
    return []
  }
}

export async function getDocumentById(id: number): Promise<Document | null> {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>("SELECT * FROM documents WHERE id = ?", [id])

    if (!rows.length) {
      return null
    }

    return rows[0] as Document
  } catch (error) {
    console.error(`Error fetching document with id ${id}:`, error)
    return null
  }
}
