"use client";

import { ParticipantType, PostType } from "@shared/type";
import { useUserStore } from "store/useUserStore";

export default function ParticipantList({
  post,
  participants,
}: {
  post: PostType;
  participants: ParticipantType[];
}) {
  const user = useUserStore((state) => state.user);

  return (
    <>
      {!participants || participants.length === 0 ? (
        <p className="text-gray-500 text-sm sm:text-base">참여자가 없습니다.</p>
      ) : (
        <ul className="space-y-1">
          {participants.map((p) => (
            <li
              key={p.id}
              className="flex items-center text-gray-700 text-sm sm:text-base border-b pb-1 last:border-b-0"
            >
              {p.name}
              <span
                className={`text-xs ml-2 ${
                  p.status === "approved" ? "text-green-500" : "text-red-500"
                }`}
              >
                ({p.status === "approved" ? "승인됨" : "대기중"})
              </span>
              {user && user.id === post.author.id && (
                <div className="mt-1 space-x-2 justify-end ml-auto">
                  {p.status === "pending" && (
                    <button className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition">
                      승인
                    </button>
                  )}
                  <button className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition">
                    거절
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
