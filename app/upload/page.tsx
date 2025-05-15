import { Suspense } from "react"
import prisma from "@/lib/db"
import { UploadDocumentForm } from "@/components/upload-document-form"
import { Skeleton } from "@/components/ui/skeleton"

async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  })

  const subcategories = await prisma.subcategory.findMany({
    orderBy: {
      name: "asc",
    },
  })

  return { categories, subcategories }
}

export default async function UploadPage() {
  const { categories, subcategories } = await getCategories()

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Upload Document</h1>
        <p className="text-muted-foreground">Share your knowledge with the SenseLib community</p>
      </div>

      <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
        <UploadDocumentForm categories={categories} subcategories={subcategories} />
      </Suspense>
    </div>
  )
}
