import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"
import { hash } from "bcrypt"
import { RowDataPacket } from "mysql2"
import { cookies } from 'next/headers'
import { sign } from "jsonwebtoken"

interface User extends RowDataPacket {
  id: number
  username: string
  password: string
  email: string
  role: 'admin' | 'user'
  created_at: Date
  updated_at: Date
}

export async function GET(request: NextRequest) {
  try {
    const token = cookies().get('auth_token')

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    // In a real app, you should verify the JWT token here
    // For now, we'll just return the user info from the database
    const [users] = await prisma.user.findMany({
      where: { id: 1 },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    })

    if (!users.length) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      user: {
        id: users[0].id,
        username: users[0].username,
        email: users[0].email,
        role: users[0].role
      }
    })
  } catch (error) {
    console.error("Error fetching user:", error)
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

    const [users] = await prisma.user.findMany({
      where: { username: username },
      select: { id: true, password: true },
    })

    if (!users.length) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const user = users[0]
    // In a real app, you should use bcrypt to compare hashed passwords
    if (password !== user.password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = sign(
      { 
        id: user.id,
        username: username,
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    )

    // Set cookie
    cookies().set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 1 day
    })

    return NextResponse.json({
      user: {
        id: user.id,
        username: username,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error("Error during login:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    cookies().delete('auth_token')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error during logout:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
