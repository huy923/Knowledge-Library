import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("admin_token")?.value

    if (!token) {
      console.log("No token found, redirecting to login")
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_do_not_use_in_production")

      await jwtVerify(token, secret)
      console.log("Token verified successfully")

    } catch (error) {
      console.error("Token verification error:", error)
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }
  if (request.nextUrl.pathname.startsWith("/") && !request.nextUrl.pathname.startsWith("/login")) {
    const token = request.cookies.get("user_token")?.value

    if (!token) {
      console.log("No token found, redirecting to login")
      return NextResponse.redirect(new URL("/login", request.url))
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_do_not_use_in_production")

      await jwtVerify(token, secret)
      console.log("Token verified successfully")

    } catch (error) {
      console.error("Token verification error:", error)
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
