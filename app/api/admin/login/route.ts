import { NextResponse } from "next/server"
import { SignJWT } from "jose"
import pool from "@/lib/db"
import type { RowDataPacket } from "mysql2"
import bcrypt from "bcrypt"

interface AdminRow extends RowDataPacket {
  id: number
  username: string
  email: string
  password: string
}

async function validateAdminCredentials(username: string, password: string) {
  try {
    const [rows] = await pool.execute<AdminRow[]>("SELECT * FROM admin WHERE username = ?", [username])

    if (!Array.isArray(rows) || rows.length === 0) {
      console.log("No admin found with username:", username)
      return null
    }

    const admin = rows[0]

    if (password !== admin.password) {
      console.log("Password mismatch")
      return null
    }
    // const passwordMatch = await bcrypt.compare(password, admin.password)

    // if (!passwordMatch) {
    //   console.log("Password mismatch")
    //   return null
    // }
    console.log("Login successful for admin:", admin.username)
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

    console.log("Login attempt for:", username)

    if (!username || !password) {
      return NextResponse.json({ message: "Username and password are required" }, { status: 400 })
    }

    const admin = await validateAdminCredentials(username, password)

    if (!admin) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 })
    }

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

    const response = NextResponse.json({ success: true })

    response.cookies.set({
      name: "admin_token",
      value: token, 
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 8, // 8 h
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "An error occurred during login" }, { status: 500 })
  }
}
