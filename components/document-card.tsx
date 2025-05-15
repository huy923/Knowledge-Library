import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Download, Calendar, FileText } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function DocumentCard({ document }) {
  const fileIcon = getFileIcon(document.fileType)

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <Link href={`/documents/${document.id}`} className="hover:underline">
            <CardTitle className="line-clamp-2">{document.title}</CardTitle>
          </Link>
          {fileIcon}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {document.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{document.description}</p>
        )}

        <div className="flex items-center text-xs text-muted-foreground space-x-3">
          <div className="flex items-center">
            <Eye className="h-3 w-3 mr-1" />
            <span>{document.viewCount}</span>
          </div>
          <div className="flex items-center">
            <Download className="h-3 w-3 mr-1" />
            <span>{document.downloadCount}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formatDistanceToNow(new Date(document.createdAt), { addSuffix: true })}</span>
          </div>
        </div>

        {document.category && (
          <Badge variant="outline" className="mt-3">
            {document.category.name}
          </Badge>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={document.user?.image || "/placeholder.svg"} alt={document.user?.name} />
            <AvatarFallback>{document.user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <span className="text-xs">{document.user?.name}</span>
        </div>

        <Link href={`/documents/${document.id}`} className="text-xs text-primary hover:underline">
          View details
        </Link>
      </CardFooter>
    </Card>
  )
}

function getFileIcon(fileType) {
  if (!fileType) return <FileText className="h-5 w-5 text-muted-foreground" />

  if (fileType.includes("pdf")) {
    return <FileText className="h-5 w-5 text-red-500" />
  } else if (fileType.includes("word") || fileType.includes("docx")) {
    return <FileText className="h-5 w-5 text-blue-500" />
  } else if (fileType.includes("excel") || fileType.includes("xlsx")) {
    return <FileText className="h-5 w-5 text-green-500" />
  } else if (fileType.includes("powerpoint") || fileType.includes("pptx")) {
    return <FileText className="h-5 w-5 text-orange-500" />
  } else {
    return <FileText className="h-5 w-5 text-muted-foreground" />
  }
}
