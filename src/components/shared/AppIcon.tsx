import Image from "next/image";

export default function AppIcon({ size = 80 }: { size?: number }) {
  return (
    <Image
      src="/icons/app-icon.png"
      alt="Fatafat"
      width={size}
      height={size}
      className="rounded-[22%]"
      priority
    />
  );
}
