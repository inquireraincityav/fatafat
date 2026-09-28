"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, TicketsIcon, ExploreIcon } from "@/components/icons";
import type { NavTab } from "@/types";

const tabs: { id: NavTab; label: string; href: string }[] = [
  { id: "home", label: "Home", href: "/home" },
  { id: "tickets", label: "Tickets", href: "/tickets" },
  { id: "explore", label: "Explore", href: "/explore" },
];

const iconMap: Record<NavTab, typeof HomeIcon> = {
  home: HomeIcon,
  tickets: TicketsIcon,
  explore: ExploreIcon,
};

export default function BottomNav() {
  const pathname = usePathname();

  function isActive(tab: NavTab): boolean {
    if (tab === "home") return pathname === "/home" || pathname === "/";
    return pathname.startsWith(`/${tab}`);
  }

  return (
    <nav className="bg-cream-50 border-t-[1.119px] border-border-dark flex items-center shrink-0"
      style={{ paddingTop: "8px", paddingBottom: "max(8px, env(safe-area-inset-bottom, 8px))" }}
    >
      {tabs.map((tab) => {
        const active = isActive(tab.id);
        const Icon = iconMap[tab.id];
        return (
          <Link
            key={tab.id}
            href={tab.href}
            className="flex flex-col gap-[2px] items-center px-[24px] py-[4px] flex-1 active:scale-[0.92] transition-transform duration-150"
          >
            <Icon
              className="w-[22px] h-[22px]"
              color={active ? "#e8a63c" : "#a09890"}
            />
            <span
              className={`font-medium text-[10px] leading-[15px] text-center ${
                active ? "text-amber-500" : "text-text-muted"
              }`}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
