"use client";

import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post<{ access_token: string }>(
        "/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", res.data.access_token);
      alert("로그인 성공!");
    } catch (err) {
      alert("로그인 실패");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">로그인</h1>
      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-full mb-3 p-2 border rounded"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        onClick={handleLogin}
      >
        로그인
      </button>
    </div>
  );
}
