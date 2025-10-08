"use client";

import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/app/lib/axios";
import { PostType } from "@shared/type";
import { useState } from "react";
import { useUserStore } from "store/useUserStore";
import ParticipantList from "@/app/components/ParticipantList";
import PostForm from "@/app/components/PostForm";
import DeleteButton from "@/app/components/DeleteButton";
import CommentList from "@/app/components/CommentList";
import CommentForm from "@/app/components/CommentForm";
import { useToastStore } from "store/useToastStore";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  const { addToast } = useToastStore();

  // 게시글 가져오기
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

  // 참여자 목록 가져오기

  const { data: participants = [] } = useQuery({
    queryKey: ["participants", id],
    queryFn: async () => {
      const res = await axios.get(`/study/${id}/participants`);
      return res.data;
    },
  });

  // 참여
  const joinMutation = useMutation({
    mutationFn: async () =>
      await axios.post(`/study/${id}/participants`, { user }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants", id] });
    },
  });

  // 참여 취소
  const cancelMutation = useMutation({
    mutationFn: async () =>
      await axios.delete(`/study/${id}/participants`, { data: { user } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants", id] });
    },
  });

  // 게시글 수정
  const [isEditing, setIsEditing] = useState(false);
  const updatePostMutation = useMutation({
    mutationFn: async (updatedPost: Partial<PostType>) => {
      await axios.put(`/posts/${id}`, updatedPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", id] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setIsEditing(false);
      alert("게시글이 수정되었습니다.");
    },
    onError: () => alert("수정 실패"),
  });

  const handleEdit = () => {
    if (user?.id !== post?.author.id) {
      alert("작성자만 수정할 수 있습니다.");
      return;
    }
    setIsEditing(true);
  };

  const handleSubmit = (form: any) => {
    if (!form.category) return alert("카테고리를 선택해주세요.");
    if (!form.title.trim() || !form.content.trim())
      return alert("빈 칸을 확인해주세요.");
    if (!user) return alert("로그인 후 수정 가능합니다.");
    updatePostMutation.mutate({ ...form, user });
  };

  const handleDelete = async (id: number) => {
    try {
      if (confirm("정말 삭제하시겠습니까?")) {
        await axios.delete(`/posts/${id}`);
        addToast("삭제가 완료되었습니다 ✅");
        router.push("/posts/list");
      }
    } catch (error) {
      addToast("삭제 실패 😢");
    }
  };

  if (isLoading) return <p className="text-center mt-10">불러오는 중...</p>;
  if (isError || !post) return <p className="text-center mt-10">에러 발생!</p>;

  const isAuthor = user?.id === post.author.id;
  const isJoined = participants.some(
    (p: { id: number; name: string }) => p.id === user?.id
  );

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white border border-gray-200 rounded-2xl shadow-lg grid gap-8">
      {isEditing ? (
        <div className="space-y-6">
          <PostForm
            onSubmit={handleSubmit}
            initialValues={{
              title: post.title,
              content: post.content,
              image: post.image || "",
              category: post.category,
            }}
            submitText="수정"
          />
          <div className="flex justify-end gap-4">
            <button
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              onClick={() => setIsEditing(false)}
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* 헤더 */}
          <div className="grid gap-4">
            <div className="flex flex-col md:justify-between md:items-center gap-2">
              <h1 className="text-4xl font-bold text-gray-800">{post.title}</h1>
              <div className="flex flex-col md:flex-row md:items-center md:gap-4 text-gray-500 text-sm">
                <span>
                  작성자:
                  <span className="font-medium">{post.author.name}</span>
                </span>
                <span>작성일: {new Date(post.createdAt).toLocaleString()}</span>
                <span>
                  카테고리: <span className="font-medium">{post.category}</span>
                </span>
              </div>
            </div>
            {post.image && (
              <img
                src={post.image}
                alt="게시글 이미지"
                className="w-full h-64 md:h-96 object-cover rounded-xl shadow-sm"
              />
            )}
          </div>

          {/* 내용 */}
          <p className="bg-gray-100 p-2 rounded-lg min-h-[150px] border border-gray-200 text-gray-700 whitespace-pre-line leading-relaxed">
            {post.content}
          </p>

          {/* 참여/참여취소 버튼 */}
          {user && user.id !== post.author.id && (
            <div className="w-full md:w-1/5">
              <button
                className={`w-full px-6 py-3 rounded-lg font-medium text-white transition cursor-pointer ${
                  isJoined
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                onClick={() =>
                  isJoined ? cancelMutation.mutate() : joinMutation.mutate()
                }
              >
                {isJoined ? "참여 취소" : "참여하기"}
              </button>
            </div>
          )}

          {/* 참여자 */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-3">참여자 목록</h2>
              <ParticipantList post={post} participants={participants} />
            </div>
          </div>
        </>
      )}
      {isAuthor && (
        <div className="flex justify-between">
          <button
            className="w-20 px-6 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition shadow-md justify-self-end cursor-pointer"
            onClick={handleEdit}
          >
            수정
          </button>
          <button
            className="w-30 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition shadow-md justify-self-end cursor-pointer"
            onClick={() => router.push("/posts/list")}
          >
            목록으로
          </button>
          <DeleteButton postId={post.id} onDelete={handleDelete} />
        </div>
      )}
      <CommentList postId={post.id} />
      <CommentForm postId={post.id} />
    </div>
  );
}
