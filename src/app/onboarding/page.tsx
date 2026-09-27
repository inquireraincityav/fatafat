"use client";

import { useRouter } from "next/navigation";
import MobileShell from "@/components/shared/MobileShell";

function MumbaiSkylineIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="20" fill="rgba(232,166,60,0.12)" />
      {/* Skyline silhouette */}
      <g opacity="0.3">
        {/* Buildings */}
        <rect x="12" y="38" width="6" height="18" rx="1" fill="#E8A63C" />
        <rect x="20" y="32" width="5" height="24" rx="1" fill="#E8A63C" />
        <rect x="27" y="36" width="7" height="20" rx="1" fill="#E8A63C" />
        <rect x="46" y="30" width="5" height="26" rx="1" fill="#E8A63C" />
        <rect x="53" y="34" width="6" height="22" rx="1" fill="#E8A63C" />
        <rect x="61" y="38" width="7" height="18" rx="1" fill="#E8A63C" />
        {/* Sea Link cable tower */}
        <rect x="37" y="24" width="3" height="32" rx="1" fill="#E8A63C" />
        <path
          d="M28 42 Q38.5 30 49 42"
          stroke="#E8A63C"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M30 46 Q38.5 36 47 46"
          stroke="#E8A63C"
          strokeWidth="0.8"
          fill="none"
        />
      </g>
      {/* Train */}
      <g>
        <rect x="18" y="48" width="44" height="14" rx="5" fill="#E8A63C" />
        <rect x="22" y="51" width="10" height="6" rx="2" fill="#1F3A5F" />
        <rect x="35" y="51" width="10" height="6" rx="2" fill="#1F3A5F" />
        <rect x="48" y="51" width="10" height="6" rx="2" fill="#1F3A5F" />
        {/* Wheels */}
        <circle cx="26" cy="64" r="2.5" fill="#E8A63C" />
        <circle cx="54" cy="64" r="2.5" fill="#E8A63C" />
        {/* Track */}
        <line
          x1="10"
          y1="66.5"
          x2="70"
          y2="66.5"
          stroke="#E8A63C"
          strokeWidth="1"
          opacity="0.4"
        />
      </g>
    </svg>
  );
}

function SkylineBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 400 220"
        fill="none"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "45%" }}
      >
        <defs>
          <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F3A5F" stopOpacity="0" />
            <stop offset="40%" stopColor="#17304F" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0F2340" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <rect width="400" height="220" fill="url(#skyFade)" />

        {/* Far buildings — faint */}
        <g opacity="0.08" fill="#A8B8CC">
          <rect x="0" y="100" width="18" height="120" />
          <rect x="22" y="80" width="14" height="140" />
          <rect x="40" y="110" width="20" height="110" />
          <rect x="65" y="70" width="12" height="150" />
          <rect x="82" y="95" width="16" height="125" />
          <rect x="102" y="60" width="10" height="160" />
          <rect x="116" y="85" width="18" height="135" />
          <rect x="140" y="105" width="14" height="115" />
          <rect x="158" y="75" width="11" height="145" />
          <rect x="174" y="90" width="20" height="130" />
          <rect x="200" y="65" width="9" height="155" />
          <rect x="214" y="100" width="16" height="120" />
          <rect x="235" y="80" width="13" height="140" />
          <rect x="253" y="110" width="18" height="110" />
          <rect x="276" y="72" width="11" height="148" />
          <rect x="292" y="95" width="15" height="125" />
          <rect x="312" y="60" width="10" height="160" />
          <rect x="327" y="88" width="18" height="132" />
          <rect x="350" y="105" width="14" height="115" />
          <rect x="369" y="78" width="12" height="142" />
          <rect x="385" y="95" width="15" height="125" />
        </g>

        {/* Mid buildings — slightly brighter */}
        <g opacity="0.05" fill="#A8B8CC">
          <rect x="10" y="130" width="24" height="90" />
          <rect x="50" y="118" width="20" height="102" />
          <rect x="90" y="125" width="28" height="95" />
          <rect x="135" y="115" width="18" height="105" />
          <rect x="170" y="128" width="22" height="92" />
          <rect x="210" y="120" width="26" height="100" />
          <rect x="255" y="130" width="20" height="90" />
          <rect x="290" y="118" width="24" height="102" />
          <rect x="330" y="125" width="18" height="95" />
          <rect x="365" y="122" width="22" height="98" />
        </g>

        {/* Sea Link cables */}
        <g opacity="0.1" stroke="#A8B8CC" strokeWidth="0.6" fill="none">
          {/* Left tower */}
          <rect
            x="148"
            y="100"
            width="3"
            height="60"
            fill="#A8B8CC"
            opacity="0.1"
          />
          {/* Right tower */}
          <rect
            x="248"
            y="100"
            width="3"
            height="60"
            fill="#A8B8CC"
            opacity="0.1"
          />
          {/* Main cables */}
          <path d="M100 155 Q149.5 110 200 155" />
          <path d="M200 155 Q249.5 110 300 155" />
          {/* Secondary cables */}
          <path d="M110 158 Q149.5 125 190 158" opacity="0.6" />
          <path d="M210 158 Q249.5 125 290 158" opacity="0.6" />
        </g>

        {/* Track lines running across */}
        <g opacity="0.06" stroke="#E8A63C">
          <line x1="0" y1="185" x2="400" y2="185" strokeWidth="1" />
          <line x1="0" y1="188" x2="400" y2="188" strokeWidth="0.5" />
          {/* Sleepers */}
          {Array.from({ length: 40 }).map((_, i) => (
            <line
              key={i}
              x1={i * 10 + 2}
              y1="183"
              x2={i * 10 + 2}
              y2="190"
              strokeWidth="0.5"
            />
          ))}
        </g>

        {/* Small star-like lights on buildings */}
        <g fill="#E8A63C" opacity="0.15">
          <circle cx="30" cy="90" r="1" />
          <circle cx="70" cy="78" r="1" />
          <circle cx="108" cy="68" r="1" />
          <circle cx="165" cy="82" r="1" />
          <circle cx="205" cy="72" r="1" />
          <circle cx="242" cy="88" r="1" />
          <circle cx="283" cy="80" r="1" />
          <circle cx="320" cy="66" r="1" />
          <circle cx="355" cy="92" r="1" />
          <circle cx="390" cy="84" r="1" />
        </g>
      </svg>
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <MobileShell>
      <div className="bg-navy-900 flex flex-col items-center justify-center px-[32px] flex-1 relative overflow-hidden">
        <SkylineBackground />

        {/* Content above background */}
        <div className="relative z-10 flex flex-col items-center w-full">
          {/* Logo + Title */}
          <div className="flex flex-col items-center pb-[40px]">
            <div className="pb-[24px]">
              <MumbaiSkylineIcon />
            </div>
            <div className="pb-[8px]">
              <h1
                className="font-[family-name:var(--font-heading)] font-semibold text-[30px] leading-[37.5px] text-text-heading text-center"
                style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
              >
                Fatafat
              </h1>
            </div>
            <p className="text-[14px] leading-[20px] text-text-subtle text-center">
              Western · Central · Harbour · BEST
            </p>
          </div>

          {/* Question Card */}
          <div className="pb-[28px] w-full max-w-[338px]">
            <div className="bg-[rgba(251,247,239,0.06)] border-[1.119px] border-[rgba(251,247,239,0.1)] rounded-[24px] px-[24px] py-[20px] backdrop-blur-sm">
              <div className="flex flex-col items-center">
                <h2
                  className="font-[family-name:var(--font-heading)] font-medium text-[20px] leading-[28px] text-text-on-dark text-center"
                  style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
                >
                  How well do you know
                  <br />
                  Mumbai&apos;s trains?
                </h2>
              </div>
              <div className="flex flex-col items-center pt-[8px]">
                <p className="text-[12px] leading-[16px] text-text-placeholder text-center max-w-[288px]">
                  Sets your starting point - change it anytime from Settings.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-[12px] w-full max-w-[338px]">
            <button
              onClick={() => router.push("/intro")}
              className="bg-amber-500 rounded-[16px] px-[20px] py-[16px] text-left w-full"
            >
              <p className="font-semibold text-[16px] leading-[24px] text-text-primary">
                I&apos;m new here
              </p>
              <p className="text-[12px] leading-[16px] text-[rgba(31,58,95,0.65)] pt-[2px]">
                Show me the basics first, then let me ride
              </p>
            </button>

            <button
              onClick={() => router.push("/home")}
              className="border-[1.119px] border-[rgba(248,240,228,0.25)] rounded-[16px] px-[20px] py-[16px] text-left w-full backdrop-blur-sm"
            >
              <p className="font-semibold text-[16px] leading-[24px] text-text-on-dark">
                I ride daily
              </p>
              <p className="text-[12px] leading-[16px] text-text-placeholder pt-[2px]">
                Keep it fast and compact
              </p>
            </button>
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[rgba(232,166,60,0.25)] z-10" />
      </div>
    </MobileShell>
  );
}
