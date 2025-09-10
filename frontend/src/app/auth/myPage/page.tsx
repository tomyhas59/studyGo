"use client";

import { useUserStore } from "store/userStore";
import { useQuery } from "@tanstack/react-query";
import axios from "@/app/lib/axios";
import MyPostsList from "@/app/components/MyPostList";
import MyStudiesList from "@/app/components/MySudiesList";

export default function MyPage() {
  const user = useUserStore((state) => state.user);

  const { data: posts } = useQuery({
    queryKey: ["myPosts"],
    queryFn: async () => {
      const res = await axios.get(`/posts?authorId=${user?.id}`);
      return res.data;
    },
  });

  const { data: studies } = useQuery({
    queryKey: ["myStudies"],
    queryFn: async () => {
      const res = await axios.get(`/study?participantId=${user?.id}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4 space-y-8">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center">
        마이페이지
      </h1>

      {/* 사용자 정보 */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-2">
        <h2 className="text-2xl font-semibold text-gray-700">내 정보</h2>
        <p className="text-gray-600">이름: {user?.name}</p>
        <p className="text-gray-600">이메일: {user?.email}</p>
      </div>

      {/* 내가 작성한 글 */}
      <MyPostsList posts={posts} />

      {/* 내가 참여 중인 스터디 */}
      <MyStudiesList studies={studies} />
    </div>
  );
}
