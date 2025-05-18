import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DocumentForm } from "@/components/document-form"
import { getDocumentById } from "@/lib/documents"
import { notFound } from "next/navigation"

export default async function EditDocumentPage({ params }: { params: { id: string } }) {
  const documentId = Number.parseInt(params.id)

  if (isNaN(documentId)) {
    notFound()
  }

  const document = await getDocumentById(documentId)

  if (!document) {
    notFound()
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Chỉnh sửa tài liệu</h1>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin tài liệu</CardTitle>
          <CardDescription>Cập nhật thông tin chi tiết về tài liệu</CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentForm document={document} />
        </CardContent>
      </Card>
    </div>
  )
}
