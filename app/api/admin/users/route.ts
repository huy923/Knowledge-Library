import { NextResponse } from "next/server"
import pool from "@/lib/db"
import { RowDataPacket } from "mysql2"
import { getAdminUser } from "@/lib/auth"

interface UserRow extends RowDataPacket {
    id: number
    username: string
    password: string
    email: string
    created_at: Date
    updated_at: Date
    point: number
}
export async function GET() {
    try {
        const admin = await getAdminUser()
        if (!admin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const [rows] = await pool.execute<UserRow[]>(
            "SELECT id, username, password, email, created_at,updated_at, point FROM users ORDER BY created_at DESC"
        )

        return NextResponse.json(rows)
    } catch (error) {
        console.error("Error fetching users:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const admin = await getAdminUser()
        if (!admin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const { email, name, role } = body

        const [result] = await pool.execute(
            "INSERT INTO users (email, name, role) VALUES (?, ?, ?)",
            [email, name, role]
        )

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error creating user:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
} 