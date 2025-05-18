import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import pool from "@/lib/db"
import { cookies } from "next/headers"
import { jwtVerify } from "jose"
import { RowDataPacket } from "mysql2"

interface AdminRow extends RowDataPacket {
  id: number
  username: string
  email: string
  password: string
}

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json()
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_do_not_use_in_production")
    const { payload } = await jwtVerify(token.value, secret)
    const adminId = payload.id

    const [rows] = await pool.execute<AdminRow[]>(
      "SELECT * FROM admin WHERE id = ?",
      [adminId]
    )

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 })
    }

    const admin = rows[0]

    if (currentPassword !== admin.password) {
      return NextResponse.json({ message: "Current password is incorrect" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update password
    await pool.execute(
      "UPDATE admin SET password = ? WHERE id = ?",
      [hashedPassword, adminId]
    )

    return NextResponse.json({ message: "Password updated successfully" })
  } catch (error) {
    console.error("Password change error:", error)
    return NextResponse.json(
      { message: "Failed to change password" },
      { status: 500 }
    )
  }
}
