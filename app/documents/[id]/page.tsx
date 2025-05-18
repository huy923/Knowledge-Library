import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Calendar,
  Download,
  Eye,
  FileText,
  Heart,
  MessageSquare,
  Share2,
  StarIcon,
  ThumbsUp,
  User,
} from "lucide-react"
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

interface Comment extends RowDataPacket {
  id: number
  document_id: number
  user_id: number
  content: string
  likes: number
  created_at: Date
  updated_at: Date
  username: string
  email: string
}

async function getDocument(id: string) {
  const [rows] = await pool.execute<Document[]>("SELECT * FROM documents WHERE id = ?", [id])
  return rows[0]
}

async function getComments(documentId: string) {
  const [rows] = await pool.execute<Comment[]>(
    `SELECT c.*, u.username, u.email 
     FROM comments c 
     JOIN users u ON c.user_id = u.id 
     WHERE c.document_id = ? 
     ORDER BY c.created_at DESC`,
    [documentId]
  )
  return rows
}
export default async function DocumentDetailPage({ params }: { params: { id: string } }) {
  const document = await getDocument(params.id)
  if (!document) {
    return <div>Document not found</div>
  }
  const comments = await getComments(params.id)

  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-foreground">
              Trang chủ
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/documents" className="hover:text-foreground">
              Tài liệu
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href={`/categories/${document.category}`} className="hover:text-foreground">
              {document.category}
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground font-medium truncate max-w-[200px]">{document.title}</li>
        </ol>
      </nav>

      {/* Document Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Document Image */}
        <div className="md:col-span-1">
          <div className="bg-muted rounded-lg overflow-hidden">
            <Image
              src={document.image || "/placeholder.svg"}
              alt={document.title}
              width={300}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="mt-4 space-y-4">
            <Button className="w-full" size="lg">
              <Download className="mr-2 h-4 w-4" />
              Tải xuống ({document.file_type})
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Heart className="mr-2 h-4 w-4" />
                Lưu
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="mr-2 h-4 w-4" />
                Chia sẻ
              </Button>
            </div>
          </div>
        </div>

        {/* Document Info */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {document.file_type}
              </Badge>
              <Badge variant="outline" className="bg-muted">
                {document.category}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold mb-3">{document.title}</h1>
            <p className="text-muted-foreground mb-4">{document.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Tác giả</p>
                <p>{document.author}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Số trang</p>
                <p>{document.pages} trang</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Ngày xuất bản</p>
                <p>{new Date(document.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Lượt tải</p>
                <p>{document.downloads.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Content Tabs */}
      <Tabs defaultValue="comments" className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-1">
          <TabsTrigger value="comments">Bình luận ({comments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="comments" className="space-y-6">
          <div className="space-y-6">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" alt={comment.username} />
                      <AvatarFallback>{comment.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{comment.username}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {comment.likes}
                        </Button>
                      </div>
                      <p className="mt-2">{comment.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">Thêm bình luận</h3>
                <div className="space-y-4">
                  <textarea
                    className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background"
                    placeholder="Viết bình luận của bạn..."
                  ></textarea>
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Gửi bình luận
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
