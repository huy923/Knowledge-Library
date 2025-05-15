import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Building, Calendar, GraduationCap, Heart, Mail, MapPin, Phone, Users } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold">Về SenseLib</h1>
        <p className="text-lg text-muted-foreground">
          Nền tảng chia sẻ tri thức hàng đầu, kết nối cộng đồng học tập và nghiên cứu toàn cầu
        </p>
      </section>

      {/* About Tabs */}
      <Tabs defaultValue="mission" className="space-y-8">
        <TabsList className="grid w-full md:w-auto grid-cols-4 max-w-2xl mx-auto">
          <TabsTrigger value="mission">Sứ mệnh</TabsTrigger>
          <TabsTrigger value="team">Đội ngũ</TabsTrigger>
          <TabsTrigger value="history">Lịch sử</TabsTrigger>
          <TabsTrigger value="contact">Liên hệ</TabsTrigger>
        </TabsList>

        <TabsContent value="mission" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Sứ mệnh của chúng tôi</h2>
              <p className="mb-4">
                SenseLib ra đời với sứ mệnh xây dựng một nền tảng tri thức mở, nơi mọi người có thể tiếp cận, chia sẻ và
                phát triển kiến thức một cách bình đẳng và hiệu quả.
              </p>
              <p className="mb-4">
                Chúng tôi tin rằng tri thức là tài sản quý giá nhất của nhân loại và việc chia sẻ tri thức sẽ thúc đẩy
                sự phát triển của cá nhân, cộng đồng và xã hội.
              </p>
              <p>
                Với SenseLib, chúng tôi mong muốn xóa bỏ rào cản về địa lý, kinh tế và xã hội trong việc tiếp cận tri
                thức, tạo ra một cộng đồng học tập toàn cầu nơi mọi người đều có cơ hội phát triển.
              </p>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=600" alt="Sứ mệnh SenseLib" fill className="object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Chia sẻ tri thức</h3>
                <p>
                  Xây dựng nền tảng chia sẻ tri thức đa dạng, chất lượng cao, dễ tiếp cận cho mọi người, mọi lúc, mọi
                  nơi.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Kết nối cộng đồng</h3>
                <p>
                  Tạo dựng cộng đồng học tập và nghiên cứu toàn cầu, nơi mọi người có thể kết nối, trao đổi và phát
                  triển cùng nhau.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Phát triển bền vững</h3>
                <p>
                  Thúc đẩy học tập suốt đời và phát triển bền vững thông qua việc tiếp cận tri thức và ứng dụng vào thực
                  tiễn.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <h2 className="text-2xl font-bold text-center mb-8">Đội ngũ của chúng tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Nguyễn Văn A",
                role: "Nhà sáng lập & CEO",
                avatar: "/placeholder.svg?height=200&width=200",
                bio: "Tiến sĩ Khoa học Máy tính tại Đại học Stanford, với hơn 15 năm kinh nghiệm trong lĩnh vực công nghệ giáo dục.",
              },
              {
                name: "Trần Thị B",
                role: "Giám đốc Công nghệ (CTO)",
                avatar: "/placeholder.svg?height=200&width=200",
                bio: "Chuyên gia về AI và Machine Learning, từng làm việc tại Google và Microsoft, với nhiều công trình nghiên cứu được công bố quốc tế.",
              },
              {
                name: "Lê Văn C",
                role: "Giám đốc Nội dung",
                avatar: "/placeholder.svg?height=200&width=200",
                bio: "Giáo sư tại Đại học Quốc gia Hà Nội, với chuyên môn về quản lý tri thức và phát triển nội dung giáo dục.",
              },
              {
                name: "Phạm Thị D",
                role: "Giám đốc Marketing",
                avatar: "/placeholder.svg?height=200&width=200",
                bio: "Hơn 10 năm kinh nghiệm trong lĩnh vực marketing số và phát triển thương hiệu cho các doanh nghiệp giáo dục.",
              },
            ].map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <Badge className="mb-2 mt-1">{member.role}</Badge>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                  <div className="flex justify-center gap-2 mt-4">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <LinkedInIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <TwitterIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <h3 className="text-xl font-bold mb-4">Tham gia cùng chúng tôi</h3>
            <p className="max-w-2xl mx-auto mb-6">
              Chúng tôi luôn tìm kiếm những người tài năng và đam mê để cùng xây dựng SenseLib. Nếu bạn quan tâm đến sứ
              mệnh của chúng tôi, hãy tham gia cùng chúng tôi.
            </p>
            <Button>
              <Users className="mr-2 h-4 w-4" />
              Xem vị trí tuyển dụng
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Lịch sử phát triển</h2>
            <div className="space-y-12">
              <div className="relative pl-8 pb-8 border-l-2 border-muted">
                <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                <div className="mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">2018</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Khởi đầu</h3>
                <p>
                  SenseLib được thành lập bởi một nhóm các nhà nghiên cứu và giáo dục với mục tiêu xây dựng một nền tảng
                  chia sẻ tri thức mở cho cộng đồng.
                </p>
              </div>

              <div className="relative pl-8 pb-8 border-l-2 border-muted">
                <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                <div className="mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">2019</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Phiên bản Beta</h3>
                <p>
                  Ra mắt phiên bản Beta với 1,000 tài liệu và 5,000 người dùng đầu tiên. Nhận được phản hồi tích cực từ
                  cộng đồng giáo dục và nghiên cứu.
                </p>
              </div>

              <div className="relative pl-8 pb-8 border-l-2 border-muted">
                <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                <div className="mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">2020</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Mở rộng và phát triển</h3>
                <p>
                  Mở rộng đội ngũ và phát triển các tính năng mới. Đạt mốc 10,000 tài liệu và 50,000 người dùng. Bắt đầu
                  hợp tác với các trường đại học và tổ chức giáo dục.
                </p>
              </div>

              <div className="relative pl-8 pb-8 border-l-2 border-muted">
                <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                <div className="mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">2021</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Tích hợp AI</h3>
                <p>
                  Tích hợp công nghệ AI vào nền tảng để cá nhân hóa trải nghiệm học tập và gợi ý tài liệu phù hợp cho
                  người dùng. Ra mắt ứng dụng di động SenseLib.
                </p>
              </div>

              <div className="relative pl-8 pb-8 border-l-2 border-muted">
                <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                <div className="mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">2022</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Mở rộng quốc tế</h3>
                <p>
                  Mở rộng ra thị trường quốc tế với phiên bản đa ngôn ngữ. Đạt mốc 100,000 tài liệu và 500,000 người
                  dùng từ hơn 50 quốc gia.
                </p>
              </div>

              <div className="relative pl-8">
                <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                <div className="mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">2023</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Hiện tại và tương lai</h3>
                <p>
                  Hiện tại, SenseLib đã trở thành một trong những nền tảng chia sẻ tri thức hàng đầu với hơn 1 triệu
                  người dùng. Chúng tôi tiếp tục phát triển và mở rộng với mục tiêu đưa tri thức đến với mọi người trên
                  toàn thế giới.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Liên hệ với chúng tôi</h2>
              <p className="mb-6">
                Chúng tôi luôn sẵn sàng lắng nghe ý kiến đóng góp, câu hỏi hoặc đề xuất hợp tác từ bạn. Hãy liên hệ với
                chúng tôi qua các kênh dưới đây:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">info@senselib.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Điện thoại</p>
                    <p className="text-muted-foreground">+84 (0) 123 456 789</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Địa chỉ</p>
                    <p className="text-muted-foreground">
                      Tòa nhà Innovation, 123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Văn phòng đại diện</p>
                    <p className="text-muted-foreground">Tòa nhà Tech Hub, 456 Đường Láng, Quận Đống Đa, Hà Nội</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold mb-2">Kết nối với chúng tôi</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <FacebookIcon className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <TwitterIcon className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <LinkedInIcon className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <InstagramIcon className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <YoutubeIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Gửi tin nhắn cho chúng tôi</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Họ và tên
                        </label>
                        <input
                          id="name"
                          className="w-full p-2 rounded-md border border-input bg-background"
                          placeholder="Nhập họ và tên"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full p-2 rounded-md border border-input bg-background"
                          placeholder="example@email.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Tiêu đề
                      </label>
                      <input
                        id="subject"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        placeholder="Nhập tiêu đề"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Nội dung
                      </label>
                      <textarea
                        id="message"
                        className="w-full min-h-[150px] p-2 rounded-md border border-input bg-background"
                        placeholder="Nhập nội dung tin nhắn"
                      ></textarea>
                    </div>
                    <Button className="w-full">
                      <Mail className="mr-2 h-4 w-4" />
                      Gửi tin nhắn
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Partners Section */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Đối tác của chúng tôi</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="grayscale hover:grayscale-0 transition-all">
              <Image
                src={`/placeholder.svg?height=60&width=120&text=Partner${i + 1}`}
                alt={`Partner ${i + 1}`}
                width={120}
                height={60}
                className="h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Tham gia cùng SenseLib</h2>
          <p className="text-lg mb-6 opacity-90">
            Hãy trở thành một phần của cộng đồng SenseLib để cùng nhau xây dựng và chia sẻ tri thức cho tương lai.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary">
              <Heart className="mr-2 h-4 w-4" />
              Đăng ký ngay
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20"
            >
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  )
}
