"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MobileShell from "@/components/shared/MobileShell";
import LineBadge from "@/components/shared/LineBadge";
import CrowdBadge from "@/components/shared/CrowdBadge";
import { BackArrowIcon, LiveDotIcon } from "@/components/icons";

const routeOptions = [
  {
    line: "western" as const,
    speed: "Fast",
    duration: "38 min",
    nextTrain: "2 min",
    stops: 8,
    crowdLevel: "moderate" as const,
    stations: [
      { name: "Andheri", time: "11:04", status: "departure" },
      { name: "Bandra", time: "11:12", status: "stop" },
      { name: "Dadar", time: "11:20", status: "stop" },
      { name: "Lower Parel", time: "11:26", status: "stop" },
      { name: "Mumbai Central", time: "11:30", status: "stop" },
      { name: "Grant Road", time: "11:33", status: "stop" },
      { name: "Charni Road", time: "11:36", status: "stop" },
      { name: "Marine Lines", time: "11:39", status: "stop" },
      { name: "Churchgate", time: "11:42", status: "arrival" },
    ],
  },
  {
    line: "western" as const,
    speed: "Slow",
    duration: "52 min",
    nextTrain: "5 min",
    stops: 15,
    crowdLevel: "light" as const,
    stations: [
      { name: "Andheri", time: "11:07", status: "departure" },
      { name: "Vile Parle", time: "11:11", status: "stop" },
      { name: "Santacruz", time: "11:14", status: "stop" },
      { name: "Khar Road", time: "11:17", status: "stop" },
      { name: "Bandra", time: "11:20", status: "stop" },
      { name: "Mahim", time: "11:23", status: "stop" },
      { name: "Matunga Road", time: "11:27", status: "stop" },
      { name: "Dadar", time: "11:30", status: "stop" },
      { name: "Lower Parel", time: "11:36", status: "stop" },
      { name: "Mahalaxmi", time: "11:39", status: "stop" },
      { name: "Mumbai Central", time: "11:42", status: "stop" },
      { name: "Grant Road", time: "11:45", status: "stop" },
      { name: "Charni Road", time: "11:48", status: "stop" },
      { name: "Marine Lines", time: "11:52", status: "stop" },
      { name: "Churchgate", time: "11:59", status: "arrival" },
    ],
  },
];

