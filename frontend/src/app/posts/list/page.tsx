"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "@/app/lib/axios";
import { useUserStore } from "store/userStore";
import PostFilter from "@/app/components/PostFilter";
import PostCard from "@/app/components/PostCard";

export default function PostListPage() {
  const user = useUserStore((state) => state.user);
  const [filters, setFilters] = useState({
    category: "",
    sort: "new",
    search: "",
  });

  const { data: posts, refetch } = useQuery({
    queryKey: ["posts", filters],
    queryFn: async () => {
      const res = await axios.get("/posts", { params: filters });
      return res.data;
    },
  });

  const handleDelete = async (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await axios.delete(`/posts/${id}`);
      refetch();
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">모집글 리스트</h1>

      <PostFilter onFilterChange={(newFilters) => setFilters(newFilters)} />

      {posts?.length === 0 ? (
        <p className="text-gray-500">등록된 게시글이 없습니다.</p>
      ) : (
        posts?.map((post: any) => (
          <PostCard
            key={post.id}
            post={post}
            userId={user?.id}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}
