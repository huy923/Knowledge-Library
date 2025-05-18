import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Download, FileText, Search, SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { RowDataPacket } from "mysql2"
import pool from "@/lib/db"

interface Document extends RowDataPacket {
    id: number
    title: string
    description: string
    file_size: string
    file_type: string
    category: string
    author: string
    pages: number
    downloads: number
    image: string
    link_file: string
    created_at: Date
    updated_at: Date
}

async function getDocuments() {
    const [rows] = await pool.execute<Document[]>(
        "SELECT * FROM documents WHERE category = 'Programming' ORDER BY created_at DESC"
    )
    return rows
}

export default async function ProgrammingCategoryPage() {
    const documents = await getDocuments()

    return (
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold">Tài liệu lập trình</h1>
                <p className="text-muted-foreground">
                    Khám phá bộ sưu tập tài liệu lập trình chất lượng cao, từ cơ bản đến nâng cao
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Tìm kiếm tài liệu..."
                            className="pl-9"
                        />
                    </div>
                </div>
                <div className="flex gap-4">
                    <Select defaultValue="newest">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sắp xếp theo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Mới nhất</SelectItem>
                            <SelectItem value="popular">Phổ biến nhất</SelectItem>
                            <SelectItem value="downloads">Lượt tải nhiều</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                        <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc) => (
                    <Card key={doc.id} className="flex flex-col">
                        <CardHeader className="p-0">
                            <div className="relative aspect-[3/4]">
                                <Image
                                    src={doc.image || "/placeholder.svg"}
                                    alt={doc.title}
                                    fill
                                    className="object-cover rounded-t-lg"
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 p-4">
                            <div className="flex flex-wrap gap-2 mb-3">
                                <Badge variant="outline" className="bg-primary/10 text-primary">
                                    {doc.file_type}
                                </Badge>
                                <Badge variant="outline" className="bg-muted">
                                    {doc.category}
                                </Badge>
                            </div>
                            <CardTitle className="line-clamp-2 mb-2">
                                <Link href={`/documents/${doc.id}`} className="hover:underline">
                                    {doc.title}
                                </Link>
                            </CardTitle>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                {doc.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <FileText className="h-4 w-4" />
                                    <span>{doc.pages} trang</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Download className="h-4 w-4" />
                                    <span>{doc.downloads}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                            <Button className="w-full" asChild>
                                <Link href={`/documents/${doc.id}`}>
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    Xem chi tiết
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {documents.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-muted-foreground mb-4">
                        Chưa có tài liệu nào trong danh mục này
                    </div>
                    <Button asChild>
                        <Link href="/documents">Xem tất cả tài liệu</Link>
                    </Button>
                </div>
            )}
        </div>
    )
}
