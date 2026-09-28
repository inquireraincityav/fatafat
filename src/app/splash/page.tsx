"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MumbaiTrainSVG from "@/components/splash/MumbaiTrainSVG";

type Phase =
  | "train-approach"   // 0ms: train scaling up from distance
  | "train-arrived"    // 1500ms: train settled in center, brief hold
  | "train-exit"       // 2200ms: train slides off to the right
  | "transition"       // 3200ms: skyline slides down, onboarding fades in
  | "done";            // 5000ms: navigate to onboarding

export default function SplashPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("train-approach");
  const skipRef = useRef(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearAllTimeouts() {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }

  function schedule(fn: () => void, ms: number) {
    const id = setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  }

  function skip() {
    if (skipRef.current) return;
    skipRef.current = true;
    clearAllTimeouts();
    router.replace("/onboarding");
  }

  useEffect(() => {
    schedule(() => setPhase("train-arrived"), 1500);
    schedule(() => setPhase("train-exit"), 2200);
    schedule(() => setPhase("transition"), 3200);
    schedule(() => {
      if (!skipRef.current) {
        router.replace("/onboarding");
      }
    }, 5200);

    return () => clearAllTimeouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const arrived = phase !== "train-approach";
  const exiting = phase === "train-exit" || phase === "transition" || phase === "done";
  const transitioning = phase === "transition" || phase === "done";
  const hintVisible = arrived && !transitioning;

  // Skyline: starts centered vertically, moves to bottom 35% during transition
  // Train: starts small/centered, scales up, then slides off right
  // Onboarding content: fades in during transition phase

  return (
    <div
      className="fixed inset-0 flex justify-center bg-navy-900"
      onClick={skip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") skip();
      }}
    >
      <div
        className="w-full max-w-[402px] flex flex-col items-center relative overflow-hidden"
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {/* Skyline — starts at center, slides to bottom during transition */}
        <div
          className="absolute left-0 right-0 overflow-hidden pointer-events-none"
          style={{
            height: "35%",
            bottom: transitioning ? "0%" : "30%",
            transition: transitioning
              ? "bottom 1800ms cubic-bezier(0.4, 0, 0.2, 1)"
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

        {/* Headlight beam — visible while train is on screen */}
        <div
          className="absolute left-1/2 pointer-events-none z-[5]"
          style={{
            top: "42%",
            transform: "translateX(-50%)",
            opacity: arrived && !exiting ? 0.5 : 0,
            transition: "opacity 400ms ease-in-out",
          }}
        >
          <div
            style={{
              width: 180,
              height: 280,
              background:
                "radial-gradient(ellipse at center top, rgba(255,251,230,0.3) 0%, rgba(255,251,230,0.08) 40%, transparent 70%)",
            }}
          />
        </div>

        {/* Train — arrives from distance, then exits right */}
        <div
          className="absolute z-10 flex justify-center"
          style={{
            top: "15%",
            left: "50%",
            width: "55%",
            maxWidth: 220,
            transform: exiting
              ? "translateX(150%) translateY(0) scale(1) rotate(3deg)"
              : arrived
                ? "translateX(-50%) translateY(0) scale(1)"
                : "translateX(-50%) translateY(60px) scale(0.15)",
            opacity: exiting ? 0 : arrived ? 1 : 0.15,
            transition: exiting
              ? "transform 900ms cubic-bezier(0.4, 0, 0.8, 0.4), opacity 700ms ease-in"
              : arrived
                ? "transform 1400ms cubic-bezier(0.34, 1.4, 0.64, 1), opacity 600ms ease-out"
                : "none",
          }}
        >
          <MumbaiTrainSVG className="w-full h-auto" />
        </div>

        {/* Onboarding content — fades in during transition */}
        <div
          className="relative z-10 flex flex-col items-center w-full flex-1 px-[32px]"
          style={{
            opacity: transitioning ? 1 : 0,
            transform: transitioning ? "translateY(0)" : "translateY(30px)",
            transition: transitioning
              ? "opacity 1200ms ease-out 400ms, transform 1200ms ease-out 400ms"
              : "none",
            pointerEvents: transitioning ? "none" : "none",
          }}
        >
          {/* Top spacer */}
          <div className="flex-[2]" />

          {/* Logo + Title */}
          <div className="flex flex-col items-center">
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

          {/* Middle spacer */}
          <div className="flex-[1.5]" />

          {/* Question Card */}
          <div className="w-full max-w-[338px]">
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

          {/* Spacer between card and buttons */}
          <div className="flex-[1]" />

          {/* Buttons */}
          <div className="flex flex-col gap-[12px] w-full max-w-[338px]">
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

          {/* Bottom spacer */}
          <div className="flex-[3]" />
        </div>

        {/* Tap to skip hint — visible during train phase only */}
        <div
          className="absolute bottom-8 left-0 right-0 flex justify-center z-20"
          style={{
            opacity: hintVisible ? 0.6 : 0,
            transition: "opacity 400ms ease-in-out",
          }}
        >
          <p className="text-[12px] text-text-placeholder tracking-wide">
            tap anywhere to skip
          </p>
        </div>
      </div>
    </div>
  );
}
