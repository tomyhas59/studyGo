export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">환영합니다 👋</h1>
      <p className="text-gray-600">
        이 프로젝트는 Next.js + Nest.js + Prisma로 만든 스터디 프로젝트입니다.
      </p>

      <div className="space-x-4">
        <a
          href="/auth/login"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          로그인
        </a>
        <a
          href="/auth/register"
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          회원가입
        </a>
      </div>
    </div>
  );
}
