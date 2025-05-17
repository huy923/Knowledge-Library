"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, Timer, X } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  text: string
  sender: "user" | "assistant"
  time: string
}

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Xin chào! Tôi là trợ lý SenseLib. Tôi có thể giúp gì cho bạn hôm nay?",
      sender: "assistant",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      text: inputMessage,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_query: inputMessage,
          history: messages.map(m => m.text),
          system_message: "You are a helpful assistant for SenseLib.",
          max_tokens: 100,
          temperature: 0.7,
          top_p: 10
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      const assistantMessage: Message = {
        text: data.response,
        sender: "assistant",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
        sender: "assistant",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

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
                {messages.map((message, index) => (
                  <ChatMessage
                    key={index}
                    message={message.text}
                    sender={message.sender}
                    time={message.time}
                  />
                ))}
              </CardContent>
            </ScrollArea>
            <CardFooter className="p-4 border-t">
              <form onSubmit={handleSubmit} className="flex w-full gap-2">
                <Input
                  placeholder="Nhập tin nhắn..."
                  className="flex-1"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Đang xử lý..." : "Gửi"}
                </Button>
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
        className={`max-w-[80%] rounded-lg p-3 ${sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
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
