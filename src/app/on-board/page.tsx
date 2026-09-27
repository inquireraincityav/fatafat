"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MobileShell from "@/components/shared/MobileShell";
import CrowdBadge from "@/components/shared/CrowdBadge";
import { BackArrowIcon, LiveDotIcon } from "@/components/icons";

const stops = [
  { name: "Andheri", time: "11:04", passed: true },
  { name: "Bandra", time: "11:12", passed: true },
  { name: "Dadar", time: "11:20", current: true },
  { name: "Lower Parel", time: "11:26" },
  { name: "Mumbai Central", time: "11:30" },
  { name: "Grant Road", time: "11:33" },
  { name: "Charni Road", time: "11:36" },
  { name: "Marine Lines", time: "11:39" },
  { name: "Churchgate", time: "11:42" },
];

export default function OnBoardPage() {
  const [currentTime, setCurrentTime] = useState("11:20");
  const destination = stops[stops.length - 1];
  const currentStop = stops.find((s) => s.current);
  const remainingStops = stops.filter((s) => !s.passed && !s.current);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`
      );
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MobileShell>
      <div className="bg-navy-900 flex flex-col flex-1">
        {/* Header */}
        <div className="flex gap-[12px] items-center pt-[20px] px-[16px] pb-[12px]">
          <Link href="/journey" className="shrink-0">
            <BackArrowIcon className="[&_path]:stroke-cream-50" />
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-[8px]">
              <LiveDotIcon />
              <h1
                className="font-[family-name:var(--font-heading)] font-semibold text-[20px] leading-[28px] text-cream-50"
                style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
              >
                On board
              </h1>
            </div>
            <p className="text-[12px] leading-[16px] text-[#7a9abb] pl-[28px]">
              Western Line · Fast train
            </p>
          </div>
        </div>

        {/* Current status card */}
        <div className="px-[16px] pb-[12px]">
          <div className="bg-[rgba(251,247,239,0.08)] border-[1.119px] border-[rgba(251,247,239,0.12)] rounded-[16px] px-[20px] py-[16px]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-[12px] leading-[16px] text-[#7a9abb]">Now at</p>
                <h2
                  className="font-[family-name:var(--font-heading)] font-semibold text-[24px] leading-[32px] text-cream-50 pt-[2px]"
                  style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
                >
                  {currentStop?.name}
                </h2>
              </div>
              <div className="flex flex-col items-end">
                <CrowdBadge level="moderate" />
                <p className="text-[12px] leading-[16px] text-[#7a9abb] pt-[4px]">
                  {currentTime}
                </p>
              </div>
            </div>

            <div className="bg-[rgba(255,255,255,0.08)] rounded-[8px] mt-[12px] px-[12px] py-[8px] flex items-center justify-between">
              <span className="text-[12px] leading-[16px] text-[#c8d8e8]">
                Arriving {destination.name}
              </span>
              <span
                className="font-[family-name:var(--font-heading)] font-semibold text-[16px] leading-[24px] text-amber-500"
                style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
              >
                {destination.time}
              </span>
            </div>
          </div>
        </div>

        {/* Alert card */}
        <div className="px-[16px] pb-[12px]">
          <div className="bg-[rgba(232,166,60,0.12)] border-[1.119px] border-[rgba(232,166,60,0.2)] rounded-[12px] px-[16px] py-[10px] flex gap-[8px] items-start">
            <span className="text-[14px]">{"🔔"}</span>
            <p className="text-[12px] leading-[19.5px] text-amber-500">
              We&apos;ll alert you 1 stop before {destination.name}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-[16px] pb-[16px]">
          <div className="bg-[rgba(255,255,255,0.1)] h-[4px] rounded-full">
            <div
              className="bg-amber-500 h-[4px] rounded-full"
              style={{ width: `${((stops.findIndex((s) => s.current) + 1) / stops.length) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between pt-[4px]">
            <span className="text-[10px] leading-[15px] text-[#5a7090]">
              {stops.filter((s) => s.passed).length} passed
            </span>
            <span className="text-[10px] leading-[15px] text-[#5a7090]">
              {remainingStops.length} remaining
            </span>
          </div>
        </div>

        {/* Stops list */}
        <div className="flex-1 overflow-y-auto px-[16px] pb-[16px]">
          <p className="font-semibold text-[12px] leading-[16px] text-[#5a7090] tracking-[0.84px] uppercase pb-[8px]">
            Stops
          </p>
          <div className="relative">
            {stops.map((stop, i) => {
              const isFirst = i === 0;
              const isLast = i === stops.length - 1;
              return (
                <div key={stop.name} className="flex items-start gap-[12px] pl-[4px]">
                  <div className="w-[16px] flex flex-col items-center pt-[2px]">
                    {!isFirst && (
                      <div
                        className={`w-[2px] h-[12px] ${
                          stop.passed || stop.current ? "bg-amber-500" : "bg-[rgba(255,255,255,0.12)]"
                        }`}
                      />
                    )}
                    <div
                      className={`w-[10px] h-[10px] rounded-full border-[2px] ${
                        stop.current
                          ? "border-amber-500 bg-amber-500"
                          : stop.passed
                            ? "border-amber-500 bg-navy-900"
                            : isLast
                              ? "border-[#c0392b] bg-navy-900"
                              : "border-[rgba(255,255,255,0.2)] bg-navy-900"
                      }`}
                    />
                    {!isLast && (
                      <div
                        className={`w-[2px] h-[12px] ${
                          stop.passed ? "bg-amber-500" : "bg-[rgba(255,255,255,0.12)]"
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-between pb-[4px] pt-[1px]">
                    <span
                      className={`text-[14px] leading-[20px] ${
                        stop.current
                          ? "font-semibold text-amber-500"
                          : stop.passed
                            ? "text-[#5a7090]"
                            : isLast
                              ? "font-semibold text-cream-50"
                              : "text-[#c8d8e8]"
                      }`}
                    >
                      {stop.name}
                      {stop.current && " ●"}
                    </span>
                    <span
                      className={`text-[12px] leading-[16px] ${
                        stop.passed ? "text-[#5a7090]" : "text-[#7a9abb]"
                      }`}
                    >
                      {stop.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom actions */}
        <div className="px-[16px] pb-[16px] pt-[8px] border-t-[1.119px] border-[rgba(255,255,255,0.08)]">
          <Link
            href="/tickets"
            className="bg-cream-50 rounded-[16px] py-[14px] flex items-center justify-center"
          >
            <span className="font-semibold text-[14px] leading-[20px] text-navy-900 text-center">
              Show ticket
            </span>
          </Link>
        </div>
      </div>
    </MobileShell>
  );
}
