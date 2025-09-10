import { PostType } from "@shared/type";
import { NextResponse } from "next/server";

export let mockPosts: PostType[] = [
  {
    id: 1,
    title: "첫 번째 글",
    content: "안녕하세요!",
    category: "frontend",
    author: { id: 1, name: "홍길동" },
    createdAt: new Date().toISOString(),
    participants: [
      { id: 1, name: "홍길동" },
      { id: 2, name: "이몽룡" },
    ],
  },
  {
    id: 2,
    title: "두 번째 글",
    content: "Next.js API 테스트",
    category: "backend",
    author: { id: 1, name: "이몽룡" },
    createdAt: new Date().toISOString(),
    participants: [],
  },
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const authorId = url.searchParams.get("authorId");
  const category = url.searchParams.get("category");
  const sort = url.searchParams.get("sort");
  const search = url.searchParams.get("search");

  let posts = [...mockPosts];

  // 작성자 필터
  if (authorId) {
    posts = posts.filter((post) => post.author.id.toString() === authorId);
  }

  // 카테고리 필터
  if (category && category !== "") {
    posts = posts.filter((post) => post.category === category);
  }

  // 검색 필터 (제목 / 내용 / 작성자 이름)
  if (search) {
    const s = search.toLowerCase();
    posts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(s) ||
        post.content.toLowerCase().includes(s) ||
        post.author.name.toLowerCase().includes(s)
    );
  }

  // 정렬
  if (sort === "new") {
    posts.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (sort === "popular") {
    posts.sort((a, b) => b.participants.length - a.participants.length);
  }

  return NextResponse.json(posts || [], { status: 200 });
}

export async function POST(req: Request) {
  const body = await req.json();
  const newPost = {
    id: Date.now(),
    title: body.title,
    content: body.content,
    category: body.category,
    author: {
      id: body.user.id,
      name: body.user.name,
    },
    createdAt: new Date().toISOString(),
    participants: [{ id: body.user.id, name: body.user.name }],
  };

  mockPosts.push(newPost);

  return NextResponse.json(newPost, { status: 201 });
}
