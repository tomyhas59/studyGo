"use client";

interface Props {
  studies: any[];
}

export default function MyStudiesList({ studies }: Props) {
  if (!studies || studies.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          참여 중인 스터디
        </h2>
        <p className="text-gray-500">참여 중인 스터디가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        참여 중인 스터디
      </h2>
      <ul className="space-y-2">
        {studies.map((study) => (
          <li
            key={study.id}
            className="p-3 border rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition cursor-pointer"
          >
            {study.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
