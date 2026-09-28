"use client";

import { Suspense, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import MobileShell from "@/components/shared/MobileShell";
import LineBadge from "@/components/shared/LineBadge";
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
  return allStations.find(
    (s) => s.name.toLowerCase() === name.toLowerCase()
  );
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

function getStationsBetween(
  fromSt: StationDef,
  toSt: StationDef,
  line: LineName
): StationDef[] {
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

interface StationStop {
  name: string;
  time: string;
  status: string;
  line?: LineName;
}

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

    const tryRoute = (
      fromLine: LineName, toLine: LineName,
      ixFrom: StationDef, ixTo: StationDef,
    ) => {
      if (!fromSt.lines.includes(fromLine) || !toSt.lines.includes(toLine)) return;
      if (fromSt.id === ixFrom.id || toSt.id === ixTo.id) return;
      const leg1 = getStationsBetween(fromSt, ixFrom, fromLine);
      const leg2 = getStationsBetween(ixTo, toSt, toLine);
      const dist =
        Math.abs(fromSt.kmFromStart - ixFrom.kmFromStart) +
        Math.abs(ixTo.kmFromStart - toSt.kmFromStart);
      if (!best || dist < best.dist) {
        best = { interchange: ix.name, line1: fromLine, line2: toLine, leg1, leg2, dist };
      }
    };

    tryRoute(ix.line1, ix.line2, ixSt1, ixSt2);
    tryRoute(ix.line2, ix.line1, ixSt2, ixSt1);
  }

  return best;
}

function buildRouteData(fromName: string, toName: string) {
  const fromSt = findStation(fromName);
  const toSt = findStation(toName);
  if (!fromSt || !toSt) return null;

  const now = new Date();
  const baseHour = now.getHours();
  const baseMin = now.getMinutes();

  function buildTimes(stations: StationDef[], totalMin: number, startOffset: number, line: LineName): StationStop[] {
    return stations.map((s, i) => {
      const offset =
        i === 0 ? startOffset : Math.round((i / (stations.length - 1)) * totalMin) + startOffset;
      const m = baseMin + offset;
      const h = baseHour + Math.floor(m / 60);
      const mm = ((m % 60) + 60) % 60;
      return {
        name: s.name,
        time: `${((h % 24) + 24) % 24}:${mm.toString().padStart(2, "0")}`,
        status: i === 0 ? "departure" : i === stations.length - 1 ? "arrival" : "stop",
        line,
      };
    });
  }

  const line = findSharedLine(fromSt, toSt);
  if (line) {
    const stationsBetween = getStationsBetween(fromSt, toSt, line);
    const distKm = Math.abs(fromSt.kmFromStart - toSt.kmFromStart);

    const fastDuration = Math.round(distKm * 2.0);
    const slowDuration = Math.round(distKm * 2.8);

    const fastSkipped =
      stationsBetween.length > 4
        ? [
            stationsBetween[0],
            ...stationsBetween.filter(
              (_, i) =>
                i > 0 &&
                i < stationsBetween.length - 1 &&
                i % Math.max(2, Math.floor(stationsBetween.length / 5)) === 0
            ),
            stationsBetween[stationsBetween.length - 1],
          ]
        : stationsBetween;

    return {
      fromName,
      toName,
      line,
      distKm: Math.round(distKm * 10) / 10,
      transfer: null as null,
      routes: [
        {
          line,
          speed: "Fast" as const,
          duration: `${fastDuration} min`,
          nextTrain: `${2 + (baseMin % 3)} min`,
          stops: fastSkipped.length,
          crowdLevel: "moderate" as const,
          stations: buildTimes(fastSkipped, fastDuration, 2, line),
        },
        {
          line,
          speed: "Slow" as const,
          duration: `${slowDuration} min`,
          nextTrain: `${5 + (baseMin % 4)} min`,
          stops: stationsBetween.length,
          crowdLevel: "light" as const,
          stations: buildTimes(stationsBetween, slowDuration, 2, line),
        },
      ],
    };
  }

  const transfer = findTransferRoute(fromSt, toSt);
  if (!transfer) return null;

  const totalDist = transfer.dist;
  const leg1Duration = Math.round(
    Math.abs(fromSt.kmFromStart - transfer.leg1[transfer.leg1.length - 1].kmFromStart) * 2.8
  );
  const leg2Duration = Math.round(
    Math.abs(transfer.leg2[0].kmFromStart - toSt.kmFromStart) * 2.8
  );
  const totalDuration = leg1Duration + TRANSFER_WALK_MIN + leg2Duration;

  const leg1Times = buildTimes(transfer.leg1, leg1Duration, 2, transfer.line1);
  const leg2StartOffset = 2 + leg1Duration + TRANSFER_WALK_MIN;
  const leg2Times = buildTimes(transfer.leg2, leg2Duration, leg2StartOffset, transfer.line2);

  leg1Times[leg1Times.length - 1].status = "transfer";
  leg2Times[0].status = "transfer-board";

  const combinedStations = [...leg1Times, ...leg2Times];
  combinedStations[combinedStations.length - 1].status = "arrival";

  return {
    fromName,
    toName,
    line: transfer.line1,
    distKm: Math.round(totalDist * 10) / 10,
    transfer: {
      interchange: transfer.interchange,
      line1: transfer.line1,
      line2: transfer.line2,
    },
    routes: [
      {
        line: transfer.line1,
        speed: "Slow" as const,
        duration: `${totalDuration} min`,
        nextTrain: `${2 + (baseMin % 3)} min`,
        stops: transfer.leg1.length + transfer.leg2.length,
        crowdLevel: "moderate" as const,
        stations: combinedStations,
      },
    ],
  };
}

