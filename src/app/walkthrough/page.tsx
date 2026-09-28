"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MobileShell from "@/components/shared/MobileShell";

const steps = [
  {
    title: "Find your route",
    description:
      "Search any station on the Western, Central, or Harbour line. Pick your departure and arrival, and we'll show you the fastest route with live timing.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="22" r="14" stroke="#E8A63C" strokeWidth="2.5" fill="none" />
        <line x1="32" y1="32" x2="42" y2="42" stroke="#E8A63C" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="22" cy="18" r="3" fill="#E8A63C" opacity="0.3" />
        <rect x="20" y="21" width="4" height="8" rx="1" fill="#E8A63C" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "Live transit tracker",
    description:
      "Once you board, tap \"I'm on board\" to track your journey in real-time. See your current station, next stop, ETA, and get alerts when you're near your destination.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="16" width="36" height="18" rx="6" fill="none" stroke="#E8A63C" strokeWidth="2" />
        <rect x="10" y="20" width="8" height="8" rx="2" fill="#1F3A5F" />
        <rect x="20" y="20" width="8" height="8" rx="2" fill="#1F3A5F" />
        <rect x="30" y="20" width="8" height="8" rx="2" fill="#1F3A5F" />
        <circle cx="16" cy="38" r="3" fill="#E8A63C" opacity="0.5" />
        <circle cx="32" cy="38" r="3" fill="#E8A63C" opacity="0.5" />
        <line x1="4" y1="41" x2="44" y2="41" stroke="#E8A63C" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "Buy tickets instantly",
    description:
      "Purchase single, return, or monthly passes right from the app. Choose your class, pay with UPI, and your e-ticket with QR code is ready instantly.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="32" height="32" rx="6" fill="none" stroke="#E8A63C" strokeWidth="2" />
        <rect x="14" y="14" width="6" height="6" fill="#1F3A5F" />
        <rect x="22" y="14" width="6" height="6" fill="#1F3A5F" />
        <rect x="14" y="22" width="6" height="6" fill="#1F3A5F" />
        <rect x="28" y="14" width="6" height="6" fill="#E8A63C" opacity="0.3" />
        <rect x="14" y="28" width="6" height="6" fill="#E8A63C" opacity="0.3" />
        <rect x="22" y="22" width="4" height="4" fill="#E8A63C" opacity="0.4" />
        <rect x="28" y="28" width="6" height="6" fill="#1F3A5F" />
      </svg>
    ),
  },
  {
    title: "Explore the network",
    description:
      "View the full Mumbai rail map with all lines color-coded. Filter by Western, Central, Harbour, or Metro to plan your commute at a glance.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 40 L12 12 L20 20 L28 8 L36 24 L44 16" stroke="#E8A63C" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" fill="#3b82f6" />
        <circle cx="20" cy="20" r="3" fill="#ef4444" />
        <circle cx="28" cy="8" r="3" fill="#22c55e" />
        <circle cx="36" cy="24" r="3" fill="#a855f7" />
        <line x1="4" y1="40" x2="44" y2="40" stroke="#E8A63C" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
  },
];

export default function WalkthroughPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  function handleNext() {
    if (isLast) {
      router.push("/home");
    } else {
      setCurrentStep((s) => s + 1);
    }
  }

  function handleSkip() {
    router.push("/home");
  }

  return (
    <MobileShell>
      <div
        className="bg-cream-100 flex flex-col flex-1"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        {/* Skip button */}
        <div className="flex justify-end px-[20px] pt-[16px]">
          <button
            onClick={handleSkip}
            className="text-[14px] leading-[20px] text-text-muted active:opacity-60 transition-opacity duration-150"
          >
            Skip
          </button>
        </div>

        {/* Content */}
        <div key={currentStep} className="flex-1 flex flex-col items-center justify-center px-[32px]" style={{ animation: "fade-in-up 300ms ease-out" }}>
          {/* Icon */}
          <div className="bg-[rgba(232,166,60,0.08)] border-[1.119px] border-[rgba(232,166,60,0.15)] rounded-[28px] w-[120px] h-[120px] flex items-center justify-center mb-[32px]">
            {step.icon}
          </div>

          {/* Step indicator */}
          <div className="flex gap-[8px] mb-[24px]">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-[4px] rounded-full transition-all duration-300 ${
                  i === currentStep
                    ? "w-[24px] bg-amber-500"
                    : i < currentStep
                    ? "w-[8px] bg-amber-500 opacity-40"
                    : "w-[8px] bg-cream-300"
                }`}
              />
            ))}
          </div>

          {/* Text */}
          <h2
            className="font-[family-name:var(--font-heading)] font-semibold text-[24px] leading-[32px] text-navy-900 text-center mb-[12px]"
            style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
          >
            {step.title}
          </h2>
          <p className="text-[14px] leading-[22px] text-text-tertiary text-center max-w-[300px]">
            {step.description}
          </p>
        </div>

        {/* Bottom buttons */}
        <div
          className="px-[24px] pb-[24px] flex flex-col gap-[12px] shrink-0"
          style={{ paddingBottom: "max(24px, env(safe-area-inset-bottom, 24px))" }}
        >
          <button
            onClick={handleNext}
            className="bg-amber-500 rounded-[16px] py-[16px] w-full active:scale-[0.98] transition-transform duration-150"
          >
            <span className="font-semibold text-[16px] leading-[24px] text-navy-900 text-center">
              {isLast ? "Get started" : "Next"}
            </span>
          </button>
        </div>
      </div>
    </MobileShell>
  );
}
