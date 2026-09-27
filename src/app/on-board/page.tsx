"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import MobileShell from "@/components/shared/MobileShell";
import CrowdBadge from "@/components/shared/CrowdBadge";
import { BackArrowIcon, LiveDotIcon } from "@/components/icons";

type LineName = "western" | "central" | "harbour";

interface StationDef {
  id: string;
  name: string;
  lines: LineName[];
  kmFromStart: number;
}

const allStations: StationDef[] = [
  { id: "churchgate", name: "Churchgate", lines: ["western"], kmFromStart: 0 },
  { id: "marine-lines", name: "Marine Lines", lines: ["western"], kmFromStart: 1.0 },
  { id: "charni-road", name: "Charni Road", lines: ["western"], kmFromStart: 2.1 },
  { id: "grant-road", name: "Grant Road", lines: ["western"], kmFromStart: 3.2 },
  { id: "mumbai-central", name: "Mumbai Central", lines: ["western"], kmFromStart: 4.5 },
  { id: "mahalaxmi", name: "Mahalaxmi", lines: ["western"], kmFromStart: 5.8 },
  { id: "lower-parel", name: "Lower Parel", lines: ["western"], kmFromStart: 7.0 },
  { id: "prabhadevi", name: "Prabhadevi", lines: ["western"], kmFromStart: 8.2 },
  { id: "dadar", name: "Dadar", lines: ["western", "central"], kmFromStart: 9.5 },
  { id: "matunga-road", name: "Matunga Road", lines: ["western"], kmFromStart: 10.6 },
  { id: "mahim", name: "Mahim", lines: ["western"], kmFromStart: 11.5 },
  { id: "bandra", name: "Bandra", lines: ["western", "harbour"], kmFromStart: 13.0 },
  { id: "khar-road", name: "Khar Road", lines: ["western"], kmFromStart: 14.2 },
  { id: "santacruz", name: "Santacruz", lines: ["western"], kmFromStart: 15.5 },
  { id: "vile-parle", name: "Vile Parle", lines: ["western"], kmFromStart: 17.0 },
  { id: "andheri", name: "Andheri", lines: ["western", "harbour"], kmFromStart: 18.5 },
  { id: "jogeshwari", name: "Jogeshwari", lines: ["western"], kmFromStart: 20.0 },
  { id: "goregaon", name: "Goregaon", lines: ["western"], kmFromStart: 22.0 },
  { id: "malad", name: "Malad", lines: ["western"], kmFromStart: 24.0 },
  { id: "kandivali", name: "Kandivali", lines: ["western"], kmFromStart: 26.0 },
  { id: "borivali", name: "Borivali", lines: ["western"], kmFromStart: 28.5 },
  { id: "csmt", name: "CSMT", lines: ["central", "harbour"], kmFromStart: 0 },
  { id: "masjid", name: "Masjid", lines: ["central"], kmFromStart: 1.2 },
  { id: "byculla", name: "Byculla", lines: ["central"], kmFromStart: 3.0 },
  { id: "chinchpokli", name: "Chinchpokli", lines: ["central"], kmFromStart: 4.0 },
  { id: "currey-road", name: "Currey Road", lines: ["central"], kmFromStart: 5.2 },
  { id: "parel", name: "Parel", lines: ["central"], kmFromStart: 6.5 },
  { id: "thane", name: "Thane", lines: ["central"], kmFromStart: 34.0 },
  { id: "dombivli", name: "Dombivli", lines: ["central"], kmFromStart: 48.0 },
  { id: "kalyan", name: "Kalyan", lines: ["central"], kmFromStart: 54.0 },
  { id: "panvel", name: "Panvel", lines: ["harbour"], kmFromStart: 42.0 },
  { id: "vashi", name: "Vashi", lines: ["harbour"], kmFromStart: 28.0 },
  { id: "nerul", name: "Nerul", lines: ["harbour"], kmFromStart: 35.0 },
];

function findStation(name: string) {
  return allStations.find((s) => s.name.toLowerCase() === name.toLowerCase());
}

