"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/splash");
  }, [router]);

  return (
    <div className="fixed inset-0 bg-navy-900" />
  );
}
