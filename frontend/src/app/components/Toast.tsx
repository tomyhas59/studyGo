"use client";

import { useToastStore } from "store/useToastStore";

export default function Toasts() {
  const { toasts } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-up cursor-pointer"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
