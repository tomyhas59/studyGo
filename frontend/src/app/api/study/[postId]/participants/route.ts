import { NextResponse } from "next/server";
import { mockPosts } from "../../../posts/route";
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
