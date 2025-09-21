import { PostType } from "@shared/type";
import { NextResponse } from "next/server";
import { mockComments } from "./[id]/comments/route";

export const mockPosts: PostType[] = [
  {
    id: 1,
    title: "프론트엔드 스터디 모집",
    content: "Next.js와 TypeScript를 같이 공부할 참여자를 모집합니다.",
    category: "프론트엔드",
    author: { id: 1, name: "홍길동" },
    createdAt: "2025-09-21T10:00:00.000Z",
    participants: [
      {
        id: 1,
        name: "홍길동",
        status: "approved",
        joinedAt: "2025-09-21T12:00:00.000Z",
      },
      {
        id: 2,
        name: "이몽룡",
        status: "approved",
        joinedAt: "2025-09-21T12:00:00.000Z",
      },
      {
        id: 3,
        name: "성춘향",
        status: "pending",
        joinedAt: "2025-09-21T13:00:00.000Z",
      },
    ],
    commentCount: 3,
  },
  {
    id: 2,
    title: "백엔드 스터디 모집",
    content: "Spring Boot와 JPA를 함께 공부할 사람을 찾습니다.",
    category: "백엔드",
    author: { id: 2, name: "이몽룡" },
    createdAt: "2025-09-20T09:30:00.000Z",
    participants: [],
    commentCount: 0,
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

  // 댓글 수 추가
  posts = posts.map((post) => {
    const commentCount = mockComments.filter(
      (c) => c.postId === post.id
    ).length;
    return { ...post, commentCount };
  });

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
    participants: [
      {
        id: body.user.id,
        name: body.user.name,
        status: "approved" as const,
        joinedAt: new Date().toISOString(),
      },
    ],
  };

  mockPosts.push(newPost);

  return NextResponse.json(newPost, { status: 201 });
}
