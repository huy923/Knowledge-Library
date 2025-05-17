import { NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function GET() {
    try {
        // Get total documents
        const [documentsResult] = await prisma.query(
            'SELECT COUNT(*) as count FROM documents'
        )
        const totalDocuments = documentsResult[0].count

        // Get total users
        const [usersResult] = await prisma.query(
            'SELECT COUNT(*) as count FROM users'
        )
        const totalUsers = usersResult[0].count

        // Get total downloads
        const [downloadsResult] = await prisma.query(
            'SELECT COUNT(*) as count FROM document_downloads'
        )
        const totalDownloads = downloadsResult[0].count

        // Get new documents this month
        const [newDocumentsResult] = await prisma.query(
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