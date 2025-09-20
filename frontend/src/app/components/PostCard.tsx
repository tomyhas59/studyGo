"use client";

import { PostType } from "@shared/type";
import { useRouter } from "next/navigation";
import DeleteButton from "./DeleteButton";

interface Props {
  post: PostType;
  userId?: number;
  onDelete?: (id: number) => void;
}

export default function PostCard({ post, userId, onDelete }: Props) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/posts/${post.id}`)}
      className="relative border rounded-lg shadow-md mb-4 hover:shadow-xl transition bg-white cursor-pointer overflow-hidden"
    >
      <div className="p-5 space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 flex flex-col sm:flex-row sm:items-center sm:justify-start gap-2">
          <span className="hover:underline">{post.title}</span>
          <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
              댓글 {post.commentCount ?? 0}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full shadow-sm">
              현재 참여자 {post.participants ? post.participants.length : 0}명
            </span>
          </div>
        </h2>

        <p className="text-sm text-gray-500">카테고리: {post.category}</p>
        <p className="text-sm text-gray-500">
          작성자: <span className="font-medium">{post.author.name}</span> |{" "}
          {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>
      {userId === post.author.id && onDelete && (
        <DeleteButton postId={post.id} onDelete={onDelete} />
      )}
    </div>
  );
}
