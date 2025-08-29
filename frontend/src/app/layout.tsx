import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Study Project",
  description: "Next.js + Nest.js 모노레포 스터디 프로젝트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {/* Header */}
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Study Project
          </Link>
          <nav className="flex gap-4">
            <Link href="/auth/login">로그인</Link>
            <Link href="/auth/register">회원가입</Link>
            <Link href="/posts/list">게시글 목록</Link>
            <Link href="/posts/create">글쓰기</Link>
          </nav>
        </header>

        {/* Main Content */}
        <main className="max-w-3xl mx-auto px-6 py-10">{children}</main>

        {/* Footer */}
        <footer className="text-center py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Study Project
        </footer>
      </body>
    </html>
  );
}
