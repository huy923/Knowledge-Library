import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Code, Cpu, Database, FileText, Globe, Server } from "lucide-react"
import Image from "next/image"
import { getTechnologyDocuments } from "@/lib/api"
// Make the page dynamic to ensure fresh data
export const dynamic = 'force-dynamic'

interface Document {
    id: string
    title: string
    description: string
    fileSize: string
    fileType: string
    category: string
    createdAt: string
}

export default async function TechnologyPage() {
    // Fetch documents from the API
    let documents: Document[] = []
    try {
        documents = await getTechnologyDocuments()
    } catch (error) {
        console.error('Error fetching documents:', error)
        // Return empty array if there's an error
        documents = []
    }

    return (
        <div className="container mx-auto py-6 space-y-8">
            {/* Hero Section */}
            <section className="relative rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 md:p-12 lg:p-16 text-white">
                    <div className="max-w-3xl space-y-4">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Công nghệ</h1>
                        <p className="text-lg md:text-xl opacity-90">
                            Khám phá thế giới công nghệ với các tài liệu về lập trình, AI, blockchain và nhiều lĩnh vực khác
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button size="lg" variant="secondary">
                                Khám phá tài liệu
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-transparent text-white border-white hover:bg-white/20 hover:text-white"
                            >
                                Đóng góp tài liệu
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="absolute right-0 bottom-0 hidden lg:block">
                    <Image
                        src="/placeholder.svg?height=300&width=400"
                        alt="Công nghệ"
                        width={400}
                        height={300}
                        className="opacity-90"
                    />
                </div>
            </section>

            {/* Subcategories */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <Code className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Lập trình</p>
                            <p className="text-2xl font-bold">
                                {documents.filter((doc: Document) => doc.category === 'programming').length}+
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <Cpu className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">AI & ML</p>
                            <p className="text-2xl font-bold">
                                {documents.filter((doc: Document) => doc.category === 'ai-ml').length}+
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <Database className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Cơ sở dữ liệu</p>
                            <p className="text-2xl font-bold">
                                {documents.filter((doc: Document) => doc.category === 'database').length}+
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <Server className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">DevOps</p>
                            <p className="text-2xl font-bold">
                                {documents.filter((doc: Document) => doc.category === 'devops').length}+
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Main Content Tabs */}
            <Tabs defaultValue="popular" className="space-y-6">
                <TabsList className="grid w-full md:w-auto grid-cols-3">
                    <TabsTrigger value="popular">Phổ biến</TabsTrigger>
                    <TabsTrigger value="newest">Mới nhất</TabsTrigger>
                    <TabsTrigger value="trending">Xu hướng</TabsTrigger>
                </TabsList>

                <TabsContent value="popular" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {documents.map((doc: Document) => (
                            <Card key={doc.id}>
                                <CardHeader>
                                    <CardTitle>{doc.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        {doc.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <FileText className="h-4 w-4" />
                                        <span>{doc.fileType} • {doc.fileSize}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="newest" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...documents]
                            .sort((a: Document, b: Document) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .map((doc: Document) => (
                                <Card key={doc.id}>
                                    <CardHeader>
                                        <CardTitle>{doc.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            {doc.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <FileText className="h-4 w-4" />
                                            <span>{doc.fileType} • {doc.fileSize}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                </TabsContent>

                <TabsContent value="trending" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* In a real application, you would implement trending logic based on views, likes, etc. */}
                        {documents.slice(0, 3).map((doc: Document) => (
                            <Card key={doc.id}>
                                <CardHeader>
                                    <CardTitle>{doc.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        {doc.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <FileText className="h-4 w-4" />
                                        <span>{doc.fileType} • {doc.fileSize}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            {/* Featured Topics */}
            <section className="py-8">
                <h2 className="text-2xl font-bold mb-6">Chủ đề nổi bật</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Web Development</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Frontend, Backend, Full-stack development và các framework hiện đại.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Mobile Development</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>iOS, Android, React Native và các công nghệ phát triển ứng dụng di động.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Cloud Computing</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>AWS, Azure, Google Cloud và các dịch vụ điện toán đám mây.</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-muted rounded-xl p-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Đóng góp tài liệu công nghệ?</h2>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                    Chia sẻ kiến thức của bạn với cộng đồng và giúp đỡ những người đang học tập trong lĩnh vực công nghệ.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button size="lg">Đăng tài liệu</Button>
                    <Button size="lg" variant="outline">
                        Tìm hiểu thêm
                    </Button>
                </div>
            </section>
        </div>
    )
}
