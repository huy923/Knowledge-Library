"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    setIsLoggingOut(true)

    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        router.push("/admin/login")
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <Button variant="outline" onClick={handleLogout} disabled={isLoggingOut} size="sm">
      {isLoggingOut ? (
        "Đang đăng xuất..."
      ) : (
        <>
          <LogOut className="h-4 w-4 mr-2" />
          Đăng xuất
        </>
      )}
    </Button>
  )
}