function findSharedLine(a: StationDef, b: StationDef): LineName | null {
  for (const line of a.lines) {
    if (b.lines.includes(line)) return line;
  }
  return null;
}

function getStationsBetween(fromSt: StationDef, toSt: StationDef, line: LineName): StationDef[] {
  const lineStations = allStations.filter((s) => s.lines.includes(line));
  const fromIdx = lineStations.findIndex((s) => s.id === fromSt.id);
  const toIdx = lineStations.findIndex((s) => s.id === toSt.id);
  if (fromIdx === -1 || toIdx === -1) return [fromSt, toSt];
  const start = Math.min(fromIdx, toIdx);
  const end = Math.max(fromIdx, toIdx);
  const slice = lineStations.slice(start, end + 1);
  return fromIdx < toIdx ? slice : [...slice].reverse();
}

function formatTime(date: Date): string {
  return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}

interface StopInfo {
  name: string;
  time: string;
  arrivalDate: Date;
  passed: boolean;
  current: boolean;
  distKm: number;
}

function buildStops(fromName: string, toName: string, speed: string): { stops: StopInfo[]; line: LineName; distKm: number } | null {
  const fromSt = findStation(fromName);
  const toSt = findStation(toName);
  if (!fromSt || !toSt) return null;

  const line = findSharedLine(fromSt, toSt);
  if (!line) return null;

  const stationsBetween = getStationsBetween(fromSt, toSt, line);
  const totalDistKm = Math.abs(fromSt.kmFromStart - toSt.kmFromStart);
  const minPerKm = speed === "Fast" ? 2.0 : 2.8;
  const totalDuration = Math.round(totalDistKm * minPerKm);

  const now = new Date();
  const departureTime = new Date(now.getTime() + 2 * 60000);

  const stops: StopInfo[] = stationsBetween.map((s, i) => {
    const fraction = i / Math.max(1, stationsBetween.length - 1);
    const offsetMin = Math.round(fraction * totalDuration);
    const arrivalDate = new Date(departureTime.getTime() + offsetMin * 60000);
    const distFromStart = Math.abs(s.kmFromStart - fromSt.kmFromStart);
    return {
      name: s.name,
      time: formatTime(arrivalDate),
      arrivalDate,
      passed: false,
      current: i === 0,
      distKm: Math.round(distFromStart * 10) / 10,
    };
  });

  return { stops, line, distKm: Math.round(totalDistKm * 10) / 10 };
}

export default function OnBoardPage() {
  return (
    <Suspense
      fallback={
        <MobileShell>
          <div className="bg-navy-900 flex flex-col flex-1 items-center justify-center">
            <span className="text-[#7a9abb]">Loading tracker...</span>
          </div>
        </MobileShell>
      }
    >
      <OnBoardContent />
    </Suspense>
  );
}

function OnBoardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from") || "Andheri";
  const toParam = searchParams.get("to") || "Churchgate";
  const speedParam = searchParams.get("speed") || "Fast";

  const routeInfo = useMemo(
    () => buildStops(fromParam, toParam, speedParam),
    [fromParam, toParam, speedParam]
  );

  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!routeInfo) return;
    if (currentStopIndex < routeInfo.stops.length - 1) {
      setCurrentStopIndex((prev) => Math.min(prev + 1, routeInfo.stops.length - 1));
    }
  }, [tick, routeInfo, currentStopIndex]);

  if (!routeInfo) {
    return (
      <MobileShell>
        <div className="bg-navy-900 flex flex-col flex-1 items-center justify-center px-[32px]">
          <p className="text-[#7a9abb] text-center">No direct route found.</p>
          <button
            onClick={() => router.back()}
            className="bg-amber-500 rounded-[16px] py-[14px] px-[24px] mt-[16px]"
          >
            <span className="font-semibold text-navy-900">Go back</span>
          </button>
        </div>
      </MobileShell>
    );
  }

  const { stops, line, distKm } = routeInfo;
  const currentStop = stops[currentStopIndex];
  const destination = stops[stops.length - 1];
  const nextStop = currentStopIndex < stops.length - 1 ? stops[currentStopIndex + 1] : null;
  const passedCount = currentStopIndex;
  const remainingCount = stops.length - 1 - currentStopIndex;
  const progressPct = ((currentStopIndex + 1) / stops.length) * 100;
  const arrived = currentStopIndex === stops.length - 1;

  const etaMin = Math.max(0, remainingCount * (speedParam === "Fast" ? 3 : 4));

  const lineName = line.charAt(0).toUpperCase() + line.slice(1);

  return (
    <MobileShell>
      <div className="bg-navy-900 flex flex-col flex-1 min-h-0">
        {/* Header */}
        <div className="flex gap-[12px] items-center pt-[20px] px-[16px] pb-[12px] shrink-0"
          style={{ paddingTop: "max(20px, env(safe-area-inset-top, 20px))" }}
        >
          <button onClick={() => router.back()} className="shrink-0">
            <BackArrowIcon className="[&_path]:stroke-cream-50" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-[8px]">
              <LiveDotIcon />
              <h1
                className="font-[family-name:var(--font-heading)] font-semibold text-[20px] leading-[28px] text-cream-50"
                style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
              >
                {arrived ? "Arrived" : "On board"}
              </h1>
            </div>
            <p className="text-[12px] leading-[16px] text-[#7a9abb] pl-[28px]">
              {lineName} Line · {speedParam} train · {distKm} km
            </p>
          </div>
        </div>

        {/* Current status card */}
        <div className="px-[16px] pb-[12px] shrink-0">
          <div className="bg-[rgba(251,247,239,0.08)] border-[1.119px] border-[rgba(251,247,239,0.12)] rounded-[16px] px-[20px] py-[16px]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-[12px] leading-[16px] text-[#7a9abb]">
                  {arrived ? "You're at" : "Now at"}
                </p>
                <h2
                  className="font-[family-name:var(--font-heading)] font-semibold text-[24px] leading-[32px] text-cream-50 pt-[2px]"
                  style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
                >
                  {currentStop.name}
                </h2>
              </div>
              <div className="flex flex-col items-end">
                <CrowdBadge level={arrived ? "light" : "moderate"} />
              </div>
            </div>

            {nextStop && (
              <div className="bg-[rgba(255,255,255,0.06)] rounded-[8px] mt-[12px] px-[12px] py-[8px] flex items-center justify-between">
                <span className="text-[12px] leading-[16px] text-[#c8d8e8]">
                  Next: {nextStop.name}
                </span>
                <span
                  className="font-[family-name:var(--font-heading)] font-semibold text-[14px] leading-[20px] text-[#c8d8e8]"
                  style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
                >
                  {nextStop.time}
                </span>
              </div>
            )}

            <div className="bg-[rgba(232,166,60,0.15)] rounded-[8px] mt-[8px] px-[12px] py-[8px] flex items-center justify-between">
              <span className="text-[12px] leading-[16px] text-amber-500">
                {arrived ? "Arrived at" : "ETA"} {destination.name}
              </span>
              <span
                className="font-[family-name:var(--font-heading)] font-semibold text-[16px] leading-[24px] text-amber-500"
                style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
              >
                {arrived ? "Now" : `${etaMin} min`}
              </span>
            </div>
          </div>
        </div>

        {/* Alert card */}
        {!arrived && remainingCount <= 2 && remainingCount > 0 && (
          <div className="px-[16px] pb-[12px] shrink-0">
            <div className="bg-[rgba(232,166,60,0.12)] border-[1.119px] border-[rgba(232,166,60,0.2)] rounded-[12px] px-[16px] py-[10px] flex gap-[8px] items-start">
              <span className="text-[14px]">{"🔔"}</span>
              <p className="text-[12px] leading-[19.5px] text-amber-500">
                {remainingCount === 1
                  ? `Next stop is ${destination.name} — get ready!`
                  : `${remainingCount} stops to ${destination.name}`}
              </p>
            </div>
          </div>
        )}

        {/* Progress bar */}
        <div className="px-[16px] pb-[12px] shrink-0">
          <div className="bg-[rgba(255,255,255,0.1)] h-[4px] rounded-full">
            <div
              className="bg-amber-500 h-[4px] rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex items-center justify-between pt-[4px]">
            <span className="text-[10px] leading-[15px] text-[#5a7090]">
              {passedCount} passed
            </span>
            <span className="text-[10px] leading-[15px] text-[#5a7090]">
              {remainingCount} remaining
            </span>
          </div>
        </div>

        {/* Stops list */}
        <div className="flex-1 overflow-y-auto px-[16px] pb-[16px] min-h-0">
          <p className="font-semibold text-[12px] leading-[16px] text-[#5a7090] tracking-[0.84px] uppercase pb-[8px]">
            {stops.length} stops · {fromParam} → {toParam}
          </p>
          <div className="relative">
            {stops.map((stop, i) => {
              const isFirst = i === 0;
              const isLast = i === stops.length - 1;
              const isPassed = i < currentStopIndex;
              const isCurrent = i === currentStopIndex;
              return (
                <div key={stop.name} className="flex items-start gap-[12px] pl-[4px]">
                  <div className="w-[16px] flex flex-col items-center pt-[2px]">
                    {!isFirst && (
                      <div
                        className={`w-[2px] h-[12px] transition-colors duration-500 ${
                          isPassed || isCurrent ? "bg-amber-500" : "bg-[rgba(255,255,255,0.12)]"
                        }`}
                      />
                    )}
                    <div
                      className={`w-[10px] h-[10px] rounded-full border-[2px] transition-colors duration-500 ${
                        isCurrent
                          ? "border-amber-500 bg-amber-500"
                          : isPassed
                            ? "border-amber-500 bg-navy-900"
                            : isLast
                              ? "border-[#c0392b] bg-navy-900"
                              : "border-[rgba(255,255,255,0.2)] bg-navy-900"
                      }`}
                    />
                    {!isLast && (
                      <div
                        className={`w-[2px] h-[12px] transition-colors duration-500 ${
                          isPassed ? "bg-amber-500" : "bg-[rgba(255,255,255,0.12)]"
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-between pb-[4px] pt-[1px]">
                    <div className="flex flex-col">
                      <span
                        className={`text-[14px] leading-[20px] ${
                          isCurrent
                            ? "font-semibold text-amber-500"
                            : isPassed
                              ? "text-[#5a7090]"
                              : isLast
                                ? "font-semibold text-cream-50"
                                : "text-[#c8d8e8]"
                        }`}
                      >
                        {stop.name}
                        {isCurrent && !arrived && " ●"}
                      </span>
                      {isCurrent && !arrived && (
                        <span className="text-[10px] leading-[14px] text-amber-500">
                          You are here
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <span
                        className={`text-[12px] leading-[16px] ${
                          isPassed ? "text-[#5a7090]" : "text-[#7a9abb]"
                        }`}
                      >
                        {stop.time}
                      </span>
                      {!isPassed && !isCurrent && !isFirst && (
                        <span className="text-[10px] leading-[14px] text-[#5a7090]">
                          {stop.distKm} km
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom actions */}
        <div className="px-[16px] pb-[16px] pt-[8px] border-t-[1.119px] border-[rgba(255,255,255,0.08)] shrink-0"
          style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom, 16px))" }}
        >
          {arrived ? (
            <Link
              href="/home"
              className="bg-amber-500 rounded-[16px] py-[14px] flex items-center justify-center w-full"
            >
              <span className="font-semibold text-[14px] leading-[20px] text-navy-900 text-center">
                Done — back to home
              </span>
            </Link>
          ) : (
            <Link
              href="/tickets"
              className="bg-cream-50 rounded-[16px] py-[14px] flex items-center justify-center w-full"
            >
              <span className="font-semibold text-[14px] leading-[20px] text-navy-900 text-center">
                Show ticket
              </span>
            </Link>
          )}
        </div>
      </div>
    </MobileShell>
  );
}
