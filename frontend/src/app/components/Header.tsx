"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "store/useUserStore";

export default function Header() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/");
  };
  return (
    <header className="bg-white shadow-md px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap justify-between items-center sticky top-0 z-50">
      <Link
        href="/"
        className="text-xl sm:text-2xl font-extrabold text-gray-800 hover:text-blue-500 transition"
      >
        studyGO
      </Link>

      <nav className="flex flex-wrap gap-3 sm:gap-4 mt-2 sm:mt-0 text-sm sm:text-base">
        {user ? (
          <>
            <Link
              href="/auth/myPage"
              className="text-gray-700 hover:text-blue-500 transition"
            >
              내 정보
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-blue-500 transition cursor-pointer"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="text-gray-700 hover:text-blue-500 transition"
            >
              로그인
            </Link>
            <Link
              href="/auth/register"
              className="text-gray-700 hover:text-blue-500 transition"
            >
              회원가입
            </Link>
          </>
        )}
        <Link
          href="/posts/list"
          className="text-gray-700 hover:text-blue-500 transition"
        >
          게시글 목록
        </Link>
        <Link
          href="/posts/create"
          className="text-gray-700 hover:text-blue-500 transition"
        >
          글쓰기
        </Link>
      </nav>
    </header>
  );
}
