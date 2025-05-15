import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText, MessageSquare, ThumbsUp, Upload } from "lucide-react"
import Link from "next/link"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: {
        name: "Nguyễn Văn A",
        avatar: "/placeholder.svg",
      },
      action: "đã tải lên",
      document: "Báo cáo nghiên cứu về Blockchain",
      time: "5 phút trước",
      icon: Upload,
    },
    {
      id: 2,
      user: {
        name: "Trần Thị B",
        avatar: "/placeholder.svg",
      },
      action: "đã bình luận về",
      document: "Giáo trình Toán cao cấp",
      time: "15 phút trước",
      icon: MessageSquare,
    },
    {
      id: 3,
      user: {
        name: "Lê Văn C",
        avatar: "/placeholder.svg",
      },
      action: "đã tải xuống",
      document: "Hướng dẫn lập trình Python",
      time: "30 phút trước",
      icon: Download,
    },
    {
      id: 4,
      user: {
        name: "Phạm Thị D",
        avatar: "/placeholder.svg",
      },
      action: "đã đánh giá",
      document: "Sách Kinh tế vĩ mô",
      time: "1 giờ trước",
      icon: ThumbsUp,
    },
    {
      id: 5,
      user: {
        name: "Hoàng Văn E",
        avatar: "/placeholder.svg",
      },
      action: "đã chia sẻ",
      document: "Tài liệu Y khoa cơ bản",
      time: "2 giờ trước",
      icon: FileText,
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <Card key={activity.id}>
          <CardContent className="p-4 flex items-center gap-4">
            <Avatar>
              <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
              <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p>
                <span className="font-medium">{activity.user.name}</span>{" "}
                <span className="text-muted-foreground">{activity.action}</span>{" "}
                <Link href="#" className="font-medium hover:underline">
                  {activity.document}
                </Link>
              </p>
              <p className="text-sm text-muted-foreground">{activity.time}</p>
            </div>
            <div className="bg-muted p-2 rounded-full">
              <activity.icon className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
