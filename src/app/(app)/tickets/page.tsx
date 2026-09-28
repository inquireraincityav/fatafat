"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GearIcon, FromDotIcon, ToDotIcon, SwapIcon, GooglePayIcon, ApplePayIcon } from "@/components/icons";

type TicketsTab = "my-tickets" | "buy";
type TicketClass = "second" | "first";
type TicketStatus = "valid" | "completed";
type PaymentMethod = "google_pay" | "apple_pay";

interface Ticket {
  id: string;
  from: string;
  to: string;
  ticketClass: TicketClass;
  type: string;
  price: string;
  quantity: number;
  paymentMethod: PaymentMethod;
  status: TicketStatus;
  purchasedAt: string;
  validUntil?: string;
  scannedAt?: string;
}

const tabs: { id: TicketsTab; label: string }[] = [
  { id: "my-tickets", label: "My Tickets" },
  { id: "buy", label: "Buy" },
];

const STORAGE_KEY = "fatafat_tickets";

function loadTickets(): Ticket[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTickets(tickets: Ticket[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  } catch {}
}

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
            <rect key={`${x}-${y}`} x={x * cellSize} y={y * cellSize} width={cellSize} height={cellSize} fill="#1F3A5F" />
          ) : null
        )
      )}
    </svg>
  );
}

const fareOptions = [
  { label: "Single journey", desc: "One way, valid same day", secondPrice: 15, firstPrice: 50 },
  { label: "Return", desc: "Both ways, same day", secondPrice: 28, firstPrice: 95 },
  { label: "Monthly pass", desc: "Breaks even at 21 trips", secondPrice: 305, firstPrice: 960 },
  { label: "Quarterly pass", desc: "Best value for regulars", secondPrice: 870, firstPrice: 2680 },
];