export default function JourneyPage() {
  return (
    <Suspense fallback={
      <MobileShell>
        <div className="bg-cream-100 flex flex-col flex-1 items-center justify-center">
          <span className="text-text-muted">Loading route...</span>
        </div>
      </MobileShell>
    }>
      <JourneyContent />
    </Suspense>
  );
}

function JourneyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from") || "Andheri";
  const toParam = searchParams.get("to") || "Churchgate";

  const routeData = useMemo(
    () => buildRouteData(fromParam, toParam),
    [fromParam, toParam]
  );

  const [selectedRoute, setSelectedRoute] = useState(0);
  const [expanded, setExpanded] = useState(false);

  if (!routeData) {
    return (
      <MobileShell>
        <div className="bg-cream-100 flex flex-col flex-1 items-center justify-center px-[32px]">
          <p className="text-text-muted text-center">
            No route found between {fromParam} and {toParam}.
          </p>
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

  const route = routeData.routes[selectedRoute];

  return (
    <MobileShell>
      <div className="bg-cream-100 flex flex-col flex-1 min-h-0">
        {/* Header */}
        <div className="flex gap-[12px] items-center pt-[20px] px-[16px] pb-[12px] shrink-0">
          <button onClick={() => router.back()} className="shrink-0 active:scale-[0.92] transition-transform duration-150">
            <BackArrowIcon />
          </button>
          <div className="flex flex-col min-w-0">
            <h1
              className="font-[family-name:var(--font-heading)] font-semibold text-[20px] leading-[28px] text-navy-900 truncate"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              {routeData.fromName} to {routeData.toName}
            </h1>
            <div className="flex items-center gap-[6px]">
              {routeData.transfer ? (
                <>
                  <p className="text-[12px] leading-[16px] text-text-muted">
                    {routeData.transfer.line1.charAt(0).toUpperCase() + routeData.transfer.line1.slice(1)} + {routeData.transfer.line2.charAt(0).toUpperCase() + routeData.transfer.line2.slice(1)} · {routeData.distKm} km
                  </p>
                  <span className="bg-amber-500 text-navy-900 text-[10px] font-semibold leading-[14px] px-[6px] py-[1px] rounded-full">
                    1 change
                  </span>
                </>
              ) : (
                <p className="text-[12px] leading-[16px] text-text-muted">
                  {routeData.line.charAt(0).toUpperCase() + routeData.line.slice(1)} Line · {routeData.distKm} km
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Route options */}
        <div className="flex gap-[8px] px-[16px] pb-[12px] shrink-0">
          {routeData.routes.map((opt, i) => (
            <button
              key={i}
              onClick={() => { setSelectedRoute(i); setExpanded(false); }}
              className={`flex-1 flex flex-col items-center py-[10px] rounded-[12px] active:scale-[0.97] transition-all duration-150 ${
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
        <div className="px-[16px] pb-[12px] shrink-0">
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
                {routeData.transfer ? (
                  <>
                    <LineBadge line={routeData.transfer.line1} />
                    <LineBadge line={routeData.transfer.line2} />
                  </>
                ) : (
                  <LineBadge line={route.line} />
                )}
                <CrowdBadge level={route.crowdLevel} />
              </div>
            </div>
            <div className="flex items-center gap-[8px] pt-[8px]">
              <span className="text-[12px] leading-[16px] text-text-muted">
                {routeData.transfer
                  ? `1 change at ${routeData.transfer.interchange} · Arrives ${route.stations[route.stations.length - 1].time}`
                  : `Platform ${selectedRoute === 0 ? 2 : 3} · ${route.speed} train · Arrives ${route.stations[route.stations.length - 1].time}`
                }
              </span>
            </div>
          </div>
        </div>

        {/* Stops list */}
        <div className="flex-1 overflow-y-auto px-[16px] pb-[16px] min-h-0">
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
              const isTransfer = station.status === "transfer";
              const isTransferBoard = station.status === "transfer-board";
              const showStation = expanded || isFirst || isLast || isTransfer || isTransferBoard || i === 1 || i === route.stations.length - 2;

              if (!showStation && !expanded) {
                const prevTransfer = route.stations.slice(0, i).some((s) => s.status === "transfer" || s.status === "transfer-board");
                const nextTransfer = route.stations.slice(i + 1).some((s) => s.status === "transfer" || s.status === "transfer-board");
                const isFirstCollapsed = (() => {
                  for (let j = i - 1; j >= 0; j--) {
                    const ps = route.stations[j];
                    if (ps.status === "departure" || ps.status === "transfer-board") return true;
                    if (ps.status !== "stop") return true;
                    return false;
                  }
                  return true;
                })();

                if (isFirstCollapsed) {
                  const collapsedCount = (() => {
                    let count = 0;
                    for (let j = i; j < route.stations.length; j++) {
                      const s = route.stations[j];
                      if (s.status === "transfer" || s.status === "transfer-board" || s.status === "arrival" || j === route.stations.length - 2) break;
                      if (s.status === "stop") count++;
                    }
                    return count;
                  })();
                  if (collapsedCount > 0) {
                    return (
                      <button
                        key={`collapsed-${i}`}
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
                          {collapsedCount} more stops
                        </span>
                      </button>
                    );
                  }
                }
                return null;
              }

              if (isTransferBoard) return null;

              const lineColor = station.line === "western" ? "#1b3a6b" : station.line === "central" ? "#c0392b" : "#27ae60";

              return (
                <div key={`${station.name}-${i}`}>
                  <div className="flex items-start gap-[12px] pl-[4px]">
                    <div className="w-[16px] flex flex-col items-center pt-[2px]">
                      {!isFirst && (
                        <div
                          className={`w-[2px] h-[12px] ${isLast ? "" : "bg-border-light"}`}
                          style={isLast ? { backgroundColor: lineColor } : undefined}
                        />
                      )}
                      <div
                        className={`w-[10px] h-[10px] rounded-full border-[2px] ${
                          isFirst
                            ? "border-amber-500 bg-amber-500"
                            : isLast
                              ? ""
                              : isTransfer
                                ? "border-amber-500 bg-cream-100"
                                : "border-border-light bg-cream-100"
                        }`}
                        style={isLast ? { borderColor: lineColor, backgroundColor: lineColor } : undefined}
                      />
                      {!isLast && !isTransfer && (
                        <div className="w-[2px] h-[12px] bg-border-light" />
                      )}
                    </div>
                    <div className="flex-1 flex items-center justify-between pb-[4px] pt-[1px]">
                      <span
                        className={`text-[14px] leading-[20px] ${
                          isFirst || isLast || isTransfer
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

                  {isTransfer && routeData.transfer && (
                    <div className="flex items-start gap-[12px] pl-[4px] py-[4px]">
                      <div className="w-[16px] flex flex-col items-center">
                        <div className="w-[2px] h-[6px] bg-border-light" style={{ opacity: 0.4 }} />
                        <div className="w-[2px] h-[6px] bg-border-light" style={{ opacity: 0.4 }} />
                      </div>
                      <div className="flex-1 flex items-center gap-[6px] bg-[rgba(232,166,60,0.1)] border-[1px] border-[rgba(232,166,60,0.25)] rounded-[8px] px-[10px] py-[6px]">
                        <span className="text-[11px] text-amber-500">&#8595;</span>
                        <span className="text-[12px] leading-[16px] text-[#8b6a10] font-medium">
                          Change to {routeData.transfer.line2.charAt(0).toUpperCase() + routeData.transfer.line2.slice(1)} Line · ~{TRANSFER_WALK_MIN} min
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="px-[16px] pb-[16px] pt-[8px] border-t-[1.119px] border-border-light bg-cream-100 flex gap-[8px] shrink-0">
          <Link
            href="/tickets"
            className="bg-amber-500 rounded-[16px] py-[14px] flex-1 flex items-center justify-center active:scale-[0.98] transition-transform duration-150"
          >
            <span className="font-semibold text-[14px] leading-[20px] text-navy-900 text-center">
              Buy ticket
            </span>
          </Link>
          <Link
            href={`/on-board?from=${encodeURIComponent(routeData.fromName)}&to=${encodeURIComponent(routeData.toName)}&speed=${route.speed}`}
            className="bg-navy-900 rounded-[16px] py-[14px] flex-1 flex items-center justify-center active:scale-[0.98] transition-transform duration-150"
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
