import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart3,
  BookOpen,
  Check,
  Download,
  FileText,
  LineChart,
  PieChart,
  Plus,
  Search,
  Settings,
  Trash2,
  Upload,
  User,
  Users,
  X,
} from "lucide-react"
import Image from "next/image"

export default function AdminPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Bảng điều khiển quản trị</h1>
          <p className="text-muted-foreground">Quản lý và giám sát hoạt động của SenseLib</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Thêm tài liệu
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Cài đặt hệ thống
          </Button>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tổng số tài liệu</p>
              <p className="text-2xl font-bold">10,245</p>
              <p className="text-xs text-green-500">+125 trong tháng này</p>
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
              <p className="text-2xl font-bold">52,143</p>
              <p className="text-xs text-green-500">+843 trong tháng này</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Download className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lượt tải</p>
              <p className="text-2xl font-bold">124,568</p>
              <p className="text-xs text-green-500">+12% so với tháng trước</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tài liệu mới</p>
              <p className="text-2xl font-bold">325</p>
              <p className="text-xs text-green-500">+18% so với tháng trước</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Thống kê tài liệu theo lĩnh vực</CardTitle>
            <CardDescription>Phân bố tài liệu theo các lĩnh vực</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="flex items-center justify-center w-48 h-48 rounded-full border-8 border-primary relative">
                {/* <PieChart className="h-12 w-12 text-primary" /> */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold">45%</p>
                    <p className="text-xs text-muted-foreground">Công nghệ</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-sm">Công nghệ (45%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm">Kinh tế (25%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Giáo dục (15%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm">Khác (15%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Hoạt động người dùng</CardTitle>
            <CardDescription>Số lượng tải xuống và tải lên theo thời gian</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="w-full h-full flex items-end justify-between gap-2 pt-8 pb-4 px-4 border-b border-l">
                <LineChart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-12 text-muted-foreground opacity-20" />
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 w-full">
                    <div
                      className="w-full bg-primary rounded-t"
                      style={{ height: `${Math.floor(Math.random() * 100) + 20}px` }}
                    ></div>
                    <span className="text-xs text-muted-foreground">{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-8 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-sm">Tải xuống</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm">Tải lên</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Tabs */}
      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-4">
          <TabsTrigger value="documents">Quản lý tài liệu</TabsTrigger>
          <TabsTrigger value="users">Quản lý người dùng</TabsTrigger>
          <TabsTrigger value="categories">Danh mục</TabsTrigger>
          <TabsTrigger value="reports">Báo cáo</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Tìm kiếm tài liệu..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Xuất báo cáo
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Thêm tài liệu
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Tên tài liệu</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Danh mục</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Tác giả</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Ngày tạo</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Trạng thái</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <tr
                        key={i}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle">{i + 1}</td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-muted rounded overflow-hidden">
                              <Image
                                src={`/placeholder.svg?height=40&width=40`}
                                alt="Document thumbnail"
                                width={40}
                                height={40}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">Nhập môn Trí tuệ nhân tạo và Học máy</p>
                              <p className="text-xs text-muted-foreground">PDF, 2.3 MB</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">Công nghệ thông tin</td>
                        <td className="p-4 align-middle">TS. Nguyễn Văn A</td>
                        <td className="p-4 align-middle">15/05/2023</td>
                        <td className="p-4 align-middle">
                          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                            Đã duyệt
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4">
              <div className="text-sm text-muted-foreground">Hiển thị 1-5 của 125 tài liệu</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Trước
                </Button>
                <Button variant="outline" size="sm">
                  Tiếp
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Tìm kiếm người dùng..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Xuất báo cáo
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Thêm người dùng
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Tên người dùng</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Vai trò</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Ngày đăng ký</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Trạng thái</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <tr
                        key={i}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle">{i + 1}</td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt="Avatar" />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Nguyễn Văn {String.fromCharCode(65 + i)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">user{i + 1}@example.com</td>
                        <td className="p-4 align-middle">
                          {i === 0 ? "Quản trị viên" : i === 1 ? "Biên tập viên" : "Thành viên"}
                        </td>
                        <td className="p-4 align-middle">15/0{i + 1}/2023</td>
                        <td className="p-4 align-middle">
                          <Badge
                            variant="outline"
                            className={
                              i % 3 === 0
                                ? "bg-green-50 text-green-600 border-green-200"
                                : i % 3 === 1
                                  ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                                  : "bg-red-50 text-red-600 border-red-200"
                            }
                          >
                            {i % 3 === 0 ? "Hoạt động" : i % 3 === 1 ? "Chờ xác nhận" : "Bị khóa"}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <User className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4">
              <div className="text-sm text-muted-foreground">Hiển thị 1-5 của 52 người dùng</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Trước
                </Button>
                <Button variant="outline" size="sm">
                  Tiếp
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Quản lý danh mục</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Thêm danh mục
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Công nghệ thông tin",
              "Kinh tế & Kinh doanh",
              "Khoa học tự nhiên",
              "Giáo dục",
              "Y tế & Sức khỏe",
              "Kỹ thuật",
            ].map((category, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{category}</h3>
                        <p className="text-sm text-muted-foreground">{(i + 1) * 123} tài liệu</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Báo cáo và thống kê</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Xuất báo cáo
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Cài đặt
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tài liệu chờ duyệt</CardTitle>
                <CardDescription>Danh sách tài liệu đang chờ phê duyệt</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-10 px-4 text-left align-middle font-medium">Tên tài liệu</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Người tải lên</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <tr
                          key={i}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-2 px-4 align-middle">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 bg-muted rounded overflow-hidden">
                                <Image
                                  src={`/placeholder.svg?height=32&width=32`}
                                  alt="Document thumbnail"
                                  width={32}
                                  height={32}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <p className="font-medium">Tài liệu chờ duyệt {i + 1}</p>
                            </div>
                          </td>
                          <td className="p-2 px-4 align-middle">Nguyễn Văn {String.fromCharCode(65 + i)}</td>
                          <td className="p-2 px-4 align-middle">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="h-8">
                                <Check className="h-4 w-4 mr-1" />
                                Duyệt
                              </Button>
                              <Button variant="outline" size="sm" className="h-8">
                                <X className="h-4 w-4 mr-1" />
                                Từ chối
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Báo cáo vi phạm</CardTitle>
                <CardDescription>Danh sách báo cáo vi phạm từ người dùng</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-10 px-4 text-left align-middle font-medium">Nội dung</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Người báo cáo</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <tr
                          key={i}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-2 px-4 align-middle">
                            <p className="font-medium">Báo cáo vi phạm bản quyền tài liệu {i + 1}</p>
                            <p className="text-xs text-muted-foreground">15/0{i + 1}/2023</p>
                          </td>
                          <td className="p-2 px-4 align-middle">Nguyễn Văn {String.fromCharCode(65 + i)}</td>
                          <td className="p-2 px-4 align-middle">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="h-8">
                                <Check className="h-4 w-4 mr-1" />
                                Xử lý
                              </Button>
                              <Button variant="outline" size="sm" className="h-8">
                                <X className="h-4 w-4 mr-1" />
                                Bỏ qua
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
