"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      const userType = localStorage.getItem("fatafat_user_type");
      if (userType) {
        router.replace("/home");
        return;
      }
    } catch {}
    router.replace("/splash");
  }, [router]);

  return (
    <div className="fixed inset-0 bg-navy-900" />
  );
}
