"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import AppIcon from "@/components/shared/AppIcon";

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex justify-center bg-navy-900">
      <div className="w-full max-w-[402px] flex flex-col overflow-hidden relative">
      <div className="flex flex-col items-center justify-center px-[32px] flex-1 relative"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        {/* Background skyline image */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0" style={{ height: "35%" }}>
            <Image
              src="/mumbai-skyline.png"
              alt=""
              fill
              className="object-cover object-bottom opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
          </div>
        </div>

        {/* Content above background */}
        <div className="relative z-10 flex flex-col items-center w-full">
          {/* Logo + Title */}
          <div className="flex flex-col items-center pb-[40px]">
            <div className="pb-[24px]">
              <AppIcon size={80} />
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
