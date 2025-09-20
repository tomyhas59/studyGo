"use client";

import { useRouter } from "next/navigation";

interface Props {
  studies: any[];
}

export default function MyStudiesList({ studies }: Props) {
  const router = useRouter();

  const handleStudyClick = (studyId: number) => {
    router.push(`/posts/${studyId}`);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
        참여 중인 스터디
      </h2>

      {!studies || studies.length === 0 ? (
        <p className="text-gray-500">참여 중인 스터디가 없습니다.</p>
      ) : (
        <ul className="space-y-2">
          {studies.map((study) => (
            <li
              key={study.id}
              onClick={() => handleStudyClick(study.id)}
              className="p-2 sm:p-3 border rounded-lg shadow-sm hover:shadow-md hover:bg-blue-100 transition cursor-pointer"
            >
              {study.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
