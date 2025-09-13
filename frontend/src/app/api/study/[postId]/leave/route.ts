import { mockPosts } from "@/app/api/posts/route";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ postId: string }> }
) {
  const { postId } = await context.params;
  const body = await req.json();
  const user = body.user;

  const post = mockPosts.find((p) => p.id.toString() === postId);
  if (!post) {
    return NextResponse.json(
      { message: "게시글이 없습니다." },
      { status: 404 }
    );
  }

  post.participants = post.participants.filter((p) => p.id !== user.id);

  return NextResponse.json({
    message: "참여 취소 완료",
    participants: post.participants,
  });
}
