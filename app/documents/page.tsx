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

export default function DocumentsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Thư viện tài liệu</h1>
          <p className="text-muted-foreground">Khám phá hơn 10,000+ tài liệu đa lĩnh vực</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <List className="h-4 w-4 mr-2" />
            Danh sách
          </Button>
          <Button variant="outline" size="sm">
            <Grid3X3 className="h-4 w-4 mr-2" />
            Lưới
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Bộ lọc
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Tìm kiếm tài liệu, tác giả, từ khóa..." className="pl-10" />
          </div>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="newest">
            <SelectTrigger>
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Mới nhất</SelectItem>
              <SelectItem value="popular">Phổ biến nhất</SelectItem>
              <SelectItem value="rating">Đánh giá cao</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lĩnh vực</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {["Công nghệ thông tin", "Kinh tế", "Khoa học", "Giáo dục", "Y tế", "Kỹ thuật"].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={`category-${category}`} />
                  <label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                    {category}
                  </label>
                </div>
              ))}
              <Button variant="link" size="sm" className="px-0">
                Xem thêm
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Định dạng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {["PDF", "DOCX", "PPTX", "Video", "Audio", "Hình ảnh"].map((format) => (
                <div key={format} className="flex items-center space-x-2">
                  <Checkbox id={`format-${format}`} />
                  <label htmlFor={`format-${format}`} className="text-sm cursor-pointer">
                    {format}
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Đánh giá</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer flex items-center">
                    {Array(rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    {Array(5 - rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-muted-foreground" />
                      ))}
                    <span className="ml-1">trở lên</span>
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Document List */}
        <div className="md:col-span-3 space-y-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="popular">Phổ biến</TabsTrigger>
              <TabsTrigger value="recent">Gần đây</TabsTrigger>
              <TabsTrigger value="recommended">Đề xuất</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4 pt-4">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <DocumentCard key={i} />
                ))}
              <div className="flex justify-center pt-4">
                <Button variant="outline">Xem thêm</Button>
              </div>
            </TabsContent>
            <TabsContent value="popular" className="space-y-4 pt-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <DocumentCard key={i} />
                ))}
            </TabsContent>
            <TabsContent value="recent" className="space-y-4 pt-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <DocumentCard key={i} />
                ))}
            </TabsContent>
            <TabsContent value="recommended" className="space-y-4 pt-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <DocumentCard key={i} />
                ))}
            </TabsContent>
          </Tabs>
        </div>
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