function TabSwitcher({ active, onSelect }: { active: TicketsTab; onSelect: (tab: TicketsTab) => void }) {
  return (
    <div className="px-[16px] pb-[12px]">
      <div className="bg-cream-200 flex h-[42px] items-start overflow-clip p-[3px] rounded-[12px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            className={`flex-1 flex flex-col h-full items-center justify-center rounded-[8px] ${
              active === tab.id ? "bg-cream-50 shadow-[0px_1px_2px_rgba(0,0,0,0.08)]" : ""
            }`}
          >
            <span className={`font-medium text-[14px] leading-[20px] text-center ${active === tab.id ? "text-navy-900" : "text-text-muted"}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ActiveTicketCard({ ticket, onScan }: { ticket: Ticket; onScan: (id: string) => void }) {
  return (
    <div className="bg-navy-900 rounded-[16px] overflow-clip min-w-[300px] max-w-[340px] w-[85vw] shrink-0 snap-center">
      <div className="px-[20px] pt-[20px] pb-[16px]">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <p className="text-[12px] leading-[16px] text-[#7a8ea0]">Active ticket</p>
            <h3
              className="font-[family-name:var(--font-heading)] font-semibold text-[18px] leading-[28px] text-cream-50 pt-[4px]"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              {ticket.from} - {ticket.to}
            </h3>
            <p className="text-[12px] leading-[16px] text-[#7a8ea0] pt-[2px]">
              {ticket.ticketClass === "first" ? "First" : "Second"} class · {ticket.type}
            </p>
          </div>
          <div className="flex flex-col items-end gap-[4px]">
            <div className="bg-[rgba(232,166,60,0.2)] px-[10px] py-[4px] rounded-full">
              <span className="font-medium text-[12px] leading-[16px] text-amber-500">Valid</span>
            </div>
            {ticket.quantity > 1 && (
              <div className="bg-[rgba(232,166,60,0.15)] px-[8px] py-[2px] rounded-full">
                <span className="font-medium text-[11px] leading-[14px] text-amber-500">x{ticket.quantity}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-cream-50 rounded-[12px] flex items-center justify-center h-[148px] mt-[12px]">
          <TicketQRCode />
        </div>

        <p className="text-[12px] leading-[16px] text-[#5a7090] text-center pt-[8px]">
          {ticket.validUntil || "Valid until end of day"}
        </p>
      </div>

      {/* Tear line */}
      <div className="flex items-center h-[20px] relative">
        <div className="border-t-[1.119px] border-dashed border-[rgba(255,255,255,0.12)] w-full" />
        <div className="absolute -left-[12px] bg-cream-100 rounded-full w-[24px] h-[24px]" />
        <div className="absolute -right-[12px] bg-cream-100 rounded-full w-[24px] h-[24px]" />
      </div>

      <div className="px-[20px] pb-[16px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[6px]">
            <span className="text-[12px] leading-[16px] text-[#5a7090]">
              {ticket.price}{ticket.quantity > 1 ? ` x${ticket.quantity}` : ""}
            </span>
            <span className="text-[12px] leading-[16px] text-[#5a7090]">·</span>
            {ticket.paymentMethod === "google_pay" ? (
              <span className="text-[11px] leading-[14px] text-[#5a7090]">GPay</span>
            ) : (
              <span className="text-[11px] leading-[14px] text-[#5a7090]">Apple Pay</span>
            )}
          </div>
          <button
            onClick={() => onScan(ticket.id)}
            className="bg-[rgba(232,166,60,0.2)] px-[12px] py-[4px] rounded-full"
          >
            <span className="font-medium text-[11px] leading-[16px] text-amber-500">
              Mark as scanned
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyTicketsState({ onBuyTicket }: { onBuyTicket: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-[32px]">
      <div className="bg-cream-200 rounded-full w-[64px] h-[64px] flex items-center justify-center mb-[16px]">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="6" width="20" height="16" rx="3" stroke="#a09890" strokeWidth="1.5" fill="none" />
          <line x1="4" y1="11" x2="24" y2="11" stroke="#a09890" strokeWidth="1.5" />
          <rect x="7" y="15" width="6" height="3" rx="1" fill="#a09890" opacity="0.4" />
        </svg>
      </div>
      <p
        className="font-[family-name:var(--font-heading)] font-medium text-[18px] leading-[26px] text-navy-900 text-center mb-[8px]"
        style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
      >
        No tickets yet
      </p>
      <p className="text-[13px] leading-[20px] text-text-tertiary text-center max-w-[240px] mb-[24px]">
        Buy your first ticket and it will show up here with a scannable QR code.
      </p>
      <button
        onClick={onBuyTicket}
        className="bg-amber-500 rounded-[16px] px-[24px] py-[14px] flex items-center gap-[8px]"
      >
        <span className="text-[18px] leading-[18px] text-navy-900 font-light">+</span>
        <span className="font-semibold text-[14px] leading-[20px] text-navy-900">Buy a ticket</span>
      </button>
    </div>
  );
}

function MyTicketsTab({
  tickets,
  onBuyTicket,
  onScan,
}: {
  tickets: Ticket[];
  onBuyTicket: () => void;
  onScan: (id: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeTickets = tickets.filter((t) => t.status === "valid");
  const completedTickets = tickets.filter((t) => t.status === "completed");

  if (tickets.length === 0) {
    return <EmptyTicketsState onBuyTicket={onBuyTicket} />;
  }

  return (
    <div className="flex flex-col gap-[12px] overflow-y-auto pb-[16px]">
      {/* Buy new ticket */}
      <div className="px-[16px]">
        <button
          onClick={onBuyTicket}
          className="bg-amber-500 rounded-[16px] px-[16px] py-[14px] flex items-center justify-center gap-[8px] shrink-0 w-full"
        >
          <span className="text-[20px] leading-[20px] text-navy-900 font-light">+</span>
          <span className="font-semibold text-[14px] leading-[20px] text-navy-900">Buy a new ticket</span>
        </button>
      </div>

      {/* Active tickets */}
      {activeTickets.length > 0 && (
        <div className="flex flex-col gap-[8px]">
          <div className="px-[16px] flex items-center justify-between">
            <span className="font-semibold text-[12px] leading-[16px] text-text-muted tracking-[0.84px] uppercase">
              Active ({activeTickets.length})
            </span>
            {activeTickets.length > 1 && (
              <span className="text-[11px] leading-[16px] text-text-muted">
                Swipe to see all
              </span>
            )}
          </div>
          <div
            ref={scrollRef}
            className="flex gap-[12px] overflow-x-auto px-[16px] pb-[4px] snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {activeTickets.map((ticket) => (
              <ActiveTicketCard key={ticket.id} ticket={ticket} onScan={onScan} />
            ))}
          </div>
        </div>
      )}

      {/* History */}
      {completedTickets.length > 0 && (
        <div className="flex flex-col px-[16px]">
          <p className="font-semibold text-[12px] leading-[16px] text-text-muted tracking-[0.84px] uppercase">
            History
          </p>
          <div className="pt-[8px]">
            {completedTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex items-center justify-between py-[12px] border-b-[1.119px] border-border-light opacity-60"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-[8px]">
                    <p className="text-[14px] leading-[20px] text-text-primary">
                      {ticket.from} - {ticket.to}
                    </p>
                    <span className="bg-cream-200 px-[6px] py-[1px] rounded-full text-[10px] leading-[14px] text-text-muted">
                      Completed
                    </span>
                  </div>
                  <p className="text-[12px] leading-[16px] text-text-muted">
                    {ticket.purchasedAt} · {ticket.type}{ticket.quantity > 1 ? ` x${ticket.quantity}` : ""}
                  </p>
                </div>
                <span className="text-[14px] leading-[20px] text-text-tertiary">{ticket.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BuyTab({
  onPurchase,
  initialFrom,
  initialTo,
}: {
  onPurchase: (ticket: Ticket) => void;
  initialFrom?: string;
  initialTo?: string;
}) {
  const router = useRouter();
  const [from, setFrom] = useState(initialFrom || "Andheri");
  const [to, setTo] = useState(initialTo || "Churchgate");
  const [ticketClass, setTicketClass] = useState<TicketClass>("second");
  const [selectedFare, setSelectedFare] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("google_pay");

  function handleSwap() {
    setFrom(to);
    setTo(from);
  }

  function handleChangeRoute() {
    router.push(`/station-picker?returnTo=tickets`);
  }

  function handlePurchase() {
    const option = fareOptions[selectedFare];
    const unitPrice = ticketClass === "second" ? option.secondPrice : option.firstPrice;
    const totalPrice = unitPrice * quantity;
    const newTicket: Ticket = {
      id: `ticket_${Date.now()}`,
      from,
      to,
      ticketClass,
      type: option.label,
      price: `₹${totalPrice.toLocaleString()}`,
      quantity,
      paymentMethod,
      status: "valid",
      purchasedAt: new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true }),
      validUntil: `Valid until ${new Date(Date.now() + 8 * 60 * 60 * 1000).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true })} today`,
    };
    onPurchase(newTicket);
  }

  const unitPrice = ticketClass === "second"
    ? fareOptions[selectedFare].secondPrice
    : fareOptions[selectedFare].firstPrice;
  const totalPrice = unitPrice * quantity;

  return (
    <div className="flex flex-col gap-[12px] overflow-y-auto px-[16px] pb-[16px]">
      {/* Editable Route card */}
      <div className="bg-cream-50 border-[1.119px] border-border-light rounded-[16px] px-[16px] py-[14px] relative">
        <div className="flex items-center justify-between mb-[8px]">
          <p className="text-[12px] leading-[16px] text-text-tertiary">Route</p>
          <button onClick={handleChangeRoute} className="text-[12px] leading-[16px] text-amber-600 font-medium">
            Change
          </button>
        </div>
        <div className="flex items-center gap-[8px]">
          <div className="flex flex-col gap-[6px] flex-1">
            <div className="flex gap-[8px] items-center">
              <FromDotIcon />
              <span className="text-[14px] leading-[20px] text-text-primary font-medium">{from}</span>
            </div>
            <div className="flex gap-[8px] items-center">
              <ToDotIcon />
              <span className="text-[14px] leading-[20px] text-text-primary font-medium">{to}</span>
            </div>
          </div>
          <button
            onClick={handleSwap}
            className="bg-cream-200 border-[1.119px] border-border-light rounded-full w-[32px] h-[32px] flex items-center justify-center shrink-0"
          >
            <SwapIcon />
          </button>
        </div>
      </div>

      {/* Class toggle */}
      <div className="bg-cream-200 flex h-[42px] items-start overflow-clip p-[3px] rounded-[12px]">
        <button
          onClick={() => setTicketClass("second")}
          className={`flex-1 flex flex-col h-full items-center justify-center rounded-[8px] ${
            ticketClass === "second" ? "bg-cream-50 shadow-[0px_1px_2px_rgba(0,0,0,0.08)]" : ""
          }`}
        >
          <span className={`font-medium text-[14px] leading-[20px] text-center ${ticketClass === "second" ? "text-navy-900" : "text-text-muted"}`}>
            Second class
          </span>
        </button>
        <button
          onClick={() => setTicketClass("first")}
          className={`flex-1 flex flex-col h-full items-center justify-center rounded-[8px] ${
            ticketClass === "first" ? "bg-cream-50 shadow-[0px_1px_2px_rgba(0,0,0,0.08)]" : ""
          }`}
        >
          <span className={`font-medium text-[14px] leading-[20px] text-center ${ticketClass === "first" ? "text-navy-900" : "text-text-muted"}`}>
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
                isSelected ? "bg-navy-900" : "bg-cream-50 border-[1.119px] border-border-light"
              }`}
            >
              <div className="flex flex-col items-start">
                <p className={`font-medium text-[14px] leading-[20px] ${isSelected ? "text-cream-50" : "text-text-primary"}`}>
                  {option.label}
                </p>
                <p className={`text-[12px] leading-[16px] pt-[2px] ${isSelected ? "text-[#7a9abb]" : "text-text-muted"}`}>
                  {option.desc}
                </p>
              </div>
              <span
                className={`font-[family-name:var(--font-heading)] font-semibold text-[20px] leading-[28px] ${isSelected ? "text-amber-500" : "text-navy-900"}`}
                style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
              >
                {"₹"}{price.toLocaleString()}
              </span>
            </button>
          );
        })}
      </div>

      {/* Quantity selector */}
      <div className="bg-cream-50 border-[1.119px] border-border-light rounded-[16px] px-[16px] py-[14px] flex items-center justify-between">
        <p className="text-[14px] leading-[20px] text-text-primary font-medium">Quantity</p>
        <div className="flex items-center gap-[16px]">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className={`w-[32px] h-[32px] rounded-full flex items-center justify-center ${
              quantity <= 1 ? "bg-cream-200 text-text-muted" : "bg-navy-900 text-cream-50"
            }`}
          >
            <span className="text-[16px] leading-[16px] font-medium">-</span>
          </button>
          <span
            className="font-[family-name:var(--font-heading)] font-semibold text-[20px] leading-[28px] text-navy-900 w-[24px] text-center"
            style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
          >
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            disabled={quantity >= 10}
            className={`w-[32px] h-[32px] rounded-full flex items-center justify-center ${
              quantity >= 10 ? "bg-cream-200 text-text-muted" : "bg-navy-900 text-cream-50"
            }`}
          >
            <span className="text-[16px] leading-[16px] font-medium">+</span>
          </button>
        </div>
      </div>

      {/* Payment method */}
      <div className="flex flex-col gap-[8px]">
        <p className="text-[12px] leading-[16px] text-text-muted font-semibold tracking-[0.84px] uppercase">
          Pay with
        </p>
        <div className="flex gap-[8px]">
          <button
            onClick={() => setPaymentMethod("google_pay")}
            className={`flex-1 flex items-center justify-center gap-[8px] py-[14px] rounded-[16px] ${
              paymentMethod === "google_pay"
                ? "bg-navy-900"
                : "bg-cream-50 border-[1.119px] border-border-light"
            }`}
          >
            <GooglePayIcon />
            <span className={`font-medium text-[14px] leading-[20px] ${paymentMethod === "google_pay" ? "text-cream-50" : "text-text-primary"}`}>
              Google Pay
            </span>
          </button>
          <button
            onClick={() => setPaymentMethod("apple_pay")}
            className={`flex-1 flex items-center justify-center gap-[8px] py-[14px] rounded-[16px] ${
              paymentMethod === "apple_pay"
                ? "bg-navy-900"
                : "bg-cream-50 border-[1.119px] border-border-light"
            }`}
          >
            <ApplePayIcon />
            <span className={`font-medium text-[14px] leading-[20px] ${paymentMethod === "apple_pay" ? "text-cream-50" : "text-text-primary"}`}>
              Apple Pay
            </span>
          </button>
        </div>
      </div>

      {/* CTA button */}
      <button
        onClick={handlePurchase}
        className="bg-amber-500 rounded-[16px] py-[16px] w-full flex items-center justify-center"
      >
        <span className="font-semibold text-[16px] leading-[24px] text-navy-900 text-center">
          Buy {quantity > 1 ? `${quantity} tickets` : "ticket"} · {"₹"}{totalPrice.toLocaleString()}
        </span>
      </button>
    </div>
  );
}

export default function TicketsPage() {
  const [activeTab, setActiveTab] = useState<TicketsTab>("my-tickets");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTickets(loadTickets());
    setMounted(true);
  }, []);

  function handlePurchase(ticket: Ticket) {
    const updated = [ticket, ...tickets];
    setTickets(updated);
    saveTickets(updated);
    setActiveTab("my-tickets");
  }

  function handleScan(id: string) {
    const updated = tickets.map((t) =>
      t.id === id ? { ...t, status: "completed" as TicketStatus, scannedAt: new Date().toLocaleTimeString() } : t
    );
    setTickets(updated);
    saveTickets(updated);
  }

  if (!mounted) return null;

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
        {activeTab === "my-tickets" && (
          <MyTicketsTab tickets={tickets} onBuyTicket={() => setActiveTab("buy")} onScan={handleScan} />
        )}
        {activeTab === "buy" && <BuyTab onPurchase={handlePurchase} />}
      </div>
    </div>
  );
}
