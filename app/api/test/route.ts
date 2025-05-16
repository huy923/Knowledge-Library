import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
    try {
        // Test database connection
        const [rows] = await pool.execute('SELECT * FROM documents')

        return NextResponse.json({
            status: 'success',
            message: 'Database connection successful',
            data: rows
        })
    } catch (error) {
        console.error('Database connection error:', error)
        return NextResponse.json({
            status: 'error',
            message: 'Database connection failed',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
} 