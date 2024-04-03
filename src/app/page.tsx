"use client";

import { MdCircularProgress } from "@/util/md3";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <div className="flex-1 flex items-center justify-center">
      <MdCircularProgress indeterminate />
    </div>
  );
}
