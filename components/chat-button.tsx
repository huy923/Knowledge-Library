"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, X } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} aria-label="Mở hộp chat">
        <MessageSquare className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-80 md:w-96">
          <Card className="shadow-lg border">
            <CardHeader className="p-4 flex flex-row items-center justify-between border-b">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="AI Assistant" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">Trợ lý SenseLib</h3>
                  <p className="text-xs text-muted-foreground">Trực tuyến</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Đóng hộp chat">
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <ScrollArea className="h-80">
              <CardContent className="p-4 space-y-4">
                <ChatMessage
                  message="Xin chào! Tôi là trợ lý SenseLib. Tôi có thể giúp gì cho bạn hôm nay?"
                  sender="assistant"
                  time="12:00"
                />
                <ChatMessage message="Tôi đang tìm tài liệu về trí tuệ nhân tạo" sender="user" time="12:01" />
                <ChatMessage
                  message="Tôi có thể giúp bạn tìm tài liệu về trí tuệ nhân tạo. Bạn quan tâm đến lĩnh vực cụ thể nào trong AI? Ví dụ như học máy, xử lý ngôn ngữ tự nhiên, hoặc thị giác máy tính?"
                  sender="assistant"
                  time="12:02"
                />
                <ChatMessage message="Tôi quan tâm đến học máy" sender="user" time="12:03" />
                <ChatMessage
                  message="Tuyệt vời! Tôi đã tìm thấy một số tài liệu về học máy trong thư viện của chúng tôi. Bạn có thể xem các tài liệu sau:

1. 'Nhập môn Học máy' - TS. Nguyễn Văn A
2. 'Học máy với Python' - PGS.TS. Trần Thị B
3. 'Các thuật toán học máy phổ biến' - GS. Lê Văn C

Bạn muốn tìm hiểu thêm về tài liệu nào?"
                  sender="assistant"
                  time="12:04"
                />
              </CardContent>
            </ScrollArea>
            <CardFooter className="p-4 border-t">
              <form className="flex w-full gap-2">
                <Input placeholder="Nhập tin nhắn..." className="flex-1" />
                <Button type="submit">Gửi</Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}

interface ChatMessageProps {
  message: string
  sender: "user" | "assistant"
  time: string
}

function ChatMessage({ message, sender, time }: ChatMessageProps) {
  return (
    <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
        }`}
      >
        <p className="whitespace-pre-wrap text-sm">{message}</p>
        <p className={`text-xs mt-1 ${sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
          {time}
        </p>
      </div>
    </div>
  )
}
