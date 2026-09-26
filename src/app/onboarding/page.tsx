"use client";

import { useRouter } from "next/navigation";
import MobileShell from "@/components/shared/MobileShell";

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <MobileShell>
      <div className="bg-navy-900 flex flex-col items-center justify-center px-[32px] flex-1 relative">
        {/* Logo + Title */}
        <div className="flex flex-col items-center pb-[40px]">
          <div className="pb-[24px]">
            <div className="bg-[rgba(232,166,60,0.15)] border-[1.119px] border-[rgba(232,166,60,0.3)] flex items-center justify-center rounded-[16px] w-[64px] h-[64px]">
              <span className="text-[28px]">🚃</span>
            </div>
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
          <div className="bg-[rgba(251,247,239,0.06)] border-[1.119px] border-[rgba(251,247,239,0.1)] rounded-[24px] px-[24px] py-[20px]">
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
            className="border-[1.119px] border-[rgba(248,240,228,0.25)] rounded-[16px] px-[20px] py-[16px] text-left w-full"
          >
            <p className="font-semibold text-[16px] leading-[24px] text-text-on-dark">
              I ride daily
            </p>
            <p className="text-[12px] leading-[16px] text-text-placeholder pt-[2px]">
              Keep it fast and compact
            </p>
          </button>
        </div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[rgba(232,166,60,0.25)]" />
      </div>
    </MobileShell>
  );
}
