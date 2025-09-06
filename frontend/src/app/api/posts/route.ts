import { PostType } from "@shared/type";
import { NextResponse } from "next/server";

export let mockPosts: PostType[] = [
  {
    id: 1,
    title: "첫 번째 글",
    content: "안녕하세요!",
    author: { id: 1, name: "홍길동" },
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "두 번째 글",
    content: "Next.js API 테스트",
    author: { id: 1, name: "이몽룡" },
    createdAt: new Date().toISOString(),
  },
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const authorId = url.searchParams.get("authorId");

  if (authorId) {
    const posts = mockPosts.filter(
      (post) => post.author.id.toString() === authorId
    );
    return NextResponse.json(posts);
  }

  return NextResponse.json(mockPosts);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newPost = {
    id: Date.now(),
    title: body.title,
    content: body.content,
    author: {
      id: body.user.id,
      name: body.user.name,
    },
    createdAt: new Date().toISOString(),
  };

  mockPosts.push(newPost);

  return NextResponse.json(newPost, { status: 201 });
}
