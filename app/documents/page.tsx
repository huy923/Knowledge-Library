import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { BookOpen, Download, FileText, Filter, Grid3X3, List, Search, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import pool from "@/lib/db"
import { RowDataPacket } from "mysql2"

interface Document extends RowDataPacket {
  id: number
  title: string
  description: string
  file_size: string
  file_type: string
  category: string
  created_at: Date
  updated_at: Date
}

export default async function DocumentsPage() {
  // Fetch documents from MySQL
  const [rows] = await pool.execute<Document[]>('SELECT * FROM documents ORDER BY created_at DESC')

  return (
    <div className="container mx-auto py-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Tài liệu</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rows.map((doc) => (
          <Link href={`/documents/${doc.id}`} key={doc.id}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>{doc.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {doc.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>{doc.file_type} • {doc.file_size}</span>
                </div>
                <div className="mt-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {doc.category}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

function DocumentCard() {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 bg-muted">
          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="Document thumbnail"
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 md:p-6 md:w-3/4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  PDF
                </Badge>
                <Badge variant="outline" className="bg-muted">
                  Công nghệ
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">
                <Link href="/documents/1" className="hover:underline">
                  Nhập môn Trí tuệ nhân tạo và Học máy
                </Link>
              </h3>
              <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                Tài liệu giới thiệu về các khái niệm cơ bản trong lĩnh vực Trí tuệ nhân tạo và Học máy, bao gồm các
                thuật toán, mô hình và ứng dụng thực tế.
              </p>
            </div>
            <div className="flex">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              <Star className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-2">
            <BookOpen className="h-4 w-4 mr-1" />
            <span className="mr-4">TS. Nguyễn Văn A</span>
            <FileText className="h-4 w-4 mr-1" />
            <span className="mr-4">45 trang</span>
            <Download className="h-4 w-4 mr-1" />
            <span>1,234 lượt tải</span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">Cập nhật: 15/05/2023</div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Star className="h-4 w-4 mr-2" />
                Lưu
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Tải xuống
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
