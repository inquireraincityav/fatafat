"use client";

import { useState } from "react";
import Link from "next/link";
import { GearIcon, FromDotIcon, ToDotIcon } from "@/components/icons";

type TicketsTab = "my-tickets" | "buy";
type TicketClass = "second" | "first";

const tabs: { id: TicketsTab; label: string }[] = [
  { id: "my-tickets", label: "My Tickets" },
  { id: "buy", label: "Buy" },
];

const historyItems = [
  { from: "Andheri", to: "Churchgate", date: "Sep 15", type: "Single", price: "₹15" },
  { from: "Andheri", to: "CST", date: "Sep 14", type: "Single", price: "₹20" },
  { from: "Churchgate", to: "Bandra", date: "Sep 14", type: "Single", price: "₹13" },
];

const qrPattern = [
  [1,1,1,1,1,1,1,0,1,0,1,1,0,0,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,1,0,1,1,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,1,0,0,1,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,0,1,1,0,0,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0],
  [1,0,1,1,1,0,1,1,0,0,1,0,1,1,0,1,1,0,1,0,1],
  [0,1,0,0,1,1,0,1,1,0,0,1,0,0,1,0,1,1,0,1,0],
  [1,1,0,1,0,0,1,0,1,1,0,1,1,0,0,1,0,0,1,1,0],
  [0,0,1,0,1,1,0,0,0,1,1,0,1,1,0,1,0,1,0,0,1],
  [1,0,0,1,1,0,1,1,1,0,0,1,0,0,1,1,1,0,1,1,0],
  [0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,1,0,1,0,0,1],
  [1,1,1,1,1,1,1,0,0,1,0,1,0,1,1,0,1,0,1,1,0],
  [1,0,0,0,0,0,1,0,1,0,1,0,1,0,0,1,1,0,0,1,1],
  [1,0,1,1,1,0,1,0,1,1,0,0,1,1,0,0,1,1,1,0,0],
  [1,0,1,1,1,0,1,0,0,1,1,1,0,0,1,0,0,1,0,1,1],
  [1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,1,0,0,1,0,0],
  [1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,1,1,1,0],
  [1,1,1,1,1,1,1,0,1,0,1,1,0,1,1,0,1,0,0,1,1],
];

function TicketQRCode() {
  const cellSize = 5;
  const size = 21 * cellSize;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      {qrPattern.map((row, y) =>
        row.map((cell, x) =>
          cell === 1 ? (
            <rect
              key={`${x}-${y}`}
              x={x * cellSize}
              y={y * cellSize}
              width={cellSize}
              height={cellSize}
              fill="#1F3A5F"
            />
          ) : null
        )
      )}
    </svg>
  );
}

const fareOptions = [
  { label: "Single journey", desc: "One way, valid same day", secondPrice: "₹15", firstPrice: "₹50" },
  { label: "Return", desc: "Both ways, same day", secondPrice: "₹28", firstPrice: "₹95" },
  { label: "Monthly pass", desc: "Breaks even at 21 trips", secondPrice: "₹305", firstPrice: "₹960" },
  { label: "Quarterly pass", desc: "Best value for regulars", secondPrice: "₹870", firstPrice: "₹2,680" },
];

