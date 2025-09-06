"use client";

import { useState } from "react";
import axios from "@/app/lib/axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

type RegisterForm = {
  email: string;
  password: string;
  name: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState<RegisterForm>({
    email: "",
    password: "",
    name: "",
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterForm) => {
      const res = await axios.post("/auth/register", data);
      return res.data;
    },
    onSuccess: () => {
      alert("회원가입 성공!");
      router.push("/auth/login");
    },
    onError: () => {
      alert("회원가입 실패");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(form);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white border border-gray-200 rounded-2xl shadow-md space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-800 text-center">
        회원가입
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          placeholder="이메일"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          placeholder="비밀번호"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          placeholder="이름"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition"
        >
          가입하기
        </button>
      </form>
    </div>
  );
}
