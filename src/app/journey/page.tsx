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
  return allStations.find(
    (s) => s.name.toLowerCase() === name.toLowerCase()
  );
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

function buildRouteData(fromName: string, toName: string) {
  const fromSt = findStation(fromName);
  const toSt = findStation(toName);
  if (!fromSt || !toSt) return null;

  const line = findSharedLine(fromSt, toSt);
  if (!line) return null;

  const stationsBetween = getStationsBetween(fromSt, toSt, line);
  const distKm = Math.abs(fromSt.kmFromStart - toSt.kmFromStart);
  const fastStops = stationsBetween.filter(
    (_, i) => i === 0 || i === stationsBetween.length - 1 || distKm > 10
  );

  const fastDuration = Math.round(distKm * 2.0);
  const slowDuration = Math.round(distKm * 2.8);

  const now = new Date();
  const baseHour = now.getHours();
  const baseMin = now.getMinutes();

  function buildTimes(stations: StationDef[], totalMin: number) {
    return stations.map((s, i) => {
      const offset =
        i === 0 ? 2 : Math.round((i / (stations.length - 1)) * totalMin) + 2;
      const m = baseMin + offset;
      const h = baseHour + Math.floor(m / 60);
      const mm = m % 60;
      return {
        name: s.name,
        time: `${h % 24}:${mm.toString().padStart(2, "0")}`,
        status: i === 0 ? "departure" : i === stations.length - 1 ? "arrival" : "stop",
      };
    });
  }

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
    routes: [
      {
        line,
        speed: "Fast" as const,
        duration: `${fastDuration} min`,
        nextTrain: `${2 + (baseMin % 3)} min`,
        stops: fastSkipped.length,
        crowdLevel: "moderate" as const,
        stations: buildTimes(fastSkipped, fastDuration),
      },
      {
        line,
        speed: "Slow" as const,
        duration: `${slowDuration} min`,
        nextTrain: `${5 + (baseMin % 4)} min`,
        stops: stationsBetween.length,
        crowdLevel: "light" as const,
        stations: buildTimes(stationsBetween, slowDuration),
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
            No direct route found between {fromParam} and {toParam}.
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
          <button onClick={() => router.back()} className="shrink-0">
            <BackArrowIcon />
          </button>
          <div className="flex flex-col min-w-0">
            <h1
              className="font-[family-name:var(--font-heading)] font-semibold text-[20px] leading-[28px] text-navy-900 truncate"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              {routeData.fromName} → {routeData.toName}
            </h1>
            <p className="text-[12px] leading-[16px] text-text-muted">
              {routeData.line.charAt(0).toUpperCase() + routeData.line.slice(1)} Line · {routeData.distKm} km
            </p>
          </div>
        </div>

        {/* Route options */}
        <div className="flex gap-[8px] px-[16px] pb-[12px] shrink-0">
          {routeData.routes.map((opt, i) => (
            <button
              key={i}
              onClick={() => { setSelectedRoute(i); setExpanded(false); }}
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
                <LineBadge line={route.line} />
                <CrowdBadge level={route.crowdLevel} />
              </div>
            </div>
            <div className="flex items-center gap-[8px] pt-[8px]">
              <span className="text-[12px] leading-[16px] text-text-muted">
                Platform {selectedRoute === 0 ? 2 : 3} · {route.speed} train · Arrives {route.stations[route.stations.length - 1].time}
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
        <div className="px-[16px] pb-[16px] pt-[8px] border-t-[1.119px] border-border-light bg-cream-100 flex gap-[8px] shrink-0">
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
