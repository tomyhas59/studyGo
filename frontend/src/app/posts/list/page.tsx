"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "@shared/type";

export default function PostListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get<Post[]>("/api/posts");
        setPosts(res.data);
      } catch (err: any) {
        console.error(err);
        setError("게시글을 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
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

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">모집글 리스트</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">등록된 게시글이 없습니다.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="border p-4 mb-4 rounded shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.content}</p>
            <p className="text-sm text-gray-500">
              작성자: {post.author.name} |{" "}
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
