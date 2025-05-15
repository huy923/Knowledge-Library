import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Building, Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"

export default function ContactPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold">Liên hệ với chúng tôi</h1>
        <p className="text-lg text-muted-foreground">
          Chúng tôi luôn sẵn sàng lắng nghe ý kiến đóng góp, câu hỏi hoặc đề xuất hợp tác từ bạn
        </p>
      </section>

      {/* Contact Info and Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Thông tin liên hệ</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Email</h3>
                <p className="text-muted-foreground mb-1">Gửi email cho chúng tôi</p>
                <a href="mailto:info@senselib.com" className="text-primary hover:underline">
                  info@senselib.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Điện thoại</h3>
                <p className="text-muted-foreground mb-1">Gọi cho chúng tôi</p>
                <a href="tel:+84123456789" className="text-primary hover:underline">
                  +84 (0) 123 456 789
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Trụ sở chính</h3>
                <p className="text-muted-foreground mb-1">Ghé thăm văn phòng của chúng tôi</p>
                <p>Tòa nhà Innovation, 123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Văn phòng đại diện</h3>
                <p className="text-muted-foreground mb-1">Văn phòng miền Bắc</p>
                <p>Tòa nhà Tech Hub, 456 Đường Láng, Quận Đống Đa, Hà Nội</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Giờ làm việc</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Thứ Hai - Thứ Sáu:</span>
                <span>8:00 - 17:30</span>
              </div>
              <div className="flex justify-between">
                <span>Thứ Bảy:</span>
                <span>8:00 - 12:00</span>
              </div>
              <div className="flex justify-between">
                <span>Chủ Nhật:</span>
                <span>Đóng cửa</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Gửi tin nhắn</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium">
                      Họ
                    </label>
                    <Input id="first-name" placeholder="Nhập họ của bạn" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium">
                      Tên
                    </label>
                    <Input id="last-name" placeholder="Nhập tên của bạn" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="example@email.com" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Số điện thoại
                  </label>
                  <Input id="phone" placeholder="Nhập số điện thoại của bạn" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Tiêu đề
                  </label>
                  <Input id="subject" placeholder="Nhập tiêu đề tin nhắn" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Nội dung
                  </label>
                  <textarea
                    id="message"
                    className="w-full min-h-[150px] p-3 rounded-md border border-input bg-background"
                    placeholder="Nhập nội dung tin nhắn của bạn"
                  ></textarea>
                </div>
                <Button className="w-full">Gửi tin nhắn</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Bản đồ</h2>
        <div className="h-[400px] rounded-xl overflow-hidden bg-muted relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=400&width=1200&text=Google+Map"
              alt="Map"
              width={1200}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Câu hỏi thường gặp</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2">Làm thế nào để tôi có thể đóng góp tài liệu?</h3>
              <p>
                Bạn cần đăng ký tài khoản trên SenseLib, sau đó vào trang cá nhân và chọn "Tải lên tài liệu". Tài liệu
                của bạn sẽ được kiểm duyệt trước khi công khai.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2">Làm thế nào để báo cáo tài liệu vi phạm?</h3>
              <p>
                Bạn có thể sử dụng nút "Báo cáo" trên trang chi tiết tài liệu hoặc liên hệ trực tiếp với chúng tôi qua
                email support@senselib.com.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2">SenseLib có hỗ trợ nhiều ngôn ngữ không?</h3>
              <p>
                Có, SenseLib hiện hỗ trợ nhiều ngôn ngữ bao gồm Tiếng Việt, Tiếng Anh, Tiếng Trung, Tiếng Nhật và Tiếng
                Hàn. Chúng tôi đang tiếp tục mở rộng hỗ trợ thêm nhiều ngôn ngữ khác.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2">Làm thế nào để trở thành đối tác của SenseLib?</h3>
              <p>
                Chúng tôi luôn tìm kiếm cơ hội hợp tác với các tổ chức giáo dục, doanh nghiệp và cá nhân. Vui lòng liên
                hệ với chúng tôi qua email partnership@senselib.com để tìm hiểu thêm.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
