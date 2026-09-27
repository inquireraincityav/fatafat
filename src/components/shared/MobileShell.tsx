export default function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[402px] h-dvh flex flex-col bg-cream-100 relative overflow-hidden">
      {children}
    </div>
  );
}
