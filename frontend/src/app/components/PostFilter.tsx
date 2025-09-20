"use client";

import { useEffect, useState } from "react";

interface Props {
  onFilterChange: (filters: {
    category: string;
    sort: string;
    search: string;
  }) => void;
}

export default function PostFilter({ onFilterChange }: Props) {
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("new");
  const [search, setSearch] = useState("");

  useEffect(() => {
    onFilterChange({ category, sort, search });
  }, [category, sort, search]);

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <select
        className="p-2 border rounded w-full sm:w-auto"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">전체</option>
        <option value="frontend">프론트엔드</option>
        <option value="backend">백엔드</option>
        <option value="AI">AI</option>
      </select>

      <select
        className="p-2 border rounded w-full sm:w-auto"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="new">최신순</option>
        <option value="popular">인기순</option>
      </select>

      <input
        type="text"
        className="p-2 border rounded flex-1 w-full sm:w-auto"
        placeholder="검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
