"use client";

import { useUserStore } from "store/userStore";

export default function HomePage() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="space-y-6 max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold">
        {user
          ? `${user.name}님 환영합니다 👋`
          : "스터디 프로젝트에 오신 것을 환영합니다!"}
      </h1>
      <p className="text-gray-600">
        이 프로젝트는 Next.js + Nest.js + Prisma로 만든 스터디 프로젝트입니다.
      </p>

      <div className="space-x-4">
        {user ? (
          <>
            <a
              href="/posts/list"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              모집글 보기
            </a>
            <button
              onClick={() => useUserStore.getState().clearUser()}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <a
              href="/auth/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              로그인
            </a>
            <a
              href="/auth/register"
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              회원가입
            </a>
          </>
        )}
      </div>
    </div>
  );
}
