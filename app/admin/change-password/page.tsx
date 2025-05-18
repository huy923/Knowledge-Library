
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChangePasswordForm } from "@/components/change-password-form"

export default function ChangePasswordPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Thay đổi mật khẩu</h1>

      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Đổi mật khẩu Admin</CardTitle>
            <CardDescription>Nhập mật khẩu hiện tại và mật khẩu mới để cập nhật tài khoản của bạn</CardDescription>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
