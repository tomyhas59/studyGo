"use client";

import Link from "next/link";
import { useUserStore } from "store/userStore";

export default function Header() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Study Project
      </Link>

      <nav className="flex gap-4">
        {user ? (
          <>
            <Link href="/mypage">마이 페이지</Link>
            <Link href="/posts/list">게시글 목록</Link>
            <Link href="/posts/create">글쓰기</Link>
            <button
              onClick={() => {
                logout();
                localStorage.removeItem("token");
              }}
              className="text-red-500 hover:underline"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login">로그인</Link>
            <Link href="/auth/register">회원가입</Link>
            <Link href="/posts/list">게시글 목록</Link>
          </>
        )}
      </nav>
    </header>
  );
}
