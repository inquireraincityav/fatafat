"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MumbaiTrainSVG from "@/components/splash/MumbaiTrainSVG";
import MumbaiTrainSideSVG from "@/components/splash/MumbaiTrainSideSVG";

export default function SplashPage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const skipRef = useRef(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAll = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  function sched(fn: () => void, ms: number) {
    timeoutsRef.current.push(setTimeout(fn, ms));
  }

  const skip = useCallback(() => {
    if (skipRef.current) return;
    skipRef.current = true;
    clearAll();
    router.replace("/onboarding");
  }, [clearAll, router]);

  useEffect(() => {
    sched(() => setStarted(true), 50);
    // Train animation: approach 0-1.5s, hold 1.5-2.2s, turn+exit 2.2-4s
    // Show onboarding at 3.5s (overlaps with train exiting)
    sched(() => setShowOnboarding(true), 3500);
    // Navigate at 5.5s
    sched(() => { if (!skipRef.current) router.replace("/onboarding"); }, 5500);
    return () => clearAll();
  }, [clearAll, router]);

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
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            height: "35%",
            top: showOnboarding ? "65%" : "42%",
            transition: showOnboarding
              ? "top 1400ms cubic-bezier(0.33, 0, 0.2, 1)"
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

        {/* ─── TRAIN ─── */}
        {/* Single container with keyframe animation for smooth continuous motion */}
        <div
          className="absolute z-10"
          style={{
            top: "14%",
            left: "50%",
            width: 220,
            transformOrigin: "center center",
            animation: started
              ? "train-journey 4s cubic-bezier(0.25, 0.1, 0.25, 1) forwards"
              : "none",
          }}
        >
          {/* Front view — fades out at rotation midpoint */}
          <div
            style={{
              animation: started
                ? "front-view 4s ease forwards"
                : "none",
              transformOrigin: "center center",
            }}
          >
            <MumbaiTrainSVG className="w-full h-auto" />
          </div>

          {/* Side view — fades in at rotation midpoint, wider */}
          <div
            className="absolute top-0 left-[-40%] w-[180%]"
            style={{
              animation: started
                ? "side-view 4s ease forwards"
                : "none",
              transformOrigin: "center center",
            }}
          >
            <MumbaiTrainSideSVG className="w-full h-auto" />
          </div>
        </div>

        {/* ─── ONBOARDING CONTENT ─── */}
        <div
          className="absolute inset-0 flex flex-col items-center px-[32px]"
          style={{
            paddingTop: "env(safe-area-inset-top, 0px)",
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
            pointerEvents: "none",
          }}
        >
          <div className="flex-[2]" />

          <div
            className="flex flex-col items-center"
            style={{
              transform: showOnboarding ? "translateY(0)" : "translateY(50px)",
              opacity: showOnboarding ? 1 : 0,
              transition: showOnboarding
                ? "transform 1200ms cubic-bezier(0.16, 1, 0.3, 1) 200ms, opacity 1000ms ease-out 200ms"
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

          <div
            className="w-full max-w-[338px]"
            style={{
              transform: showOnboarding ? "translateY(0)" : "translateY(60px)",
              opacity: showOnboarding ? 1 : 0,
              transition: showOnboarding
                ? "transform 1200ms cubic-bezier(0.16, 1, 0.3, 1) 450ms, opacity 1000ms ease-out 450ms"
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

          <div
            className="flex flex-col gap-[12px] w-full max-w-[338px]"
            style={{
              transform: showOnboarding ? "translateY(0)" : "translateY(70px)",
              opacity: showOnboarding ? 1 : 0,
              transition: showOnboarding
                ? "transform 1200ms cubic-bezier(0.16, 1, 0.3, 1) 650ms, opacity 1000ms ease-out 650ms"
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
            opacity: started && !showOnboarding ? 0.5 : 0,
            transition: "opacity 500ms ease-in-out",
          }}
        >
          <p className="text-[12px] text-text-placeholder tracking-wider">
            tap anywhere to skip
          </p>
        </div>
      </div>

      {/* Keyframe animations — scaleX squeeze for the turn, not rotateY */}
      <style jsx global>{`
        @keyframes train-journey {
          0% {
            transform: translateX(-50%) scale(0.1);
            opacity: 0.05;
          }
          8% {
            opacity: 0.4;
          }
          /* Arrive at station */
          35% {
            transform: translateX(-50%) scale(1) scaleX(1);
            opacity: 1;
          }
          /* Hold at station */
          50% {
            transform: translateX(-50%) scale(1) scaleX(1);
            opacity: 1;
          }
          /* Begin turning — squeeze horizontally while drifting left */
          58% {
            transform: translateX(-45%) scale(1) scaleX(0.6);
            opacity: 1;
          }
          /* Tightest squeeze = midpoint of turn */
          63% {
            transform: translateX(-35%) scale(1) scaleX(0.15);
            opacity: 1;
          }
          /* Side view expanding out, now moving left */
          70% {
            transform: translateX(-30%) scale(1) scaleX(0.7);
            opacity: 1;
          }
          /* Side view full, cruising left past skyline */
          78% {
            transform: translateX(-60%) scale(1) scaleX(1);
            opacity: 1;
          }
          88% {
            transform: translateX(-200%) scale(1) scaleX(1);
            opacity: 0.7;
          }
          100% {
            transform: translateX(-380%) scale(1) scaleX(1);
            opacity: 0;
          }
        }

        @keyframes front-view {
          0% { opacity: 1; }
          50% { opacity: 1; }
          /* Fade out during squeeze */
          60% { opacity: 0.6; }
          63% { opacity: 0; }
          100% { opacity: 0; }
        }

        @keyframes side-view {
          0% { opacity: 0; }
          60% { opacity: 0; }
          /* Fade in during expansion from squeeze */
          63% { opacity: 0; }
          67% { opacity: 0.7; }
          70% { opacity: 1; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
