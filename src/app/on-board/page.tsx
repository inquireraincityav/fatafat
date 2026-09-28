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
  // Western Line
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
  { id: "dahisar", name: "Dahisar", lines: ["western"], kmFromStart: 30.5 },
  { id: "mira-road", name: "Mira Road", lines: ["western"], kmFromStart: 35.0 },
  { id: "bhayandar", name: "Bhayandar", lines: ["western"], kmFromStart: 38.0 },
  { id: "naigaon", name: "Naigaon", lines: ["western"], kmFromStart: 44.0 },
  { id: "vasai-road", name: "Vasai Road", lines: ["western"], kmFromStart: 48.0 },
  { id: "virar", name: "Virar", lines: ["western"], kmFromStart: 60.0 },
  // Central Line
  { id: "csmt", name: "CSMT", lines: ["central", "harbour"], kmFromStart: 0 },
  { id: "masjid", name: "Masjid", lines: ["central"], kmFromStart: 1.2 },
  { id: "sandhurst-road", name: "Sandhurst Road", lines: ["central"], kmFromStart: 2.0 },
  { id: "byculla", name: "Byculla", lines: ["central"], kmFromStart: 3.0 },
  { id: "chinchpokli", name: "Chinchpokli", lines: ["central"], kmFromStart: 4.0 },
  { id: "currey-road", name: "Currey Road", lines: ["central"], kmFromStart: 5.2 },
  { id: "parel", name: "Parel", lines: ["central"], kmFromStart: 6.5 },
  { id: "dadar-central", name: "Dadar Central", lines: ["central"], kmFromStart: 9.5 },
  { id: "matunga", name: "Matunga", lines: ["central"], kmFromStart: 10.6 },
  { id: "sion", name: "Sion", lines: ["central"], kmFromStart: 13.0 },
  { id: "kurla", name: "Kurla", lines: ["central", "harbour"], kmFromStart: 16.0 },
  { id: "vidyavihar", name: "Vidyavihar", lines: ["central"], kmFromStart: 18.0 },
  { id: "ghatkopar", name: "Ghatkopar", lines: ["central"], kmFromStart: 20.0 },
  { id: "vikhroli", name: "Vikhroli", lines: ["central"], kmFromStart: 23.0 },
  { id: "kanjurmarg", name: "Kanjurmarg", lines: ["central"], kmFromStart: 26.0 },
  { id: "bhandup", name: "Bhandup", lines: ["central"], kmFromStart: 28.0 },
  { id: "nahur", name: "Nahur", lines: ["central"], kmFromStart: 29.5 },
  { id: "mulund", name: "Mulund", lines: ["central"], kmFromStart: 31.0 },
  { id: "thane", name: "Thane", lines: ["central"], kmFromStart: 34.0 },
  { id: "kalwa", name: "Kalwa", lines: ["central"], kmFromStart: 37.0 },
  { id: "dombivli", name: "Dombivli", lines: ["central"], kmFromStart: 48.0 },
  { id: "kalyan", name: "Kalyan", lines: ["central"], kmFromStart: 54.0 },
  // Harbour Line
  { id: "dockyard-road", name: "Dockyard Road", lines: ["harbour"], kmFromStart: 2.0 },
  { id: "reay-road", name: "Reay Road", lines: ["harbour"], kmFromStart: 3.0 },
  { id: "cotton-green", name: "Cotton Green", lines: ["harbour"], kmFromStart: 4.5 },
  { id: "sewri", name: "Sewri", lines: ["harbour"], kmFromStart: 6.0 },
  { id: "wadala-road", name: "Wadala Road", lines: ["harbour"], kmFromStart: 8.0 },
  { id: "gtb-nagar", name: "GTB Nagar", lines: ["harbour"], kmFromStart: 9.5 },
  { id: "chunabhatti", name: "Chunabhatti", lines: ["harbour"], kmFromStart: 11.0 },
  { id: "tilak-nagar", name: "Tilak Nagar", lines: ["harbour"], kmFromStart: 17.0 },
  { id: "chembur", name: "Chembur", lines: ["harbour"], kmFromStart: 18.5 },
  { id: "govandi", name: "Govandi", lines: ["harbour"], kmFromStart: 20.0 },
  { id: "mankhurd", name: "Mankhurd", lines: ["harbour"], kmFromStart: 22.0 },
  { id: "vashi", name: "Vashi", lines: ["harbour"], kmFromStart: 28.0 },
  { id: "sanpada", name: "Sanpada", lines: ["harbour"], kmFromStart: 30.0 },
  { id: "nerul", name: "Nerul", lines: ["harbour"], kmFromStart: 35.0 },
  { id: "belapur", name: "Belapur", lines: ["harbour"], kmFromStart: 37.0 },
  { id: "kharghar", name: "Kharghar", lines: ["harbour"], kmFromStart: 39.0 },
  { id: "panvel", name: "Panvel", lines: ["harbour"], kmFromStart: 42.0 },
];

