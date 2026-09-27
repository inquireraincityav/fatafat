"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MobileShell from "@/components/shared/MobileShell";
import {
  BackArrowIcon,
  CheckIcon,
  PhoneIcon,
  MessageIcon,
  ChevronRightIcon,
} from "@/components/icons";

type ConfidenceMode = "new-rider" | "commuter";

interface NotificationSetting {
  label: string;
  description?: string;
  enabled: boolean;
}

export default function SettingsPage() {
  const router = useRouter();
  const [mode, setMode] = useState<ConfidenceMode>("commuter");
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      label: "Alert 1 stop before exit",
      description: "Most important - don’t miss your stop",
      enabled: true,
    },
    { label: "Delay notifications", enabled: true },
    { label: "Crowd level updates", enabled: false },
    {
      label: "Last bus alert",
      description: "Reminds you when the last BEST bus is near",
      enabled: true,
    },
  ]);

  function toggleNotification(index: number) {
    setNotifications((prev) =>
      prev.map((n, i) => (i === index ? { ...n, enabled: !n.enabled } : n))
    );
  }

  return (
    <MobileShell>
      <div className="bg-cream-100 flex flex-col flex-1 overflow-y-auto">
        {/* Header */}
        <div className="flex gap-[12px] items-center pb-[12px] pt-[20px] px-[16px]">
          <button onClick={() => router.back()} className="shrink-0">
            <BackArrowIcon />
          </button>
          <h1
            className="font-[family-name:var(--font-heading)] font-semibold text-[20px] leading-[28px] text-navy-900"
            style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
          >
            Settings
          </h1>
        </div>

        <div className="flex flex-col gap-[20px] px-[16px] pb-[24px]">
          {/* Confidence mode section */}
          <div className="flex flex-col">
            <p className="font-semibold text-[12px] leading-[16px] text-text-muted tracking-[0.96px] uppercase px-[2px]">
              How well do you know Mumbai&apos;s trains?
            </p>
            <p className="text-[12px] leading-[16px] text-text-muted pt-[4px] px-[2px]">
              This changes the layout across the whole app - not just a label.
            </p>
            <div className="flex flex-col gap-[8px] pt-[12px]">
              <button
                onClick={() => setMode("new-rider")}
                className={`flex gap-[16px] items-start p-[16px] rounded-[16px] text-left ${
                  mode === "new-rider"
                    ? "bg-navy-900"
                    : "bg-cream-50 border-[1.119px] border-border-light"
                }`}
              >
                <div className="pt-[2px] shrink-0">
                  {mode === "new-rider" ? (
                    <div className="bg-amber-500 border-[1.119px] border-amber-500 flex items-center justify-center rounded-full w-[20px] h-[20px]">
                      <CheckIcon />
                    </div>
                  ) : (
                    <div className="border-[1.119px] border-[#c8bfb0] rounded-full w-[20px] h-[20px]" />
                  )}
                </div>
                <div className="flex flex-col">
                  <p
                    className={`font-semibold text-[14px] leading-[20px] ${
                      mode === "new-rider" ? "text-cream-100" : "text-navy-900"
                    }`}
                  >
                    New Rider
                  </p>
                  <p
                    className={`text-[12px] leading-[19.5px] pt-[2px] ${
                      mode === "new-rider" ? "text-[#a8b8cc]" : "text-text-tertiary"
                    }`}
                  >
                    Larger type, plain-language guides, reassurance cues on every screen
                  </p>
                </div>
              </button>

              <button
                onClick={() => setMode("commuter")}
                className={`flex gap-[16px] items-start p-[16px] rounded-[16px] text-left ${
                  mode === "commuter"
                    ? "bg-navy-900"
                    : "bg-cream-50 border-[1.119px] border-border-light"
                }`}
              >
                <div className="pt-[2px] shrink-0">
                  {mode === "commuter" ? (
                    <div className="bg-amber-500 border-[1.119px] border-amber-500 flex items-center justify-center rounded-full w-[20px] h-[20px]">
                      <CheckIcon />
                    </div>
                  ) : (
                    <div className="border-[1.119px] border-[#c8bfb0] rounded-full w-[20px] h-[20px]" />
                  )}
                </div>
                <div className="flex flex-col">
                  <p
                    className={`font-semibold text-[14px] leading-[20px] ${
                      mode === "commuter" ? "text-cream-100" : "text-navy-900"
                    }`}
                  >
                    Commuter
                  </p>
                  <p
                    className={`text-[12px] leading-[19.5px] pt-[2px] ${
                      mode === "commuter" ? "text-[#a8b8cc]" : "text-text-tertiary"
                    }`}
                  >
                    Dense and compact - no explanations, just the data you need
                  </p>
                </div>
              </button>
            </div>

            <div className="flex gap-[8px] items-center px-[4px] pt-[8px]">
              <div className="bg-success w-[4px] h-[6px] rounded-full" />
              <p className="text-[12px] leading-[16px] text-text-tertiary">
                Currently in{" "}
                <span className="font-bold text-text-primary">
                  {mode === "commuter" ? "Commuter" : "New Rider"}
                </span>{" "}
                mode - tap to switch and see the difference on every screen
              </p>
            </div>
          </div>

          {/* Notifications section */}
          <div className="flex flex-col">
            <p className="font-semibold text-[12px] leading-[16px] text-text-muted tracking-[0.96px] uppercase px-[2px]">
              Notifications
            </p>
            <div className="bg-cream-50 border-[1.119px] border-border-light rounded-[16px] overflow-clip mt-[12px]">
              {notifications.map((notif, i) => (
                <div
                  key={notif.label}
                  className={`flex gap-[12px] items-center px-[16px] py-[14px] ${
                    i < notifications.length - 1
                      ? "border-b-[1.119px] border-border-light"
                      : ""
                  }`}
                >
                  <div className="flex-1 flex flex-col min-w-0">
                    <p className="text-[14px] leading-[20px] text-text-primary">
                      {notif.label}
                    </p>
                    {notif.description && (
                      <p className="text-[12px] leading-[16px] text-text-muted pt-[2px]">
                        {notif.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => toggleNotification(i)}
                    className={`relative w-[44px] h-[24px] rounded-full shrink-0 transition-colors ${
                      notif.enabled ? "bg-amber-500" : "bg-[#d8cebc]"
                    }`}
                  >
                    <div
                      className={`absolute top-[2px] bg-white rounded-full w-[20px] h-[20px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.2)] transition-[left] ${
                        notif.enabled ? "left-[22px]" : "left-[2px]"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Saved data section */}
          <div className="flex flex-col">
            <p className="font-semibold text-[12px] leading-[16px] text-text-muted tracking-[0.96px] uppercase px-[2px]">
              Saved data
            </p>
            <div className="bg-cream-50 border-[1.119px] border-border-light rounded-[16px] overflow-clip mt-[12px]">
              <div className="flex items-center justify-between px-[16px] py-[14px] border-b-[1.119px] border-border-light">
                <span className="text-[14px] leading-[20px] text-text-primary">
                  Offline timetable
                </span>
                <span className="text-[12px] leading-[16px] text-text-tertiary">
                  Updated today, 7:14 AM
                </span>
              </div>
              <div className="flex items-center justify-between px-[16px] py-[14px] border-b-[1.119px] border-border-light">
                <span className="text-[14px] leading-[20px] text-text-primary">
                  Saved routes
                </span>
                <span className="text-[12px] leading-[16px] text-text-tertiary">
                  2 routes
                </span>
              </div>
              <div className="flex items-center justify-between px-[16px] py-[14px]">
                <span className="text-[14px] leading-[20px] text-text-primary">
                  App version
                </span>
                <span className="text-[12px] leading-[16px] text-text-tertiary">
                  Sahi Local 1.0
                </span>
              </div>
            </div>
          </div>

          {/* Contact us section */}
          <div className="flex flex-col">
            <p className="font-semibold text-[12px] leading-[16px] text-text-muted tracking-[0.96px] uppercase px-[2px]">
              Contact us
            </p>
            <div className="bg-cream-50 border-[1.119px] border-border-light rounded-[16px] overflow-clip mt-[12px]">
              <div className="flex gap-[12px] items-center px-[16px] py-[14px] border-b-[1.119px] border-border-light">
                <div className="bg-[rgba(232,166,60,0.12)] flex items-center justify-center rounded-full w-[32px] h-[32px] shrink-0">
                  <PhoneIcon />
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                  <p className="font-medium text-[14px] leading-[20px] text-text-primary">
                    Call for assistance
                  </p>
                  <p className="text-[12px] leading-[16px] text-amber-500 pt-[2px]">
                    +91 88432 98499
                  </p>
                </div>
                <ChevronRightIcon />
              </div>
              <div className="flex gap-[12px] items-center px-[16px] py-[14px]">
                <div className="bg-[rgba(31,58,95,0.08)] flex items-center justify-center rounded-full w-[32px] h-[32px] shrink-0">
                  <MessageIcon />
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                  <p className="font-medium text-[14px] leading-[20px] text-text-primary">
                    Submit a message
                  </p>
                  <p className="text-[12px] leading-[16px] text-text-muted pt-[2px]">
                    Refunds, questions, or anything else
                  </p>
                </div>
                <ChevronRightIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
