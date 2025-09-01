import { NextResponse } from "next/server";
import { mockUsers } from "../register/route";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const existingUser = mockUsers.find((user) => user.email === email);

  if (!existingUser)
    return NextResponse.json(
      { error: "가입된 유저가 없습니다." },
      { status: 401 }
    );

  if (existingUser?.password !== password)
    return NextResponse.json(
      { error: "비밀번호가 다릅니다." },
      { status: 401 }
    );

  const user = {
    id: existingUser.id,
    email,
    name: existingUser.name,
  };

  return NextResponse.json(user, { status: 200 });
}
