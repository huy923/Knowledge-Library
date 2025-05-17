'use client'

import { useEffect, useState } from "react"
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
import { useRouter } from "next/navigation"

interface DashboardStats {
  totalDocuments: number
  totalUsers: number
  totalDownloads: number
  newDocuments: number
}

interface Document {
  id: number
  title: string
  category: string
  author: string
  createdAt: string
  status: 'approved' | 'pending' | 'rejected'
  fileSize: string
  fileType: string
}

export default function AdminPage() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalDocuments: 0,
    totalUsers: 0,
    totalDownloads: 0,
    newDocuments: 0
  })
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    // Check admin authentication
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/users', { credentials: 'include' })
        if (!res.ok) throw new Error('Not authenticated')
        const data = await res.json()
        if (!data.admin) throw new Error('Not authenticated')
      } catch {
        router.replace('/admin/login')
        return
      } finally {
        setCheckingAuth(false)
      }
    }
    checkAuth()
  }, [router])

  useEffect(() => {
    if (!checkingAuth) fetchDashboardData()
    // eslint-disable-next-line
  }, [checkingAuth])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      // Fetch dashboard stats
      const statsRes = await fetch('/api/admin/stats')
      if (!statsRes.ok) throw new Error('Failed to fetch stats')
      const statsData = await statsRes.json()
      setStats(statsData)

      // Fetch documents
      const docsRes = await fetch('/api/admin/documents')
      if (!docsRes.ok) throw new Error('Failed to fetch documents')
      const docsData = await docsRes.json()
      setDocuments(docsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleAddDocument = () => {
    router.push('/admin/documents/new')
  }

  const handleDeleteDocument = async (id: number) => {
    if (!confirm('Are you sure you want to delete this document?')) return

    try {
      const res = await fetch(`/api/admin/documents/${id}`, {
        method: 'DELETE'
      })

      if (!res.ok) throw new Error('Failed to delete document')

      // Refresh documents list
      fetchDashboardData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete document')
    }
  }

  if (checkingAuth) {
    return <div className="flex items-center justify-center min-h-screen">Checking authentication...</div>
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Bảng điều khiển quản trị</h1>
          <p className="text-muted-foreground">Quản lý và giám sát hoạt động của SenseLib</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAddDocument}>
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
              <p className="text-2xl font-bold">{stats.totalDocuments}</p>
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
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
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
              <p className="text-2xl font-bold">{stats.totalDownloads}</p>
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
              <p className="text-2xl font-bold">{stats.newDocuments}</p>
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
              <Button size="sm" onClick={handleAddDocument}>
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
                    {documents.map((doc) => (
                      <tr
                        key={doc.id}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle">{doc.id}</td>
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
                              <p className="font-medium">{doc.title}</p>
                              <p className="text-xs text-muted-foreground">{doc.fileType}, {doc.fileSize}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">{doc.category}</td>
                        <td className="p-4 align-middle">{doc.author}</td>
                        <td className="p-4 align-middle">{doc.createdAt}</td>
                        <td className="p-4 align-middle">
                          <Badge
                            variant="outline"
                            className={`${doc.status === 'approved'
                              ? 'bg-green-50 text-green-600 border-green-200'
                              : doc.status === 'pending'
                                ? 'bg-yellow-50 text-yellow-600 border-yellow-200'
                                : 'bg-red-50 text-red-600 border-red-200'
                              }`}
                          >
                            {doc.status === 'approved' ? 'Đã duyệt' : doc.status === 'pending' ? 'Đang chờ' : 'Từ chối'}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-600"
                              onClick={() => handleDeleteDocument(doc.id)}
                            >
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
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Quản lý người dùng</CardTitle>
              <CardDescription>Danh sách người dùng và quyền truy cập</CardDescription>
            </CardHeader>
            <CardContent>
              {/* User management content will go here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Quản lý danh mục</CardTitle>
              <CardDescription>Thêm, sửa, xóa danh mục tài liệu</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Category management content will go here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo hệ thống</CardTitle>
              <CardDescription>Xem và xuất báo cáo thống kê</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Reports content will go here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
