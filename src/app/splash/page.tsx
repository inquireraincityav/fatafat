"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MumbaiTrainSVG from "@/components/splash/MumbaiTrainSVG";

export default function SplashPage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [trainPast, setTrainPast] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAll = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  function sched(fn: () => void, ms: number) {
    timeoutsRef.current.push(setTimeout(fn, ms));
  }

  const skip = useCallback(() => {
    clearAll();
    try {
      if (localStorage.getItem("fatafat_user_type")) {
        router.replace("/home");
        return;
      }
    } catch {}
    setStarted(true);
    setTrainPast(true);
    setShowOnboarding(true);
  }, [clearAll, router]);

  function handleChoice(type: "new" | "regular") {
    try { localStorage.setItem("fatafat_user_type", type); } catch {}
    router.push(type === "new" ? "/walkthrough" : "/home");
  }

  useEffect(() => {
    let returning = false;
    try { returning = !!localStorage.getItem("fatafat_user_type"); } catch {}
    setIsReturning(returning);

    sched(() => setStarted(true), 50);
    sched(() => setTrainPast(true), 2400);

    if (returning) {
      sched(() => router.replace("/home"), 3200);
    } else {
      sched(() => setShowOnboarding(true), 2800);
    }
    return () => clearAll();
  }, [clearAll, router]);

  return (
    <div
      className="fixed inset-0 flex justify-center bg-navy-900"
      {...(!showOnboarding ? {
        onClick: skip,
        role: "button" as const,
        tabIndex: 0,
        onKeyDown: (e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") skip(); },
      } : {})}
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
        <div
          className="absolute z-10 left-1/2"
          style={{
            top: "15%",
            width: 220,
            transform: trainPast
              ? "translateX(-50%) scale(4) translateY(-20%)"
              : started
                ? "translateX(-50%) scale(1) translateY(0)"
                : "translateX(-50%) scale(0.08) translateY(60px)",
            opacity: trainPast
              ? 0
              : started
                ? 1
                : 0.05,
            transition: trainPast
              ? "transform 800ms cubic-bezier(0.3, 0, 1, 0.5), opacity 600ms ease-in"
              : started
                ? "transform 2200ms cubic-bezier(0.25, 1, 0.5, 1), opacity 600ms ease-out"
                : "none",
            transformOrigin: "center center",
          }}
        >
          <MumbaiTrainSVG className="w-full h-auto" />
        </div>

        {/* Headlight glow */}
        <div
          className="absolute left-1/2 pointer-events-none z-[5]"
          style={{
            top: "52%",
            transform: "translateX(-50%)",
            opacity: started && !trainPast ? 0.35 : 0,
            transition: started
              ? "opacity 600ms ease-in-out"
              : "none",
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
            pointerEvents: showOnboarding ? "auto" : "none",
          }}
        >
          <div className="flex-[2]" />

          <div
            className="flex flex-col items-center"
            style={{
              transform: showOnboarding ? "translateY(0)" : "translateY(50px)",
              opacity: showOnboarding ? 1 : 0,
              transition: showOnboarding
                ? "transform 1100ms cubic-bezier(0.16, 1, 0.3, 1) 100ms, opacity 900ms ease-out 100ms"
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
                ? "transform 1100ms cubic-bezier(0.16, 1, 0.3, 1) 300ms, opacity 900ms ease-out 300ms"
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
                ? "transform 1100ms cubic-bezier(0.16, 1, 0.3, 1) 500ms, opacity 900ms ease-out 500ms"
                : "none",
            }}
          >
            <button
              onClick={() => handleChoice("new")}
              className="bg-amber-500 rounded-[16px] px-[20px] py-[16px] text-left w-full active:scale-[0.98] transition-transform duration-150"
            >
              <p className="font-semibold text-[16px] leading-[24px] text-text-primary">
                I&apos;m new here
              </p>
              <p className="text-[12px] leading-[16px] text-[rgba(31,58,95,0.65)] pt-[2px]">
                Take a quick walkthrough of the app
              </p>
            </button>
            <button
              onClick={() => handleChoice("regular")}
              className="border-[1.119px] border-[rgba(248,240,228,0.25)] rounded-[16px] px-[20px] py-[16px] text-left w-full backdrop-blur-sm active:scale-[0.98] transition-transform duration-150"
            >
              <p className="font-semibold text-[16px] leading-[24px] text-text-on-dark">
                I ride daily
              </p>
              <p className="text-[12px] leading-[16px] text-text-placeholder pt-[2px]">
                Skip the intro, let&apos;s go
              </p>
            </button>
          </div>

          <div className="flex-[3]" />
        </div>

        {/* Tap to skip */}
        <div
          className="absolute bottom-8 left-0 right-0 flex justify-center z-20"
          style={{
            opacity: started && !showOnboarding ? 0.5 : 0,
            transition: "opacity 500ms ease-in-out",
            pointerEvents: "none",
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
