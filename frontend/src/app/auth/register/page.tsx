"use client";

import { useState } from "react";
import axios from "axios";
import { RegisterForm } from "@shared/type";
import { useRouter } from "next/navigation";
import { useLoadingStore } from "store/LoadingState";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState<RegisterForm>({
    email: "",
    password: "",
    name: "",
  });

  const handleRegister = async () => {
    try {
      await axios.post("/api/auth/register", form);
      alert("회원가입 성공!");
      router.push("/auth/login");
    } catch (err) {
      alert("회원가입 실패");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">회원가입</h1>
      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="이메일"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        className="w-full mb-3 p-2 border rounded"
        placeholder="비밀번호"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="이름"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <button
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        onClick={handleRegister}
      >
        가입하기
      </button>
    </div>
  );
}
