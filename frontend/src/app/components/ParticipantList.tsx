"use client";

interface Props {
  participants: { id: number; name: string }[];
}

export default function ParticipantList({ participants }: Props) {
  return (
    <>
      {!participants || participants.length === 0 ? (
        <p className="text-gray-500 text-sm sm:text-base">참여자가 없습니다.</p>
      ) : (
        <ul className="space-y-1">
          {participants.map((p) => (
            <li
              key={p.id}
              className="text-gray-700 text-sm sm:text-base border-b pb-1 last:border-b-0"
            >
              {p.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
