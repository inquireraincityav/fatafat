"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MumbaiTrainSVG from "@/components/splash/MumbaiTrainSVG";

export default function SplashPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<
    "train-arrive" | "logo-fadein" | "hold" | "fadeout" | "done"
  >("train-arrive");
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
    // Train arrives: 0–800ms
    // Logo fades in: 800–1300ms
    // Hold: 1300–1700ms
    // Fade out: 1700–2200ms
    schedule(() => setPhase("logo-fadein"), 800);
    schedule(() => setPhase("hold"), 1300);
    schedule(() => setPhase("fadeout"), 1700);
    schedule(() => {
      if (!skipRef.current) {
        router.replace("/onboarding");
      }
    }, 2200);

    return () => clearAllTimeouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trainArrived =
    phase === "logo-fadein" || phase === "hold" || phase === "fadeout" || phase === "done";
  const logoVisible =
    phase === "logo-fadein" || phase === "hold" || phase === "fadeout" || phase === "done";
  const hintVisible = phase === "hold" || phase === "fadeout" || phase === "done";
  const fadingOut = phase === "fadeout" || phase === "done";

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
      {/* Splash layer — fades out as a whole */}
      <div
        className="w-full max-w-[402px] flex flex-col items-center relative overflow-hidden"
        style={{
          opacity: fadingOut ? 0 : 1,
          transition: "opacity 500ms ease-in-out",
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {/* Background skyline — same as onboarding */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0" style={{ height: "35%" }}>
            <Image
              src="/mumbai-skyline.png"
              alt=""
              fill
              className="object-cover object-bottom opacity-70"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
          </div>
        </div>

        {/* Headlight beam effects */}
        <div
          className="absolute left-1/2 pointer-events-none"
          style={{
            top: "38%",
            transform: "translateX(-50%)",
            opacity: trainArrived ? 0.6 : 0,
            transition: "opacity 400ms ease-in",
          }}
        >
          <div
            style={{
              width: 200,
              height: 300,
              background:
                "radial-gradient(ellipse at center top, rgba(255,251,230,0.35) 0%, rgba(255,251,230,0.1) 40%, transparent 70%)",
            }}
          />
        </div>

        {/* Train container — scale/bounce animation */}
        <div
          className="relative z-10 flex justify-center"
          style={{
            marginTop: "15%",
            width: "55%",
            maxWidth: 220,
            transform: trainArrived
              ? "scale(1)"
              : "scale(0.3) translateY(40px)",
            opacity: trainArrived ? 1 : 0.2,
            transition: trainArrived
              ? "transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 400ms ease-out"
              : "none",
          }}
        >
          <MumbaiTrainSVG className="w-full h-auto" />
        </div>

        {/* Logo + wordmark */}
        <div
          className="relative z-10 flex flex-col items-center mt-6"
          style={{
            opacity: logoVisible ? 1 : 0,
            transform: logoVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 400ms ease-out, transform 400ms ease-out",
          }}
        >
          <Image
            src="/icons/app-icon-onboarding-v3.png"
            alt="Fatafat"
            width={64}
            height={64}
            priority
            unoptimized
          />
          <h1
            className="font-[family-name:var(--font-heading)] font-semibold text-[34px] leading-[42px] text-text-heading mt-3"
            style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
          >
            Fatafat
          </h1>
          <p className="text-[13px] leading-[18px] text-text-subtle mt-1">
            Mumbai Transit Companion
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Tap to skip hint */}
        <div
          className="relative z-10 pb-8"
          style={{
            opacity: hintVisible ? 0.6 : 0,
            transition: "opacity 300ms ease-in",
          }}
        >
          <p className="text-[12px] text-text-placeholder tracking-wide">
            tap anywhere to skip
          </p>
        </div>
      </div>

      <style jsx>{`
        .splash-headlight {
          filter: blur(1px);
        }
        .splash-headlight-glow {
          animation: ${trainArrived ? "headlight-pulse 1.5s ease-in-out infinite" : "none"};
        }
        @keyframes headlight-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
