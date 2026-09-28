import Image from "next/image";

export default function AppIcon({ size = 80 }: { size?: number }) {
  return (
    <Image
      src="/icons/app-icon-v3.png"
      alt="Fatafat"
      width={size}
      height={size}
      priority
    />
  );
}
