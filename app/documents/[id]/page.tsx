'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Eye } from "lucide-react"
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

  return (
    <div className="container mx-auto p-4">
      <Link href="/documents">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Documents
        </Button>
      </Link>

      <div className="gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{document.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video relative mb-4 ">
              <Image
                src={document.image}
                alt={document.title}
                fill
                className="rounded-l w-auto h-auto"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{document.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Category</h3>
                  <p className="text-gray-600">{document.category}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">File Type</h3>
                  <p className="text-gray-600">{document.file_type}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">File Size</h3>
                  <p className="text-gray-600">{document.file_size}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Last Updated</h3>
                <p className="text-gray-600">
                  {new Date(document.updated_at).toLocaleDateString()}
                </p>
              </div>
              <div className="pt-4">
                <Button
                  className="w-full"
                  onClick={handleDownload}
                  disabled={!document.link_file}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {document.link_file ? 'Download Document' : 'No Download Available'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
