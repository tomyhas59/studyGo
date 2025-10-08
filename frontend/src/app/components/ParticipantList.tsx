"use client";

import { PostType, ParticipantType } from "@shared/type";
import { useUserStore } from "store/useUserStore";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "../lib/axios";
import { useState, useEffect } from "react";

interface Props {
  post: PostType;
  participants: ParticipantType[];
}

export default function ParticipantList({ post, participants }: Props) {
  const user = useUserStore((state) => state.user);
  const isAuthor = user?.id === post.author.id;
  const queryClient = useQueryClient();

  // 로컬 상태로 참여자 목록 관리
  const [participantList, setParticipantList] =
    useState<ParticipantType[]>(participants);

  // props가 바뀌면 로컬 상태도 갱신
  useEffect(() => {
    setParticipantList(participants);
  }, [participants]);

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      participantId,
      status,
    }: {
      participantId: number;
      status: "approved" | "rejected" | "pending";
    }) => {
      const res = await axios.patch(
        `/study/${post.id}/participants/${participantId}`,
        { status }
      );
      return res.data.participant;
    },
    onSuccess: (updatedParticipant) => {
      // 성공하면 로컬 상태 즉시 업데이트
      setParticipantList((prev) =>
        prev.map((p) =>
          p.id === updatedParticipant.id ? updatedParticipant : p
        )
      );
      // query 데이터도 갱신
      queryClient.invalidateQueries({ queryKey: ["participants", post.id] });
    },
  });

  const handleApprove = (id: number) =>
    updateStatusMutation.mutate({ participantId: id, status: "approved" });
  const handleReject = (id: number) =>
    updateStatusMutation.mutate({ participantId: id, status: "rejected" });
  const handleCancelApprove = (id: number) =>
    updateStatusMutation.mutate({ participantId: id, status: "pending" });

  return (
    <>
      {!participantList || participantList.length === 0 ? (
        <p className="text-gray-500 text-sm sm:text-base">참여자가 없습니다.</p>
      ) : (
        <ul className="space-y-1">
          {participantList.map((p) => (
            <li
              key={p.id}
              className="flex items-center text-gray-700 text-sm sm:text-base border-b pb-1 last:border-b-0"
            >
              {p.name}
              <span
                className={`text-xs ml-2 ${
                  p.id === post.author.id
                    ? "text-blue-500"
                    : p.status === "approved"
                      ? "text-green-500"
                      : p.status === "rejected"
                        ? "text-red-500"
                        : "text-gray-500"
                }`}
              >
                (
                {p.id === post.author.id
                  ? "스터디장"
                  : p.status === "approved"
                    ? "승인됨"
                    : p.status === "rejected"
                      ? "거절됨"
                      : "대기중"}
                )
              </span>

              {isAuthor && p.id !== post.author.id && (
                <div className="ml-auto flex space-x-2 mt-1">
                  {p.status === "pending" && (
                    <>
                      <button
                        className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition cursor-pointer"
                        onClick={() => handleApprove(p.id)}
                      >
                        승인
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition cursor-pointer"
                        onClick={() => handleReject(p.id)}
                      >
                        거절
                      </button>
                    </>
                  )}

                  {p.status === "approved" && (
                    <button
                      className="px-2 py-1 bg-gray-400 text-white text-xs rounded hover:bg-gray-500 transition cursor-pointer"
                      onClick={() => handleCancelApprove(p.id)}
                    >
                      승인취소
                    </button>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
