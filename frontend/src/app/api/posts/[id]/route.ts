import { NextResponse } from "next/server";
import { mockPosts } from "../route";

interface Params {
  id: string;
}

export async function GET(req: Request, context: { params: Promise<Params> }) {
  const { id } = await context.params;
  const postId = parseInt(id, 10);

  const post = mockPosts.find((post) => post.id === postId);
  if (!post) {
    return NextResponse.json(
      { message: "해당 글을 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  return NextResponse.json(post, { status: 200 });
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

export async function PUT(req: Request, { params }: { params: Params }) {
  const postId = parseInt(params.id);
  const post = mockPosts.find((post) => post.id === postId);

  if (!post) {
    return NextResponse.json(
      { message: "게시글을 찾을 수 없습니다" },
      { status: 404 }
    );
  }

  const body = await req.json();

  post.title = body.title;
  post.content = body.content;
  post.image = body.image;
  post.updatedAt = new Date().toISOString();

  return NextResponse.json({ message: "수정 성공" }, { status: 200 });
}
