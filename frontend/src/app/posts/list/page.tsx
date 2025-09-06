"use client";

import { PostType } from "@shared/type";
import { useUserStore } from "store/userStore";
import axios from "@/app/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function PostListPage() {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<PostType[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get("/posts");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (postId: number) => {
      await axios.delete(`/posts/${postId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      alert("삭제 실패");
    },
  });

  const handleDelete = (postId: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    deleteMutation.mutate(postId);
  };

  if (isLoading) return <p>불러오는 중...</p>;
  if (isError) return <p>에러 발생!</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">모집글 리스트</h1>

      {posts?.length === 0 ? (
        <p className="text-gray-500 text-center">등록된 게시글이 없습니다.</p>
      ) : (
        posts?.map((post) => (
          <div
            key={post.id}
            className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-white cursor-pointer relative"
            onClick={() => router.push(`/posts/${post.id}`)}
          >
            <div className="p-5">
              <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                작성자: {post.author.name} |{" "}
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>

            {user?.id === post.author.id && (
              <button
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(post.id);
                }}
              >
                삭제
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
