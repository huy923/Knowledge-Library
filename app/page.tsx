import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, FileText, TrendingUp, Users } from "lucide-react"
import Image from "next/image"
import { FeaturedDocuments } from "@/components/featured-documents"
import { PopularCategories } from "@/components/popular-categories"
import { RecentActivity } from "@/components/recent-activity"

export default function Home() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Hero Section */}
      <section className="relative rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-primary/70 p-8 md:p-12 lg:p-16 text-white">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">SenseLib - Tri thức cho cộng đồng</h1>
            <p className="text-lg md:text-xl opacity-90">
              Khám phá, học hỏi và chia sẻ kiến thức đa lĩnh vực với cộng đồng học tập toàn cầu
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" variant="secondary">
                Khám phá ngay
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/20 hover:text-white"
              >
                Đăng ký miễn phí
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 hidden lg:block">
          <Image
            src="/placeholder.svg?height=300&width=400"
            alt="Học tập trực tuyến"
            width={400}
            height={300}
            className="opacity-90"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tài liệu</p>
              <p className="text-2xl font-bold">10,000+</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Người dùng</p>
              <p className="text-2xl font-bold">50,000+</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lĩnh vực</p>
              <p className="text-2xl font-bold">25+</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lượt truy cập/ngày</p>
              <p className="text-2xl font-bold">15,000+</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Main Content Tabs */}
      <Tabs defaultValue="featured" className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="featured">Nổi bật</TabsTrigger>
          <TabsTrigger value="categories">Danh mục</TabsTrigger>
          <TabsTrigger value="recent">Hoạt động gần đây</TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="space-y-4">
          <h2 className="text-2xl font-bold">Tài liệu nổi bật</h2>
          <FeaturedDocuments />
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <h2 className="text-2xl font-bold">Danh mục phổ biến</h2>
          <PopularCategories />
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <h2 className="text-2xl font-bold">Hoạt động gần đây</h2>
          <RecentActivity />
        </TabsContent>
      </Tabs>

      {/* Features Section */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Tính năng nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tìm kiếm thông minh</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Tìm kiếm nhanh chóng với bộ lọc thông minh theo từ khóa, chủ đề, tác giả và nhiều tiêu chí khác.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Đa dạng định dạng</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Hỗ trợ nhiều định dạng tài liệu: PDF, DOCX, PPTX, video, hình ảnh và nhiều loại khác.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cộng đồng học tập</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Tham gia thảo luận, đặt câu hỏi và chia sẻ kiến thức với cộng đồng người dùng đa dạng.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Trợ lý AI</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Trợ lý AI thông minh giúp tìm kiếm, tóm tắt và gợi ý tài liệu phù hợp với nhu cầu của bạn.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Đồng bộ đa thiết bị</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Truy cập và đồng bộ tài liệu của bạn trên nhiều thiết bị: máy tính, điện thoại, máy tính bảng.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quản lý tài liệu</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Tạo bộ sưu tập, đánh dấu, ghi chú và tổ chức tài liệu theo cách riêng của bạn.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted rounded-xl p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Sẵn sàng khám phá tri thức?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Đăng ký miễn phí ngay hôm nay để truy cập vào kho tàng tri thức đa dạng và tham gia cộng đồng học tập toàn
          cầu.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg">Đăng ký ngay</Button>
          <Button size="lg" variant="outline">
            Tìm hiểu thêm
          </Button>
        </div>
      </section>
    </div>
  )
}
