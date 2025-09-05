"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-40">
      <Link href="/" className="text-xl font-bold">
        studyGO
      </Link>

      {/* PC 메뉴 */}
      <nav className="hidden md:flex gap-4">
        <Link href="/auth/login" className="hover:text-blue-500">
          로그인
        </Link>
        <Link href="/auth/register" className="hover:text-blue-500">
          회원가입
        </Link>
        <Link href="/posts/list" className="hover:text-blue-500">
          게시글 목록
        </Link>
        <Link href="/posts/create" className="hover:text-blue-500">
          글쓰기
        </Link>
      </nav>

      {/* 모바일 햄버거 */}
      <button
        className="md:hidden text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* 모바일 메뉴 */}
      {isOpen && (
        <nav className="absolute top-full left-0 w-full bg-white flex flex-col p-4 gap-2 shadow-md md:hidden">
          <Link
            href="/auth/login"
            className="hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            로그인
          </Link>
          <Link
            href="/auth/register"
            className="hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            회원가입
          </Link>
          <Link
            href="/posts/list"
            className="hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            게시글 목록
          </Link>
          <Link
            href="/posts/create"
            className="hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            글쓰기
          </Link>
        </nav>
      )}
    </header>
  );
}
