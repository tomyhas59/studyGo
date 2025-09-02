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
    </div>
  );
}
