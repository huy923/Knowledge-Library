import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subcategories: true,
        _count: {
          select: {
            documents: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Create slug from name
    const slug = body.name.toLowerCase().replace(/\s+/g, "-")

    // Check if category with slug already exists
    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    })

    if (existingCategory) {
      return NextResponse.json({ error: "Category with this name already exists" }, { status: 400 })
    }

    // Create category
    const category = await prisma.category.create({
      data: {
        name: body.name,
        description: body.description,
        icon: body.icon,
        slug,
      },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
