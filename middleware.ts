import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'

export function middleware(request: NextRequest) {
    // Allow /admin/login without auth
    if (request.nextUrl.pathname === '/admin/login') {
        return NextResponse.next();
    }

    if (request.nextUrl.pathname.startsWith('/admin')) {
        const token = request.cookies.get('auth_token')

        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        try {
            const decoded = verify(token.value, process.env.JWT_SECRET || 'your-secret-key')
            return NextResponse.next()
        } catch (error) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*'
} 