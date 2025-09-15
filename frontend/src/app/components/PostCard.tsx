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
      className="border rounded shadow mb-4 hover:shadow-lg transition bg-white cursor-pointer relative"
    >
      <div className="p-4">
        <h2 className="text-xl font-semibold text-blue-600 hover:underline">
          {post.title}
          <span className="ml-2 text-sm text-gray-500">
            ({post.commentCount})
          </span>
        </h2>
        <p className="text-sm text-gray-500 mt-2">카테고리: {post.category}</p>
        <p className="text-sm text-gray-500 mt-2">
          작성자: {post.author.name} |{" "}
          {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>

      {userId === post.author.id && onDelete && (
        <DeleteButton postId={post.id} onDelete={onDelete} />
      )}
    </div>
  );
}
