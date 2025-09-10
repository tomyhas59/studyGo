import { NextResponse } from "next/server";

type User = {
  id: number;
  email: string;
  password: string;
  name: string;
};

export const mockUsers: User[] = [
  {
    id: 3,
    email: "yh@naver.com",
    password: "123qwe",
    name: "yh",
  },
];

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, name } = body;

  if (mockUsers.find((user) => user.email === email)) {
    return NextResponse.json(
      { error: "이미 가입된 이메일입니다." },
      { status: 400 }
    );
  }

  const newUser: User = {
    id: Date.now(),
    email,
    password,
    name,
  };

  mockUsers.push(newUser);

  return NextResponse.json({ message: "회원가입 성공" }, { status: 201 });
}
