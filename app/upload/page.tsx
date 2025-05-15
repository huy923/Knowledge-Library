"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  FileText,
  Globe,
  Info,
  Lock,
  Plus,
  Upload,
  X,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export default function UploadPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)

  // Giả lập quá trình tải lên
  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadComplete(true)
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tải lên tài liệu</h1>
          <p className="text-muted-foreground">Chia sẻ tri thức của bạn với cộng đồng SenseLib</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex justify-between items-center">
        <div className="hidden md:flex w-full max-w-3xl mx-auto">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted border-muted-foreground/20"
                }`}
              >
                {currentStep > step ? <Check className="h-5 w-5" /> : step}
              </div>
              {step < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 ${currentStep > step ? "bg-primary" : "bg-muted-foreground/20"}`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="md:hidden text-center w-full">
          <p className="font-medium">
            Bước {currentStep} / 4: {currentStep === 1 && "Tải lên file"}
            {currentStep === 2 && "Thông tin tài liệu"}
            {currentStep === 3 && "Phân loại và thẻ"}
            {currentStep === 4 && "Cài đặt và xem trước"}
          </p>
        </div>
      </div>

      <div className="hidden md:flex justify-between max-w-3xl mx-auto text-sm">
        <div className={`text-center ${currentStep >= 1 ? "text-foreground" : "text-muted-foreground"}`}>
          Tải lên file
        </div>
        <div className={`text-center ${currentStep >= 2 ? "text-foreground" : "text-muted-foreground"}`}>
          Thông tin tài liệu
        </div>
        <div className={`text-center ${currentStep >= 3 ? "text-foreground" : "text-muted-foreground"}`}>
          Phân loại và thẻ
        </div>
        <div className={`text-center ${currentStep >= 4 ? "text-foreground" : "text-muted-foreground"}`}>
          Cài đặt và xem trước
        </div>
      </div>

      {/* Step 1: Upload File */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Tải lên file</CardTitle>
            <CardDescription>Chọn file tài liệu bạn muốn chia sẻ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed rounded-lg p-8 text-center bg-muted/50">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="bg-background rounded-full p-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Kéo và thả file vào đây</h3>
                  <p className="text-sm text-muted-foreground">
                    Hỗ trợ các định dạng: PDF, DOCX, PPTX, XLSX, TXT (tối đa 50MB)
                  </p>
                </div>
                <div>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx,.pptx,.xlsx,.txt"
                    onChange={handleFileChange}
                  />
                  <Button asChild>
                    <label htmlFor="file-upload">Chọn file</label>
                  </Button>
                </div>
              </div>
            </div>

            {selectedFile && (
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedFile(null)}
                    className="text-muted-foreground"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Lưu ý</AlertTitle>
              <AlertDescription>
                Đảm bảo bạn có quyền chia sẻ tài liệu này và không vi phạm bản quyền. Tài liệu sẽ được kiểm duyệt trước
                khi công khai.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" disabled>
              Quay lại
            </Button>
            <Button onClick={nextStep} disabled={!selectedFile}>
              Tiếp theo
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 2: Document Information */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Thông tin tài liệu</CardTitle>
            <CardDescription>Nhập thông tin chi tiết về tài liệu của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Tiêu đề tài liệu <span className="text-destructive">*</span>
                </Label>
                <Input id="title" placeholder="Nhập tiêu đề tài liệu" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Mô tả <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Mô tả ngắn gọn về nội dung tài liệu"
                  className="min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">
                    Tác giả <span className="text-destructive">*</span>
                  </Label>
                  <Input id="author" placeholder="Tên tác giả" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publisher">Nhà xuất bản</Label>
                  <Input id="publisher" placeholder="Tên nhà xuất bản (nếu có)" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="publish-date">Ngày xuất bản</Label>
                  <Input id="publish-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">
                    Ngôn ngữ <span className="text-destructive">*</span>
                  </Label>
                  <Select defaultValue="vi">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Chọn ngôn ngữ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vi">Tiếng Việt</SelectItem>
                      <SelectItem value="en">Tiếng Anh</SelectItem>
                      <SelectItem value="fr">Tiếng Pháp</SelectItem>
                      <SelectItem value="de">Tiếng Đức</SelectItem>
                      <SelectItem value="ja">Tiếng Nhật</SelectItem>
                      <SelectItem value="zh">Tiếng Trung</SelectItem>
                      <SelectItem value="ko">Tiếng Hàn</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pages">Số trang</Label>
                  <Input id="pages" type="number" min="1" placeholder="Số trang" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="table-of-contents">Mục lục</Label>
                <Textarea
                  id="table-of-contents"
                  placeholder="Nhập mục lục của tài liệu (không bắt buộc)"
                  className="min-h-[120px]"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>
              Quay lại
            </Button>
            <Button onClick={nextStep}>
              Tiếp theo
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 3: Categories and Tags */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Phân loại và thẻ</CardTitle>
            <CardDescription>Phân loại tài liệu để người dùng dễ dàng tìm kiếm</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">
                  Danh mục chính <span className="text-destructive">*</span>
                </Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Khoa học & Công nghệ</SelectLabel>
                      <SelectItem value="tech">Công nghệ thông tin</SelectItem>
                      <SelectItem value="science">Khoa học tự nhiên</SelectItem>
                      <SelectItem value="engineering">Kỹ thuật</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Kinh tế & Xã hội</SelectLabel>
                      <SelectItem value="business">Kinh tế & Kinh doanh</SelectItem>
                      <SelectItem value="social">Khoa học xã hội</SelectItem>
                      <SelectItem value="law">Luật</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Giáo dục & Sức khỏe</SelectLabel>
                      <SelectItem value="education">Giáo dục</SelectItem>
                      <SelectItem value="health">Y tế & Sức khỏe</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Nghệ thuật & Nhân văn</SelectLabel>
                      <SelectItem value="arts">Nghệ thuật & Thiết kế</SelectItem>
                      <SelectItem value="literature">Văn học & Ngôn ngữ</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subcategory">Danh mục phụ</Label>
                <Select>
                  <SelectTrigger id="subcategory">
                    <SelectValue placeholder="Chọn danh mục phụ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai">Trí tuệ nhân tạo</SelectItem>
                    <SelectItem value="programming">Lập trình</SelectItem>
                    <SelectItem value="database">Cơ sở dữ liệu</SelectItem>
                    <SelectItem value="network">Mạng máy tính</SelectItem>
                    <SelectItem value="security">An ninh mạng</SelectItem>
                    <SelectItem value="web">Phát triển web</SelectItem>
                    <SelectItem value="mobile">Phát triển ứng dụng di động</SelectItem>
                    <SelectItem value="data-science">Khoa học dữ liệu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Thẻ</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 rounded-full"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Thêm thẻ"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTag} disabled={!newTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Thêm các thẻ liên quan đến nội dung tài liệu để giúp người dùng tìm kiếm dễ dàng hơn
                </p>
              </div>

              <div className="space-y-2">
                <Label>Độ khó</Label>
                <RadioGroup defaultValue="intermediate">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="beginner" id="beginner" />
                      <Label htmlFor="beginner">Cơ bản - Dành cho người mới bắt đầu</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intermediate" id="intermediate" />
                      <Label htmlFor="intermediate">Trung bình - Yêu cầu kiến thức nền tảng</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="advanced" id="advanced" />
                      <Label htmlFor="advanced">Nâng cao - Dành cho người đã có kinh nghiệm</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="expert" id="expert" />
                      <Label htmlFor="expert">Chuyên sâu - Dành cho chuyên gia</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>
              Quay lại
            </Button>
            <Button onClick={nextStep}>
              Tiếp theo
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 4: Settings and Preview */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt và xem trước</CardTitle>
            <CardDescription>Cài đặt quyền riêng tư và xem trước tài liệu trước khi đăng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Quyền riêng tư</Label>
                <RadioGroup defaultValue="public">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="public" id="public" className="mt-1" />
                      <div>
                        <Label htmlFor="public" className="flex items-center">
                          <Globe className="h-4 w-4 mr-2" />
                          Công khai
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Tài liệu sẽ được hiển thị công khai và mọi người đều có thể xem và tải xuống
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="limited" id="limited" className="mt-1" />
                      <div>
                        <Label htmlFor="limited" className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Giới hạn
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Chỉ người dùng đã đăng ký mới có thể xem và tải xuống tài liệu
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="private" id="private" className="mt-1" />
                      <div>
                        <Label htmlFor="private" className="flex items-center">
                          <Lock className="h-4 w-4 mr-2" />
                          Riêng tư
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Chỉ bạn và những người được bạn chia sẻ đường dẫn mới có thể xem tài liệu
                        </p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Giấy phép</Label>
                <Select defaultValue="cc-by">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn giấy phép" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cc-by">CC BY - Ghi công tác giả</SelectItem>
                    <SelectItem value="cc-by-sa">CC BY-SA - Ghi công và chia sẻ tương tự</SelectItem>
                    <SelectItem value="cc-by-nd">CC BY-ND - Ghi công và không phái sinh</SelectItem>
                    <SelectItem value="cc-by-nc">CC BY-NC - Ghi công và phi thương mại</SelectItem>
                    <SelectItem value="cc-by-nc-sa">
                      CC BY-NC-SA - Ghi công, phi thương mại và chia sẻ tương tự
                    </SelectItem>
                    <SelectItem value="cc-by-nc-nd">
                      CC BY-NC-ND - Ghi công, phi thương mại và không phái sinh
                    </SelectItem>
                    <SelectItem value="cc0">CC0 - Công cộng</SelectItem>
                    <SelectItem value="copyright">Bản quyền - Tất cả các quyền được bảo lưu</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Tìm hiểu thêm về các loại giấy phép{" "}
                  <a href="#" className="text-primary hover:underline">
                    tại đây
                  </a>
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Cho phép bình luận</Label>
                  <Checkbox defaultChecked id="allow-comments" />
                </div>
                <p className="text-sm text-muted-foreground">Cho phép người dùng bình luận về tài liệu của bạn</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Cho phép tải xuống</Label>
                  <Checkbox defaultChecked id="allow-download" />
                </div>
                <p className="text-sm text-muted-foreground">Cho phép người dùng tải xuống tài liệu của bạn</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <Label>Xem trước tài liệu</Label>
                </div>
                <div className="bg-muted rounded-lg p-4 flex items-center justify-center h-40">
                  <p className="text-muted-foreground">Xem trước tài liệu sẽ được hiển thị ở đây</p>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Lưu ý</AlertTitle>
                <AlertDescription>
                  Tài liệu của bạn sẽ được kiểm duyệt trước khi công khai. Quá trình này có thể mất từ 24-48 giờ.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>
              Quay lại
            </Button>
            <Button onClick={simulateUpload} disabled={isUploading}>
              {isUploading ? (
                <>
                  <span className="mr-2">Đang tải lên...</span>
                  <span>{uploadProgress}%</span>
                </>
              ) : (
                <>
                  {uploadComplete ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Hoàn thành
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Tải lên
                    </>
                  )}
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Đang tải lên...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-sm text-muted-foreground">Vui lòng không đóng trình duyệt trong quá trình tải lên</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Complete */}
      {uploadComplete && (
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3">
                <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Tải lên thành công!</h3>
                <p className="text-muted-foreground">
                  Tài liệu của bạn đã được tải lên thành công và đang chờ kiểm duyệt
                </p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline">Xem tài liệu</Button>
                <Button>
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Quay lại trang chủ
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Tabs defaultValue="guidelines" className="max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="guidelines">Hướng dẫn</TabsTrigger>
          <TabsTrigger value="faq">Câu hỏi thường gặp</TabsTrigger>
          <TabsTrigger value="tips">Mẹo hay</TabsTrigger>
        </TabsList>
        <TabsContent value="guidelines" className="space-y-4 mt-4">
          <h3 className="text-lg font-medium">Hướng dẫn tải lên tài liệu</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>Đảm bảo tài liệu không vi phạm bản quyền và bạn có quyền chia sẻ</li>
            <li>Cung cấp thông tin đầy đủ và chính xác về tài liệu</li>
            <li>Chọn danh mục và thẻ phù hợp để người dùng dễ dàng tìm kiếm</li>
            <li>Tài liệu sẽ được kiểm duyệt trước khi công khai</li>
            <li>Tài liệu vi phạm quy định sẽ bị gỡ bỏ mà không cần thông báo trước</li>
          </ul>
        </TabsContent>
        <TabsContent value="faq" className="space-y-4 mt-4">
          <h3 className="text-lg font-medium">Câu hỏi thường gặp</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium">Tôi có thể tải lên những định dạng file nào?</h4>
              <p className="text-sm text-muted-foreground">
                SenseLib hỗ trợ các định dạng: PDF, DOCX, PPTX, XLSX, TXT và nhiều định dạng khác.
              </p>
            </div>
            <div>
              <h4 className="font-medium">Kích thước file tối đa là bao nhiêu?</h4>
              <p className="text-sm text-muted-foreground">
                Kích thước file tối đa là 50MB cho tài khoản thường và 200MB cho tài khoản Premium.
              </p>
            </div>
            <div>
              <h4 className="font-medium">Mất bao lâu để tài liệu được kiểm duyệt?</h4>
              <p className="text-sm text-muted-foreground">
                Thông thường mất từ 24-48 giờ làm việc để tài liệu được kiểm duyệt và công khai.
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="tips" className="space-y-4 mt-4">
          <h3 className="text-lg font-medium">Mẹo hay khi tải lên tài liệu</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>Sử dụng tiêu đề ngắn gọn, súc tích và mô tả chi tiết</li>
            <li>Thêm mục lục để người đọc dễ dàng nắm bắt nội dung</li>
            <li>Sử dụng 5-10 thẻ liên quan đến nội dung tài liệu</li>
            <li>Chọn hình ảnh bìa hấp dẫn để thu hút người đọc</li>
            <li>Cập nhật tài liệu thường xuyên để đảm bảo thông tin luôn mới nhất</li>
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  )
}
