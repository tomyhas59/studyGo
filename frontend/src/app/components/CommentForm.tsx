"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../lib/axios";
import { useUserStore } from "store/userStore";
import { CommentType } from "@shared/type";

interface CommentFormProps {
  postId: number;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");

  const mutation = useMutation({
    mutationFn: async (newComment: Partial<CommentType>) => {
      const res = await axios.post(`/posts/${postId}/comments`, newComment);
      return res.data;
    },
    onSuccess: () => {
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err: any) => {
      alert(err.message || "댓글 작성 실패");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("로그인 후 작성 가능합니다.");
    if (!content.trim()) return alert("댓글 내용을 입력해주세요.");

    mutation.mutate({
      content,
      author: { id: user.id, name: user.name },
    });
  };
  if (!user) return null;

  return (
    <div className="mb-6">
      <textarea
        className="w-full p-4 border border-gray-200 rounded-lg mb-2"
        rows={3}
        placeholder="댓글을 입력하세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={handleSubmit}
      >
        댓글 작성
      </button>
    </div>
  );
}
