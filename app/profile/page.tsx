import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Download, FileText, Heart, MessageSquare, PenLine, Settings, Share2, Upload } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProfilePage() {
  // Giả lập dữ liệu người dùng
  const user = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Sinh viên ngành Khoa học máy tính tại Đại học Bách Khoa Hà Nội. Quan tâm đến AI, Machine Learning và Phát triển Web.",
    joinDate: "01/01/2023",
    role: "Thành viên",
    stats: {
      documents: 5,
      downloads: 120,
      uploads: 3,
      comments: 25,
      saved: 42,
    },
    savedDocuments: [
      {
        id: "1",
        title: "Nhập môn Trí tuệ nhân tạo và Học máy",
        author: "TS. Nguyễn Văn B",
        image: "/placeholder.svg?height=150&width=100",
        category: "Công nghệ thông tin",
        format: "PDF",
        date: "15/05/2023",
      },
      {
        id: "2",
        title: "Học máy với Python",
        author: "PGS.TS. Trần Thị C",
        image: "/placeholder.svg?height=150&width=100",
        category: "Công nghệ thông tin",
        format: "PDF",
        date: "10/04/2023",
      },
      {
        id: "3",
        title: "Phương pháp nghiên cứu khoa học",
        author: "GS. Lê Văn D",
        image: "/placeholder.svg?height=150&width=100",
        category: "Giáo dục",
        format: "DOCX",
        date: "22/03/2023",
      },
    ],
    uploadedDocuments: [
      {
        id: "4",
        title: "Báo cáo đồ án: Ứng dụng AI trong y tế",
        image: "/placeholder.svg?height=150&width=100",
        category: "Y tế",
        format: "PDF",
        date: "05/05/2023",
        downloads: 45,
        views: 120,
      },
      {
        id: "5",
        title: "Tổng quan về Deep Learning",
        image: "/placeholder.svg?height=150&width=100",
        category: "Công nghệ thông tin",
        format: "PDF",
        date: "20/04/2023",
        downloads: 78,
        views: 210,
      },
      {
        id: "6",
        title: "Hướng dẫn sử dụng TensorFlow",
        image: "/placeholder.svg?height=150&width=100",
        category: "Công nghệ thông tin",
        format: "PDF",
        date: "15/03/2023",
        downloads: 32,
        views: 95,
      },
    ],
    recentActivity: [
      {
        id: "1",
        type: "download",
        document: "Kinh tế học vĩ mô: Lý thuyết và ứng dụng",
        date: "10/06/2023",
        icon: Download,
      },
      {
        id: "2",
        type: "comment",
        document: "Nhập môn Trí tuệ nhân tạo và Học máy",
        date: "05/06/2023",
        icon: MessageSquare,
      },
      {
        id: "3",
        type: "save",
        document: "Phương pháp nghiên cứu khoa học",
        date: "01/06/2023",
        icon: Heart,
      },
      {
        id: "4",
        type: "upload",
        document: "Báo cáo đồ án: Ứng dụng AI trong y tế",
        date: "05/05/2023",
        icon: Upload,
      },
      {
        id: "5",
        type: "share",
        document: "Tổng quan về Deep Learning",
        date: "20/04/2023",
        icon: Share2,
      },
    ],
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground mb-2">{user.email}</p>
              <Badge className="mb-4">{user.role}</Badge>
              <p className="text-sm mb-4">{user.bio}</p>
              <div className="text-sm text-muted-foreground">Thành viên từ: {user.joinDate}</div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <PenLine className="h-4 w-4 mr-2" />
                  Chỉnh sửa
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Cài đặt
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>Thống kê hoạt động</CardTitle>
              <CardDescription>Tổng quan về hoạt động của bạn trên SenseLib</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <p className="text-2xl font-bold">{user.stats.documents}</p>
                  <p className="text-sm text-muted-foreground">Tài liệu</p>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                  <Download className="h-8 w-8 text-primary mb-2" />
                  <p className="text-2xl font-bold">{user.stats.downloads}</p>
                  <p className="text-sm text-muted-foreground">Lượt tải</p>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                  <Upload className="h-8 w-8 text-primary mb-2" />
                  <p className="text-2xl font-bold">{user.stats.uploads}</p>
                  <p className="text-sm text-muted-foreground">Đã tải lên</p>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                  <MessageSquare className="h-8 w-8 text-primary mb-2" />
                  <p className="text-2xl font-bold">{user.stats.comments}</p>
                  <p className="text-sm text-muted-foreground">Bình luận</p>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                  <Heart className="h-8 w-8 text-primary mb-2" />
                  <p className="text-2xl font-bold">{user.stats.saved}</p>
                  <p className="text-sm text-muted-foreground">Đã lưu</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Hoạt động gần đây</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4">
                    <div className="bg-muted p-2 rounded-full">
                      <activity.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p>
                        {activity.type === "download" && "Đã tải xuống"}
                        {activity.type === "comment" && "Đã bình luận về"}
                        {activity.type === "save" && "Đã lưu"}
                        {activity.type === "upload" && "Đã tải lên"}
                        {activity.type === "share" && "Đã chia sẻ"}{" "}
                        <Link href="#" className="font-medium hover:underline">
                          {activity.document}
                        </Link>
                      </p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Profile Content */}
      <Tabs defaultValue="saved" className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="saved">Tài liệu đã lưu</TabsTrigger>
          <TabsTrigger value="uploaded">Tài liệu đã tải lên</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt tài khoản</TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {user.savedDocuments.map((doc) => (
              <Card key={doc.id} className="overflow-hidden">
                <div className="flex h-full">
                  <div className="w-1/3 bg-muted">
                    <Image
                      src={doc.image || "/placeholder.svg"}
                      alt={doc.title}
                      width={100}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        {doc.format}
                      </Badge>
                    </div>
                    <h3 className="font-medium mb-1 line-clamp-2">
                      <Link href={`/documents/${doc.id}`} className="hover:underline">
                        {doc.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{doc.author}</p>
                    <p className="text-xs text-muted-foreground">Đã lưu: {doc.date}</p>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="h-3 w-3 mr-1" />
                        Tải
                      </Button>
                      <Button variant="ghost" size="sm" className="w-8 p-0">
                        <Heart className="h-4 w-4 fill-primary text-primary" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="uploaded" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Tài liệu đã tải lên</h2>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Tải lên tài liệu mới
            </Button>
          </div>
          <div className="space-y-4">
            {user.uploadedDocuments.map((doc) => (
              <Card key={doc.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/6 bg-muted rounded-md overflow-hidden">
                      <Image
                        src={doc.image || "/placeholder.svg"}
                        alt={doc.title}
                        width={100}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-5/6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="bg-primary/10 text-primary">
                              {doc.format}
                            </Badge>
                            <Badge variant="outline" className="bg-muted">
                              {doc.category}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-medium">
                            <Link href={`/documents/${doc.id}`} className="hover:underline">
                              {doc.title}
                            </Link>
                          </h3>
                        </div>
                        <div className="text-sm text-muted-foreground">Tải lên: {doc.date}</div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                        <div className="flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          <span>{doc.downloads} lượt tải</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          <span>{doc.views} lượt xem</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <PenLine className="h-4 w-4 mr-2" />
                          Chỉnh sửa
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4 mr-2" />
                          Chia sẻ
                        </Button>
                        <Button variant="destructive" size="sm">
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
              <CardDescription>Cập nhật thông tin cá nhân của bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="md:w-1/4 flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-2">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Thay đổi ảnh
                  </Button>
                </div>
                <div className="md:w-3/4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Họ</Label>
                      <Input id="first-name" defaultValue="Nguyễn" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Tên</Label>
                      <Input id="last-name" defaultValue="Văn A" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Giới thiệu</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background"
                      defaultValue={user.bio}
                    ></textarea>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Lưu thay đổi</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Đổi mật khẩu</CardTitle>
              <CardDescription>Cập nhật mật khẩu của bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Mật khẩu mới</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Đổi mật khẩu</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông báo</CardTitle>
              <CardDescription>Quản lý cài đặt thông báo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Thông báo qua email</p>
                  <p className="text-sm text-muted-foreground">Nhận thông báo qua email</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="email-notifications" className="sr-only">
                    Thông báo qua email
                  </Label>
                  <input
                    type="checkbox"
                    id="email-notifications"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    defaultChecked
                  />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Thông báo về tài liệu mới</p>
                  <p className="text-sm text-muted-foreground">
                    Nhận thông báo khi có tài liệu mới trong lĩnh vực bạn quan tâm
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="new-document-notifications" className="sr-only">
                    Thông báo về tài liệu mới
                  </Label>
                  <input
                    type="checkbox"
                    id="new-document-notifications"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    defaultChecked
                  />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Thông báo về bình luận</p>
                  <p className="text-sm text-muted-foreground">
                    Nhận thông báo khi có người bình luận về tài liệu của bạn
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="comment-notifications" className="sr-only">
                    Thông báo về bình luận
                  </Label>
                  <input
                    type="checkbox"
                    id="comment-notifications"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    defaultChecked
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Lưu cài đặt</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
