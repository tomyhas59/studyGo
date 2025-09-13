interface DeleteButtonProps {
  postId: number;
  onDelete: (id: number) => void;
}

export default function DeleteButton({ postId, onDelete }: DeleteButtonProps) {
  return (
    <button
      className="absolute top-2 right-2 text-red-500 cursor-pointer hover:text-red-700 hover:underline"
      onClick={(e) => {
        e.stopPropagation();
        onDelete(postId);
      }}
    >
      삭제
    </button>
  );
}
