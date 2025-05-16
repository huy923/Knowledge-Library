// API utility functions for making HTTP requests

interface Document {
  id: string
  title: string
  description: string
  fileSize: string
  fileType: string
  category: string
  createdAt: string
}

interface CreateDocumentData {
  title: string
  description: string
  fileSize?: string
  fileType?: string
  category?: string
}

// Get all technology documents
export async function getTechnologyDocuments(params?: {
  category?: string
  search?: string
}): Promise<Document[]> {
  const searchParams = new URLSearchParams()
  if (params?.category) searchParams.append('category', params.category)
  if (params?.search) searchParams.append('search', params.search)

  const response = await fetch(`/api/documents/technology?${searchParams.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch documents')
  }
  return response.json()
}

// Create a new technology document
export async function createTechnologyDocument(data: CreateDocumentData): Promise<Document> {
  const response = await fetch('/api/documents/technology', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to create document')
  }
  return response.json()
}

// Update a technology document
export async function updateTechnologyDocument(
  id: string,
  data: Partial<CreateDocumentData>
): Promise<Document> {
  const response = await fetch(`/api/documents/technology/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to update document')
  }
  return response.json()
}

// Delete a technology document
export async function deleteTechnologyDocument(id: string): Promise<Document> {
  const response = await fetch(`/api/documents/technology/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete document')
  }
  return response.json()
} 