"use client";

import { MdCircularProgress } from "@/util/md3";

export default function Home() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <MdCircularProgress indeterminate />
    </div>
  );
}
