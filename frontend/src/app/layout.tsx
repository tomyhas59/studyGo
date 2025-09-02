import "./globals.css";
import Header from "./components/Header";
import Spinner from "./components/Spinner";

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
        <Header />
        <Spinner />
        <main className="max-w-3xl mx-auto px-6 py-10">{children}</main>

        <footer className="text-center py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Study Project
        </footer>
      </body>
    </html>
  );
}
