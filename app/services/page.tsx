import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, CheckCircle, FileText, Users } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold">Dịch vụ của SenseLib</h1>
        <p className="text-lg text-muted-foreground">
          Khám phá các dịch vụ đa dạng của chúng tôi để nâng cao trải nghiệm học tập và nghiên cứu của bạn
        </p>
      </section>

      {/* Services Tabs */}
      <Tabs defaultValue="individual" className="space-y-8">
        <TabsList className="grid w-full md:w-auto grid-cols-3 max-w-lg mx-auto">
          <TabsTrigger value="individual">Cá nhân</TabsTrigger>
          <TabsTrigger value="organization">Tổ chức</TabsTrigger>
          <TabsTrigger value="education">Giáo dục</TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard
              title="Thành viên Cơ bản"
              price="Miễn phí"
              description="Truy cập cơ bản vào kho tài liệu và các tính năng tiêu chuẩn"
              features={[
                "Truy cập 1,000+ tài liệu miễn phí",
                "Tìm kiếm cơ bản",
                "Tải xuống giới hạn (5 tài liệu/ngày)",
                "Tham gia diễn đàn cộng đồng",
              ]}
              buttonText="Đăng ký ngay"
              popular={false}
            />
            <ServiceCard
              title="Thành viên Premium"
              price="99.000đ/tháng"
              description="Truy cập đầy đủ vào kho tài liệu và các tính năng nâng cao"
              features={[
                "Truy cập không giới hạn tài liệu",
                "Tìm kiếm nâng cao",
                "Tải xuống không giới hạn",
                "Trợ lý AI cá nhân",
                "Không quảng cáo",
                "Hỗ trợ ưu tiên 24/7",
              ]}
              buttonText="Dùng thử 7 ngày"
              popular={true}
            />
            <ServiceCard
              title="Thành viên Học thuật"
              price="49.000đ/tháng"
              description="Dành cho sinh viên và nhà nghiên cứu"
              features={[
                "Truy cập không giới hạn tài liệu học thuật",
                "Công cụ trích dẫn học thuật",
                "Tải xuống không giới hạn",
                "Trợ lý AI nghiên cứu",
                "Không quảng cáo",
                "Giảm 50% với email trường học",
              ]}
              buttonText="Xác minh tư cách"
              popular={false}
            />
          </div>
        </TabsContent>

        <TabsContent value="organization" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard
              title="Doanh nghiệp Nhỏ"
              price="1.990.000đ/tháng"
              description="Dành cho doanh nghiệp dưới 20 nhân viên"
              features={[
                "Tối đa 20 tài khoản người dùng",
                "Thư viện riêng của doanh nghiệp",
                "Quản lý người dùng và phân quyền",
                "Phân tích và báo cáo sử dụng",
                "Tích hợp SSO",
                "Hỗ trợ kỹ thuật ưu tiên",
              ]}
              buttonText="Liên hệ bán hàng"
              popular={false}
            />
            <ServiceCard
              title="Doanh nghiệp Vừa"
              price="4.990.000đ/tháng"
              description="Dành cho doanh nghiệp 20-100 nhân viên"
              features={[
                "Tối đa 100 tài khoản người dùng",
                "Thư viện riêng của doanh nghiệp",
                "Quản lý người dùng và phân quyền",
                "Phân tích và báo cáo nâng cao",
                "Tích hợp API đầy đủ",
                "Đào tạo và triển khai",
              ]}
              buttonText="Liên hệ bán hàng"
              popular={true}
            />
            <ServiceCard
              title="Doanh nghiệp Lớn"
              price="Liên hệ"
              description="Giải pháp tùy chỉnh cho doanh nghiệp lớn"
              features={[
                "Không giới hạn tài khoản người dùng",
                "Triển khai riêng (on-premise/private cloud)",
                "Tích hợp hệ thống toàn diện",
                "Tùy chỉnh theo yêu cầu",
                "Quản lý tri thức doanh nghiệp",
                "Hỗ trợ 24/7 và SLA",
              ]}
              buttonText="Tư vấn giải pháp"
              popular={false}
            />
          </div>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard
              title="Trường học"
              price="Từ 990.000đ/tháng"
              description="Dành cho trường học và cơ sở giáo dục"
              features={[
                "Thư viện số cho toàn trường",
                "Tích hợp với LMS",
                "Quản lý tài liệu giáo dục",
                "Công cụ học tập tương tác",
                "Báo cáo tiến độ học tập",
                "Giá dựa trên số lượng học sinh",
              ]}
              buttonText="Tìm hiểu thêm"
              popular={false}
            />
            <ServiceCard
              title="Đại học"
              price="Liên hệ"
              description="Giải pháp toàn diện cho các trường đại học"
              features={[
                "Thư viện số học thuật",
                "Công cụ nghiên cứu nâng cao",
                "Tích hợp với hệ thống đại học",
                "Quản lý luận văn và nghiên cứu",
                "Phân tích trích dẫn học thuật",
                "Hỗ trợ xuất bản học thuật",
              ]}
              buttonText="Liên hệ đội ngũ giáo dục"
              popular={true}
            />
            <ServiceCard
              title="Đào tạo Doanh nghiệp"
              price="2.990.000đ/tháng"
              description="Giải pháp đào tạo nội bộ cho doanh nghiệp"
              features={[
                "Nền tảng học tập doanh nghiệp",
                "Quản lý khóa học và chứng chỉ",
                "Thư viện tài liệu đào tạo",
                "Đánh giá kỹ năng và năng lực",
                "Báo cáo tiến độ đào tạo",
                "Tích hợp với hệ thống HR",
              ]}
              buttonText="Tư vấn giải pháp"
              popular={false}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Additional Services */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Dịch vụ bổ sung</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Dịch vụ số hóa tài liệu</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Chuyển đổi tài liệu giấy thành định dạng số với công nghệ OCR tiên tiến, đảm bảo chất lượng và độ chính
                xác cao.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Tìm hiểu thêm
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tư vấn quản lý tri thức</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Dịch vụ tư vấn chuyên nghiệp giúp tổ chức xây dựng và triển khai chiến lược quản lý tri thức hiệu quả.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Tìm hiểu thêm
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Đào tạo và hội thảo</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Các khóa đào tạo và hội thảo về quản lý tri thức, nghiên cứu học thuật và kỹ năng học tập suốt đời.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Xem lịch
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>API và tích hợp</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Tích hợp SenseLib vào hệ thống hiện có của bạn thông qua API đầy đủ và các công cụ phát triển.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Tài liệu API
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 bg-muted rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Khách hàng nói gì về chúng tôi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-background">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
              </div>
              <p className="italic mb-4">
                "SenseLib đã giúp công ty chúng tôi xây dựng một hệ thống quản lý tri thức hiệu quả, tiết kiệm thời gian
                và nâng cao năng suất làm việc."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Nguyễn Văn A</p>
                  <p className="text-sm text-muted-foreground">Giám đốc CNTT, Công ty ABC</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
              </div>
              <p className="italic mb-4">
                "Thư viện số SenseLib đã trở thành công cụ không thể thiếu trong quá trình học tập và nghiên cứu của
                sinh viên trường chúng tôi."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">TS. Trần Thị B</p>
                  <p className="text-sm text-muted-foreground">Hiệu trưởng, Trường Đại học XYZ</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
              </div>
              <p className="italic mb-4">
                "Tôi đã tiết kiệm rất nhiều thời gian trong quá trình nghiên cứu luận án nhờ các công cụ tìm kiếm và
                trích dẫn thông minh của SenseLib."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Lê Văn C</p>
                  <p className="text-sm text-muted-foreground">Nghiên cứu sinh, Đại học DEF</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Câu hỏi thường gặp</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">SenseLib có phù hợp với doanh nghiệp nhỏ không?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Có, chúng tôi có gói dịch vụ dành riêng cho doanh nghiệp nhỏ với chi phí hợp lý và đầy đủ tính năng cần
                thiết để quản lý tri thức doanh nghiệp.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Làm thế nào để tích hợp SenseLib với hệ thống hiện có?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                SenseLib cung cấp API đầy đủ và các công cụ tích hợp để kết nối với các hệ thống LMS, CRM, và các nền
                tảng doanh nghiệp khác.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dữ liệu của tôi có an toàn không?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Chúng tôi áp dụng các biện pháp bảo mật tiên tiến, mã hóa dữ liệu và tuân thủ các quy định về bảo vệ dữ
                liệu để đảm bảo thông tin của bạn luôn được an toàn.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Có thể hủy đăng ký bất cứ lúc nào không?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Có, bạn có thể hủy đăng ký bất cứ lúc nào. Chúng tôi không yêu cầu cam kết dài hạn và cung cấp chính
                sách hoàn tiền trong 30 ngày đầu tiên.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Sẵn sàng nâng cao trải nghiệm học tập và nghiên cứu?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
          Liên hệ với đội ngũ tư vấn của chúng tôi để tìm giải pháp phù hợp nhất với nhu cầu của bạn.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="secondary">
            Liên hệ ngay
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20"
          >
            Xem demo
          </Button>
        </div>
      </section>
    </div>
  )
}

interface ServiceCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  popular?: boolean
}

function ServiceCard({ title, price, description, features, buttonText, popular = false }: ServiceCardProps) {
  return (
    <Card className={`relative overflow-hidden ${popular ? "border-primary shadow-lg" : ""}`}>
      {popular && (
        <div className="absolute top-0 right-0">
          <Badge className="rounded-none rounded-bl-lg">Phổ biến nhất</Badge>
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-3xl font-bold">{price}</div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className={`w-full ${popular ? "bg-primary" : ""}`}>{buttonText}</Button>
      </CardFooter>
    </Card>
  )
}

function Star(props: any) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
