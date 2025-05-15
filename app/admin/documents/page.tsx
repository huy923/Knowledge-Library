"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Filter, MoreHorizontal, Plus, Search, Trash2, Upload } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AdminDocumentsPage() {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      <div className="flex-1 p-6 lg:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Quản lý tài liệu</h1>
            <p className="text-muted-foreground">Quản lý tất cả tài liệu trên hệ thống</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm tài liệu
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Thêm tài liệu mới</DialogTitle>
                  <DialogDescription>
                    Nhập thông tin tài liệu mới. Bạn có thể tải lên file hoặc nhập URL.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Tiêu đề
                    </Label>
                    <Input id="title" placeholder="Nhập tiêu đề tài liệu" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="author" className="text-right">
                      Tác giả
                    </Label>
                    <Input id="author" placeholder="Nhập tên tác giả" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Danh mục
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Công nghệ thông tin</SelectItem>
                        <SelectItem value="business">Kinh tế & Kinh doanh</SelectItem>
                        <SelectItem value="education">Giáo dục</SelectItem>
                        <SelectItem value="science">Khoa học tự nhiên</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right">
                      Mô tả
                    </Label>
                    <Textarea id="description" placeholder="Nhập mô tả tài liệu" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="file" className="text-right">
                      File
                    </Label>
                    <div className="col-span-3">
                      <div className="border-2 border-dashed rounded-lg p-4 text-center">
                        <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Kéo và thả file vào đây hoặc click để chọn file
                        </p>
                        <Input id="file" type="file" className="hidden" />
                        <Button variant="outline" size="sm" asChild>
                          <label htmlFor="file">Chọn file</label>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenDialog(false)}>
                    Hủy
                  </Button>
                  <Button type="submit">Lưu tài liệu</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <TabsList className="mb-0">
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="pending">Chờ duyệt</TabsTrigger>
              <TabsTrigger value="approved">Đã duyệt</TabsTrigger>
              <TabsTrigger value="rejected">Từ chối</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Tìm kiếm tài liệu..." className="pl-10" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="all">
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
                              <DropdownMenuItem>
                                {i % 3 === 0 ? "Hủy duyệt" : i % 3 === 1 ? "Duyệt" : "Duyệt lại"}
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

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Tài liệu chờ duyệt</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">ID</TableHead>
                      <TableHead>Tên tài liệu</TableHead>
                      <TableHead>Danh mục</TableHead>
                      <TableHead>Người tải lên</TableHead>
                      <TableHead>Ngày tải lên</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 5 }).map((_, i) => (
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
                              <p className="font-medium">Tài liệu chờ duyệt {i + 1}</p>
                              <p className="text-xs text-muted-foreground">PDF, 1.8 MB</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>Công nghệ thông tin</TableCell>
                        <TableCell>Nguyễn Văn {String.fromCharCode(65 + i)}</TableCell>
                        <TableCell>10/0{i + 1}/2023</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="h-8">
                              Xem
                            </Button>
                            <Button size="sm" className="h-8">
                              Duyệt
                            </Button>
                            <Button variant="destructive" size="sm" className="h-8">
                              Từ chối
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved">
            <Card>
              <CardHeader>
                <CardTitle>Tài liệu đã duyệt</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">ID</TableHead>
                      <TableHead>Tên tài liệu</TableHead>
                      <TableHead>Danh mục</TableHead>
                      <TableHead>Tác giả</TableHead>
                      <TableHead>Lượt tải</TableHead>
                      <TableHead>Ngày duyệt</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 5 }).map((_, i) => (
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
                              <p className="font-medium">Tài liệu đã duyệt {i + 1}</p>
                              <p className="text-xs text-muted-foreground">PDF, 3.2 MB</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>Kinh tế & Kinh doanh</TableCell>
                        <TableCell>TS. Trần Thị {String.fromCharCode(65 + i)}</TableCell>
                        <TableCell>{(i + 1) * 123}</TableCell>
                        <TableCell>05/0{i + 1}/2023</TableCell>
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
                              <DropdownMenuItem>Hủy duyệt</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rejected">
            <Card>
              <CardHeader>
                <CardTitle>Tài liệu bị từ chối</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">ID</TableHead>
                      <TableHead>Tên tài liệu</TableHead>
                      <TableHead>Người tải lên</TableHead>
                      <TableHead>Lý do từ chối</TableHead>
                      <TableHead>Ngày từ chối</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 5 }).map((_, i) => (
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
                              <p className="font-medium">Tài liệu bị từ chối {i + 1}</p>
                              <p className="text-xs text-muted-foreground">PDF, 2.5 MB</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>Lê Văn {String.fromCharCode(65 + i)}</TableCell>
                        <TableCell>{i % 2 === 0 ? "Vi phạm bản quyền" : "Nội dung không phù hợp"}</TableCell>
                        <TableCell>20/0{i + 1}/2023</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="h-8">
                              Xem
                            </Button>
                            <Button size="sm" className="h-8">
                              Duyệt lại
                            </Button>
                            <Button variant="destructive" size="sm" className="h-8">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
