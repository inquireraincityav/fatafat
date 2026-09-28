"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MumbaiTrainSVG from "@/components/splash/MumbaiTrainSVG";
import MumbaiTrainSideSVG from "@/components/splash/MumbaiTrainSideSVG";

type Phase =
  | "init"
  | "approach"       // train scaling up from distance
  | "arrived"        // train settled, skyline right behind it
  | "rotating"       // 3D perspective turn: front → side
  | "sliding"        // side-view train cruises past skyline, exits right
  | "transition"     // skyline drops to bottom, onboarding rises in
  | "done";

const TIMELINE = {
  approach: 80,
  arrived: 1500,
  rotating: 2100,
  sliding: 3100,
  transition: 4100,
  done: 5500,
} as const;

export default function SplashPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("init");
  const skipRef = useRef(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  function schedule(fn: () => void, ms: number) {
    const id = setTimeout(fn, ms);
    timeoutsRef.current.push(id);
  }

  const skip = useCallback(() => {
    if (skipRef.current) return;
    skipRef.current = true;
    clearAllTimeouts();
    router.replace("/onboarding");
  }, [clearAllTimeouts, router]);

  useEffect(() => {
    schedule(() => setPhase("approach"), TIMELINE.approach);
    schedule(() => setPhase("arrived"), TIMELINE.arrived);
    schedule(() => setPhase("rotating"), TIMELINE.rotating);
    schedule(() => setPhase("sliding"), TIMELINE.sliding);
    schedule(() => setPhase("transition"), TIMELINE.transition);
    schedule(() => {
      if (!skipRef.current) router.replace("/onboarding");
    }, TIMELINE.done);
    return () => clearAllTimeouts();
  }, [clearAllTimeouts, router]);

  const idx = ["init","approach","arrived","rotating","sliding","transition","done"].indexOf(phase);
  const approaching = idx >= 1;
  const arrived = idx >= 2;
  const rotating = idx >= 3;
  const sliding = idx >= 4;
  const transitioning = idx >= 5;

  return (
    <div
      className="fixed inset-0 flex justify-center bg-navy-900"
      onClick={skip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") skip(); }}
    >
      <div
        className="w-full max-w-[402px] relative overflow-hidden"
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {/* ─── SKYLINE ─── */}
        {/* Starts high (just below train), drops to bottom during transition */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            height: "35%",
            top: transitioning ? "65%" : "45%",
            transition: transitioning
              ? "top 1200ms cubic-bezier(0.33, 0, 0.2, 1)"
              : "none",
          }}
        >
          <Image
            src="/mumbai-skyline.png"
            alt=""
            fill
            className="object-cover object-bottom opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
        </div>

        {/* ─── TRAIN CONTAINER ─── */}
        {/* Holds both front and side views; the whole container slides right when exiting */}
        <div
          className="absolute z-10"
          style={{
            top: "12%",
            left: "50%",
            width: sliding ? "70%" : "55%",
            maxWidth: sliding ? 320 : 220,
            perspective: "600px",
            transform: sliding
              ? "translateX(180%)"
              : "translateX(-50%)",
            opacity: sliding ? 0 : 1,
            transition: sliding
              ? "transform 1100ms cubic-bezier(0.55, 0, 1, 0.45), opacity 900ms ease-in, width 800ms ease, max-width 800ms ease"
              : "none",
          }}
        >
          {/* FRONT VIEW — visible during approach & arrived, rotates away */}
          <div
            style={{
              transform: rotating
                ? "perspective(600px) rotateY(-85deg)"
                : approaching
                  ? "perspective(600px) rotateY(0deg) scale(1)"
                  : "perspective(600px) rotateY(0deg) scale(0.12)",
              opacity: rotating ? 0 : approaching ? 1 : 0.08,
              transition: rotating
                ? "transform 1000ms cubic-bezier(0.4, 0, 0.6, 1), opacity 600ms ease-in 200ms"
                : approaching
                  ? "transform 1300ms cubic-bezier(0.34, 1.25, 0.64, 1), opacity 500ms ease-out"
                  : "none",
              transformOrigin: "center center",
            }}
          >
            <MumbaiTrainSVG className="w-full h-auto" />
          </div>

          {/* SIDE VIEW — hidden initially, rotates in from the right */}
          <div
            className="absolute inset-0 flex items-start justify-center"
            style={{
              transform: rotating
                ? "perspective(600px) rotateY(0deg)"
                : "perspective(600px) rotateY(85deg)",
              opacity: rotating ? 1 : 0,
              transition: rotating
                ? "transform 1000ms cubic-bezier(0.4, 0, 0.6, 1), opacity 500ms ease-out 400ms"
                : "none",
              transformOrigin: "center center",
            }}
          >
            <MumbaiTrainSideSVG className="w-[180%] h-auto mt-[15%]" />
          </div>
        </div>

        {/* Headlight glow */}
        <div
          className="absolute left-1/2 pointer-events-none z-[5]"
          style={{
            top: "52%",
            transform: "translateX(-50%)",
            opacity: arrived && !rotating ? 0.35 : 0,
            transition: "opacity 500ms ease-in-out",
          }}
        >
          <div style={{
            width: 140, height: 160,
            background: "radial-gradient(ellipse at center top, rgba(255,251,230,0.25) 0%, rgba(255,251,230,0.05) 50%, transparent 75%)",
          }} />
        </div>

        {/* ─── ONBOARDING CONTENT ─── */}
        <div
          className="absolute inset-0 flex flex-col items-center px-[32px]"
          style={{
            paddingTop: "env(safe-area-inset-top, 0px)",
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
            opacity: transitioning ? 1 : 0,
            pointerEvents: "none",
            transition: "opacity 600ms ease-out 300ms",
          }}
        >
          <div className="flex-[2]" />

          {/* Logo + Title */}
          <div
            className="flex flex-col items-center"
            style={{
              transform: transitioning ? "translateY(0)" : "translateY(45px)",
              opacity: transitioning ? 1 : 0,
              transition: transitioning
                ? "transform 1100ms cubic-bezier(0.16, 1, 0.3, 1) 200ms, opacity 900ms ease-out 200ms"
                : "none",
            }}
          >
            <div className="pb-[24px]">
              <Image
                src="/icons/app-icon-onboarding-v3.png"
                alt="Fatafat"
                width={80}
                height={80}
                priority
                unoptimized
              />
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

          <div className="flex-[1.5]" />

          {/* Question Card */}
          <div
            className="w-full max-w-[338px]"
            style={{
              transform: transitioning ? "translateY(0)" : "translateY(55px)",
              opacity: transitioning ? 1 : 0,
              transition: transitioning
                ? "transform 1100ms cubic-bezier(0.16, 1, 0.3, 1) 400ms, opacity 900ms ease-out 400ms"
                : "none",
            }}
          >
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

          <div className="flex-[1]" />

          {/* Buttons */}
          <div
            className="flex flex-col gap-[12px] w-full max-w-[338px]"
            style={{
              transform: transitioning ? "translateY(0)" : "translateY(65px)",
              opacity: transitioning ? 1 : 0,
              transition: transitioning
                ? "transform 1100ms cubic-bezier(0.16, 1, 0.3, 1) 550ms, opacity 900ms ease-out 550ms"
                : "none",
            }}
          >
            <div className="bg-amber-500 rounded-[16px] px-[20px] py-[16px] text-left w-full">
              <p className="font-semibold text-[16px] leading-[24px] text-text-primary">
                I&apos;m new here
              </p>
              <p className="text-[12px] leading-[16px] text-[rgba(31,58,95,0.65)] pt-[2px]">
                Take a quick walkthrough of the app
              </p>
            </div>
            <div className="border-[1.119px] border-[rgba(248,240,228,0.25)] rounded-[16px] px-[20px] py-[16px] text-left w-full backdrop-blur-sm">
              <p className="font-semibold text-[16px] leading-[24px] text-text-on-dark">
                I ride daily
              </p>
              <p className="text-[12px] leading-[16px] text-text-placeholder pt-[2px]">
                Skip the intro, let&apos;s go
              </p>
            </div>
          </div>

          <div className="flex-[3]" />
        </div>

        {/* Tap to skip */}
        <div
          className="absolute bottom-8 left-0 right-0 flex justify-center z-20"
          style={{
            opacity: arrived && !transitioning ? 0.5 : 0,
            transition: "opacity 400ms ease-in-out",
          }}
        >
          <p className="text-[12px] text-text-placeholder tracking-wider">
            tap anywhere to skip
          </p>
        </div>
      </div>
    </div>
  );
}
