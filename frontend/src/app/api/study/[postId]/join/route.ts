import { NextResponse } from "next/server";
import { mockPosts } from "../../../posts/route";

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const postId = params.postId;
  const body = await req.json();
  const user = body.user;

  if (!user) {
    return NextResponse.json(
      { message: "사용자 정보가 없습니다." },
      { status: 400 }
    );
  }

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

  return NextResponse.json({ message: "참가 완료" });
}
