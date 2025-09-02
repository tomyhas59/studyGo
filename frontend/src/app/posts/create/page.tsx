"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserStore } from "store/userStore";
import { useLoadingStore } from "store/LoadingState";

export default function CreatePostPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "", image: "" });
  const user = useUserStore((state) => state.user);

  const handleSubmit = async () => {
    try {
      await axios.post("/api/posts", { ...form, user });
      alert("작성 완료!");
      router.push("/posts/list");
    } catch (err) {
      alert("작성 실패");
      console.error(err);
    }
  };

  if (!user) return <div>회원만 쓸 수 있습니다.</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">모집글 작성</h1>
      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="제목"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        className="w-full mb-3 p-2 border rounded"
        placeholder="내용"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />
      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="이미지 URL (옵션)"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />
      <button
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        onClick={handleSubmit}
      >
        작성
      </button>
    </div>
  );
}
