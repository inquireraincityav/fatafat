"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import MobileShell from "@/components/shared/MobileShell";
import { BackArrowIcon } from "@/components/icons";

const MumbaiTransitMap = dynamic(
  () => import("@/components/shared/MumbaiTransitMap"),
  { ssr: false }
);

type LineFilter = "all" | "western" | "central" | "harbour" | "metro";

const lineFilters: { id: LineFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "western", label: "Western" },
  { id: "central", label: "Central" },
  { id: "harbour", label: "Harbour" },
  { id: "metro", label: "Metro" },
];

const legendItems = [
  { color: "#3b82f6", label: "Western" },
  { color: "#ef4444", label: "Central" },
  { color: "#22c55e", label: "Harbour" },
  { color: "#a855f7", label: "Metro" },
  { color: "#e8a63c", label: "Your route" },
];

export default function NetworkMapPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<LineFilter>("all");

  return (
    <MobileShell>
      <div className="bg-[#111827] flex flex-col flex-1">
        {/* Header */}
        <div className="flex gap-[12px] items-center pt-[20px] px-[16px] pb-[12px]">
          <button onClick={() => router.back()} className="shrink-0">
            <BackArrowIcon className="[&_path]:stroke-cream-50" />
          </button>
          <h1
            className="font-[family-name:var(--font-heading)] font-semibold text-[20px] leading-[28px] text-cream-50"
            style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
          >
            Network Map
          </h1>
        </div>

        {/* Line filters */}
        <div className="flex gap-[8px] items-start overflow-x-auto px-[16px] py-[8px]">
          {lineFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center justify-center px-[12px] py-[4px] rounded-full shrink-0 ${
                activeFilter === filter.id
                  ? "bg-amber-500"
                  : "bg-[rgba(255,255,255,0.1)]"
              }`}
            >
              <span
                className={`font-semibold text-[12px] leading-[16px] text-center ${
                  activeFilter === filter.id
                    ? "text-white"
                    : "text-[#9ca3af]"
                }`}
              >
                {filter.label}
              </span>
            </button>
          ))}
        </div>

        {/* Map area */}
        <div className="flex-1 min-h-0 relative">
          <MumbaiTransitMap activeFilter={activeFilter} dark />

          {/* Legend */}
          <div className="absolute bottom-0 left-0 right-0 z-[1000] px-[16px] py-[12px] bg-gradient-to-t from-[rgba(17,24,39,0.95)] from-[60%] to-transparent">
            <div className="flex flex-wrap gap-x-[16px] gap-y-[4px]">
              {legendItems.map((item) => (
                <div key={item.label} className="flex gap-[6px] items-center">
                  <div
                    className="w-[16px] h-[4px] rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[#9ca3af] text-[10px] leading-[15px]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
