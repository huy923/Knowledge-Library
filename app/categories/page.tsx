import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Download, FileText, Search, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { RowDataPacket } from "mysql2"
import pool from "@/lib/db"

interface CategoryStats extends RowDataPacket {
    category: string
    total_documents: number
    total_downloads: number
    latest_document: {
        id: number
        title: string
        image: string
    }
}

async function getCategoryStats() {
    const [rows] = await pool.execute<CategoryStats[]>(`
    SELECT 
      d.category,
      COUNT(*) as total_documents,
      SUM(d.downloads) as total_downloads,
      JSON_OBJECT(
        'id', d.id,
        'title', d.title,
        'image', d.image
      ) as latest_document
    FROM documents d
    GROUP BY d.category
    ORDER BY total_documents DESC
  `)
    return rows
}

export default async function CategoriesPage() {
    const categories = await getCategoryStats()

    return (
        <div className="container mx-auto py-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold">Danh mục tài liệu</h1>
                <p className="text-muted-foreground">
                    Khám phá các danh mục tài liệu phong phú, từ lập trình đến thiết kế và nhiều lĩnh vực khác
                </p>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    placeholder="Tìm kiếm danh mục..."
                    className="pl-9"
                />
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <Card key={category.category} className="flex flex-col">
                        <CardHeader className="p-0">
                            <div className="relative aspect-[16/9]">
                                <Image
                                    src={category.latest_document.image || "/placeholder.svg"}
                                    alt={category.category}
                                    fill
                                    className="object-cover rounded-t-lg"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <CardTitle className="text-white">
                                        <Link href={`/categories/${category.category.toLowerCase()}`} className="hover:underline">
                                            {category.category}
                                        </Link>
                                    </CardTitle>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Tài liệu</p>
                                        <p className="font-medium">{category.total_documents}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Download className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Lượt tải</p>
                                        <p className="font-medium">{category.total_downloads}</p>
                                    </div>
                                </div>
                            </div>
                            <Button className="w-full" asChild>
                                <Link href={`/categories/${category.category.toLowerCase()}`}>
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    Xem tài liệu
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {categories.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-muted-foreground mb-4">
                        Chưa có danh mục nào được tạo
                    </div>
                    <Button asChild>
                        <Link href="/documents">Xem tất cả tài liệu</Link>
                    </Button>
                </div>
            )}
        </div>
    )
}
