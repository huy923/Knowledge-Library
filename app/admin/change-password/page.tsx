import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getAdminUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { ChangePasswordForm } from "@/components/change-password-form"

export default async function ChangePasswordPage() {
  const admin = await getAdminUser()

  if (!admin) {
    redirect("/admin/login")
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Đổi mật khẩu</CardTitle>
            <CardDescription>Cập nhật mật khẩu cho tài khoản admin của bạn</CardDescription>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
          <CardFooter className="text-sm text-gray-500 justify-center">Mật khẩu mới phải có ít nhất 8 ký tự</CardFooter>
        </Card>
      </div>
    </div>
  )
}
