"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MobileShell from "@/components/shared/MobileShell";

const steps = [
  {
    emoji: "\u{1F686}",
    title: "Fast vs. slow trains",
    body: 'Mumbai trains run on the same tracks but stop at different stations. "Fast" trains skip smaller stops - great for long trips. "Slow" trains stop everywhere. The board on the platform (and this app) always tells you which is which.',
  },
  {
    emoji: "\u{1F6AA}",
    title: "Compartments",
    body: "Mumbai trains have reserved compartments: Ladies’ coaches (marked with an L), First Class (costs more, less crowded), and General (everyone can ride). During peak hours, some coaches are reserved for women only. Signs on the platform and train mark each type.",
  },
  {
    emoji: "\u{1F3AB}",
    title: "Buying a ticket",
    body: "You need a valid ticket to ride. Buy at the station counter, an ATVM machine, or right here in the app. A single journey ticket is valid for 4 hours. Monthly passes save money if you commute regularly. Ticket checkers (TCs) can fine you ₹250 for travelling without one.",
  },
];

export default function IntroPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  function handleNext() {
    if (isLast) {
      router.push("/home");
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  }

  return (
    <MobileShell>
      <div className="bg-navy-900 flex flex-col items-center px-[32px] flex-1 relative">
        {/* Progress dots */}
        <div className="flex gap-[6px] items-start pt-[48px] pb-[32px]">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-[6px] rounded-full ${
                i === currentStep
                  ? "bg-amber-500 w-[24px]"
                  : i < currentStep
                    ? "bg-amber-500 w-[8px]"
                    : "bg-[rgba(255,255,255,0.2)] w-[8px]"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div key={currentStep} className="flex-1 flex flex-col items-center justify-center w-full max-w-[338px]" style={{ animation: "fade-in-up 300ms ease-out" }}>
          <div className="pb-[24px]">
            <span className="text-[48px] leading-[48px]">{step.emoji}</span>
          </div>

          <div className="pb-[16px]">
            <h2
              className="font-[family-name:var(--font-heading)] font-semibold text-[24px] leading-[30px] text-cream-50 text-center"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              {step.title}
            </h2>
          </div>

          <div className="pb-[32px]">
            <div className="bg-[rgba(251,247,239,0.08)] border-[1.119px] border-[rgba(251,247,239,0.12)] rounded-[16px] p-[20px]">
              <p className="text-[14px] leading-[22.75px] text-[#c8d8e8] text-center">
                {step.body}
              </p>
            </div>
          </div>

          <p className="text-[12px] leading-[16px] text-[rgba(200,216,232,0.5)] text-center pb-[24px]">
            You can always find these guides under Explore &gt; Basics
          </p>
        </div>

        {/* Buttons */}
        <div className="w-full max-w-[338px] pb-[32px] flex gap-[12px]">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="border-[1.119px] border-[rgba(248,240,228,0.2)] rounded-[16px] py-[16px] flex-1 flex items-center justify-center active:scale-[0.98] transition-transform duration-150"
            >
              <span className="font-semibold text-[16px] leading-[24px] text-cream-100 text-center">
                Back
              </span>
            </button>
          )}
          <button
            onClick={handleNext}
            className="bg-amber-500 rounded-[16px] py-[16px] flex-1 flex items-center justify-center active:scale-[0.98] transition-transform duration-150"
          >
            <span className="font-semibold text-[16px] leading-[24px] text-navy-900 text-center">
              {isLast ? "Start riding" : "Next"}
            </span>
          </button>
        </div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[rgba(232,166,60,0.25)]" />
      </div>
    </MobileShell>
  );
}
