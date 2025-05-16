import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'

export async function middleware(request: NextRequest) {
    // Check if the request is for an admin route
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const token = request.cookies.get('auth_token')

        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        try {
            // Verify the token
            const decoded = verify(token.value, process.env.JWT_SECRET || 'your-secret-key')

            // Check if user is admin
            if (decoded.role !== 'admin') {
                return NextResponse.redirect(new URL('/', request.url))
            }

            return NextResponse.next()
        } catch (error) {
            // If token is invalid, redirect to login
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*'
} 