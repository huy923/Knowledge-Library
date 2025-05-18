import { cookies } from "next/headers"
import { jwtVerify } from "jose"
import pool from "@/lib/db"
import { RowDataPacket } from "mysql2"

interface AdminRow extends RowDataPacket {
    id: number
    username: string
    email: string
    password: string
}

export async function getAdminUser() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("admin_token")

        if (!token) {
            return null
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_do_not_use_in_production")
        const { payload } = await jwtVerify(token.value, secret)

        const [rows] = await pool.execute<AdminRow[]>(
            "SELECT * FROM admin WHERE id = ?",
            [payload.id]
        )

        if (!Array.isArray(rows) || rows.length === 0) {
            return null
        }

        const admin = rows[0]
        return {
            id: admin.id,
            username: admin.username,
            email: admin.email,
            role: "admin"
        }
    } catch (error) {
        console.error("Auth error:", error)
        return null
    }
} 