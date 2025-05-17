import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"
import { hash, compare } from "bcrypt"
import { RowDataPacket, ResultSetHeader } from "mysql2"
import { cookies } from 'next/headers'
import { sign, verify } from "jsonwebtoken"

interface User extends RowDataPacket {
  id: number
  username: string
  password: string
  email: string
  // role: 'admin' | 'user'
  created_at: Date
  updated_at: Date
}

interface Admin extends RowDataPacket {
  id: number
  username: string
  password: string
  email: string
  created_at: Date
  updated_at: Date
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    try {
      // Verify the JWT token
      const decoded = verify(token.value, process.env.JWT_SECRET || 'your-secret-key') as { id: number }

      // Get admin info from database
      const [rows] = await prisma.query<Admin[]>(
        'SELECT id, username, email FROM admin WHERE id = ?',
        [decoded.id]
      )

      if (!Array.isArray(rows) || rows.length === 0) {
        return NextResponse.json(
          { error: "Admin not found" },
          { status: 404 }
        )
      }

      return NextResponse.json({ admin: rows[0] })
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error("Error fetching admin:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      )
    }

    const [rows] = await prisma.query<Admin[]>(
      "SELECT * FROM admin WHERE username = ?",
      [username]
    )

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }
    const admin = rows[0]
    const isValidPassword = await compare(password, admin.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = sign(
      {
        id: admin.id,
        username: admin.username
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1d" }
    )

    // Set cookie (using response header for Next.js API route)
    const response = NextResponse.json({
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    })
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
    })
    return response
  } catch (error) {
    console.error("Error during admin login:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

// Add a new endpoint for user registration
export async function PUT(request: NextRequest) {
  try {
    const { username, password, email } = await request.json()

    if (!username || !password || !email) {
      return NextResponse.json(
        { error: "Username, password, and email are required" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const [existingUsers] = await prisma.query<User[]>(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    )

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Insert new user
    const [result] = await prisma.query<ResultSetHeader>(
      'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, email, 'user']
    )

    return NextResponse.json({
      message: "User created successfully",
      userId: result.insertId
    })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('auth_token')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error during logout:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
