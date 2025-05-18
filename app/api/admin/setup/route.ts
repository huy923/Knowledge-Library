import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import pool from "@/lib/db"

export async function POST(request: Request) {
    try {
        const { username, password, email } = await request.json()

        if (!username || !password || !email) {
            return NextResponse.json(
                { message: "Username, password and email are required" },
                { status: 400 }
            )
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Insert admin into database
        await pool.execute(
            "INSERT INTO admin (username, password, email) VALUES (?, ?, ?)",
            [username, hashedPassword, email]
        )

        return NextResponse.json({ message: "Admin account created successfully" })
    } catch (error) {
        console.error("Setup error:", error)
        return NextResponse.json(
            { message: "Failed to create admin account" },
            { status: 500 }
        )
    }
} 