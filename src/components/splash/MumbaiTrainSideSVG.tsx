export default function MumbaiTrainSideSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Train body — side profile of Mumbai local EMU */}
      <g>
        {/* Main body shell */}
        <rect x="20" y="30" width="480" height="110" rx="12" fill="#e8e4dc" />

        {/* Roof — dark navy curved top */}
        <path
          d="M20 42 C20 30, 32 20, 44 20 L476 20 C488 20, 500 30, 500 42 L500 50 L20 50 Z"
          fill="#2a4a70"
        />

        {/* Blue stripe under roof */}
        <rect x="20" y="50" width="480" height="8" fill="#1b5fa0" />

        {/* Yellow body band */}
        <rect x="20" y="58" width="480" height="55" fill="#e8a63c" />

        {/* Destination board */}
        <rect x="35" y="63" width="90" height="14" rx="2" fill="#1f3a5f" />
        <text
          x="80"
          y="74"
          textAnchor="middle"
          fill="#f4ede0"
          fontSize="7"
          fontFamily="var(--font-body), Inter, sans-serif"
          fontWeight="600"
          letterSpacing="0.4"
        >
          CHURCHGATE
        </text>

        {/* Windows — row of rectangular windows */}
        {[145, 190, 235, 310, 355, 400].map((x, i) => (
          <g key={i}>
            <rect x={x} y="63" width="30" height="35" rx="3" fill="#1f3a5f" />
            <rect x={x + 2} y={65} width="8" height="16" rx="1.5" fill="#2a5580" opacity="0.4" />
          </g>
        ))}

        {/* Door openings — wider, between window groups */}
        <rect x="270" y="58" width="32" height="72" rx="2" fill="#d4960e" />
        <rect x="275" y="63" width="22" height="62" rx="2" fill="#1f3a5f" opacity="0.7" />

        {/* Door 2 */}
        <rect x="440" y="58" width="32" height="72" rx="2" fill="#d4960e" />
        <rect x="445" y="63" width="22" height="62" rx="2" fill="#1f3a5f" opacity="0.7" />

        {/* Purple/maroon WR stripe */}
        <rect x="20" y="113" width="480" height="18" fill="#7b3f7e" />

        {/* WR logos on stripe */}
        <circle cx="80" cy="122" r="7" fill="white" />
        <text x="80" y="125" textAnchor="middle" fill="#7b3f7e" fontSize="6" fontWeight="800"
          fontFamily="var(--font-body), Inter, sans-serif">WR</text>

        <circle cx="260" cy="122" r="7" fill="white" />
        <text x="260" y="125" textAnchor="middle" fill="#7b3f7e" fontSize="6" fontWeight="800"
          fontFamily="var(--font-body), Inter, sans-serif">WR</text>

        <circle cx="440" cy="122" r="7" fill="white" />
        <text x="440" y="125" textAnchor="middle" fill="#7b3f7e" fontSize="6" fontWeight="800"
          fontFamily="var(--font-body), Inter, sans-serif">WR</text>

        {/* Lower body panel */}
        <rect x="20" y="131" width="480" height="9" rx="0" fill="#c8bfb0" />

        {/* Wheels / bogies */}
        {[70, 110, 400, 440].map((cx, i) => (
          <g key={i}>
            <circle cx={cx} cy="148" r="10" fill="#4a4a4a" />
            <circle cx={cx} cy="148" r="6" fill="#6a6a6a" />
            <circle cx={cx} cy="148" r="2" fill="#4a4a4a" />
          </g>
        ))}

        {/* Bogie frames */}
        <rect x="55" y="140" width="70" height="4" rx="2" fill="#5a5a5a" />
        <rect x="385" y="140" width="70" height="4" rx="2" fill="#5a5a5a" />

        {/* Coupler at front (left side) */}
        <rect x="5" y="118" width="18" height="10" rx="3" fill="#a09890" />

        {/* Headlight on front end */}
        <circle cx="22" cy="100" r="4" fill="#fffbe6" />
        <circle cx="22" cy="100" r="2.5" fill="#fff" />

        {/* Pantograph on roof */}
        <g stroke="#8aa0b8" strokeWidth="1.5" strokeLinecap="round">
          <line x1="250" y1="20" x2="250" y2="8" />
          <line x1="240" y1="8" x2="260" y2="8" />
          <line x1="240" y1="8" x2="235" y2="-2" />
          <line x1="260" y1="8" x2="265" y2="-2" />
          <line x1="230" y1="-2" x2="270" y2="-2" />
        </g>

        {/* Grab rails along side */}
        <line x1="20" y1="56" x2="500" y2="56" stroke="#c8bfb0" strokeWidth="1.5" />

        {/* Train number */}
        <rect x="140" y="118" width="40" height="9" rx="1.5" fill="#5a2a5e" />
        <text x="160" y="125" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="700"
          fontFamily="var(--font-body), Inter, sans-serif">5229C</text>

        {/* Rail line beneath */}
        <line x1="0" y1="158" x2="520" y2="158" stroke="#7a8ea0" strokeWidth="2" opacity="0.5" />
        <line x1="0" y1="162" x2="520" y2="162" stroke="#7a8ea0" strokeWidth="1" opacity="0.3" />
      </g>

      {/* Overhead wire */}
      <g stroke="#7a8ea0" strokeWidth="1" opacity="0.35">
        <line x1="0" y1="-8" x2="520" y2="-8" />
        <line x1="250" y1="-8" x2="250" y2="-2" />
      </g>
    </svg>
  );
}
