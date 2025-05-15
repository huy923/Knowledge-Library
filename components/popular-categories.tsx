import { Card, CardContent } from "@/components/ui/card"
import {
  BookOpen,
  Code,
  Database,
  FlaskRoundIcon as Flask,
  GraduationCap,
  HeartPulse,
  LineChart,
  Microscope,
  Pencil,
} from "lucide-react"
import Link from "next/link"

export function PopularCategories() {
  const categories = [
    {
      id: 1,
      name: "Công nghệ thông tin",
      count: 2345,
      icon: Code,
    },
    {
      id: 2,
      name: "Kinh tế & Kinh doanh",
      count: 1987,
      icon: LineChart,
    },
    {
      id: 3,
      name: "Khoa học tự nhiên",
      count: 1543,
      icon: Microscope,
    },
    {
      id: 4,
      name: "Giáo dục",
      count: 1234,
      icon: GraduationCap,
    },
    {
      id: 5,
      name: "Y tế & Sức khỏe",
      count: 987,
      icon: HeartPulse,
    },
    {
      id: 6,
      name: "Kỹ thuật",
      count: 876,
      icon: Database,
    },
    {
      id: 7,
      name: "Nghệ thuật & Thiết kế",
      count: 765,
      icon: Pencil,
    },
    {
      id: 8,
      name: "Khoa học xã hội",
      count: 654,
      icon: Flask,
    },
    {
      id: 9,
      name: "Văn học & Ngôn ngữ",
      count: 543,
      icon: BookOpen,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Link key={category.id} href={`/categories/${category.id}`}>
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <category.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} tài liệu</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
