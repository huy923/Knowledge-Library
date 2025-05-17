import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import pool from "@/lib/db"
import { getAdminUser } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    // Lấy thông tin admin từ token
    const admin = await getAdminUser()

    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ message: "Mật khẩu hiện tại và mật khẩu mới là bắt buộc" }, { status: 400 })
    }

    // Kiểm tra độ dài mật khẩu mới
    if (newPassword.length < 8) {
      return NextResponse.json({ message: "Mật khẩu mới phải có ít nhất 8 ký tự" }, { status: 400 })
    }

    // Lấy thông tin admin từ database
    const [rows] = await pool.execute("SELECT * FROM admin WHERE id = ?", [admin.id])

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ message: "Admin không tồn tại" }, { status: 404 })
    }

    const adminData = rows[0]

    // Kiểm tra mật khẩu hiện tại
    const passwordMatch = await bcrypt.compare(currentPassword, adminData.password)

    if (!passwordMatch) {
      return NextResponse.json({ message: "Mật khẩu hiện tại không đúng" }, { status: 400 })
    }

    // Hash mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Cập nhật mật khẩu trong database
    await pool.execute("UPDATE admin SET password = ? WHERE id = ?", [hashedPassword, admin.id])

    return NextResponse.json({ success: true, message: "Mật khẩu đã được cập nhật thành công" })
  } catch (error) {
    console.error("Change password error:", error)
    return NextResponse.json({ message: "Đã xảy ra lỗi khi đổi mật khẩu" }, { status: 500 })
  }
}
