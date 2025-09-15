import { NextResponse } from "next/server";
import { mockPosts } from "../../route";
import { CommentType } from "@shared/type";

interface Params {
  id: string;
}

export let mockComments: CommentType[] = [
  {
    id: 1,
    postId: 1,
    content: "첫 댓글입니다!",
    author: { id: 1, name: "홍길동" },
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    postId: 1,
    content: "좋은 글 잘 읽었습니다.",
    author: { id: 2, name: "이몽룡" },
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    postId: 2,
    content: "Next.js 정말 재밌네요!",
    author: { id: 3, name: "성춘향" },
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    postId: 2,
    content: "백엔드 공부도 해야겠어요.",
    author: { id: 1, name: "홍길동" },
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    postId: 1,
    content: "참여자 목록과 댓글 연동 좋네요.",
    author: { id: 4, name: "심청이" },
    createdAt: new Date().toISOString(),
  },
];
// 댓글 조회
export async function GET(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;
  const postId = parseInt(id, 10);

  const comments = mockComments.filter((c) => c.postId === postId);
  return NextResponse.json(comments, { status: 200 });
}

// 댓글 작성
export async function POST(req: Request, context: { params: Promise<Params> }) {
  const { id } = await context.params;
  const postId = parseInt(id, 10);

  const body = await req.json();
  const { content, author } = body;

  if (!content || !author) {
    return NextResponse.json(
      { message: "내용과 작성자가 필요합니다." },
      { status: 400 }
    );
  }

  const postExists = mockPosts.find((p) => p.id === postId);
  if (!postExists) {
    return NextResponse.json(
      { message: "게시글을 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  const newComment: CommentType = {
    id: mockComments.length + 1,
    postId,
    content,
    author,
    createdAt: new Date().toISOString(),
  };

  mockComments.push(newComment);

  return NextResponse.json(newComment, { status: 201 });
}
