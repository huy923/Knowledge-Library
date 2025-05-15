"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { del } from "@vercel/blob"
import { auth } from "@/lib/auth"

export async function createDocument(formData: FormData) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return { success: false, error: "Unauthorized" }
    }

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const fileUrl = formData.get("fileUrl") as string
    const fileType = formData.get("fileType") as string
    const fileSize = Number.parseInt(formData.get("fileSize") as string)
    const categoryId = formData.get("categoryId") as string
    const subcategoryId = (formData.get("subcategoryId") as string) || undefined
    const visibility = (formData.get("visibility") as string) || "PUBLIC"
    const allowComments = formData.get("allowComments") === "true"
    const allowDownload = formData.get("allowDownload") === "true"

    const document = await prisma.document.create({
      data: {
        title,
        description,
        fileUrl,
        fileType,
        fileSize,
        categoryId,
        subcategoryId,
        visibility,
        allowComments,
        allowDownload,
        userId: session.user.id,
      },
    })

    // Tạo activity
    await prisma.activity.create({
      data: {
        type: "UPLOAD",
        userId: session.user.id,
        documentId: document.id,
      },
    })

    revalidatePath("/documents")
    return { success: true, documentId: document.id }
  } catch (error) {
    console.error("Error creating document:", error)
    return { success: false, error: "Failed to create document" }
  }
}

export async function deleteDocument(documentId: string) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return { success: false, error: "Unauthorized" }
    }

    // Lấy thông tin document trước khi xóa
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      select: { fileUrl: true, userId: true },
    })

    if (!document) {
      return { success: false, error: "Document not found" }
    }

    // Kiểm tra quyền xóa (chỉ admin hoặc chủ sở hữu mới được xóa)
    if (document.userId !== session.user.id && session.user.role !== "ADMIN") {
      return { success: false, error: "Permission denied" }
    }

    // Xóa file từ Blob Store
    if (document.fileUrl) {
      try {
        // Lấy URL path từ URL đầy đủ
        const url = new URL(document.fileUrl)
        const pathname = url.pathname
        // Xóa file từ Blob Store
        await del(pathname)
      } catch (error) {
        console.error("Error deleting file from Blob Store:", error)
        // Tiếp tục xóa document ngay cả khi không thể xóa file
      }
    }

    // Xóa document từ database
    await prisma.document.delete({
      where: { id: documentId },
    })

    revalidatePath("/documents")
    revalidatePath("/admin/documents")
    return { success: true }
  } catch (error) {
    console.error("Error deleting document:", error)
    return { success: false, error: "Failed to delete document" }
  }
}
