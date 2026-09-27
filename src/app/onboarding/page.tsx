"use client";

import { useRouter } from "next/navigation";

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
        viewBox="0 0 400 100"
        fill="none"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "28%" }}
      >
        <defs>
          <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F3A5F" stopOpacity="0" />
            <stop offset="100%" stopColor="#172D4A" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <rect width="400" height="100" fill="url(#skyFade)" />

        {/* Skyline silhouette — single path, very faint */}
        <path
          d="M0 100 L0 72 L8 72 L8 58 L14 58 L14 65 L22 65 L22 48 L28 48 L28 62 L36 62 L36 55 L42 55 L42 68 L52 68 L52 42 L56 42 L56 60 L64 60 L64 50 L70 50 L70 65 L80 65 L80 54 L86 54 L86 44 L90 44 L90 62 L100 62 L100 70 L108 70 L108 52 L112 52 L112 38 L116 38 L116 55 L124 55 L124 64 L134 64 L134 56 L138 56 L138 70 L148 70 L148 46 L152 42 L152 70 L160 70 L160 58 L166 58 L166 48 L170 48 L170 62 L180 62 L180 70 L188 70 L188 54 L192 54 L192 40 L196 40 L196 58 L204 58 L204 66 L214 66 L214 52 L218 52 L218 44 L222 44 L222 60 L232 60 L232 68 L240 68 L240 50 L244 46 L248 46 L248 62 L256 62 L256 56 L262 56 L262 42 L266 42 L266 58 L276 58 L276 66 L284 66 L284 54 L288 54 L288 48 L292 48 L292 64 L302 64 L302 72 L312 72 L312 56 L316 56 L316 46 L320 46 L320 60 L328 60 L328 68 L338 68 L338 58 L342 58 L342 52 L346 52 L346 66 L356 66 L356 72 L364 72 L364 60 L370 60 L370 54 L374 54 L374 68 L384 68 L384 62 L390 62 L390 72 L400 72 L400 100 Z"
          fill="#A8B8CC"
          opacity="0.06"
        />

        {/* Sea Link cables */}
        <g opacity="0.08" stroke="#A8B8CC" strokeWidth="0.5" fill="none">
          <line x1="151" y1="42" x2="151" y2="70" stroke="#A8B8CC" strokeWidth="1.5" />
          <line x1="247" y1="46" x2="247" y2="70" stroke="#A8B8CC" strokeWidth="1.5" />
          <path d="M120 68 Q151 38 182 68" />
          <path d="M216 68 Q247 40 278 68" />
        </g>

        {/* Track lines */}
        <g opacity="0.05" stroke="#E8A63C">
          <line x1="0" y1="88" x2="400" y2="88" strokeWidth="0.8" />
          <line x1="0" y1="90" x2="400" y2="90" strokeWidth="0.5" />
        </g>

        {/* Tiny window lights */}
        <g fill="#E8A63C" opacity="0.12">
          <rect x="53" y="50" width="1.5" height="1.5" />
          <rect x="88" y="48" width="1.5" height="1.5" />
          <rect x="113" y="42" width="1.5" height="1.5" />
          <rect x="167" y="52" width="1.5" height="1.5" />
          <rect x="193" y="44" width="1.5" height="1.5" />
          <rect x="219" y="48" width="1.5" height="1.5" />
          <rect x="263" y="46" width="1.5" height="1.5" />
          <rect x="289" y="52" width="1.5" height="1.5" />
          <rect x="317" y="50" width="1.5" height="1.5" />
          <rect x="343" y="56" width="1.5" height="1.5" />
          <rect x="371" y="58" width="1.5" height="1.5" />
        </g>
      </svg>
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-[402px] h-dvh flex flex-col bg-navy-900 relative overflow-hidden">
      <div className="flex flex-col items-center justify-center px-[32px] flex-1 relative"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
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
    </div>
  );
}
