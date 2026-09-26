import type { Line } from "@/types";

const lineColors: Record<Line, string> = {
  western: "bg-line-western",
  central: "bg-line-central",
  harbour: "bg-line-harbour",
  metro: "bg-line-metro",
};

const lineLabels: Record<Line, string> = {
  western: "W",
  central: "C",
  harbour: "H",
  metro: "M",
};

export default function LineBadge({ line }: { line: Line }) {
  return (
    <span
      className={`${lineColors[line]} inline-flex items-center justify-center px-[5px] py-px rounded-[4px]`}
    >
      <span className="font-semibold text-[9px] leading-[13.5px] text-white tracking-[0.27px]">
        {lineLabels[line]}
      </span>
    </span>
  );
}
