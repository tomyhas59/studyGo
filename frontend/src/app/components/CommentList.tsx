"use client";

import { CommentType } from "@shared/type";
import { useQuery } from "@tanstack/react-query";
import axios from "../lib/axios";

interface CommentListProps {
  postId: number;
}

export default function CommentList({ postId }: CommentListProps) {
  const { data: comments } = useQuery<CommentType[]>({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await axios.get(`/posts/${postId}/comments`);
      return res.data;
    },
  });

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

          {/* 댓글 내용 */}
          <p className="text-gray-700 whitespace-pre-line">{comment.content}</p>
        </li>
      ))}
    </ul>
  );
}
