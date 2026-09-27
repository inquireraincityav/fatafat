export default function AppIcon({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="20" fill="#1F3A5F" />
      {/* Train body */}
      <rect x="18" y="22" width="44" height="30" rx="10" fill="#E8A63C" />
      {/* Windows */}
      <rect x="23" y="28" width="12" height="10" rx="3" fill="#1F3A5F" />
      <rect x="38" y="28" width="12" height="10" rx="3" fill="#1F3A5F" />
      {/* Front light */}
      <rect x="54" y="33" width="4" height="4" rx="2" fill="#FBF7EF" opacity="0.8" />
      {/* Wheels */}
      <circle cx="28" cy="56" r="4" fill="#E8A63C" />
      <circle cx="52" cy="56" r="4" fill="#E8A63C" />
      {/* Wheel inner */}
      <circle cx="28" cy="56" r="1.5" fill="#1F3A5F" />
      <circle cx="52" cy="56" r="1.5" fill="#1F3A5F" />
      {/* Track */}
      <line x1="12" y1="60" x2="68" y2="60" stroke="#E8A63C" strokeWidth="1.5" opacity="0.4" />
      {/* Speed lines */}
      <line x1="10" y1="30" x2="16" y2="30" stroke="#FBF7EF" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <line x1="8" y1="36" x2="15" y2="36" stroke="#FBF7EF" strokeWidth="1" opacity="0.2" strokeLinecap="round" />
      <line x1="10" y1="42" x2="16" y2="42" stroke="#FBF7EF" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}
