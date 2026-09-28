"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { GearIcon, ChevronRightIcon } from "@/components/icons";

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

const basicsItems = [
  {
    emoji: "\u{1F686}",
    title: "Fast vs. slow trains",
    description: "Which train gets you there, and when to use each",
  },
  {
    emoji: "\u{1F6AA}",
    title: "Compartments",
    description: "Ladies' coaches, general, and first class explained",
  },
  {
    emoji: "\u{1F3AB}",
    title: "Fares & tickets",
    description: "Prices, passes, and where to buy",
  },
];

export default function ExplorePage() {
  const [activeFilter, setActiveFilter] = useState<LineFilter>("all");

  return (
    <div className="bg-cream-100 flex flex-col flex-1 overflow-y-auto">
      <div className="flex items-center justify-between pb-[8px] pt-[20px] px-[20px]">
        <h1
          className="font-[family-name:var(--font-heading)] font-semibold text-[24px] leading-[32px] text-navy-900"
          style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
        >
          Explore
        </h1>
        <Link
          href="/settings"
          className="bg-cream-200 flex items-center justify-center rounded-full w-[36px] h-[36px] active:scale-[0.92] transition-transform duration-150"
        >
          <GearIcon />
        </Link>
      </div>

      {/* Network Map */}
      <div className="flex flex-col">
        <div className="flex gap-[8px] items-start overflow-x-auto px-[16px] py-[8px]">
          {lineFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex flex-col items-center justify-center px-[12px] py-[4px] rounded-full shrink-0 active:scale-[0.95] transition-all duration-150 ${
                activeFilter === filter.id
                  ? "bg-amber-500"
                  : "bg-cream-200"
              }`}
            >
              <span
                className={`font-semibold text-[12px] leading-[16px] text-center ${
                  activeFilter === filter.id
                    ? "text-white"
                    : "text-text-tertiary"
                }`}
              >
                {filter.label}
              </span>
            </button>
          ))}
        </div>

        <div className="relative px-[16px]">
          <div className="bg-[#111827] rounded-[16px] overflow-clip min-h-[340px] relative" style={{ height: "45vh" }}>
            <MumbaiTransitMap activeFilter={activeFilter} dark />
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

        <div className="px-[16px] py-[12px]">
          <Link href="/network-map" className="bg-navy-900 w-full rounded-[12px] py-[10px] flex items-center justify-center active:scale-[0.98] transition-transform duration-150">
            <span className="font-semibold text-[14px] leading-[20px] text-cream-50 text-center">
              Open full interactive map
            </span>
          </Link>
        </div>
      </div>

      {/* Basics */}
      <div className="flex flex-col gap-[8px] px-[16px] pb-[16px]">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[12px] leading-[16px] text-text-muted tracking-[0.84px] uppercase">
            Mumbai rail basics
          </span>
        </div>
        {basicsItems.map((item, i) => (
          <Link
            key={item.title}
            href="/intro"
            className="bg-cream-50 border-[1.119px] border-border-light rounded-[16px] overflow-clip flex gap-[12px] items-center p-[16px] w-full text-left active:scale-[0.98] active:bg-cream-200 transition-all duration-150"
            style={{ animation: `fade-in-up 300ms ease-out ${i * 60}ms both` }}
          >
            <span className="text-[24px] leading-[32px] shrink-0">{item.emoji}</span>
            <div className="flex-1 flex flex-col min-w-0">
              <p className="font-semibold text-[14px] leading-[20px] text-navy-900">
                {item.title}
              </p>
              <p className="text-[12px] leading-[16px] text-text-tertiary pt-[2px]">
                {item.description}
              </p>
            </div>
            <ChevronRightIcon />
          </Link>
        ))}
      </div>
    </div>
  );
}
