"use client";

import Link from "next/link";
import { BackArrowIcon, GooglePayIcon, ApplePayIcon, CreditCardIcon } from "@/components/icons";

export default function PaymentPage() {
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
            <div className="bg-amber-500 rounded-full w-[8px] h-[8px]" />
            <div className="bg-[#d8cebc] w-[20px] h-[1px]" />
          </div>
          <div className="bg-[#d8cebc] rounded-full w-[8px] h-[8px]" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-[16px] pb-[16px] flex flex-col gap-[12px]">
        {/* Payment header */}
        <div className="flex gap-[12px] items-center pb-[4px]">
          <Link href="/tickets" className="shrink-0">
            <BackArrowIcon />
          </Link>
          <h2
            className="font-[family-name:var(--font-heading)] font-semibold text-[16px] leading-[24px] text-navy-900"
            style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
          >
            Payment
          </h2>
          <div className="flex-1 flex justify-end">
            <span
              className="font-[family-name:var(--font-heading)] font-semibold text-[16px] leading-[24px] text-navy-900"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              {"₹"}50
            </span>
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-cream-200 flex items-center justify-between px-[16px] py-[10px] rounded-[12px]">
          <span className="text-[14px] leading-[20px] text-text-primary">
            Single journey · First class
          </span>
          <span className="text-[14px] leading-[20px] text-text-tertiary">
            Andheri → Churchgate
          </span>
        </div>

        {/* Payment methods */}
        <div className="flex flex-col gap-[10px]">
          <Link
            href="/tickets/success"
            className="bg-cream-50 border-[1.119px] border-border-light flex gap-[12px] items-center px-[20px] py-[16px] rounded-[16px]"
          >
            <GooglePayIcon />
            <span className="font-semibold text-[14px] leading-[20px] text-text-primary">
              Google Pay
            </span>
          </Link>

          <Link
            href="/tickets/success"
            className="bg-cream-50 border-[1.119px] border-border-light flex gap-[12px] items-center px-[20px] py-[16px] rounded-[16px]"
          >
            <ApplePayIcon />
            <span className="font-semibold text-[14px] leading-[20px] text-text-primary">
              Apple Pay
            </span>
          </Link>

          <Link
            href="/tickets/success"
            className="bg-cream-50 border-[1.119px] border-border-light flex gap-[12px] items-center px-[20px] py-[16px] rounded-[16px]"
          >
            <CreditCardIcon />
            <span className="font-semibold text-[14px] leading-[20px] text-text-primary">
              Debit / Credit card
            </span>
          </Link>
        </div>

        {/* Disabled CTA */}
        <div className="pt-[4px]">
          <div className="bg-cream-200 flex items-center justify-center py-[16px] rounded-[16px]">
            <span className="font-semibold text-[16px] leading-[24px] text-text-muted text-center">
              Select a payment method
            </span>
          </div>
        </div>

        {/* Security note */}
        <div className="flex items-center justify-center">
          <p className="text-[12px] leading-[16px] text-text-muted text-center">
            {"🔒"} Secured by Razorpay · PCI DSS compliant
          </p>
        </div>
      </div>
    </div>
  );
}
