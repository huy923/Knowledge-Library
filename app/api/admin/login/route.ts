import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { SignJWT } from "jose"
import bcrypt from "bcrypt"
import pool from "@/lib/db"

async function validateAdminCredentials(username: string, password: string) {
  try {
    // Kết nối với database và tìm admin theo username
    const [rows] = await pool.execute("SELECT * FROM admin WHERE username = ?", [username])

    // Kiểm tra nếu không tìm thấy user
    if (!Array.isArray(rows) || rows.length === 0) {
      return null
    }

    const admin = rows[0]

    // Kiểm tra mật khẩu bằng bcrypt
    const passwordMatch = await bcrypt.compare(password, admin.password)

    if (!passwordMatch) {
      return null
    }

    // Trả về thông tin admin (không bao gồm password)
    return {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: "admin",
    }
  } catch (error) {
    console.error("Database error:", error)
    return null
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({ message: "Username and password are required" }, { status: 400 })
    }

    const admin = await validateAdminCredentials(username, password)

    if (!admin) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 })
    }

    // Create a JWT token using jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_do_not_use_in_production")

    const token = await new SignJWT({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: "admin",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(secret)

    // Set the token in a cookie
    cookies().set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 8, // 8 hours
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "An error occurred during login" }, { status: 500 })
  }
}
