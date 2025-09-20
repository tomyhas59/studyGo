"use client";

import { useRouter } from "next/navigation";

interface Props {
  posts: any[];
}

export default function MyPostsList({ posts }: Props) {
  const router = useRouter();

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
        내 게시글
      </h2>
      {!posts || posts.length === 0 ? (
        <p className="text-gray-500">작성한 글이 없습니다.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => router.push(`/posts/${post.id}`)}
              className="p-4 sm:p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:bg-gray-50 transition cursor-pointer"
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                {post.title}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
