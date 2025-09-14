import { NextResponse } from "next/server";
import { mockPosts } from "../../route";

interface Params {
  id: string;
}

// 댓글 조회
export async function GET(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;
  const postId = parseInt(id, 10);

  const post = mockPosts.find((post) => post.id === postId);
  if (!post) {
    return NextResponse.json(
      { message: "해당 글을 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  return NextResponse.json(post.comments ?? [], { status: 200 });
}

// 댓글 작성
export async function POST(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;
  const postId = parseInt(id, 10);

  const post = mockPosts.find((post) => post.id === postId);
  if (!post) {
    return NextResponse.json(
      { message: "해당 글을 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  const body = await req.json();
  const newComment = {
    id: Date.now(),
    content: body.content,
    author: body.author,
    postId,
    createdAt: new Date().toISOString(),
  };

  post.comments = [...(post.comments ?? []), newComment];

  return NextResponse.json(newComment, { status: 201 });
}

// 댓글 삭제
export async function DELETE(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;
  const postId = parseInt(id, 10);
  const body = await req.json();

  const post = mockPosts.find((post) => post.id === postId);
  if (!post) {
    return NextResponse.json(
      { message: "해당 글을 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  post.comments = (post.comments ?? []).filter(
    (comment) => comment.id !== body.commentId
  );

  return NextResponse.json({ message: "댓글 삭제 성공" }, { status: 200 });
}
