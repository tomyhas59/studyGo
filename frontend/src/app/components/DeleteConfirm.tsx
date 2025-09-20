"use client";

import axios from "@/app/lib/axios";
import { useToastStore } from "store/useToastStore";
import { useModalStore } from "store/useModalStore";

interface DeleteConfirmProps {
  url: string;
  onSuccess?: () => void;
  message?: string;
}

export default function DeleteConfirm({
  url,
  onSuccess,
  message = "정말 삭제하시겠습니까?",
}: DeleteConfirmProps) {
  const { closeModal } = useModalStore();
  const { addToast } = useToastStore();

  const handleDelete = async () => {
    try {
      await axios.delete(`${url}`);
      closeModal();
      addToast("삭제가 완료되었습니다 ✅");
      if (onSuccess) onSuccess();
    } catch (err) {
      addToast("삭제 중 오류가 발생했습니다 ❌");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">{message}</h2>
      <div className="flex justify-end gap-2">
        <button
          onClick={closeModal}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          취소
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
