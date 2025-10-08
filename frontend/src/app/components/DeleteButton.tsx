interface DeleteButtonProps {
  postId: number;
  onDelete: (id: number) => void;
}

export default function DeleteButton({ postId, onDelete }: DeleteButtonProps) {
  return (
    <button
      className="px-3 py-1 bg-red-500 text-white rounded-lg cursor-pointer hover:underline
             sm:top-3 sm:right-3 sm:text-sm text-xs"
      onClick={(e) => {
        e.stopPropagation();
        onDelete(postId);
      }}
    >
      삭제
    </button>
  );
}