export default function JourneyPage() {
  const router = useRouter();
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const route = routeOptions[selectedRoute];

  return (
    <MobileShell>
      <div className="bg-cream-100 flex flex-col flex-1">
        {/* Header */}
        <div className="flex gap-[12px] items-center pt-[20px] px-[16px] pb-[12px]">
          <button onClick={() => router.back()} className="shrink-0">
            <BackArrowIcon />
          </button>
          <div className="flex flex-col">
            <h1
              className="font-[family-name:var(--font-heading)] font-semibold text-[20px] leading-[28px] text-navy-900"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              Andheri → Churchgate
            </h1>
            <p className="text-[12px] leading-[16px] text-text-muted">
              Western Line
            </p>
          </div>
        </div>

        {/* Route options */}
        <div className="flex gap-[8px] px-[16px] pb-[12px]">
          {routeOptions.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelectedRoute(i)}
              className={`flex-1 flex flex-col items-center py-[10px] rounded-[12px] ${
                selectedRoute === i
                  ? "bg-navy-900"
                  : "bg-cream-50 border-[1.119px] border-border-light"
              }`}
            >
              <span
                className={`font-semibold text-[14px] leading-[20px] ${
                  selectedRoute === i ? "text-cream-50" : "text-text-primary"
                }`}
              >
                {opt.speed}
              </span>
              <span
                className={`text-[12px] leading-[16px] ${
                  selectedRoute === i ? "text-[#7a9abb]" : "text-text-muted"
                }`}
              >
                {opt.duration} · {opt.stops} stops
              </span>
            </button>
          ))}
        </div>

        {/* Live info card */}
        <div className="px-[16px] pb-[12px]">
          <div className="bg-cream-50 border-[1.119px] border-border-light rounded-[16px] px-[16px] py-[14px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[8px]">
                <LiveDotIcon />
                <span className="text-[14px] leading-[20px] text-text-primary">
                  Next train in{" "}
                  <span
                    className="font-[family-name:var(--font-heading)] font-semibold text-[18px] leading-[24px] text-navy-900"
                    style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
                  >
                    {route.nextTrain}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-[6px]">
                <LineBadge line={route.line} />
                <CrowdBadge level={route.crowdLevel} />
              </div>
            </div>
            <div className="flex items-center gap-[8px] pt-[8px]">
              <span className="text-[12px] leading-[16px] text-text-muted">
                Platform 2 · {route.speed} train · Arrives {route.stations[route.stations.length - 1].time}
              </span>
            </div>
          </div>
        </div>

        {/* Stops list */}
        <div className="flex-1 overflow-y-auto px-[16px] pb-[16px]">
          <div className="flex items-center justify-between pb-[8px]">
            <span className="font-semibold text-[12px] leading-[16px] text-text-muted tracking-[0.84px] uppercase">
              {route.stops} stops · {route.duration}
            </span>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[12px] leading-[16px] text-amber-500 font-medium"
            >
              {expanded ? "Collapse" : "Expand all"}
            </button>
          </div>

          <div className="relative">
            {route.stations.map((station, i) => {
              const isFirst = i === 0;
              const isLast = i === route.stations.length - 1;
              const showStation = expanded || isFirst || isLast || i === 1 || i === route.stations.length - 2;

              if (!showStation && !expanded) {
                if (i === 2) {
                  return (
                    <button
                      key="collapsed"
                      onClick={() => setExpanded(true)}
                      className="flex items-center gap-[12px] py-[8px] pl-[4px]"
                    >
                      <div className="w-[16px] flex flex-col items-center">
                        <div className="w-[2px] h-[4px] bg-border-light" />
                        <div className="w-[4px] h-[4px] rounded-full bg-border-light" />
                        <div className="w-[2px] h-[4px] bg-border-light" />
                        <div className="w-[4px] h-[4px] rounded-full bg-border-light" />
                        <div className="w-[2px] h-[4px] bg-border-light" />
                      </div>
                      <span className="text-[12px] leading-[16px] text-text-muted">
                        {route.stations.length - 4} more stops
                      </span>
                    </button>
                  );
                }
                if (i > 2 && i < route.stations.length - 2) return null;
              }

              return (
                <div key={station.name} className="flex items-start gap-[12px] pl-[4px]">
                  <div className="w-[16px] flex flex-col items-center pt-[2px]">
                    {!isFirst && (
                      <div className={`w-[2px] h-[12px] ${isLast ? "bg-[#c0392b]" : "bg-border-light"}`} />
                    )}
                    <div
                      className={`w-[10px] h-[10px] rounded-full border-[2px] ${
                        isFirst
                          ? "border-amber-500 bg-amber-500"
                          : isLast
                            ? "border-[#c0392b] bg-[#c0392b]"
                            : "border-border-light bg-cream-100"
                      }`}
                    />
                    {!isLast && (
                      <div className="w-[2px] h-[12px] bg-border-light" />
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-between pb-[4px] pt-[1px]">
                    <span
                      className={`text-[14px] leading-[20px] ${
                        isFirst || isLast
                          ? "font-semibold text-navy-900"
                          : "text-text-primary"
                      }`}
                    >
                      {station.name}
                    </span>
                    <span className="text-[12px] leading-[16px] text-text-muted">
                      {station.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="px-[16px] pb-[16px] pt-[8px] border-t-[1.119px] border-border-light bg-cream-100 flex gap-[8px]">
          <Link
            href="/tickets"
            className="bg-amber-500 rounded-[16px] py-[14px] flex-1 flex items-center justify-center"
          >
            <span className="font-semibold text-[14px] leading-[20px] text-navy-900 text-center">
              Buy ticket →
            </span>
          </Link>
          <Link
            href="/on-board"
            className="bg-navy-900 rounded-[16px] py-[14px] flex-1 flex items-center justify-center"
          >
            <span className="font-semibold text-[14px] leading-[20px] text-cream-50 text-center">
              I&apos;m on board
            </span>
          </Link>
        </div>
      </div>
    </MobileShell>
  );
}
