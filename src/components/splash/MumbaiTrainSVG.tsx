export default function MumbaiTrainSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Tracks — perspective lines receding to center */}
      <g opacity="0.5">
        <line x1="90" y1="320" x2="120" y2="245" stroke="#a8b8cc" strokeWidth="2" />
        <line x1="190" y1="320" x2="160" y2="245" stroke="#a8b8cc" strokeWidth="2" />
        <line x1="70" y1="320" x2="110" y2="245" stroke="#7a8ea0" strokeWidth="1.5" />
        <line x1="210" y1="320" x2="170" y2="245" stroke="#7a8ea0" strokeWidth="1.5" />
        {/* Cross ties */}
        {[250, 260, 272, 286, 302, 320].map((y, i) => {
          const t = (y - 245) / 75;
          const left = 120 - t * 30;
          const right = 160 + t * 30;
          return (
            <line
              key={i}
              x1={left}
              y1={y}
              x2={right}
              y2={y}
              stroke="#7a8ea0"
              strokeWidth="1.5"
              opacity={0.4 + t * 0.3}
            />
          );
        })}
      </g>

      {/* Train body — front view of Mumbai local */}
      <g>
        {/* Main body rectangle */}
        <rect x="75" y="80" width="130" height="165" rx="8" fill="#e8e4dc" />

        {/* Roof — dark navy top */}
        <path
          d="M75 88 C75 80, 83 72, 91 72 L189 72 C197 72, 205 80, 205 88 L205 95 L75 95 Z"
          fill="#2a4a70"
        />

        {/* Blue stripe under roof */}
        <rect x="75" y="95" width="130" height="8" fill="#1b5fa0" />

        {/* Pantograph on roof */}
        <g stroke="#8aa0b8" strokeWidth="1.5" strokeLinecap="round">
          <line x1="140" y1="72" x2="140" y2="55" />
          <line x1="130" y1="55" x2="150" y2="55" />
          <line x1="130" y1="55" x2="125" y2="42" />
          <line x1="150" y1="55" x2="155" y2="42" />
          <line x1="120" y1="42" x2="160" y2="42" />
          <line x1="125" y1="42" x2="140" y2="32" />
          <line x1="155" y1="42" x2="140" y2="32" />
        </g>

        {/* Yellow front face */}
        <rect x="80" y="103" width="120" height="100" rx="4" fill="#e8a63c" />

        {/* Destination board — dark strip at top of yellow */}
        <rect x="95" y="108" width="90" height="14" rx="2" fill="#1f3a5f" />
        <text
          x="140"
          y="119"
          textAnchor="middle"
          fill="#f4ede0"
          fontSize="7"
          fontFamily="var(--font-body), Inter, sans-serif"
          fontWeight="600"
          letterSpacing="0.5"
        >
          MUMBAI LOCAL
        </text>

        {/* Two large front windows */}
        <rect x="88" y="128" width="44" height="42" rx="4" fill="#1f3a5f" />
        <rect x="148" y="128" width="44" height="42" rx="4" fill="#1f3a5f" />

        {/* Window reflections */}
        <rect x="91" y="131" width="12" height="20" rx="2" fill="#2a5580" opacity="0.5" />
        <rect x="151" y="131" width="12" height="20" rx="2" fill="#2a5580" opacity="0.5" />

        {/* Windshield wipers */}
        <line x1="110" y1="168" x2="100" y2="140" stroke="#4a6a8a" strokeWidth="1" opacity="0.4" />
        <line x1="170" y1="168" x2="180" y2="140" stroke="#4a6a8a" strokeWidth="1" opacity="0.4" />

        {/* Center divider / pillar */}
        <rect x="135" y="125" width="10" height="50" fill="#d4960e" />

        {/* Train number */}
        <rect x="118" y="176" width="44" height="12" rx="2" fill="#d4960e" />
        <text
          x="140"
          y="185"
          textAnchor="middle"
          fill="#1f3a5f"
          fontSize="7"
          fontFamily="var(--font-body), Inter, sans-serif"
          fontWeight="700"
        >
          5229C
        </text>

        {/* Lower body — purple/maroon stripe (WR livery) */}
        <rect x="75" y="203" width="130" height="22" fill="#7b3f7e" />

        {/* WR logo circles */}
        <circle cx="100" cy="214" r="8" fill="white" />
        <text
          x="100"
          y="217"
          textAnchor="middle"
          fill="#7b3f7e"
          fontSize="7"
          fontFamily="var(--font-body), Inter, sans-serif"
          fontWeight="800"
        >
          WR
        </text>
        <circle cx="180" cy="214" r="8" fill="white" />
        <text
          x="180"
          y="217"
          textAnchor="middle"
          fill="#7b3f7e"
          fontSize="7"
          fontFamily="var(--font-body), Inter, sans-serif"
          fontWeight="800"
        >
          WR
        </text>

        {/* Buffer / coupler at bottom */}
        <rect x="80" y="225" width="120" height="10" rx="2" fill="#c8bfb0" />
        <rect x="125" y="230" width="30" height="15" rx="3" fill="#a09890" />

        {/* Headlights */}
        <circle cx="92" cy="196" r="5" fill="#fffbe6" className="splash-headlight" />
        <circle cx="188" cy="196" r="5" fill="#fffbe6" className="splash-headlight" />
        <circle cx="92" cy="196" r="3" fill="#fff" />
        <circle cx="188" cy="196" r="3" fill="#fff" />

        {/* Headlight glow overlay */}
        <circle cx="92" cy="196" r="12" fill="#fffbe6" opacity="0" className="splash-headlight-glow" />
        <circle cx="188" cy="196" r="12" fill="#fffbe6" opacity="0" className="splash-headlight-glow" />

        {/* Side grab rails */}
        <line x1="77" y1="110" x2="77" y2="220" stroke="#c8bfb0" strokeWidth="2" strokeLinecap="round" />
        <line x1="203" y1="110" x2="203" y2="220" stroke="#c8bfb0" strokeWidth="2" strokeLinecap="round" />

        {/* Door handles */}
        <rect x="84" y="150" width="2" height="20" rx="1" fill="#a09890" />
        <rect x="194" y="150" width="2" height="20" rx="1" fill="#a09890" />
      </g>

      {/* Overhead wires */}
      <g stroke="#7a8ea0" strokeWidth="1" opacity="0.4">
        <line x1="0" y1="30" x2="280" y2="30" />
        <line x1="140" y1="30" x2="140" y2="32" />
      </g>
    </svg>
  );
}
