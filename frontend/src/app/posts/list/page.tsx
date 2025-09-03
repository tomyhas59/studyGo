"use client";

import { useEffect, useState } from "react";

import { PostType } from "@shared/type";
import { useUserStore } from "store/userStore";
import { useLoadingStore } from "store/LoadingState";
import axios from "@/app/lib/axios";

export default function PostListPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const isLoading = useLoadingStore((state) => state.isLoading);

  const [error, setError] = useState<string | null>(null);

  const user = useUserStore((state) => state.user);

  const fetchPosts = async () => {
    try {
      setError(null);
      const res = await axios.get<PostType[]>("/posts");
      setPosts(res.data);
    } catch (err: any) {
      console.error(err);
      setError("게시글 불러오는 중 문제가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const res = await axios.delete(`/api/posts/${postId}`);
      console.log(res);
      setPosts(posts.filter((post) => post.id !== postId));
      alert("삭제 성공!");
    } catch (err: any) {
      console.error(err);
      alert("삭제 실패");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto mt-10 text-center text-gray-500">
        게시글 불러오는 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto mt-10 text-center text-red-500">
        {error}
      </div>
    );
  }

  console.log(posts);
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">모집글 리스트</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">등록된 게시글이 없습니다.</p>
      ) : (
        posts.map((post) => (
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
