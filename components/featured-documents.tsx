import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Download, FileText } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function FeaturedDocuments() {
  const documents = [
    {
      id: 1,
      title: "Nhập môn Trí tuệ nhân tạo và Học máy",
      description: "Tài liệu giới thiệu về các khái niệm cơ bản trong lĩnh vực Trí tuệ nhân tạo và Học máy.",
      category: "Công nghệ",
      format: "PDF",
      author: "TS. Nguyễn Văn A",
      pages: 45,
      downloads: 1234,
      date: "15/05/2023",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      title: "Kinh tế học vĩ mô: Lý thuyết và ứng dụng",
      description: "Giáo trình về kinh tế học vĩ mô với các ví dụ thực tế và bài tập áp dụng.",
      category: "Kinh tế",
      format: "PDF",
      author: "PGS.TS. Trần Thị B",
      pages: 120,
      downloads: 987,
      date: "10/04/2023",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      title: "Phương pháp nghiên cứu khoa học",
      description: "Hướng dẫn chi tiết về các phương pháp nghiên cứu khoa học và cách viết báo cáo.",
      category: "Giáo dục",
      format: "DOCX",
      author: "GS. Lê Văn C",
      pages: 78,
      downloads: 2345,
      date: "22/03/2023",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc) => (
        <Card key={doc.id} className="overflow-hidden flex flex-col">
          <div className="aspect-video relative bg-muted">
            <Image src={doc.image || "/placeholder.svg"} alt={doc.title} fill className="object-cover" />
            <div className="absolute top-2 left-2 flex gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {doc.format}
              </Badge>
              <Badge variant="outline" className="bg-muted">
                {doc.category}
              </Badge>
            </div>
          </div>
          <CardContent className="flex-1 p-4">
            <h3 className="text-lg font-bold mb-2 line-clamp-2">
              <Link href={`/documents/${doc.id}`} className="hover:underline">
                {doc.title}
              </Link>
            </h3>
            <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{doc.description}</p>
            <div className="flex items-center text-sm text-muted-foreground mt-2">
              <BookOpen className="h-4 w-4 mr-1" />
              <span className="mr-4">{doc.author}</span>
              <FileText className="h-4 w-4 mr-1" />
              <span className="mr-4">{doc.pages} trang</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center border-t">
            <div className="text-sm text-muted-foreground">Cập nhật: {doc.date}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Download className="h-4 w-4 mr-1" />
              <span>{doc.downloads} lượt tải</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
