"use client";

import Link from "next/link";
import { SuccessCheckIcon } from "@/components/icons";

export default function PaymentSuccessPage() {
  return (
    <div className="bg-cream-100 flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-center justify-between pb-[12px] pt-[20px] px-[20px]">
        <h1
          className="font-[family-name:var(--font-heading)] font-semibold text-[24px] leading-[32px] text-navy-900"
          style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
        >
          Tickets
        </h1>
      </div>

      {/* Progress steps */}
      <div className="px-[16px] pb-[4px]">
        <div className="flex gap-[8px] items-center">
          <div className="flex gap-[8px] items-center">
            <div className="bg-success rounded-full w-[8px] h-[8px]" />
            <div className="bg-[#d8cebc] w-[20px] h-[1px]" />
          </div>
          <div className="flex gap-[8px] items-center">
            <div className="bg-success rounded-full w-[8px] h-[8px]" />
            <div className="bg-[#d8cebc] w-[20px] h-[1px]" />
          </div>
          <div className="bg-amber-500 rounded-full w-[8px] h-[8px]" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-[16px] pb-[16px]">
        <div className="flex flex-col gap-[16px] items-center py-[24px]">
          {/* Success icon */}
          <div className="bg-[rgba(39,174,96,0.12)] flex items-center justify-center rounded-full w-[80px] h-[80px]">
            <SuccessCheckIcon />
          </div>

          {/* Title */}
          <div className="flex flex-col items-center">
            <h2
              className="font-[family-name:var(--font-heading)] font-semibold text-[24px] leading-[32px] text-navy-900 text-center"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              Payment successful
            </h2>
            <p className="text-[14px] leading-[20px] text-text-tertiary text-center pt-[4px]">
              Your single journey is now active
            </p>
          </div>

          {/* Receipt card */}
          <div className="bg-cream-50 border-[1.119px] border-border-light rounded-[16px] px-[20px] py-[16px] w-full">
            <div className="flex items-start justify-between">
              <span className="text-[14px] leading-[20px] text-text-tertiary">Route</span>
              <span className="font-medium text-[14px] leading-[20px] text-text-primary">
                Andheri &rarr; Churchgate
              </span>
            </div>
            <div className="flex items-start justify-between pt-[8px]">
              <span className="text-[14px] leading-[20px] text-text-tertiary">Type</span>
              <span className="font-medium text-[14px] leading-[20px] text-text-primary">
                Single journey &middot; First class
              </span>
            </div>
            <div className="flex items-start justify-between pt-[8px]">
              <span className="text-[14px] leading-[20px] text-text-tertiary">Paid</span>
              <span
                className="font-[family-name:var(--font-heading)] font-semibold text-[16px] leading-[24px] text-navy-900"
                style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
              >
                {"₹"}50
              </span>
            </div>
            <div className="flex items-start justify-between pt-[8px]">
              <span className="text-[14px] leading-[20px] text-text-tertiary">Purchased</span>
              <span className="text-[14px] leading-[20px] text-text-tertiary">
                Today, 11:06 am
              </span>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-[rgba(232,166,60,0.1)] border-[1.119px] border-[rgba(232,166,60,0.25)] rounded-[12px] px-[16px] py-[12px] flex gap-[8px] items-start w-full">
            <span className="text-[#8b6a10] text-[12px] pt-px shrink-0">&#9432;</span>
            <p className="text-[12px] leading-[19.5px] text-[#8b6a10]">
              Your QR code is ready. Show it to the ticket checker (TC) if asked on board.
            </p>
          </div>

          {/* View tickets button */}
          <Link
            href="/tickets"
            className="bg-navy-900 rounded-[16px] py-[16px] w-full flex items-center justify-center"
          >
            <span className="font-semibold text-[16px] leading-[24px] text-cream-50 text-center">
              View my tickets &rarr;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
