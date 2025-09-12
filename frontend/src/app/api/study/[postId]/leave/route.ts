import { mockPosts } from "@/app/api/posts/route";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const { userId } = await req.json();
  const postId = parseInt(params.postId);

  const post = mockPosts.find((p) => p.id === postId);
  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  // 해당 post의 participants 배열에서 userId 제거
  post.participants = post.participants.filter((p) => p.id !== userId);

  return NextResponse.json({
    message: "참여 취소 완료",
    participants: post.participants,
  });
}
