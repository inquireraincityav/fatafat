"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { GearIcon, ChevronRightIcon, FromDotIcon, ToDotIcon } from "@/components/icons";

const MumbaiTransitMap = dynamic(
  () => import("@/components/shared/MumbaiTransitMap"),
  { ssr: false }
);

type ExploreTab = "plan" | "network" | "basics";
type LineFilter = "all" | "western" | "central" | "harbour" | "metro";

const tabs: { id: ExploreTab; label: string }[] = [
  { id: "plan", label: "Plan" },
  { id: "network", label: "Network" },
  { id: "basics", label: "Basics" },
];

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
    description: "Ladies’ coaches, general, and first class explained",
  },
  {
    emoji: "\u{1F3AB}",
    title: "Fares & tickets",
    description: "Prices, passes, and where to buy",
  },
];

function TabSwitcher({
  active,
  onSelect,
}: {
  active: ExploreTab;
  onSelect: (tab: ExploreTab) => void;
}) {
  return (
    <div className="px-[16px] pb-[8px]">
      <div className="bg-cream-200 flex h-[42px] items-start overflow-clip p-[3px] rounded-[12px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            className={`flex-1 flex flex-col h-full items-center justify-center rounded-[8px] ${
              active === tab.id
                ? "bg-cream-50 shadow-[0px_1px_2px_rgba(0,0,0,0.08)]"
                : ""
            }`}
          >
            <span
              className={`font-medium text-[14px] leading-[20px] text-center ${
                active === tab.id ? "text-navy-900" : "text-text-muted"
              }`}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function PlanTab() {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 flex flex-col items-center justify-center px-[16px] pb-[8px] pt-[4px]">
        <div className="flex flex-col items-center py-[32px]">
          <div className="pb-[12px]">
            <span className="text-[36px] leading-[40px]">{"\u{1F5FA}"}</span>
          </div>
          <div className="pb-[4px]">
            <p
              className="font-[family-name:var(--font-heading)] font-semibold text-[16px] leading-[24px] text-navy-900 text-center"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              Where to?
            </p>
          </div>
          <p className="text-[12px] leading-[19.5px] text-text-muted text-center">
            Pick a start and destination below to see routes, times, and fares.
          </p>
        </div>
      </div>

      <div className="bg-cream-100 border-t-[1.119px] border-border-light px-[16px] py-[12px] flex flex-col gap-[10px]">
        <Link href="/station-picker" className="bg-cream-50 border-[1.119px] border-border-light rounded-[16px] overflow-clip">
          <div className="flex gap-[12px] items-center px-[16px] py-[12px] w-full border-b-[1.119px] border-border-light">
            <div className="bg-cream-200 flex items-center justify-center rounded-full w-[24px] h-[24px]">
              <FromDotIcon />
            </div>
            <span className="font-medium text-[14px] leading-[20px] text-text-muted">
              Starting station
            </span>
          </div>
          <div className="flex gap-[12px] items-center px-[16px] py-[12px] w-full">
            <div className="bg-cream-200 flex items-center justify-center rounded-full w-[24px] h-[24px]">
              <ToDotIcon />
            </div>
            <span className="font-medium text-[14px] leading-[20px] text-text-muted">
              Destination station
            </span>
          </div>
        </Link>

        <div className="flex gap-[8px] items-start">
          <div className="bg-cream-200 flex h-[36px] items-start overflow-clip p-[3px] rounded-[12px] w-[146px]">
            <button className="bg-cream-50 flex flex-col h-full items-center justify-center px-[12px] py-[6px] rounded-[8px]">
              <span className="font-medium text-[12px] leading-[16px] text-navy-900 text-center">
                Depart
              </span>
            </button>
            <button className="flex flex-col h-full items-center justify-center px-[12px] py-[6px] rounded-[8px]">
              <span className="font-medium text-[12px] leading-[16px] text-text-muted text-center">
                Reach by
              </span>
            </button>
          </div>
          <Link href="/station-picker" className="bg-cream-200 flex-1 flex flex-col h-[36px] items-center justify-center py-[8px] rounded-[12px]">
            <span className="font-semibold text-[14px] leading-[20px] text-text-muted text-center">
              Pick stations
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function NetworkTab() {
  const [activeFilter, setActiveFilter] = useState<LineFilter>("all");

  return (
    <div className="flex flex-col flex-1">
      <div className="flex gap-[8px] items-start overflow-x-auto px-[16px] py-[8px]">
        {lineFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex flex-col items-center justify-center px-[12px] py-[4px] rounded-full shrink-0 ${
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

      <div className="flex-1 relative px-[16px]">
        <div className="bg-[#111827] rounded-[16px] overflow-clip h-full min-h-[400px] relative">
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
        <Link href="/network-map" className="bg-navy-900 w-full rounded-[12px] py-[10px] flex items-center justify-center">
          <span className="font-semibold text-[14px] leading-[20px] text-cream-50 text-center">
            Open full interactive map →
          </span>
        </Link>
      </div>
    </div>
  );
}

function BasicsTab() {
  return (
    <div className="flex flex-col gap-[8px] overflow-y-auto px-[16px] pt-[4px] pb-[16px]">
      <div className="pb-[4px]">
        <p className="text-[12px] leading-[16px] text-text-muted">
          Everything you need to ride Mumbai&apos;s trains - revisit anytime.
        </p>
      </div>
      {basicsItems.map((item) => (
        <Link
          key={item.title}
          href="/intro"
          className="bg-cream-50 border-[1.119px] border-border-light rounded-[16px] overflow-clip flex gap-[12px] items-center p-[16px] w-full text-left"
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
  );
}

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<ExploreTab>("plan");

  return (
    <div className="bg-cream-100 flex flex-col flex-1">
      <div className="flex items-center justify-between pb-[8px] pt-[20px] px-[20px]">
        <h1
          className="font-[family-name:var(--font-heading)] font-semibold text-[24px] leading-[32px] text-navy-900"
          style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
        >
          Explore
        </h1>
        <Link
          href="/settings"
          className="bg-cream-200 flex items-center justify-center rounded-full w-[36px] h-[36px]"
        >
          <GearIcon />
        </Link>
      </div>

      <TabSwitcher active={activeTab} onSelect={setActiveTab} />

      <div className="flex flex-col flex-1 overflow-clip">
        {activeTab === "plan" && <PlanTab />}
        {activeTab === "network" && <NetworkTab />}
        {activeTab === "basics" && <BasicsTab />}
      </div>
    </div>
  );
}
