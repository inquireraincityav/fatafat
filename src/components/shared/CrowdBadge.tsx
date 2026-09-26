import type { CrowdLevel } from "@/types";

const crowdStyles: Record<CrowdLevel, { bg: string; text: string; label: string }> = {
  light: { bg: "bg-crowd-light-bg", text: "text-crowd-light-text", label: "Light" },
  moderate: { bg: "bg-crowd-moderate-bg", text: "text-crowd-moderate-text", label: "Moderate" },
  crowded: { bg: "bg-crowd-crowded-bg", text: "text-crowd-crowded-text", label: "Crowded" },
};

export default function CrowdBadge({ level }: { level: CrowdLevel }) {
  const style = crowdStyles[level];
  return (
    <span
      className={`${style.bg} inline-flex items-center px-[8px] py-[2px] rounded-full`}
    >
      <span className={`${style.text} font-medium text-[11px] leading-[16.5px]`}>
        {style.label}
      </span>
    </span>
  );
}
