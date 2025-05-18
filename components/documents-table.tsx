"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Edit, Trash2, Eye, FileText } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Image from "next/image"

export type Document = {
  id: number
  title: string
  description: string
  file_size: string
  file_type: string
  category: string
  created_at: string
  updated_at: string
  image: string
  link_fille: string
}

interface DocumentsTableProps {
  documents: Document[]
}

export function DocumentsTable({ documents }: DocumentsTableProps) {
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/documents/${deleteId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete document")
      }

      router.refresh()
    } catch (error) {
      console.error("Error deleting document:", error)
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
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
    <>
      <div className="overflow-x-auto">
        {documents.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">ID</th>
                <th className="border p-2 text-left">Hình ảnh</th>
                <th className="border p-2 text-left">Tiêu đề</th>
                <th className="border p-2 text-left">Danh mục</th>
                <th className="border p-2 text-left">Loại file</th>
                <th className="border p-2 text-left">Kích thước</th>
                <th className="border p-2 text-left">Ngày tạo</th>
                <th className="border p-2 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="border p-2">{doc.id}</td>
                  <td className="border p-2">
                    {doc.image ? (
                      <div className="relative h-10 w-10">
                        <Image
                          src={doc.image || "/placeholder.svg"}
                          alt={doc.title}
                          fill
                          className="object-cover rounded"
                          sizes="40px"
                        />
                      </div>
                    ) : (
                      <FileText className="h-10 w-10 text-gray-400" />
                    )}
                  </td>
                  <td className="border p-2">{doc.title}</td>
                  <td className="border p-2">{doc.category}</td>
                  <td className="border p-2">{doc.file_type}</td>
                  <td className="border p-2">{doc.file_size}</td>
                  <td className="border p-2">{formatDate(doc.created_at)}</td>
                  <td className="border p-2">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/documents/${doc.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          Xem
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/documents/${doc.id}/edit`}>
                          <Edit className="h-4 w-4 mr-1" />
                          Sửa
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteId(doc.id)}
                        className="text-red-500 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Xóa
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500">Không có tài liệu nào. Hãy thêm tài liệu mới.</p>
          </div>
        )}
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa tài liệu này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-500 hover:bg-red-600">
              {isDeleting ? "Đang xóa..." : "Xóa"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
