"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, FileText, Home, LayoutDashboard, LogOut, MessageSquare, Settings, Tag, Users } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function AdminSidebar() {
  const [activeItem, setActiveItem] = useState("dashboard")

  return (
    <Sidebar variant="inset" className="border-r">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <BookIcon className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">SenseLib</span>
        </div>
        <div className="px-4 py-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="Admin" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Admin</p>
              <p className="text-xs text-muted-foreground">Quản trị viên</p>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={activeItem === "dashboard"} onClick={() => setActiveItem("dashboard")}>
              <Link href="/admin/dashboard">
                <LayoutDashboard className="h-4 w-4" />
                <span>Bảng điều khiển</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={activeItem === "documents"} onClick={() => setActiveItem("documents")}>
              <Link href="/admin/documents">
                <FileText className="h-4 w-4" />
                <span>Quản lý tài liệu</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <Link href="/admin/documents/pending">Tài liệu chờ duyệt</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <Link href="/admin/documents/approved">Tài liệu đã duyệt</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <Link href="/admin/documents/rejected">Tài liệu bị từ chối</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={activeItem === "users"} onClick={() => setActiveItem("users")}>
              <Link href="/admin/users">
                <Users className="h-4 w-4" />
                <span>Quản lý người dùng</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={activeItem === "categories"}
              onClick={() => setActiveItem("categories")}
            >
              <Link href="/admin/categories">
                <Tag className="h-4 w-4" />
                <span>Quản lý danh mục</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={activeItem === "comments"} onClick={() => setActiveItem("comments")}>
              <Link href="/admin/comments">
                <MessageSquare className="h-4 w-4" />
                <span>Quản lý bình luận</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={activeItem === "reports"} onClick={() => setActiveItem("reports")}>
              <Link href="/admin/reports">
                <BarChart3 className="h-4 w-4" />
                <span>Báo cáo & Thống kê</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <Separator className="my-4" />

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={activeItem === "settings"} onClick={() => setActiveItem("settings")}>
              <Link href="/admin/settings">
                <Settings className="h-4 w-4" />
                <span>Cài đặt hệ thống</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <Home className="h-4 w-4" />
                <span>Về trang chủ</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/auth/login">
              <LogOut className="h-4 w-4 mr-2" />
              Đăng xuất
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}
