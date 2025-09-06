"use client";

import { useUserStore } from "store/userStore";
import { useQuery } from "@tanstack/react-query";
import axios from "@/app/lib/axios";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const router = useRouter();

  const user = useUserStore((state) => state.user);

  // 내 글 가져오기
  const { data: posts } = useQuery({
    queryKey: ["myPosts"],
    queryFn: async () => {
      const res = await axios.get(`/posts?authorId=${user?.id}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4 space-y-8">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center">
        마이페이지
      </h1>

      {/* 사용자 정보 */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-3">
        <h2 className="text-2xl font-semibold text-gray-700">내 정보</h2>
        <p className="text-gray-600">이름: {user?.name}</p>
        <p className="text-gray-600">이메일: {user?.email}</p>
      </div>

      {/* 내가 쓴 글 */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700">내 게시글</h2>
        {posts?.length === 0 ? (
          <p className="text-gray-500">작성한 글이 없습니다.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {posts?.map((post: any) => (
              <div
                key={post.id}
                onClick={() => router.push(`/posts/${post.id}`)}
                className="p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:bg-gray-50 transition cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {post.title}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
