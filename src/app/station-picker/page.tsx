"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MobileShell from "@/components/shared/MobileShell";
import { BackArrowIcon, FromDotIcon, ToDotIcon, SwapIcon, CloseIcon } from "@/components/icons";

const stations = [
  { id: "churchgate", name: "Churchgate", lines: ["western"] },
  { id: "marine-lines", name: "Marine Lines", lines: ["western"] },
  { id: "charni-road", name: "Charni Road", lines: ["western"] },
  { id: "grant-road", name: "Grant Road", lines: ["western"] },
  { id: "mumbai-central", name: "Mumbai Central", lines: ["western"] },
  { id: "mahalaxmi", name: "Mahalaxmi", lines: ["western"] },
  { id: "lower-parel", name: "Lower Parel", lines: ["western"] },
  { id: "dadar", name: "Dadar", lines: ["western", "central"] },
  { id: "matunga-road", name: "Matunga Road", lines: ["western"] },
  { id: "mahim", name: "Mahim", lines: ["western"] },
  { id: "bandra", name: "Bandra", lines: ["western", "harbour"] },
  { id: "khar-road", name: "Khar Road", lines: ["western"] },
  { id: "santacruz", name: "Santacruz", lines: ["western"] },
  { id: "vile-parle", name: "Vile Parle", lines: ["western"] },
  { id: "andheri", name: "Andheri", lines: ["western", "harbour"] },
  { id: "jogeshwari", name: "Jogeshwari", lines: ["western"] },
  { id: "goregaon", name: "Goregaon", lines: ["western"] },
  { id: "malad", name: "Malad", lines: ["western"] },
  { id: "kandivali", name: "Kandivali", lines: ["western"] },
  { id: "borivali", name: "Borivali", lines: ["western"] },
  { id: "csmt", name: "CSMT", lines: ["central", "harbour"] },
  { id: "masjid", name: "Masjid", lines: ["central"] },
  { id: "byculla", name: "Byculla", lines: ["central"] },
  { id: "chinchpokli", name: "Chinchpokli", lines: ["central"] },
  { id: "currey-road", name: "Currey Road", lines: ["central"] },
  { id: "parel", name: "Parel", lines: ["central"] },
  { id: "thane", name: "Thane", lines: ["central"] },
  { id: "dombivli", name: "Dombivli", lines: ["central"] },
  { id: "kalyan", name: "Kalyan", lines: ["central"] },
  { id: "panvel", name: "Panvel", lines: ["harbour"] },
  { id: "vashi", name: "Vashi", lines: ["harbour"] },
  { id: "nerul", name: "Nerul", lines: ["harbour"] },
];

const recentStations = ["andheri", "churchgate", "bandra", "dadar"];

const lineColors: Record<string, string> = {
  western: "#1b3a6b",
  central: "#c0392b",
  harbour: "#27ae60",
  metro: "#9b59b6",
};

