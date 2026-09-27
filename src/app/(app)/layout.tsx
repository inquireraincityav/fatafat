import BottomNav from "@/components/shared/BottomNav";
import MobileShell from "@/components/shared/MobileShell";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <MobileShell>
      <div className="flex-1 flex flex-col overflow-y-auto min-h-0"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        {children}
      </div>
      <BottomNav />
    </MobileShell>
  );
}