function findStation(name: string) {
  return allStations.find((s) => s.name.toLowerCase() === name.toLowerCase());
}

function findStationById(id: string) {
  return allStations.find((s) => s.id === id);
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

interface InterchangeDef {
  name: string;
  line1: LineName;
  line2: LineName;
  stId1: string;
  stId2: string;
}

const INTERCHANGES: InterchangeDef[] = [
  { name: "Dadar", line1: "western", line2: "central", stId1: "dadar", stId2: "dadar-central" },
  { name: "CSMT", line1: "central", line2: "harbour", stId1: "csmt", stId2: "csmt" },
  { name: "Bandra", line1: "western", line2: "harbour", stId1: "bandra", stId2: "bandra" },
  { name: "Andheri", line1: "western", line2: "harbour", stId1: "andheri", stId2: "andheri" },
  { name: "Kurla", line1: "central", line2: "harbour", stId1: "kurla", stId2: "kurla" },
];

const TRANSFER_WALK_MIN = 5;

interface TransferResult {
  interchange: string;
  line1: LineName;
  line2: LineName;
  leg1: StationDef[];
  leg2: StationDef[];
  dist: number;
}

function findTransferRoute(fromSt: StationDef, toSt: StationDef): TransferResult | null {
  let best: TransferResult | null = null;
  for (const ix of INTERCHANGES) {
    const ixSt1 = findStationById(ix.stId1);
    const ixSt2 = findStationById(ix.stId2);
    if (!ixSt1 || !ixSt2) continue;
    const tryRoute = (fromLine: LineName, toLine: LineName, ixFrom: StationDef, ixTo: StationDef) => {
      if (!fromSt.lines.includes(fromLine) || !toSt.lines.includes(toLine)) return;
      if (fromSt.id === ixFrom.id || toSt.id === ixTo.id) return;
      const leg1 = getStationsBetween(fromSt, ixFrom, fromLine);
      const leg2 = getStationsBetween(ixTo, toSt, toLine);
      const dist = Math.abs(fromSt.kmFromStart - ixFrom.kmFromStart) + Math.abs(ixTo.kmFromStart - toSt.kmFromStart);
      if (!best || dist < best.dist) {
        best = { interchange: ix.name, line1: fromLine, line2: toLine, leg1, leg2, dist };
      }
    };
    tryRoute(ix.line1, ix.line2, ixSt1, ixSt2);
    tryRoute(ix.line2, ix.line1, ixSt2, ixSt1);
  }
  return best;
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
  isTransfer?: boolean;
  transferLine?: LineName;
}

function buildStops(fromName: string, toName: string, speed: string): { stops: StopInfo[]; line: LineName; distKm: number; transfer?: { interchange: string; line1: LineName; line2: LineName } } | null {
  const fromSt = findStation(fromName);
  const toSt = findStation(toName);
  if (!fromSt || !toSt) return null;

  const line = findSharedLine(fromSt, toSt);
  if (line) {
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

  const transfer = findTransferRoute(fromSt, toSt);
  if (!transfer) return null;

  const now = new Date();
  const departureTime = new Date(now.getTime() + 2 * 60000);
  const minPerKm = 2.8;

  const leg1Dist = Math.abs(fromSt.kmFromStart - transfer.leg1[transfer.leg1.length - 1].kmFromStart);
  const leg2Dist = Math.abs(transfer.leg2[0].kmFromStart - toSt.kmFromStart);
  const leg1Duration = Math.round(leg1Dist * minPerKm);
  const leg2Duration = Math.round(leg2Dist * minPerKm);

  const leg1Stops: StopInfo[] = transfer.leg1.map((s, i) => {
    const fraction = i / Math.max(1, transfer.leg1.length - 1);
    const offsetMin = Math.round(fraction * leg1Duration);
    const arrivalDate = new Date(departureTime.getTime() + offsetMin * 60000);
    const distFromStart = Math.abs(s.kmFromStart - fromSt.kmFromStart);
    const isLast = i === transfer.leg1.length - 1;
    return {
      name: s.name,
      time: formatTime(arrivalDate),
      arrivalDate,
      passed: false,
      current: i === 0,
      distKm: Math.round(distFromStart * 10) / 10,
      isTransfer: isLast,
      transferLine: isLast ? transfer.line2 : undefined,
    };
  });

  const leg2StartTime = new Date(departureTime.getTime() + (leg1Duration + TRANSFER_WALK_MIN) * 60000);
  const leg2Stops: StopInfo[] = transfer.leg2.map((s, i) => {
    const fraction = i / Math.max(1, transfer.leg2.length - 1);
    const offsetMin = Math.round(fraction * leg2Duration);
    const arrivalDate = new Date(leg2StartTime.getTime() + offsetMin * 60000);
    const distFromStart = leg1Dist + Math.abs(s.kmFromStart - transfer.leg2[0].kmFromStart);
    return {
      name: s.name,
      time: formatTime(arrivalDate),
      arrivalDate,
      passed: false,
      current: false,
      distKm: Math.round(distFromStart * 10) / 10,
    };
  });

  return {
    stops: [...leg1Stops, ...leg2Stops],
    line: transfer.line1,
    distKm: Math.round(transfer.dist * 10) / 10,
    transfer: { interchange: transfer.interchange, line1: transfer.line1, line2: transfer.line2 },
  };
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

  const { stops, line, distKm, transfer: transferInfo } = routeInfo;
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
              {transferInfo
                ? `${transferInfo.line1.charAt(0).toUpperCase() + transferInfo.line1.slice(1)} + ${transferInfo.line2.charAt(0).toUpperCase() + transferInfo.line2.slice(1)} · 1 change · ${distKm} km`
                : `${lineName} Line · ${speedParam} train · ${distKm} km`
              }
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
                  ? `Next stop is ${destination.name} - get ready!`
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
            {stops.length} stops · {fromParam} to {toParam}
          </p>
          <div className="relative">
            {stops.map((stop, i) => {
              const isFirst = i === 0;
              const isLast = i === stops.length - 1;
              const isPassed = i < currentStopIndex;
              const isCurrent = i === currentStopIndex;
              const isTransferStop = stop.isTransfer;
              const isAfterTransfer = i > 0 && stops[i - 1]?.isTransfer;
              if (isAfterTransfer) return null;
              return (
                <div key={`${stop.name}-${i}`}>
                  <div className="flex items-start gap-[12px] pl-[4px]">
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
                              : isTransferStop
                                ? "border-amber-500 bg-navy-900"
                                : isLast
                                  ? "border-[#c0392b] bg-navy-900"
                                  : "border-[rgba(255,255,255,0.2)] bg-navy-900"
                        }`}
                      />
                      {!isLast && !isTransferStop && (
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
                                : isTransferStop
                                  ? "font-semibold text-cream-50"
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
                        {!isPassed && !isCurrent && !isFirst && !isTransferStop && (
                          <span className="text-[10px] leading-[14px] text-[#5a7090]">
                            {stop.distKm} km
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {isTransferStop && stop.transferLine && (
                    <div className="flex items-start gap-[12px] pl-[4px] py-[4px]">
                      <div className="w-[16px] flex flex-col items-center">
                        <div className="w-[2px] h-[6px] bg-[rgba(255,255,255,0.08)]" />
                        <div className="w-[2px] h-[6px] bg-[rgba(255,255,255,0.08)]" />
                      </div>
                      <div className="flex-1 flex items-center gap-[6px] bg-[rgba(232,166,60,0.12)] border-[1px] border-[rgba(232,166,60,0.2)] rounded-[8px] px-[10px] py-[6px]">
                        <span className="text-[11px] text-amber-500">&#8595;</span>
                        <span className="text-[12px] leading-[16px] text-amber-500 font-medium">
                          Change to {stop.transferLine.charAt(0).toUpperCase() + stop.transferLine.slice(1)} Line · ~{TRANSFER_WALK_MIN} min
                        </span>
                      </div>
                    </div>
                  )}
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
            <button
              onClick={() => {
                try {
                  const TRIPS_KEY = "fatafat_trips";
                  const raw = localStorage.getItem(TRIPS_KEY);
                  const trips: { id: string; from: string; to: string; line: string; lastUsed: string; count: number }[] = raw ? JSON.parse(raw) : [];
                  const tripId = `${fromParam.toLowerCase().replace(/\s+/g, "-")}_${toParam.toLowerCase().replace(/\s+/g, "-")}`;
                  const existing = trips.find((t) => t.id === tripId);
                  if (existing) {
                    existing.count += 1;
                    existing.lastUsed = new Date().toISOString();
                  } else {
                    trips.push({ id: tripId, from: fromParam, to: toParam, line, lastUsed: new Date().toISOString(), count: 1 });
                  }
                  localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
                  if (localStorage.getItem("fatafat_user_type") === "new") {
                    localStorage.setItem("fatafat_user_type", "regular");
                  }
                } catch {}
                router.push("/home");
              }}
              className="bg-amber-500 rounded-[16px] py-[14px] flex items-center justify-center w-full"
            >
              <span className="font-semibold text-[14px] leading-[20px] text-navy-900 text-center">
                Done - back to home
              </span>
            </button>
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
