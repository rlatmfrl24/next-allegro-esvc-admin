"use client";

import { MdCircularProgress } from "@/util/md3";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/main/setup/basic");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-full">
      <MdCircularProgress indeterminate />
    </div>
  );
}
