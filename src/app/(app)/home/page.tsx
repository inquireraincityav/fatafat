"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import TopBar from "@/components/shared/TopBar";
import LineBadge from "@/components/shared/LineBadge";
import { SearchIcon } from "@/components/icons";
import type { Line } from "@/types";

const MumbaiTransitMap = dynamic(
  () => import("@/components/shared/MumbaiTransitMap"),
  { ssr: false }
);

interface SavedTrip {
  id: string;
  from: string;
  to: string;
  line: string;
  lastUsed: string;
  count: number;
}

const TRIPS_KEY = "fatafat_trips";

function loadTrips(): SavedTrip[] {
  try {
    const raw = localStorage.getItem(TRIPS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function LiveDot() {
  return (
    <span className="relative flex h-[8px] w-[8px]">
      <span className="absolute inset-0 rounded-full bg-amber-500 opacity-20 scale-[1.75]" />
      <span className="relative rounded-full bg-amber-500 h-[6px] w-[6px]" />
    </span>
  );
}

function formatLastUsed(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function CommuteRow({ trip, isLast, index }: { trip: SavedTrip; isLast: boolean; index: number }) {
  return (
    <Link
      href={`/journey?from=${encodeURIComponent(trip.from)}&to=${encodeURIComponent(trip.to)}`}
      className={`bg-cream-100 flex flex-col overflow-clip ${
        !isLast ? "border-b-[1.119px] border-border-light" : ""
      } active:bg-cream-200 active:scale-[0.99] transition-all duration-150`}
      style={{ animation: `fade-in-up 300ms ease-out ${index * 60}ms both` }}
    >
      <div className="flex gap-[12px] items-center px-[16px] py-[10px]">
        <LineBadge line={trip.line as Line} />
        <div className="flex-1 flex flex-col min-w-0">
          <p className="font-semibold text-[14px] leading-[17.5px] text-text-primary truncate">
            {trip.from} - {trip.to}
          </p>
          <div className="flex items-center gap-[6px] pt-[2px]">
            <span className="text-[11px] leading-[16.5px] text-text-muted">
              {formatLastUsed(trip.lastUsed)}
            </span>
            {trip.count > 1 && (
              <>
                <span className="text-[11px] leading-[16.5px] text-cream-400">·</span>
                <span className="text-[11px] leading-[16.5px] text-text-muted">
                  {trip.count} trips
                </span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-[6px] shrink-0">
          {trip.count >= 3 && <LiveDot />}
          <span className="text-[12px] leading-[16px] text-amber-600 font-medium">Go</span>
        </div>
      </div>
    </Link>
  );
}

function NewUserPrompt() {
  return (
    <div className="px-[16px] pb-[8px]">
      <div className="bg-cream-50 border-[1.119px] border-dashed border-cream-400 rounded-[16px] px-[20px] py-[20px] flex flex-col items-center gap-[8px]">
        <p
          className="font-[family-name:var(--font-heading)] font-medium text-[16px] leading-[24px] text-navy-900 text-center"
          style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
        >
          Plan your first trip
        </p>
        <p className="text-[12px] leading-[18px] text-text-tertiary text-center max-w-[260px]">
          Search for a route below and your frequent trips will appear here automatically.
        </p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [trips, setTrips] = useState<SavedTrip[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loaded = loadTrips();
    loaded.sort((a, b) => b.count - a.count || new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime());
    setTrips(loaded);
    setMounted(true);
  }, []);

  const hasTrips = mounted && trips.length > 0;

  return (
    <div className="bg-cream-100 flex flex-col flex-1">
      <TopBar />

      {/* Map */}
      <div className="px-[16px] flex-1 min-h-0">
        <div className="rounded-[16px] overflow-hidden shadow-[0px_2px_16px_0px_rgba(0,0,0,0.18)] h-full min-h-[280px]">
          <MumbaiTransitMap compact />
        </div>
      </div>

      {/* Bottom section */}
      <div className="bg-cream-100 flex flex-col pt-[10px]">
        {/* Search bar */}
        <div className="px-[16px] pb-[8px]">
          <Link
            href="/station-picker"
            className="bg-cream-50 border-[1.119px] border-border-medium rounded-[12px] flex items-center gap-[10px] px-[16px] py-[12px] w-full active:scale-[0.98] transition-transform duration-150"
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
          </Link>
        </div>

        {!hasTrips ? (
          <NewUserPrompt />
        ) : (
          <>
            {/* Section header */}
            <div className="flex items-center justify-between px-[16px] pb-[4px]">
              <span className="font-semibold text-[12px] leading-[16px] text-text-muted tracking-[0.84px] uppercase">
                Daily commute
              </span>
              <span className="text-[12px] leading-[16px] text-text-muted text-center">
                {trips.length} route{trips.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Routes list */}
            <div className="border-t-[1.119px] border-border-light">
              {trips.slice(0, 5).map((trip, i) => (
                <CommuteRow
                  key={trip.id}
                  trip={trip}
                  isLast={i === Math.min(trips.length, 5) - 1}
                  index={i}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
