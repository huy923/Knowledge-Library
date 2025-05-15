import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build filter conditions
    const where: any = {}

    if (category) {
      where.categoryId = category
    }

    if (status) {
      where.status = status
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { author: { contains: search, mode: "insensitive" } },
      ]
    }

    // Get documents with pagination
    const [documents, total] = await Promise.all([
      prisma.document.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          category: true,
          subcategory: true,
          tags: {
            include: {
              tag: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.document.count({ where }),
    ])

    return NextResponse.json({
      documents,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching documents:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Create document
    const document = await prisma.document.create({
      data: {
        title: body.title,
        description: body.description,
        author: body.author,
        publisher: body.publisher,
        language: body.language,
        pages: body.pages ? Number.parseInt(body.pages) : null,
        fileUrl: body.fileUrl,
        fileType: body.fileType,
        fileSize: body.fileSize,
        coverImage: body.coverImage,
        publishDate: body.publishDate ? new Date(body.publishDate) : null,
        visibility: body.visibility || "PUBLIC",
        license: body.license,
        allowComments: body.allowComments !== false,
        allowDownload: body.allowDownload !== false,
        userId: body.userId,
        categoryId: body.categoryId,
        subcategoryId: body.subcategoryId,
      },
    })

    // Add tags if provided
    if (body.tags && body.tags.length > 0) {
      const tagConnections = await Promise.all(
        body.tags.map(async (tagName: string) => {
          // Find or create tag
          const tag = await prisma.tag.upsert({
            where: { name: tagName },
            update: {},
            create: {
              name: tagName,
              slug: tagName.toLowerCase().replace(/\s+/g, "-"),
            },
          })

          // Connect tag to document
          return prisma.tagsOnDocuments.create({
            data: {
              documentId: document.id,
              tagId: tag.id,
            },
          })
        }),
      )
    }

    // Create activity record
    await prisma.activity.create({
      data: {
        type: "UPLOAD",
        userId: body.userId,
        documentId: document.id,
      },
    })

    return NextResponse.json(document, { status: 201 })
  } catch (error) {
    console.error("Error creating document:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
