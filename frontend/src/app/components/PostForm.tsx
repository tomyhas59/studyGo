"use client";

import { useState } from "react";

type PostFormProps = {
  initialValues?: {
    title: string;
    content: string;
    image: string;
    category: string;
  };
  onSubmit: (form: {
    title: string;
    content: string;
    image: string;
    category: string;
  }) => void;
  submitText?: string;
};

const categories = ["frontend", "backend", "AI"];

export default function PostForm({
  initialValues = { title: "", content: "", image: "", category: "" },
  onSubmit,
  submitText = "작성",
}: PostFormProps) {
  const [form, setForm] = useState(initialValues);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-200 rounded-xl shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        모집글 {submitText}
      </h1>
      <input
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="제목"
        value={form.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />
      <select
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={form.category}
        onChange={(e) => handleChange("category", e.target.value)}
      >
        <option value="">카테고리 선택</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <textarea
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="내용"
        value={form.content}
        onChange={(e) => handleChange("content", e.target.value)}
        rows={6}
      />
      <input
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="이미지 URL (옵션)"
        value={form.image}
        onChange={(e) => handleChange("image", e.target.value)}
      />
      <button
        className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
        onClick={() => onSubmit(form)}
      >
        {submitText}
      </button>
    </div>
  );
}