function TabSwitcher({
  active,
  onSelect,
}: {
  active: TicketsTab;
  onSelect: (tab: TicketsTab) => void;
}) {
  return (
    <div className="px-[16px] pb-[12px]">
      <div className="bg-cream-200 flex h-[42px] items-start overflow-clip p-[3px] rounded-[12px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            className={`flex-1 flex flex-col h-full items-center justify-center rounded-[8px] ${
              active === tab.id
                ? "bg-cream-50 shadow-[0px_1px_2px_rgba(0,0,0,0.08)]"
                : ""
            }`}
          >
            <span
              className={`font-medium text-[14px] leading-[20px] text-center ${
                active === tab.id ? "text-navy-900" : "text-text-muted"
              }`}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function MyTicketsTab({ onBuyTicket }: { onBuyTicket: () => void }) {
  return (
    <div className="flex flex-col gap-[12px] overflow-y-auto px-[16px] pb-[16px]">
      {/* Buy new ticket */}
      <button
        onClick={onBuyTicket}
        className="bg-amber-500 rounded-[16px] px-[16px] py-[14px] flex items-center justify-center gap-[8px] shrink-0"
      >
        <span className="text-[20px] leading-[20px] text-navy-900 font-light">+</span>
        <span className="font-semibold text-[14px] leading-[20px] text-navy-900">
          Buy a new ticket
        </span>
      </button>

      {/* Active ticket card */}
      <div className="bg-navy-900 rounded-[16px] overflow-clip">
        <div className="px-[20px] pt-[20px] pb-[16px]">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <p className="text-[12px] leading-[16px] text-[#7a8ea0]">Active ticket</p>
              <h3
                className="font-[family-name:var(--font-heading)] font-semibold text-[18px] leading-[28px] text-cream-50 pt-[4px]"
                style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
              >
                Andheri &rarr; Churchgate
              </h3>
              <p className="text-[12px] leading-[16px] text-[#7a8ea0] pt-[2px]">
                Second class &middot; Single journey
              </p>
            </div>
            <div className="bg-[rgba(232,166,60,0.2)] px-[10px] py-[4px] rounded-full">
              <span className="font-medium text-[12px] leading-[16px] text-amber-500">
                Valid
              </span>
            </div>
          </div>

          <div className="bg-cream-50 rounded-[12px] flex items-center justify-center h-[148px] mt-[12px]">
            <TicketQRCode />
          </div>

          <p className="text-[12px] leading-[16px] text-[#5a7090] text-center pt-[8px]">
            Valid until 4:30 PM today
          </p>
        </div>

        {/* Tear line */}
        <div className="flex items-center h-[20px] relative">
          <div className="border-t-[1.119px] border-dashed border-[rgba(255,255,255,0.12)] w-full" />
          <div className="absolute -left-[12px] bg-cream-100 rounded-full w-[24px] h-[24px]" />
          <div className="absolute -right-[12px] bg-cream-100 rounded-full w-[24px] h-[24px]" />
        </div>

        <div className="px-[20px] pb-[16px]">
          <div className="flex items-start justify-between">
            <span className="text-[12px] leading-[16px] text-[#5a7090]">
              {"₹"}15 {"·"} Second class
            </span>
            <span className="text-[12px] leading-[16px] text-[#5a7090]">
              Purchased 8:02 AM
            </span>
          </div>
        </div>
      </div>

      {/* Monthly pass card */}
      <div className="bg-cream-50 border-[1.119px] border-[#e8ddd0] rounded-[16px] px-[16px] py-[14px]">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <p className="text-[12px] leading-[16px] text-text-tertiary">Monthly pass</p>
            <h3
              className="font-[family-name:var(--font-heading)] font-semibold text-[16px] leading-[24px] text-navy-900 pt-[4px]"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              Andheri &harr; Churchgate
            </h3>
            <p className="text-[12px] leading-[16px] text-text-tertiary pt-[2px]">
              Second class &middot; Expires 30 Sep 2026
            </p>
          </div>
          <div className="bg-[#d4f4f2] px-[10px] py-[4px] rounded-full">
            <span className="font-medium text-[12px] leading-[16px] text-[#1a7a76]">
              Active
            </span>
          </div>
        </div>
        <div className="border-t-[1.119px] border-border-light mt-[12px] pt-[12px]">
          <div className="flex gap-[8px] items-center">
            <div className="bg-cream-200 flex-1 h-[6px] rounded-full">
              <div className="bg-amber-500 h-[6px] rounded-full w-[52%]" />
            </div>
            <span className="text-[12px] leading-[16px] text-text-tertiary">
              16 days left
            </span>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="flex flex-col">
        <p className="font-medium text-[12px] leading-[16px] text-text-muted px-[2px]">
          History
        </p>
        <div className="pt-[8px]">
          {historyItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-[12px] border-b-[1.119px] border-border-light opacity-60"
            >
              <div className="flex flex-col">
                <p className="text-[14px] leading-[20px] text-text-primary">
                  {item.from} &rarr; {item.to}
                </p>
                <p className="text-[12px] leading-[16px] text-text-muted">
                  {item.date} &middot; {item.type}
                </p>
              </div>
              <span className="text-[14px] leading-[20px] text-text-tertiary">
                {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BuyTab() {
  const [ticketClass, setTicketClass] = useState<TicketClass>("second");
  const [selectedFare, setSelectedFare] = useState(0);

  return (
    <div className="flex flex-col gap-[12px] overflow-y-auto px-[16px] pb-[16px]">
      {/* Route card */}
      <div className="bg-cream-50 border-[1.119px] border-dashed border-[#c8bfb0] rounded-[16px] px-[16px] py-[14px]">
        <p className="text-[12px] leading-[16px] text-text-tertiary">Route</p>
        <div className="flex flex-col gap-[6px] pt-[8px]">
          <div className="flex gap-[8px] items-center">
            <FromDotIcon />
            <span className="text-[14px] leading-[20px] text-text-primary">Andheri</span>
          </div>
          <div className="flex gap-[8px] items-center">
            <ToDotIcon />
            <span className="text-[14px] leading-[20px] text-text-primary">Churchgate</span>
          </div>
        </div>
      </div>

      {/* Class toggle */}
      <div className="bg-cream-200 flex h-[42px] items-start overflow-clip p-[3px] rounded-[12px]">
        <button
          onClick={() => setTicketClass("second")}
          className={`flex-1 flex flex-col h-full items-center justify-center rounded-[8px] ${
            ticketClass === "second"
              ? "bg-cream-50 shadow-[0px_1px_2px_rgba(0,0,0,0.08)]"
              : ""
          }`}
        >
          <span
            className={`font-medium text-[14px] leading-[20px] text-center ${
              ticketClass === "second" ? "text-navy-900" : "text-text-muted"
            }`}
          >
            Second class
          </span>
        </button>
        <button
          onClick={() => setTicketClass("first")}
          className={`flex-1 flex flex-col h-full items-center justify-center rounded-[8px] ${
            ticketClass === "first"
              ? "bg-cream-50 shadow-[0px_1px_2px_rgba(0,0,0,0.08)]"
              : ""
          }`}
        >
          <span
            className={`font-medium text-[14px] leading-[20px] text-center ${
              ticketClass === "first" ? "text-navy-900" : "text-text-muted"
            }`}
          >
            First class
          </span>
        </button>
      </div>

      {/* Fare options */}
      <div className="flex flex-col gap-[8px]">
        {fareOptions.map((option, i) => {
          const price = ticketClass === "second" ? option.secondPrice : option.firstPrice;
          const isSelected = selectedFare === i;
          return (
            <button
              key={option.label}
              onClick={() => setSelectedFare(i)}
              className={`flex items-center justify-between px-[16px] py-[14px] rounded-[16px] ${
                isSelected
                  ? "bg-navy-900"
                  : "bg-cream-50 border-[1.119px] border-border-light"
              }`}
            >
              <div className="flex flex-col items-start">
                <p
                  className={`font-medium text-[14px] leading-[20px] ${
                    isSelected ? "text-cream-50" : "text-text-primary"
                  }`}
                >
                  {option.label}
                </p>
                <p
                  className={`text-[12px] leading-[16px] pt-[2px] ${
                    isSelected ? "text-[#7a9abb]" : "text-text-muted"
                  }`}
                >
                  {option.desc}
                </p>
              </div>
              <span
                className={`font-[family-name:var(--font-heading)] font-semibold text-[20px] leading-[28px] ${
                  isSelected ? "text-amber-500" : "text-navy-900"
                }`}
                style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
              >
                {price}
              </span>
            </button>
          );
        })}
      </div>

      {/* Info box */}
      <div className="bg-cream-200 rounded-[12px] px-[16px] py-[12px] flex gap-[8px] items-start">
        <span className="text-text-tertiary text-[12px] pt-px shrink-0">&#9432;</span>
        <p className="text-[12px] leading-[16px] text-text-tertiary">
          Ticket is valid for the Mumbai Western Suburban Railway, Andheri to Churchgate section.
        </p>
      </div>

      {/* CTA button */}
      <Link href="/tickets/payment" className="bg-amber-500 rounded-[16px] py-[16px] w-full flex items-center justify-center">
        <span className="font-semibold text-[16px] leading-[24px] text-navy-900 text-center">
          Proceed to pay &middot;{" "}
          {ticketClass === "second"
            ? fareOptions[selectedFare].secondPrice
            : fareOptions[selectedFare].firstPrice}
        </span>
      </Link>
    </div>
  );
}

export default function TicketsPage() {
  const [activeTab, setActiveTab] = useState<TicketsTab>("my-tickets");

  return (
    <div className="bg-cream-100 flex flex-col flex-1">
      <div className="flex items-center justify-between pb-[12px] pt-[20px] px-[20px]">
        <h1
          className="font-[family-name:var(--font-heading)] font-semibold text-[24px] leading-[32px] text-navy-900"
          style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
        >
          Tickets
        </h1>
        <Link
          href="/settings"
          className="bg-cream-200 flex items-center justify-center rounded-full w-[36px] h-[36px]"
        >
          <GearIcon />
        </Link>
      </div>

      <TabSwitcher active={activeTab} onSelect={setActiveTab} />

      <div className="flex flex-col flex-1 overflow-clip">
        {activeTab === "my-tickets" && <MyTicketsTab onBuyTicket={() => setActiveTab("buy")} />}
        {activeTab === "buy" && <BuyTab />}
      </div>
    </div>
  );
}
