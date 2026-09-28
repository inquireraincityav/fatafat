export default function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex justify-center bg-cream-100"
      style={{ height: "100dvh" }}
    >
      <div className="w-full max-w-[402px] h-full flex flex-col overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}
