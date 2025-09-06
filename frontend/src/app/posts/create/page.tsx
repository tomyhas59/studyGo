"use client";

import { useState } from "react";
import axios from "@/app/lib/axios";
import { useRouter } from "next/navigation";
import { useUserStore } from "store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreatePostPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "", image: "" });
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: async (newPost: typeof form & { user: typeof user }) => {
      const res = await axios.post("/posts", newPost);
    },
    onSuccess: () => {
      alert("작성 완료!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push("/posts/list");
    },
    onError: (error) => {
      console.error(error);
      alert("작성 실패");
    },
  });

  const handleSubmit = () => {
    if (!user) {
      alert("로그인 후 작성 가능합니다.");
      return;
    }
    createPostMutation.mutate({ ...form, user });
  };

  if (!user) return <div>회원만 쓸 수 있습니다.</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-200 rounded-xl shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">모집글 작성</h1>
      <input
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="제목"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="내용"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        rows={6}
      />
      <input
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="이미지 URL (옵션)"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />
      <button
        className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
        onClick={handleSubmit}
      >
        작성
      </button>
    </div>
  );
}
