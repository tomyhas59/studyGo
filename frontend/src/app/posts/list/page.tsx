"use client";

import { PostType } from "@shared/type";
import { useUserStore } from "store/userStore";
import axios from "@/app/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function PostListPage() {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

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

  console.log(posts);
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">모집글 리스트</h1>
      {posts?.length === 0 ? (
        <p className="text-gray-500">등록된 게시글이 없습니다.</p>
      ) : (
        posts?.map((post) => (
          <div
            key={post.id}
            className="border p-4 mb-4 rounded shadow relative"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.content}</p>
            <p className="text-sm text-gray-500">
              작성자: {post.author.name} |{" "}
              {new Date(post.createdAt).toLocaleString()}
            </p>
            {user?.id === post.author.id && (
              <button
                className="absolute top-2 right-2 text-red-500 hover:underline"
                onClick={() => handleDelete(post.id)}
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
