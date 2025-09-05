import { NextResponse } from "next/server";
import { mockPosts } from "../route";

interface Params {
  id: string;
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  const postId = parseInt(params.id);
  const postIndex = mockPosts.findIndex((post) => post.id === postId);

  if (postIndex === -1) {
    return NextResponse.json(
      { message: "게시글을 찾을 수 없습니다" },
      { status: 404 }
    );
  }

  mockPosts.splice(postIndex, 1);
  return NextResponse.json({ message: "삭제 성공" }, { status: 200 });
}
