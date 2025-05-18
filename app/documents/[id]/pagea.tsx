'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  BookOpen,
  Calendar,
  FileText,
  Heart,
  MessageSquare,
  Share2,
  StarIcon,
  ThumbsUp,
  User,
} from 'lucide-react'
interface Document {
  id: number
  title: string
  description: string
  file_size: string
  file_type: string
  category: string
  created_at: string
  updated_at: string
  image: string
  link_file: string
  rating: number | 0
  ratingCount: number | 0
  views: number | 0
  downloads: number | 0
  author: Author | null
  tags: string[]
  comments: Comment[]
  pages: number | 0
  language: string | "vi"
}

export default function DocumentDetail() {
  const params = useParams()
  const [document, setDocument] = useState<Document | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(`/api/documents/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch document')
        }
        const data = await response.json()
        setDocument(data)
      } catch (err) {
        setError('Failed to load document details')
        console.error('Error fetching document:', err)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchDocument()
    }
  }, [params.id])

  const handleDownload = async () => {
    if (!document?.link_file) return

    try {
      const baseUrl = window.location.origin
      const fileUrl = `${baseUrl}${document.link_file}`

      console.log('Attempting to download from:', fileUrl) 

      const response = await fetch(fileUrl)
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status} ${response.statusText}`)
      }

      // Check if the response is actually a file
      const contentType = response.headers.get('content-type')
      if (!contentType) {
        throw new Error('Invalid response: No content type')
      }

      // Get the filename from the URL or use the document title
      const filename = document.link_file.split('/').pop() || document.title

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      // Create and trigger download
      const link = window.document.createElement('a')
      link.href = url
      link.download = filename
      window.document.body.appendChild(link)
      link.click()
      window.document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Error downloading file:', err)
      alert(`Failed to download file: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !document) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error || 'Document not found'}</p>
          <Link href="/documents">
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Documents
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // return (
  //   <div className="container mx-auto p-4">
  //     <Link href="/documents">
  //       <Button variant="ghost" className="mb-4">
  //         <ArrowLeft className="mr-2 h-4 w-4" />
  //         Back to Documents
  //       </Button>
  //     </Link>

  //     <div className="gap-6">
  //       <Card>
  //         <CardHeader>
  //           <CardTitle className="text-2xl font-bold">{document.title}</CardTitle>
  //         </CardHeader>
  //         <CardContent>
  //           <div className="aspect-video relative mb-4 ">
  //             <Image
  //               src={document.image}
  //               alt={document.title}
  //               fill
  //               className="rounded-l w-auto h-auto"
  //             />
  //           </div>
  //           <div className="space-y-4">
  //             <div>
  //               <h3 className="font-semibold mb-2">Description</h3>
  //               <p className="text-gray-600">{document.description}</p>
  //             </div>
  //             <div className="grid grid-cols-2 gap-4">
  //               <div>
  //                 <h3 className="font-semibold mb-2">Category</h3>
  //                 <p className="text-gray-600">{document.category}</p>
  //               </div>
  //               <div>
  //                 <h3 className="font-semibold mb-2">File Type</h3>
  //                 <p className="text-gray-600">{document.file_type}</p>
  //               </div>
  //               <div>
  //                 <h3 className="font-semibold mb-2">File Size</h3>
  //                 <p className="text-gray-600">{document.file_size}</p>
  //               </div>
  //             </div>
  //             <div>
  //               <h3 className="font-semibold mb-2">Last Updated</h3>
  //               <p className="text-gray-600">
  //                 {new Date(document.updated_at).toLocaleDateString()}
  //               </p>
  //             </div>
  //             <div className="pt-4">
  //               <Button
  //                 className="w-full"
  //                 onClick={handleDownload}
  //                 disabled={!document.link_file}
  //               >
  //                 <Download className="mr-2 h-4 w-4" />
  //                 {document.link_file ? 'Download Document' : 'No Download Available'}
  //               </Button>
  //             </div>
  //           </div>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   </div>
  // )
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
              Tải xuống ({document.title})
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
                {document.title}
              </Badge>
              <Badge variant="outline" className="bg-muted">
                {document.category}
              </Badge>
              <Badge variant="outline" className="bg-muted">
                {/* {document.subcategory} */}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold mb-3">{document.title}</h1>
            <p className="text-muted-foreground mb-4">{document.description}</p>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex">
                {Array(Math.floor(document.rating || 0))
                  .fill(0)
                  .map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                {document.rating % 1 > 0 && <StarIcon className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
                {Array(5 - Math.ceil(document.rating || 0))
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
                <p>{document.updated_at}</p>
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
        </div>
      </div>

      {/* Document Content Tabs */}
      <Tabs defaultValue="contents" className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="contents">Mục lục</TabsTrigger>
          <TabsTrigger value="comments">Bình luận ({document.comments.length})</TabsTrigger>
          <TabsTrigger value="related">Tài liệu liên quan</TabsTrigger>
        </TabsList>

        {/* <TabsContent value="contents" className="space-y-6">
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
        </TabsContent> */}

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
            {/* {document.relatedDocuments.map((doc) => (
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
            ))} */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
