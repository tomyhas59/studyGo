"use client";

import { useState, useEffect } from "react";
import { useIsFetching } from "@tanstack/react-query";

export default function Spinner() {
  const isFetching = useIsFetching();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isFetching) setShow(true);
    else setShow(false);
  }, [isFetching]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="w-16 h-16 sm:w-12 sm:h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
    </div>
  );
}
