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

export default function DocumentDetailPage({ params }: { params: { id: string } }) {
  // Giả lập dữ liệu tài liệu
  const document = {
    id: params.id,
    title: "Nhập môn Trí tuệ nhân tạo và Học máy",
    description:
      "Tài liệu giới thiệu về các khái niệm cơ bản trong lĩnh vực Trí tuệ nhân tạo và Học máy, bao gồm các thuật toán, mô hình và ứng dụng thực tế. Phù hợp cho người mới bắt đầu tìm hiểu về AI và Machine Learning.",
    category: "Công nghệ thông tin",
    subcategory: "Trí tuệ nhân tạo",
    format: "PDF",
    author: {
      name: "TS. Nguyễn Văn A",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Giảng viên Đại học Bách Khoa Hà Nội",
    },
    pages: 45,
    size: "2.3 MB",
    language: "Tiếng Việt",
    publishDate: "15/05/2023",
    lastUpdate: "20/05/2023",
    downloads: 1234,
    views: 5678,
    rating: 4.5,
    ratingCount: 123,
    image: "/placeholder.svg?height=400&width=300",
    tags: ["AI", "Machine Learning", "Deep Learning", "Neural Networks", "Python"],
    tableOfContents: [
      {
        title: "Chương 1: Giới thiệu về Trí tuệ nhân tạo",
        sections: ["1.1 Lịch sử phát triển", "1.2 Các ứng dụng hiện tại", "1.3 Triển vọng tương lai"],
      },
      {
        title: "Chương 2: Cơ bản về Học máy",
        sections: ["2.1 Học có giám sát", "2.2 Học không giám sát", "2.3 Học tăng cường"],
      },
      {
        title: "Chương 3: Các thuật toán cơ bản",
        sections: ["3.1 Hồi quy tuyến tính", "3.2 Cây quyết định", "3.3 Mạng nơ-ron nhân tạo"],
      },
      {
        title: "Chương 4: Ứng dụng thực tế",
        sections: ["4.1 Nhận dạng hình ảnh", "4.2 Xử lý ngôn ngữ tự nhiên", "4.3 Dự đoán dữ liệu"],
      },
      {
        title: "Chương 5: Thực hành với Python",
        sections: ["5.1 Cài đặt môi trường", "5.2 Thư viện scikit-learn", "5.3 Thư viện TensorFlow"],
      },
    ],
    relatedDocuments: [
      {
        id: "2",
        title: "Học máy với Python",
        author: "PGS.TS. Trần Thị B",
        image: "/placeholder.svg?height=200&width=150",
        category: "Công nghệ thông tin",
        format: "PDF",
      },
      {
        id: "3",
        title: "Deep Learning cơ bản và nâng cao",
        author: "GS. Lê Văn C",
        image: "/placeholder.svg?height=200&width=150",
        category: "Công nghệ thông tin",
        format: "PDF",
      },
      {
        id: "4",
        title: "Xử lý ngôn ngữ tự nhiên với Python",
        author: "TS. Phạm Thị D",
        image: "/placeholder.svg?height=200&width=150",
        category: "Công nghệ thông tin",
        format: "DOCX",
      },
    ],
    comments: [
      {
        id: "1",
        user: {
          name: "Nguyễn Văn X",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content:
          "Tài liệu rất hữu ích cho người mới bắt đầu tìm hiểu về AI. Cách trình bày dễ hiểu và có nhiều ví dụ thực tế.",
        date: "10/06/2023",
        likes: 15,
      },
      {
        id: "2",
        user: {
          name: "Trần Thị Y",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content:
          "Phần giới thiệu về các thuật toán học máy rất chi tiết. Tuy nhiên, phần thực hành với Python còn hơi ngắn, hy vọng sẽ có phiên bản cập nhật với nhiều ví dụ code hơn.",
        date: "05/06/2023",
        likes: 8,
      },
      {
        id: "3",
        user: {
          name: "Lê Văn Z",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Cảm ơn tác giả đã chia sẻ tài liệu chất lượng. Đã giúp tôi hiểu rõ hơn về các khái niệm cơ bản.",
        date: "01/06/2023",
        likes: 5,
      },
    ],
  }

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
              Tải xuống ({document.format})
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
                {document.format}
              </Badge>
              <Badge variant="outline" className="bg-muted">
                {document.category}
              </Badge>
              <Badge variant="outline" className="bg-muted">
                {document.subcategory}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold mb-3">{document.title}</h1>
            <p className="text-muted-foreground mb-4">{document.description}</p>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex">
                {Array(Math.floor(document.rating))
                  .fill(0)
                  .map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                {document.rating % 1 > 0 && <StarIcon className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
                {Array(5 - Math.ceil(document.rating))
                  .fill(0)
                  .map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-muted-foreground" />
                  ))}
              </div>
              <span className="text-sm">
                {document.rating} ({document.ratingCount} đánh giá)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Tác giả</p>
                <p>{document.author.name}</p>
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
                <p>{document.publishDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Ngôn ngữ</p>
                <p>{document.language}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Lượt tải</p>
                <p>{document.downloads.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Lượt xem</p>
                <p>{document.views.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Thẻ</h3>
            <div className="flex flex-wrap gap-2">
              {document.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={document.author.avatar || "/placeholder.svg"} alt={document.author.name} />
                <AvatarFallback>{document.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{document.author.name}</p>
                <p className="text-sm text-muted-foreground">{document.author.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Content Tabs */}
      <Tabs defaultValue="contents" className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="contents">Mục lục</TabsTrigger>
          <TabsTrigger value="comments">Bình luận ({document.comments.length})</TabsTrigger>
          <TabsTrigger value="related">Tài liệu liên quan</TabsTrigger>
        </TabsList>

        <TabsContent value="contents" className="space-y-6">
          <div className="space-y-4">
            {document.tableOfContents.map((chapter, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-medium">{chapter.title}</h3>
                <ul className="space-y-1 pl-6">
                  {chapter.sections.map((section, sIndex) => (
                    <li key={sIndex} className="text-muted-foreground">
                      {section}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comments" className="space-y-6">
          <div className="space-y-6">
            {document.comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{comment.user.name}</p>
                          <p className="text-sm text-muted-foreground">{comment.date}</p>
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

        <TabsContent value="related" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {document.relatedDocuments.map((doc) => (
              <Card key={doc.id} className="overflow-hidden">
                <div className="aspect-[3/4] relative bg-muted">
                  <Image src={doc.image || "/placeholder.svg"} alt={doc.title} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {doc.format}
                    </Badge>
                    <Badge variant="outline" className="bg-muted">
                      {doc.category}
                    </Badge>
                  </div>
                  <h3 className="font-medium mb-1">
                    <Link href={`/documents/${doc.id}`} className="hover:underline">
                      {doc.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">{doc.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
