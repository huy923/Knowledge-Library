import type { NextAuthOptions, Session, User, DefaultSession } from "next-auth"
import { getServerSession } from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import pool from "@/lib/db"
import { compare } from "bcrypt"
import { RowDataPacket } from "mysql2"
import { cookies } from "next/headers"
import { jwtVerify } from "jose"

interface UserRow extends RowDataPacket {
  id: string
  email: string
  name: string
  password: string
  image: string
  role: string
}

interface AdminRow extends RowDataPacket {
  id: number
  username: string
  email: string
  password: string
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      image?: string
      role: string
    } & DefaultSession["user"]
  }
  interface User {
    id: string
    email: string
    name: string
    image?: string
    role: string
  }
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

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const [rows] = await pool.execute<UserRow[]>(
          "SELECT * FROM users WHERE email = ?",
          [credentials.email]
        )

        if (!Array.isArray(rows) || rows.length === 0) {
          return null
        }

        const user = rows[0]

        if (!user.password) {
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
  },
}

export const auth = () => getServerSession(authOptions)
