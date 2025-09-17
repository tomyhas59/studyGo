import { NextResponse } from "next/server";
import { mockComments } from "../route";

interface Params {
  id: string; // postId
  commentId: string;
}

// 댓글 수정 (PATCH)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const { id, commentId } = await params;
  const postId = parseInt(id, 10);
  const cId = parseInt(commentId, 10);

  const body = await req.json();
  const { content } = body;

  const comment = mockComments.find((c) => c.id === cId && c.postId === postId);

  if (!comment) {
    return NextResponse.json(
      { message: "댓글을 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  if (content) {
    comment.content = content;
  }

  return NextResponse.json(comment, { status: 200 });
}

// 댓글 삭제 (DELETE)
export async function DELETE(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const { id, commentId } = await params;
  const postId = parseInt(id, 10);
  const cId = parseInt(commentId, 10);

  const index = mockComments.findIndex(
    (c) => c.id === cId && c.postId === postId
  );

  if (index === -1) {
    return NextResponse.json(
      { message: "댓글을 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  const deleted = mockComments.splice(index, 1)[0];

  return NextResponse.json(deleted, { status: 200 });
}
