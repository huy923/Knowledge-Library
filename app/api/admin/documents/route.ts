import { NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function GET() {
    try {
        const [documents] = await prisma.query(`
      SELECT 
        d.id,
        d.title,
        d.file_size as fileSize,
        d.file_type as fileType,
        d.created_at as createdAt,
        d.status,
        c.name as category,
        u.username as author
      FROM documents d
      LEFT JOIN categories c ON d.category_id = c.id
      LEFT JOIN users u ON d.user_id = u.id
      ORDER BY d.created_at DESC
    `)

        return NextResponse.json(documents)
    } catch (error) {
        console.error("Error fetching documents:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json(
                { error: "Document ID is required" },
                { status: 400 }
            )
        }

        // Delete document
        await prisma.query(
            'DELETE FROM documents WHERE id = ?',
            [id]
        )

        return NextResponse.json({ message: "Document deleted successfully" })
    } catch (error) {
        console.error("Error deleting document:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
} 