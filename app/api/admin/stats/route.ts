import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import { RowDataPacket } from "mysql2"

interface CountResult extends RowDataPacket {
    count: number
}

export async function GET() {
    try {
        const [documentsResult] = await prisma.query<CountResult[]>(
            'SELECT COUNT(*) as count FROM documents'
        )
        const totalDocuments = documentsResult[0].count

        const [usersResult] = await prisma.query<CountResult[]>(
            'SELECT COUNT(*) as count FROM users'
        )
        const totalUsers = usersResult[0].count

        const [downloadsResult] = await prisma.query<CountResult[]>(
            'SELECT COUNT(*) as count FROM document_downloads'
        )
        const totalDownloads = downloadsResult[0].count

        const [newDocumentsResult] = await prisma.query<CountResult[]>(
            'SELECT COUNT(*) as count FROM documents WHERE MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE())'
        )
        const newDocuments = newDocumentsResult[0].count

        return NextResponse.json({
            totalDocuments,
            totalUsers,
            totalDownloads,
            newDocuments
        })
    } catch (error) {
        console.error("Error fetching admin stats:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
} 