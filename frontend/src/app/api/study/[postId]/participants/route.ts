import { mockPosts } from "@/app/api/posts/route";
import { NextResponse } from "next/server";
// 참여자 조회
export async function GET(
  req: Request,
  context: { params: Promise<{ postId: string }> }
) {
  const { postId } = await context.params;

  const participatedPost = mockPosts.find((p) => p.id.toString() === postId);
  if (!participatedPost) {
    return NextResponse.json(
      { message: "해당 스터디를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  return NextResponse.json(participatedPost.participants, { status: 200 });
}

// 참여
export async function POST(
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

  if (!post.participants) {
    post.participants = [];
  }
  if (!post.participants.some((p) => p.id === user.id)) {
    post.participants.push({ id: user.id, name: user.name });
  }
  return NextResponse.json({ message: "참여 완료" });
}

// 참여 취소
export async function DELETE(
  req: Request,
  context: { params: Promise<{ postId: string }> }
) {
  const { postId } = await context.params;
  const body = await req.json();
  const user = body.user;

  const participatedPost = mockPosts.find((p) => p.id.toString() === postId);
  if (!participatedPost) {
    return NextResponse.json(
      { message: "해당 스터디를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  participatedPost.participants = participatedPost.participants.filter(
    (p) => p.id !== user.id
  );

  return NextResponse.json({
    message: "참여 취소 완료",
    participants: participatedPost.participants,
  });
}
