"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Document } from "@/components/documents-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DocumentFormProps {
  document?: Document
}

export function DocumentForm({ document }: DocumentFormProps) {
  const isEditing = !!document
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: document?.title || "",
    description: document?.description || "",
    category: document?.category || "",
    file_type: document?.file_type || "",
    file_size: document?.file_size || "",
    image: document?.image || "",
    link_fille: document?.link_fille || "",
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const url = isEditing ? `/api/admin/documents/${document.id}` : "/api/admin/documents"

      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Đã xảy ra lỗi khi lưu tài liệu")
      }

      setSuccess(isEditing ? "Tài liệu đã được cập nhật thành công" : "Tài liệu đã được tạo thành công")

      setTimeout(() => {
        router.push("/admin/documents")
        router.refresh()
      }, 1500)
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi lưu tài liệu")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">
          Tiêu đề <span className="text-red-500">*</span>
        </Label>
        <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Mô tả</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Danh mục</Label>
          <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sách">Sách</SelectItem>
              <SelectItem value="Tài liệu học tập">Tài liệu học tập</SelectItem>
              <SelectItem value="Báo cáo">Báo cáo</SelectItem>
              <SelectItem value="Hướng dẫn">Hướng dẫn</SelectItem>
              <SelectItem value="Khác">Khác</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="file_type">Loại file</Label>
          <Select value={formData.file_type} onValueChange={(value) => handleSelectChange("file_type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn loại file" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PDF">PDF</SelectItem>
              <SelectItem value="DOCX">DOCX</SelectItem>
              <SelectItem value="XLSX">XLSX</SelectItem>
              <SelectItem value="PPTX">PPTX</SelectItem>
              <SelectItem value="TXT">TXT</SelectItem>
              <SelectItem value="ZIP">ZIP</SelectItem>
              <SelectItem value="Khác">Khác</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="file_size">Kích thước file</Label>
          <Input
            id="file_size"
            name="file_size"
            value={formData.file_size}
            onChange={handleChange}
            placeholder="Ví dụ: 2.5 MB"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">URL hình ảnh</Label>
        <Input
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="link_fille">URL file tài liệu</Label>
        <Input
          id="link_fille"
          name="link_fille"
          value={formData.link_fille}
          onChange={handleChange}
          placeholder="https://example.com/document.pdf"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/documents")} disabled={loading}>
          Hủy
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {isEditing ? "Đang cập nhật..." : "Đang tạo..."}
            </>
          ) : isEditing ? (
            "Cập nhật tài liệu"
          ) : (
            "Tạo tài liệu"
          )}
        </Button>
      </div>
    </form>
  )
}
