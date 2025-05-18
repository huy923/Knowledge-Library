import type React from "react"
import { LogoutButton } from "@/components/logout-button"
import Link from "next/link"
import { Users, BookOpen, Home, Settings, Lock } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold">Knowledge Library</h1>
          <p className="text-xs text-gray-400">Admin Portal</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin/dashboard"
                className="flex items-center p-2 rounded hover:bg-gray-800 transition-colors"
              >
                <Home className="h-4 w-4 mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className="flex items-center p-2 rounded hover:bg-gray-800 transition-colors">
                <Users className="h-4 w-4 mr-3" />
                Người dùng
              </Link>
            </li>
            <li>
              <Link href="/admin/content" className="flex items-center p-2 rounded hover:bg-gray-800 transition-colors">
                <BookOpen className="h-4 w-4 mr-3" />
                Nội dung
              </Link>
            </li>
            <li>
              <Link
                href="/admin/change-password"
                className="flex items-center p-2 rounded hover:bg-gray-800 transition-colors"
              >
                <Lock className="h-4 w-4 mr-3" />
                Đổi mật khẩu
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className="flex items-center p-2 rounded hover:bg-gray-800 transition-colors"
              >
                <Settings className="h-4 w-4 mr-3" />
                Cài đặt
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b shadow-sm">
          <div className="container mx-auto p-4 flex justify-end items-center">
            <LogoutButton />
          </div>
        </header>
        <main className="flex-grow bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
