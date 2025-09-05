import "./globals.css";
import Header from "./components/Header";
import Providers from "./providers";

export const metadata = {
  title: "studyGO",
  description: "스터디 모집 플랫폼",
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
        <Providers>
          <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
