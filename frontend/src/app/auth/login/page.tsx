"use client";

import { useState } from "react";

import { useUserStore } from "store/userStore";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "@/app/lib/axios";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      const res = await axios.post("/auth/login", data);
      return res.data;
    },
    onSuccess: (data) => {
      setUser(data);
      localStorage.setItem("token", data.token);
      router.push("/");
    },
    onError: () => {
      alert("로그인 실패");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(form);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
          로그인
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1" htmlFor="email">
              이메일
            </label>
            <input
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1" htmlFor="password">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              placeholder="비밀번호"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 hover:shadow-md transition"
          >
            로그인
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          계정이 없으신가요?{" "}
          <a href="/auth/register" className="text-blue-500 hover:underline">
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
}
