"use client";

import { CommentType } from "@shared/type";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../lib/axios";
import { useUserStore } from "store/userStore";
import { useState } from "react";

interface CommentListProps {
  postId: number;
}

export default function CommentList({ postId }: CommentListProps) {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  // 댓글 조회
  const { data: comments } = useQuery<CommentType[]>({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await axios.get(`/posts/${postId}/comments`);
      return res.data;
    },
  });

  // 댓글 삭제
  const deleteMutation = useMutation({
    mutationFn: async (commentId: number) => {
      await axios.delete(`/posts/${postId}/comments/${commentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] }); // 댓글 수 반영 위해
    },
  });

  // 댓글 수정
  const updateMutation = useMutation({
    mutationFn: async ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) => {
      const res = await axios.patch(`/posts/${postId}/comments/${commentId}`, {
        content,
      });
      return res.data;
    },
    onSuccess: () => {
      setEditingId(null);
      setEditContent("");
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  const handleEditComment = (commentId: number, content: string) => {
    updateMutation.mutate({ commentId, content });
  };

  if (!comments || comments.length === 0) {
    return (
      <p className="text-gray-500 text-sm text-center py-4">
        아직 댓글이 없습니다.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {comments.map((comment) => (
        <li
          key={comment.id}
          className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
        >
          {/* 작성자 + 시간 */}
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-800">
              {comment.author.name}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>

          {/* 댓글 수정 모드 */}
          {editingId === comment.id ? (
            <div>
              <textarea
                className="w-full p-2 border border-gray-300 rounded mb-2"
                rows={2}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditComment(comment.id, editContent)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  저장
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  취소
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* 댓글 내용 */}
              <p className="text-gray-700 whitespace-pre-line">
                {comment.content}
              </p>

              {/* 본인 댓글일 때만 수정/삭제 버튼 */}
              {user?.id === comment.author.id && (
                <div className="flex gap-2 mt-2 text-sm">
                  <button
                    onClick={() => {
                      setEditingId(comment.id);
                      setEditContent(comment.content);
                    }}
                    className="text-blue-500 hover:underline"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("댓글을 삭제하시겠습니까?")) {
                        deleteMutation.mutate(comment.id);
                      }
                    }}
                    className="text-red-500 hover:underline"
                  >
                    삭제
                  </button>
                </div>
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
