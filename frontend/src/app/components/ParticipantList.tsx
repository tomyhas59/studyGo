"use client";

interface Props {
  participants: { id: number; name: string }[];
}

export default function ParticipantList({ participants }: Props) {
  if (!participants || participants.length === 0)
    return <p>참가자가 없습니다.</p>;

  return (
    <ul className="space-y-1">
      {participants.map((p) => (
        <li key={p.id} className="text-gray-700 border-b pb-1">
          {p.name}
        </li>
      ))}
    </ul>
  );
}
