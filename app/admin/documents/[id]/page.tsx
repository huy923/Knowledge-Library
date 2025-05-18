import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getDocumentById } from "@/lib/documents"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Edit, Download, ArrowLeft } from "lucide-react"
import Image from "next/image"

export default async function DocumentDetailPage({ params }: { params: { id: string } }) {
  const documentId = Number.parseInt(params.id)

  if (isNaN(documentId)) {
    notFound()
  }

  const document = await getDocumentById(documentId)

  if (!document) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="sm" asChild className="mr-4">
          <Link href="/admin/documents">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Chi tiết tài liệu</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{document.title}</CardTitle>
              <CardDescription>ID: {document.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-500 mb-1">Mô tả</h3>
                <p>{document.description || "Không có mô tả"}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-500 mb-1">Danh mục</h3>
                  <p>{document.category || "Chưa phân loại"}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-500 mb-1">Loại file</h3>
                  <p>{document.file_type || "Không xác định"}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-500 mb-1">Kích thước</h3>
                  <p>{document.file_size || "Không xác định"}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-500 mb-1">Ngày tạo</h3>
                  <p>{formatDate(document.created_at)}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-500 mb-1">Cập nhật lần cuối</h3>
                  <p>{formatDate(document.updated_at)}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" asChild>
                <Link href={`/admin/documents/${document.id}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Chỉnh sửa
                </Link>
              </Button>
              {document.link_fille && (
                <Button asChild>
                  <a href={document.link_fille} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-2" />
                    Tải xuống
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Hình ảnh</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              {document.image ? (
                <div className="relative h-60 w-full">
                  <Image
                    src={document.image || "/placeholder.svg"}
                    alt={document.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ) : (
                <div className="h-60 w-full flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Không có hình ảnh</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
