"use client";

import { useState } from "react";
import axios from "@/app/lib/axios";
import { useRouter } from "next/navigation";
import { useUserStore } from "store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PostForm from "@/app/components/PostForm";

export default function CreatePostPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: async (newPost) => {
      return await axios.post("/posts", newPost);
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

  const handleSubmit = (form: any) => {
    if (form.category === "") {
      alert("카테고리를 선택해주세요.");
      return;
    }
    if (form.title.trim() === "" || form.content.trim() === "") {
      alert("빈 칸을 확인해주세요.");
      return;
    }

    if (!user) {
      alert("로그인 후 작성 가능합니다.");
      return;
    }
    createPostMutation.mutate({ ...form, user });
  };

  if (!user) return <div>회원만 쓸 수 있습니다.</div>;

  return <PostForm onSubmit={handleSubmit} submitText="작성" />;
}