export default function StationPickerPage() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [activeField, setActiveField] = useState<"from" | "to">("from");
  const [search, setSearch] = useState("");

  const filteredStations = stations.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const recentList = stations.filter((s) => recentStations.includes(s.id));

  function selectStation(name: string) {
    if (activeField === "from") {
      setFrom(name);
      setActiveField("to");
      setSearch("");
    } else {
      setTo(name);
      setSearch("");
    }
  }

  function handleSwap() {
    setFrom(to);
    setTo(from);
  }

  function handleSearch() {
    if (from && to) {
      router.push(`/journey?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
    }
  }

  return (
    <MobileShell>
      <div className="bg-cream-100 flex flex-col flex-1 min-h-0"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        {/* Header */}
        <div className="flex gap-[12px] items-center pt-[20px] px-[16px] pb-[12px]">
          <button onClick={() => router.back()} className="shrink-0">
            <BackArrowIcon />
          </button>
          <h1
            className="font-[family-name:var(--font-heading)] font-semibold text-[20px] leading-[28px] text-navy-900"
            style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
          >
            Select stations
          </h1>
        </div>

        {/* Station inputs */}
        <div className="px-[16px] pb-[12px]">
          <div className="bg-cream-50 border-[1.119px] border-border-light rounded-[16px] overflow-clip relative">
            <button
              onClick={() => { setActiveField("from"); setSearch(from); }}
              className={`flex gap-[12px] items-center px-[16px] py-[12px] w-full border-b-[1.119px] border-border-light ${
                activeField === "from" ? "bg-[rgba(232,166,60,0.06)]" : ""
              }`}
            >
              <div className="bg-cream-200 flex items-center justify-center rounded-full w-[24px] h-[24px]">
                <FromDotIcon />
              </div>
              <div className="flex-1 flex flex-col items-start min-w-0">
                <span className="text-[12px] leading-[16px] text-text-muted">From</span>
                <span className={`text-[14px] leading-[20px] truncate w-full text-left ${
                  from ? "text-text-primary font-medium" : "text-text-muted"
                }`}>
                  {from || "Starting station"}
                </span>
              </div>
              {from && (
                <button onClick={(e) => { e.stopPropagation(); setFrom(""); }} className="shrink-0">
                  <CloseIcon />
                </button>
              )}
            </button>
            <button
              onClick={() => { setActiveField("to"); setSearch(to); }}
              className={`flex gap-[12px] items-center px-[16px] py-[12px] w-full ${
                activeField === "to" ? "bg-[rgba(232,166,60,0.06)]" : ""
              }`}
            >
              <div className="bg-cream-200 flex items-center justify-center rounded-full w-[24px] h-[24px]">
                <ToDotIcon />
              </div>
              <div className="flex-1 flex flex-col items-start min-w-0">
                <span className="text-[12px] leading-[16px] text-text-muted">To</span>
                <span className={`text-[14px] leading-[20px] truncate w-full text-left ${
                  to ? "text-text-primary font-medium" : "text-text-muted"
                }`}>
                  {to || "Destination station"}
                </span>
              </div>
              {to && (
                <button onClick={(e) => { e.stopPropagation(); setTo(""); }} className="shrink-0">
                  <CloseIcon />
                </button>
              )}
            </button>

            {/* Swap button */}
            <button
              onClick={handleSwap}
              className="absolute right-[16px] top-1/2 -translate-y-1/2 bg-cream-200 border-[1.119px] border-border-light rounded-full w-[32px] h-[32px] flex items-center justify-center"
            >
              <SwapIcon />
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="px-[16px] pb-[8px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${activeField === "from" ? "starting" : "destination"} station...`}
            className="bg-cream-50 border-[1.119px] border-border-light rounded-[12px] px-[16px] py-[10px] w-full text-[14px] leading-[20px] text-text-primary placeholder:text-text-muted outline-none focus:border-amber-500"
          />
        </div>

        {/* Station list */}
        <div className="flex-1 overflow-y-auto px-[16px] pb-[16px]">
          {!search && (
            <div className="pb-[12px]">
              <p className="font-semibold text-[12px] leading-[16px] text-text-muted tracking-[0.84px] uppercase pb-[8px]">
                Recent
              </p>
              {recentList.map((station) => (
                <button
                  key={station.id}
                  onClick={() => selectStation(station.name)}
                  className="flex items-center gap-[12px] py-[10px] w-full border-b-[1.119px] border-border-light"
                >
                  <span className="text-[14px] leading-[20px] text-text-primary">
                    {station.name}
                  </span>
                  <div className="flex gap-[4px] ml-auto">
                    {station.lines.map((line) => (
                      <div
                        key={line}
                        className="w-[8px] h-[8px] rounded-full"
                        style={{ backgroundColor: lineColors[line] }}
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          )}

          <div>
            <p className="font-semibold text-[12px] leading-[16px] text-text-muted tracking-[0.84px] uppercase pb-[8px]">
              {search ? "Results" : "All stations"}
            </p>
            {filteredStations.map((station) => (
              <button
                key={station.id}
                onClick={() => selectStation(station.name)}
                className="flex items-center gap-[12px] py-[10px] w-full border-b-[1.119px] border-border-light"
              >
                <span className="text-[14px] leading-[20px] text-text-primary">
                  {station.name}
                </span>
                <div className="flex gap-[4px] ml-auto">
                  {station.lines.map((line) => (
                    <div
                      key={line}
                      className="w-[8px] h-[8px] rounded-full"
                      style={{ backgroundColor: lineColors[line] }}
                    />
                  ))}
                </div>
              </button>
            ))}
            {filteredStations.length === 0 && (
              <p className="text-[14px] leading-[20px] text-text-muted text-center py-[24px]">
                No stations found
              </p>
            )}
          </div>
        </div>

        {/* Search button */}
        {from && to && (
          <div className="px-[16px] pb-[16px] pt-[8px] border-t-[1.119px] border-border-light bg-cream-100 shrink-0"
            style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom, 16px))" }}
          >
            <button
              onClick={handleSearch}
              className="bg-amber-500 rounded-[16px] py-[16px] w-full"
            >
              <span className="font-semibold text-[16px] leading-[24px] text-navy-900 text-center">
                Find routes →
              </span>
            </button>
          </div>
        )}
      </div>
    </MobileShell>
  );
}
