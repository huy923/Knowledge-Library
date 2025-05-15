"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { UploadIcon as FileUpload, Upload, Check, X, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { createDocument } from "@/lib/actions/document-actions"
import { useRouter } from "next/navigation"

export function UploadDocumentForm({ categories, subcategories }) {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFileUrl, setUploadedFileUrl] = useState("")
  const [fileDetails, setFileDetails] = useState({ size: 0, type: "" })
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    subcategoryId: "",
    visibility: "PUBLIC",
    allowComments: true,
    allowDownload: true,
  })
  const [error, setError] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const filteredSubcategories = selectedCategory
    ? subcategories.filter((sub) => sub.categoryId === selectedCategory)
    : []

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        // 50MB limit
        setError("File size exceeds 50MB limit")
        return
      }
      setSelectedFile(file)
      setFileDetails({
        size: file.size,
        type: file.type,
      })
      setError("")
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === "categoryId") {
      setSelectedCategory(value)
      setFormData((prev) => ({ ...prev, subcategoryId: "" }))
    }
  }

  const uploadFile = async () => {
    if (!selectedFile) return

    setUploading(true)
    setUploadProgress(0)

    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      // Simulate progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval)
            return 95
          }
          return prev + 5
        })
      }, 300)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      clearInterval(interval)
      setUploadProgress(100)

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      setUploadedFileUrl(data.url)
      return data
    } catch (error) {
      setError("File upload failed. Please try again.")
      setUploading(false)
      setUploadProgress(0)
      return null
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedFile) {
      setError("Please select a file to upload")
      return
    }

    if (!formData.title || !formData.categoryId) {
      setError("Please fill in all required fields")
      return
    }

    // Upload file first
    const uploadResult = await uploadFile()
    if (!uploadResult) return

    // Create document in database
    const documentFormData = new FormData()
    documentFormData.append("title", formData.title)
    documentFormData.append("description", formData.description)
    documentFormData.append("fileUrl", uploadResult.url)
    documentFormData.append("fileType", uploadResult.type)
    documentFormData.append("fileSize", uploadResult.size.toString())
    documentFormData.append("categoryId", formData.categoryId)
    if (formData.subcategoryId) {
      documentFormData.append("subcategoryId", formData.subcategoryId)
    }
    documentFormData.append("visibility", formData.visibility)
    documentFormData.append("allowComments", formData.allowComments.toString())
    documentFormData.append("allowDownload", formData.allowDownload.toString())

    const result = await createDocument(documentFormData)

    if (result.success) {
      router.push(`/documents/${result.documentId}`)
    } else {
      setError(result.error || "Failed to create document")
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="file">Document File</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                {!selectedFile ? (
                  <>
                    <FileUpload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your file here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Supported formats: PDF, DOCX, PPTX, XLSX, TXT (Max 50MB)
                    </p>
                    <Input
                      id="file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.docx,.pptx,.xlsx,.txt"
                    />
                    <Button asChild size="sm">
                      <label htmlFor="file">Select File</label>
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileUpload className="h-8 w-8 text-primary" />
                      <div className="text-left">
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" type="button" onClick={() => setSelectedFile(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter document title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter document description"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select value={formData.categoryId} onValueChange={(value) => handleSelectChange("categoryId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subcategory">Subcategory</Label>
                <Select
                  value={formData.subcategoryId}
                  onValueChange={(value) => handleSelectChange("subcategoryId", value)}
                  disabled={!selectedCategory || filteredSubcategories.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredSubcategories.map((subcategory) => (
                      <SelectItem key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visibility">Visibility</Label>
              <Select value={formData.visibility} onValueChange={(value) => handleSelectChange("visibility", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PUBLIC">Public - Anyone can view</SelectItem>
                  <SelectItem value="LIMITED">Limited - Registered users only</SelectItem>
                  <SelectItem value="PRIVATE">Private - Only you can view</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            {uploading ? (
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            ) : (
              <Button type="submit" className="w-full" disabled={uploading}>
                {uploading ? (
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                ) : uploadedFileUrl ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Document Uploaded
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" /> Upload Document
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </form>
  )
}
