"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BarChart3,
  Check,
  Download,
  FileText,
  Filter,
  LineChart,
  MoreHorizontal,
  PieChart,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Upload,
  Users,
  X,
} from "lucide-react"
import Image from "next/image"
import { AdminSidebar } from "@/components/admin-sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminDashboardPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      <div className="flex-1 p-6 lg:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Bảng điều khiển</h1>
            <p className="text-muted-foreground">Quản lý và giám sát hoạt động của SenseLib</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Làm mới
            </Button>
            <Button size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Cài đặt
            </Button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

        {/* Main Content */}
        <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="documents">Tài liệu</TabsTrigger>
            <TabsTrigger value="users">Người dùng</TabsTrigger>
            <TabsTrigger value="reports">Báo cáo</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Thống kê tài liệu theo lĩnh vực</CardTitle>
                  <CardDescription>Phân bố tài liệu theo các lĩnh vực</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center h-64">
                    <div className="flex items-center justify-center w-48 h-48 rounded-full border-8 border-primary relative">
                      <PieChart className="h-12 w-12 text-primary" />
                      <div className=" inset-0 flex items-center justify-center">
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

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Hoạt động gần đây</CardTitle>
                <CardDescription>Các hoạt động mới nhất trên hệ thống</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Người dùng</TableHead>
                      <TableHead>Hoạt động</TableHead>
                      <TableHead>Tài liệu</TableHead>
                      <TableHead>Thời gian</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        user: "Nguyễn Văn A",
                        action: "Tải lên",
                        document: "Nhập môn Trí tuệ nhân tạo",
                        time: "5 phút trước",
                        status: "Chờ duyệt",
                      },
                      {
                        user: "Trần Thị B",
                        action: "Tải xuống",
                        document: "Kinh tế học vĩ mô",
                        time: "15 phút trước",
                        status: "Hoàn thành",
                      },
                      {
                        user: "Lê Văn C",
                        action: "Bình luận",
                        document: "Phương pháp nghiên cứu khoa học",
                        time: "30 phút trước",
                        status: "Hoàn thành",
                      },
                      {
                        user: "Phạm Thị D",
                        action: "Báo cáo",
                        document: "Lập trình Python cơ bản",
                        time: "1 giờ trước",
                        status: "Đang xử lý",
                      },
                      {
                        user: "Hoàng Văn E",
                        action: "Đăng ký",
                        document: "",
                        time: "2 giờ trước",
                        status: "Hoàn thành",
                      },
                    ].map((activity, i) => (
                      <TableRow key={i}>
                        <TableCell>{activity.user}</TableCell>
                        <TableCell>{activity.action}</TableCell>
                        <TableCell>{activity.document || "-"}</TableCell>
                        <TableCell>{activity.time}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              activity.status === "Hoàn thành"
                                ? "bg-green-50 text-green-600 border-green-200"
                                : activity.status === "Chờ duyệt"
                                  ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                                  : "bg-blue-50 text-blue-600 border-blue-200"
                            }
                          >
                            {activity.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-center p-4">
                <Button variant="outline" size="sm">
                  Xem tất cả hoyạt động
                </Button>
              </CardFooter>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tài liệu chờ duyệt</CardTitle>
                  <CardDescription>Tài liệu đang chờ phê duyệt</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4">
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
                            <p className="font-medium">Tài liệu chờ duyệt {i + 1}</p>
                            <p className="text-xs text-muted-foreground">Nguyễn Văn {String.fromCharCode(65 + i)}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center p-4">
                  <Button variant="outline" size="sm">
                    Xem tất cả
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Người dùng mới</CardTitle>
                  <CardDescription>Người dùng đăng ký gần đây</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt="Avatar" />
                            <AvatarFallback>{String.fromCharCode(65 + i)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Nguyễn Văn {String.fromCharCode(65 + i)}</p>
                            <p className="text-xs text-muted-foreground">user{i + 1}@example.com</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                          Mới
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center p-4">
                  <Button variant="outline" size="sm">
                    Xem tất cả
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Báo cáo vi phạm</CardTitle>
                  <CardDescription>Báo cáo từ người dùng</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4">
                        <div>
                          <p className="font-medium">Báo cáo vi phạm bản quyền</p>
                          <p className="text-xs text-muted-foreground">Tài liệu: Lập trình Python cơ bản {i + 1}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center p-4">
                  <Button variant="outline" size="sm">
                    Xem tất cả
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Tìm kiếm tài liệu..." className="pl-10" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="approved">Đã duyệt</SelectItem>
                    <SelectItem value="pending">Chờ duyệt</SelectItem>
                    <SelectItem value="rejected">Từ chối</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm tài liệu
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">ID</TableHead>
                      <TableHead>Tên tài liệu</TableHead>
                      <TableHead>Danh mục</TableHead>
                      <TableHead>Tác giả</TableHead>
                      <TableHead>Ngày tạo</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell>Công nghệ thông tin</TableCell>
                        <TableCell>TS. Nguyễn Văn A</TableCell>
                        <TableCell>15/05/2023</TableCell>
                        <TableCell>
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
                            {i % 3 === 0 ? "Đã duyệt" : i % 3 === 1 ? "Chờ duyệt" : "Từ chối"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                              <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-4">
                <div className="text-sm text-muted-foreground">Hiển thị 1-10 của 125 tài liệu</div>
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

          <TabsContent value="users" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Tìm kiếm người dùng..." className="pl-10" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="admin">Quản trị viên</SelectItem>
                    <SelectItem value="editor">Biên tập viên</SelectItem>
                    <SelectItem value="user">Người dùng</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm người dùng
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">ID</TableHead>
                      <TableHead>Tên người dùng</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Vai trò</TableHead>
                      <TableHead>Ngày đăng ký</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt="Avatar" />
                              <AvatarFallback>{String.fromCharCode(65 + i)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Nguyễn Văn {String.fromCharCode(65 + i)}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>user{i + 1}@example.com</TableCell>
                        <TableCell>{i === 0 ? "Quản trị viên" : i === 1 ? "Biên tập viên" : "Người dùng"}</TableCell>
                        <TableCell>15/0{i + 1}/2023</TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Xem hồ sơ</DropdownMenuItem>
                              <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                {i % 3 === 2 ? "Mở khóa tài khoản" : "Khóa tài khoản"}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-4">
                <div className="text-sm text-muted-foreground">Hiển thị 1-10 của 52 người dùng</div>
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

          <TabsContent value="reports" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Tìm kiếm báo cáo..." className="pl-10" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Loại báo cáo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="copyright">Vi phạm bản quyền</SelectItem>
                    <SelectItem value="inappropriate">Nội dung không phù hợp</SelectItem>
                    <SelectItem value="spam">Spam</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Xuất báo cáo
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">ID</TableHead>
                      <TableHead>Loại báo cáo</TableHead>
                      <TableHead>Tài liệu</TableHead>
                      <TableHead>Người báo cáo</TableHead>
                      <TableHead>Ngày báo cáo</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>
                          {i % 3 === 0 ? "Vi phạm bản quyền" : i % 3 === 1 ? "Nội dung không phù hợp" : "Spam"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-muted rounded overflow-hidden">
                              <Image
                                src={`/placeholder.svg?height=32&width=32`}
                                alt="Document thumbnail"
                                width={32}
                                height={32}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <p className="font-medium">Tài liệu {i + 1}</p>
                          </div>
                        </TableCell>
                        <TableCell>Nguyễn Văn {String.fromCharCode(65 + i)}</TableCell>
                        <TableCell>15/0{i + 1}/2023</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              i % 3 === 0
                                ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                                : i % 3 === 1
                                  ? "bg-green-50 text-green-600 border-green-200"
                                  : "bg-red-50 text-red-600 border-red-200"
                            }
                          >
                            {i % 3 === 0 ? "Đang xử lý" : i % 3 === 1 ? "Đã xử lý" : "Từ chối"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                              <DropdownMenuItem>Đánh dấu đã xử lý</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Gỡ tài liệu</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Từ chối báo cáo</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-4">
                <div className="text-sm text-muted-foreground">Hiển thị 1-10 của 35 báo cáo</div>
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
        </Tabs>
      </div>
    </div>
  )
}
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// export default function AdminDashboard() {
//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Users</CardTitle>
//             <CardDescription>Manage user accounts</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">0</p>
//             <p className="text-sm text-gray-500">Total users</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Content</CardTitle>
//             <CardDescription>Manage library content</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">0</p>
//             <p className="text-sm text-gray-500">Total items</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Categories</CardTitle>
//             <CardDescription>Manage content categories</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">0</p>
//             <p className="text-sm text-gray-500">Total categories</p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
