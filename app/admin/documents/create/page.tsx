import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DocumentForm } from "@/components/document-form"

export default function CreateDocumentPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Thêm tài liệu mới</h1>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin tài liệu</CardTitle>
          <CardDescription>Nhập thông tin chi tiết về tài liệu mới</CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentForm />
        </CardContent>
      </Card>
    </div>
  )
}
