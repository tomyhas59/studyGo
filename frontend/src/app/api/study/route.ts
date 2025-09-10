import { mockPosts } from "../posts/route";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const participantId = url.searchParams.get("participantId");

  let posts = [...mockPosts];

  if (participantId) {
    posts = posts.filter((post) =>
      post.participants.some((p) => p.id.toString() === participantId)
    );
  }
  return NextResponse.json(posts || [], { status: 200 });
}
