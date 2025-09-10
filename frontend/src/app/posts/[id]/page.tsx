"use client";

import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/app/lib/axios";
import { PostType } from "@shared/type";
import { useEffect, useState } from "react";
import { useUserStore } from "store/userStore";
import ParticipantList from "@/app/components/ParticipantList";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  const [participants, setParticipants] = useState<
    { id: number; name: string }[]
  >([]);

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<PostType>({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axios.get(`/posts/${id}`);
      return res.data;
    },
  });

  const fetchParticipants = async () => {
    const res = await axios.get(`/study/${id}/participants`);
    setParticipants(res.data);
  };

  useEffect(() => {
    fetchParticipants();
  }, [id]);

  const joinMutation = useMutation({
    mutationFn: async () => await axios.post(`/study/${id}/join`, { user }),
    onSuccess: () => {
      fetchParticipants();
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", image: "" });

  const updateMutation = useMutation({
    mutationFn: async (updatedPost: Partial<PostType>) => {
      await axios.put(`/posts/${id}`, updatedPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", id] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setIsEditing(false);
      alert("게시글이 수정되었습니다.");
    },
    onError: () => {
      alert("수정 실패");
    },
  });

  const handleEdit = () => {
    if (!post) return;
    setForm({
      title: post.title,
      content: post.content,
      image: post.image || "",
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    updateMutation.mutate(form);
  };

  if (isLoading) return <p className="text-center mt-10">불러오는 중...</p>;
  if (isError || !post) return <p className="text-center mt-10">에러 발생!</p>;

  const isAuthor = user?.id === post.author.id;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      {isEditing ? (
        <div className="space-y-4">
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="제목"
          />
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="내용"
            rows={6}
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="이미지 URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <div className="flex flex-wrap gap-3">
            <button
              className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              onClick={handleSave}
            >
              저장
            </button>
            <button
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              onClick={() => setIsEditing(false)}
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="mb-4 text-gray-600">카테고리: {post.category}</p>
          {post.image && (
            <img
              src={post.image}
              alt="게시글 이미지"
              className="mb-6 w-full rounded-lg object-cover"
            />
          )}
          <p className="mb-6 whitespace-pre-line text-gray-700">
            {post.content}
          </p>

          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => joinMutation.mutate()}
          >
            참가하기
          </button>

          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">참가자 목록</h2>
            <ParticipantList participants={participants} />
          </div>
          <p className="text-sm text-gray-500 mb-6">
            작성자: {post.author.name} |{" "}
            {new Date(post.createdAt).toLocaleString()}
          </p>
          <div className="flex flex-wrap gap-3">
            {isAuthor && (
              <button
                className="px-5 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
                onClick={handleEdit}
              >
                수정
              </button>
            )}
            <button
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              onClick={() => router.push("/posts/list")}
            >
              목록으로
            </button>
          </div>
        </>
      )}
    </div>
  );
}
