"use client";

import { useState } from "react";
import TopBar from "@/components/shared/TopBar";
import LineBadge from "@/components/shared/LineBadge";
import CrowdBadge from "@/components/shared/CrowdBadge";
import { SearchIcon, BusIcon } from "@/components/icons";
import type { Route } from "@/types";

const mockRoutes: Route[] = [
  {
    from: { id: "andheri", name: "Andheri", line: "western" },
    to: { id: "churchgate", name: "Churchgate", line: "western" },
    line: "western",
    speed: "Fast",
    platform: "P2",
    nextTrainMin: 2,
    followingTrainMin: 9,
    crowdLevel: "moderate",
  },
  {
    from: { id: "andheri", name: "Andheri", line: "harbour" },
    to: { id: "bandra", name: "Bandra", line: "harbour" },
    line: "harbour",
    speed: "Slow",
    platform: "P4",
    bestBus: "BEST 221",
    nextTrainMin: 5,
    followingTrainMin: 17,
    crowdLevel: "crowded",
  },
  {
    from: { id: "dadar", name: "Dadar", line: "central" },
    to: { id: "csmt", name: "CSMT", line: "central" },
    line: "central",
    speed: "Fast",
    platform: "P5",
    nextTrainMin: 7,
    followingTrainMin: 21,
    crowdLevel: "light",
  },
];

function LiveDot() {
  return (
    <span className="relative flex h-[8px] w-[8px]">
      <span className="absolute inset-0 rounded-full bg-amber-500 opacity-20 scale-[1.75]" />
      <span className="relative rounded-full bg-amber-500 h-[6px] w-[6px]" />
    </span>
  );
}

function CommuteRow({ route, isLast }: { route: Route; isLast: boolean }) {
  return (
    <div
      className={`bg-cream-100 flex flex-col overflow-clip ${
        !isLast ? "border-b-[1.119px] border-border-light" : ""
      }`}
    >
      <div className="flex gap-[12px] items-center px-[16px] py-[10px]">
        <LineBadge line={route.line} />
        <div className="flex-1 flex flex-col min-w-0">
          <p className="font-semibold text-[14px] leading-[17.5px] text-text-primary truncate">
            {route.from.name} - {route.to.name}
          </p>
          <div className="flex items-center gap-[6px] pt-[2px]">
            <span className="text-[11px] leading-[16.5px] text-text-muted">
              {route.speed} · {route.platform}
            </span>
            {route.bestBus && (
              <>
                <span className="text-[11px] leading-[16.5px] text-cream-400">·</span>
                <BusIcon />
                <span className="text-[11px] leading-[16.5px] text-text-muted">
                  {route.bestBus}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-start gap-[6px] shrink-0">
          <div className="flex flex-col items-center">
            <LiveDot />
            <span
              className="font-[family-name:var(--font-heading)] font-semibold text-[22px] leading-[22px] text-text-primary"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              {route.nextTrainMin}
            </span>
            <span className="text-[10px] leading-[15px] text-text-muted pt-px">
              min
            </span>
          </div>
          <div className="flex flex-col items-center pt-[2px]">
            <div className="h-[9px]" />
            <span
              className="font-[family-name:var(--font-heading)] font-normal text-[15px] leading-[22.5px] text-cream-500"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              {route.followingTrainMin}
            </span>
          </div>
          <CrowdBadge level={route.crowdLevel} />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-cream-100 flex flex-col flex-1">
      <TopBar />

      {/* Map placeholder */}
      <div className="px-[16px] flex-1 min-h-0">
        <div className="rounded-[16px] overflow-hidden shadow-[0px_2px_16px_0px_rgba(0,0,0,0.18)] bg-[#ddd] h-full min-h-[280px] flex items-center justify-center">
          <p className="text-text-tertiary text-[14px]">Map · API KEY REQUIRED</p>
        </div>
      </div>

      {/* Bottom section */}
      <div className="bg-cream-100 flex flex-col pt-[10px]">
        {/* Search bar */}
        <div className="px-[16px] pb-[8px]">
          <button
            onClick={() => setExpanded(!expanded)}
            className="bg-cream-50 border-[1.119px] border-border-medium rounded-[12px] flex items-center gap-[10px] px-[16px] py-[12px] w-full"
          >
            <SearchIcon />
            <span className="text-[14px] leading-[21px] text-text-muted text-center">
              Where to?
            </span>
            <div className="flex-1 flex justify-end">
              <div className="flex items-center gap-[6px]">
                <span className="bg-amber-500 rounded-full w-[8px] h-[8px]" />
                <span className="text-[11px] leading-[16.5px] text-text-tertiary text-center">
                  Live
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Section header */}
        <div className="flex items-center justify-between px-[16px] pb-[4px]">
          <span className="font-semibold text-[12px] leading-[16px] text-text-muted tracking-[0.84px] uppercase">
            Daily commute
          </span>
          <button className="text-[12px] leading-[16px] text-text-muted text-center">
            All routes
          </button>
        </div>

        {/* Routes list */}
        <div className="border-t-[1.119px] border-border-light">
          {mockRoutes.map((route, i) => (
            <CommuteRow
              key={`${route.from.id}-${route.to.id}`}
              route={route}
              isLast={i === mockRoutes.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
