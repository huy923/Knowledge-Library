import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { RowDataPacket, ResultSetHeader } from 'mysql2'

interface Document extends RowDataPacket {
  id: number
  title: string
  description: string
  file_size: string
  file_type: string
  category: string
  created_at: Date
  updated_at: Date
}

// GET /api/documents/technology
export async function GET(request: Request) {
  try {
    // Get query parameters
    const url = new URL(request.url)
    const category = url.searchParams.get('category')
    const search = url.searchParams.get('search')

    // Build the SQL query
    let query = 'SELECT * FROM documents WHERE 1=1'
    const params: any[] = []

    if (category) {
      query += ' AND category = ?'
      params.push(category)
    }

    if (search) {
      query += ' AND (title LIKE ? OR description LIKE ?)'
      params.push(`%${search}%`, `%${search}%`)
    }

    // Execute the query
    const [rows] = await pool.execute<Document[]>(query, params)

    return NextResponse.json(rows)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// POST /api/documents/technology
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      )
    }

    // Insert new document
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO documents (title, description, file_size, file_type, category) VALUES (?, ?, ?, ?, ?)',
      [
        body.title,
        body.description,
        body.fileSize || '0MB',
        body.fileType || 'PDF',
        body.category || 'programming'
      ]
    )

    // Get the inserted document
    const [rows] = await pool.execute<Document[]>(
      'SELECT * FROM documents WHERE id = ?',
      [result.insertId]
    )

    return NextResponse.json(rows[0], { status: 201 })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// PUT /api/documents/technology/:id
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const body = await request.json()

    // Check if document exists
    const [rows] = await pool.execute<Document[]>(
      'SELECT * FROM documents WHERE id = ?',
      [id]
    )

    if (!rows.length) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      )
    }

    // Update document
    await pool.execute(
      'UPDATE documents SET title = ?, description = ?, file_size = ?, file_type = ?, category = ? WHERE id = ?',
      [
        body.title,
        body.description,
        body.fileSize,
        body.fileType,
        body.category,
        id
      ]
    )

    // Get updated document
    const [updatedRows] = await pool.execute<Document[]>(
      'SELECT * FROM documents WHERE id = ?',
      [id]
    )

    return NextResponse.json(updatedRows[0])
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// DELETE /api/documents/technology/:id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    // Check if document exists
    const [rows] = await pool.execute<Document[]>(
      'SELECT * FROM documents WHERE id = ?',
      [id]
    )

    if (!rows.length) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      )
    }

    // Delete document
    await pool.execute(
      'DELETE FROM documents WHERE id = ?',
      [id]
    )

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 