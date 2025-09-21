import { mockPosts } from "@/app/api/posts/route";
import { NextResponse } from "next/server";

// 승인/거절 처리
export async function PATCH(
  req: Request,
  context: { params: Promise<{ postId: string; userId: string }> }
) {
  const { postId, userId } = await context.params;
  const body = await req.json();
  const { status } = body; // 'approved' or 'rejected'

  const post = mockPosts.find((p) => p.id.toString() === postId);
  if (!post) {
    return NextResponse.json(
      { message: "게시글이 없습니다." },
      { status: 404 }
    );
  }

  const participant = post.participants.find((p) => p.id.toString() === userId);
  if (!participant) {
    return NextResponse.json(
      { message: "참여자가 아닙니다." },
      { status: 404 }
    );
  }

  participant.status = status;
  return NextResponse.json({
    message: `참여자가 ${status === "approved" ? "승인" : "거절"}되었습니다.`,
    participant,
  });
}

// 참여 취소
export async function DELETE(
  req: Request,
  context: { params: Promise<{ postId: string; userId: string }> }
) {
  const { postId, userId } = await context.params;
  const post = mockPosts.find((p) => p.id.toString() === postId);
  if (!post) {
    return NextResponse.json(
      { message: "게시글이 없습니다." },
      { status: 404 }
    );
  }

  const participant = post.participants.find((p) => p.id.toString() === userId);
  if (!participant) {
    return NextResponse.json(
      { message: "참여자가 아닙니다." },
      { status: 404 }
    );
  }

  post.participants = post.participants.filter(
    (p) => p.id.toString() !== userId
  );
  return NextResponse.json({
    message: "참여 취소 완료",
    participants: post.participants,
  });
}
