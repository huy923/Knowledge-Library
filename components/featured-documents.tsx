"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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
}

export default function FeaturedDocuments() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('/api/documents')
        if (!response.ok) throw new Error('Failed to fetch documents')
        const data = await response.json()
        setDocuments(data.documents)
      } catch (error) {
        console.error('Error fetching documents:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc) => (
        <Card key={doc.id} className="overflow-hidden flex flex-col">
          <div className="aspect-video relative bg-muted">
            <Link href={`/documents/${doc.id}`} className="object-cover transition-shadow duration-300 ease-in-out transform hover:scale-105 hover:brightness-110 rounded-md">
              <div className="relative aspect-[3/4]">
                <Image
                  src={doc.image || "/placeholder.svg"}
                  alt={doc.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
            </Link>
            <div className="absolute top-2 left-2 flex gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {doc.file_type}
              </Badge>
              <Badge variant="outline" className="bg-muted">
                {doc.category}
              </Badge>
            </div>
          </div>
          <CardContent className="flex-1 p-4">
            <h3 className="text-lg font-bold mb-2 line-clamp-2">
              <Link href={`/documents/${doc.id}`} className="hover:underline">
                {doc.title}
              </Link>
            </h3>
            <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{doc.description}</p>
            <div className="flex items-center text-sm text-muted-foreground mt-2">
              <FileText className="h-4 w-4 mr-1" />
              <span>{doc.file_size}</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center border-t">
            <div className="text-sm text-muted-foreground">
              Cập nhật: {new Date(doc.updated_at).toLocaleDateString()}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
