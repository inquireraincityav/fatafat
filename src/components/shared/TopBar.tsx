"use client";

import Link from "next/link";
import { GearIcon } from "@/components/icons";

export default function TopBar({ greeting = "Good morning" }: { greeting?: string }) {
  return (
    <div className="flex items-center justify-between pb-[12px] pt-[20px] px-[20px]">
      <div className="flex flex-col">
        <h1
          className="font-[family-name:var(--font-heading)] font-semibold text-[24px] leading-[30px] text-text-primary"
          style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
        >
          Fatafat
        </h1>
        <span className="text-[12px] leading-[16px] text-text-muted pt-[2px]">
          {greeting}
        </span>
      </div>
      <Link
        href="/settings"
        className="bg-cream-200 flex items-center justify-center rounded-full w-[36px] h-[36px] active:scale-[0.92] transition-transform duration-150"
      >
        <GearIcon />
      </Link>
    </div>
  );
}
