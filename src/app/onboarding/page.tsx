"use client";

import { useRouter } from "next/navigation";

function MumbaiSkylineSVG() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="20" fill="rgba(232,166,60,0.12)" />
      {/* Gateway of India */}
      <g opacity="0.85">
        <rect x="30" y="34" width="20" height="26" rx="1" fill="none" stroke="#E8A63C" strokeWidth="1.2" />
        <path d="M33 34 Q40 24 47 34" fill="none" stroke="#E8A63C" strokeWidth="1.2" />
        <rect x="36" y="44" width="8" height="16" rx="3" fill="none" stroke="#E8A63C" strokeWidth="1" />
        <rect x="31" y="38" width="4" height="6" rx="1.5" fill="none" stroke="#E8A63C" strokeWidth="0.8" />
        <rect x="45" y="38" width="4" height="6" rx="1.5" fill="none" stroke="#E8A63C" strokeWidth="0.8" />
        {/* Dome */}
        <circle cx="40" cy="28" r="3" fill="none" stroke="#E8A63C" strokeWidth="0.8" />
      </g>
      {/* Skyscrapers */}
      <g opacity="0.35">
        <rect x="10" y="40" width="5" height="20" rx="0.5" fill="#E8A63C" />
        <rect x="16" y="34" width="4" height="26" rx="0.5" fill="#E8A63C" />
        <rect x="56" y="36" width="5" height="24" rx="0.5" fill="#E8A63C" />
        <rect x="62" y="30" width="4" height="30" rx="0.5" fill="#E8A63C" />
        <rect x="67" y="38" width="5" height="22" rx="0.5" fill="#E8A63C" />
      </g>
      {/* Ground line */}
      <line x1="8" y1="60" x2="72" y2="60" stroke="#E8A63C" strokeWidth="0.8" opacity="0.3" />
      {/* Train */}
      <g opacity="0.6">
        <rect x="20" y="62" width="40" height="8" rx="3" fill="#E8A63C" />
        <rect x="24" y="64" width="8" height="4" rx="1.5" fill="#1F3A5F" />
        <rect x="34" y="64" width="8" height="4" rx="1.5" fill="#1F3A5F" />
        <rect x="44" y="64" width="8" height="4" rx="1.5" fill="#1F3A5F" />
        <circle cx="26" cy="72" r="1.5" fill="#E8A63C" opacity="0.5" />
        <circle cx="54" cy="72" r="1.5" fill="#E8A63C" opacity="0.5" />
      </g>
      {/* Track */}
      <line x1="8" y1="73.5" x2="72" y2="73.5" stroke="#E8A63C" strokeWidth="0.6" opacity="0.25" />
    </svg>
  );
}

function MumbaiSkylineBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 400 120"
        fill="none"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "32%" }}
      >
        <defs>
          <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F3A5F" stopOpacity="0" />
            <stop offset="100%" stopColor="#172D4A" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <rect width="400" height="120" fill="url(#skyFade)" />

        {/* Mumbai skyline — Gateway of India, Taj Hotel, skyscrapers */}
        <g fill="none" stroke="#A8B8CC" strokeWidth="0.6" opacity="0.12">
          {/* Left buildings */}
          <rect x="5" y="68" width="12" height="32" rx="1" fill="#A8B8CC" fillOpacity="0.05" />
          <rect x="20" y="58" width="10" height="42" rx="1" fill="#A8B8CC" fillOpacity="0.05" />
          <rect x="33" y="52" width="8" height="48" rx="1" fill="#A8B8CC" fillOpacity="0.05" />
          <rect x="44" y="62" width="14" height="38" rx="1" fill="#A8B8CC" fillOpacity="0.05" />

          {/* Taj Mahal Palace Hotel dome */}
          <rect x="70" y="48" width="24" height="52" rx="1" fill="#A8B8CC" fillOpacity="0.05" />
          <path d="M72 48 Q82 32 94 48" strokeWidth="0.8" />
          <line x1="82" y1="32" x2="82" y2="48" strokeWidth="0.5" />

          {/* Gateway of India */}
          <rect x="110" y="54" width="30" height="46" rx="1" fill="#A8B8CC" fillOpacity="0.06" />
          <path d="M112 54 Q125 38 138 54" strokeWidth="0.8" />
          <rect x="119" y="68" width="12" height="32" rx="4" fill="#A8B8CC" fillOpacity="0.03" />
          <circle cx="125" cy="44" r="4" strokeWidth="0.5" />

          {/* Mid-city buildings */}
          <rect x="150" y="56" width="10" height="44" rx="1" fill="#A8B8CC" fillOpacity="0.04" />
          <rect x="163" y="44" width="8" height="56" rx="1" fill="#A8B8CC" fillOpacity="0.04" />
          <rect x="174" y="50" width="12" height="50" rx="1" fill="#A8B8CC" fillOpacity="0.04" />
          <rect x="190" y="40" width="7" height="60" rx="1" fill="#A8B8CC" fillOpacity="0.04" />
          <rect x="200" y="54" width="10" height="46" rx="1" fill="#A8B8CC" fillOpacity="0.04" />

          {/* Sea Link towers + cables */}
          <line x1="228" y1="38" x2="228" y2="100" strokeWidth="1" />
          <path d="M210 80 Q228 50 246 80" strokeWidth="0.5" />
          <path d="M215 85 Q228 60 241 85" strokeWidth="0.4" />
          <line x1="268" y1="42" x2="268" y2="100" strokeWidth="1" />
          <path d="M250 82 Q268 52 286 82" strokeWidth="0.5" />

          {/* Right side buildings */}
          <rect x="290" y="52" width="9" height="48" rx="1" fill="#A8B8CC" fillOpacity="0.04" />
          <rect x="302" y="44" width="12" height="56" rx="1" fill="#A8B8CC" fillOpacity="0.04" />
          <rect x="317" y="56" width="8" height="44" rx="1" fill="#A8B8CC" fillOpacity="0.04" />
          <rect x="328" y="48" width="10" height="52" rx="1" fill="#A8B8CC" fillOpacity="0.04" />
          <rect x="342" y="60" width="12" height="40" rx="1" fill="#A8B8CC" fillOpacity="0.04" />
          <rect x="358" y="54" width="8" height="46" rx="1" fill="#A8B8CC" fillOpacity="0.04" />
          <rect x="370" y="64" width="10" height="36" rx="1" fill="#A8B8CC" fillOpacity="0.04" />
          <rect x="384" y="58" width="8" height="42" rx="1" fill="#A8B8CC" fillOpacity="0.04" />
        </g>

        {/* Clouds */}
        <g fill="#A8B8CC" opacity="0.06">
          <ellipse cx="60" cy="30" rx="18" ry="6" />
          <ellipse cx="200" cy="22" rx="14" ry="5" />
          <ellipse cx="340" cy="28" rx="20" ry="7" />
        </g>

        {/* Hot air balloon */}
        <g opacity="0.08" stroke="#E8A63C" strokeWidth="0.5" fill="none">
          <ellipse cx="50" cy="14" rx="6" ry="8" />
          <rect x="48" y="22" width="4" height="3" rx="0.5" />
        </g>

        {/* Airplane */}
        <g opacity="0.07" fill="#A8B8CC">
          <path d="M365 12 L372 14 L365 16 Z" />
          <rect x="355" y="13.5" width="10" height="1" />
        </g>

        {/* Track lines */}
        <g opacity="0.06" stroke="#E8A63C">
          <line x1="0" y1="102" x2="400" y2="102" strokeWidth="0.8" />
          <line x1="0" y1="104" x2="400" y2="104" strokeWidth="0.5" />
        </g>

        {/* Window lights */}
        <g fill="#E8A63C" opacity="0.1">
          <rect x="24" y="64" width="1.5" height="1.5" />
          <rect x="36" y="58" width="1.5" height="1.5" />
          <rect x="167" y="50" width="1.5" height="1.5" />
          <rect x="193" y="46" width="1.5" height="1.5" />
          <rect x="306" y="50" width="1.5" height="1.5" />
          <rect x="332" y="54" width="1.5" height="1.5" />
          <rect x="362" y="60" width="1.5" height="1.5" />
        </g>
      </svg>
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex justify-center bg-navy-900">
      <div className="w-full max-w-[402px] flex flex-col overflow-hidden relative">
      <div className="flex flex-col items-center justify-center px-[32px] flex-1 relative"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <MumbaiSkylineBackground />

        {/* Content above background */}
        <div className="relative z-10 flex flex-col items-center w-full">
          {/* Logo + Title */}
          <div className="flex flex-col items-center pb-[40px]">
            <div className="pb-[24px]">
              <MumbaiSkylineSVG />
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
              onClick={() => {
                try { localStorage.setItem("fatafat_user_type", "new"); } catch {}
                router.push("/walkthrough");
              }}
              className="bg-amber-500 rounded-[16px] px-[20px] py-[16px] text-left w-full"
            >
              <p className="font-semibold text-[16px] leading-[24px] text-text-primary">
                I&apos;m new here
              </p>
              <p className="text-[12px] leading-[16px] text-[rgba(31,58,95,0.65)] pt-[2px]">
                Take a quick walkthrough of the app
              </p>
            </button>

            <button
              onClick={() => {
                try { localStorage.setItem("fatafat_user_type", "regular"); } catch {}
                router.push("/home");
              }}
              className="border-[1.119px] border-[rgba(248,240,228,0.25)] rounded-[16px] px-[20px] py-[16px] text-left w-full backdrop-blur-sm"
            >
              <p className="font-semibold text-[16px] leading-[24px] text-text-on-dark">
                I ride daily
              </p>
              <p className="text-[12px] leading-[16px] text-text-placeholder pt-[2px]">
                Skip the intro, let&apos;s go
              </p>
            </button>
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[rgba(232,166,60,0.25)] z-10" />
      </div>
      </div>
    </div>
  );
}
