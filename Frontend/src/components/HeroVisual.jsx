const HeroVisual = () => (
  <div className="relative w-full max-w-md mx-auto" aria-hidden="true">
    <svg
      viewBox="0 0 400 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <rect
        x="24"
        y="32"
        width="352"
        height="296"
        rx="16"
        fill="#18181f"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />
      <rect x="48" y="56" width="120" height="12" rx="6" fill="rgba(255,255,255,0.06)" />
      <rect x="48" y="80" width="80" height="8" rx="4" fill="rgba(255,255,255,0.04)" />

      {/* Stat cards row */}
      <rect x="48" y="112" width="96" height="72" rx="10" fill="#141419" stroke="rgba(255,255,255,0.06)" />
      <rect x="56" y="124" width="32" height="32" rx="8" fill="rgba(99,102,241,0.12)" />
      <rect x="56" y="164" width="56" height="8" rx="4" fill="rgba(255,255,255,0.08)" />

      <rect x="152" y="112" width="96" height="72" rx="10" fill="#141419" stroke="rgba(255,255,255,0.06)" />
      <rect x="160" y="124" width="32" height="32" rx="8" fill="rgba(99,102,241,0.12)" />
      <rect x="160" y="164" width="48" height="8" rx="4" fill="rgba(255,255,255,0.08)" />

      <rect x="256" y="112" width="96" height="72" rx="10" fill="#141419" stroke="rgba(255,255,255,0.06)" />
      <rect x="264" y="124" width="32" height="32" rx="8" fill="rgba(99,102,241,0.12)" />
      <rect x="264" y="164" width="64" height="8" rx="4" fill="rgba(255,255,255,0.08)" />

      {/* Chart area */}
      <rect x="48" y="200" width="140" height="112" rx="10" fill="#141419" stroke="rgba(255,255,255,0.06)" />
      <circle cx="118" cy="256" r="36" stroke="rgba(99,102,241,0.3)" strokeWidth="12" fill="none" />
      <circle
        cx="118"
        cy="256"
        r="36"
        stroke="#6366f1"
        strokeWidth="12"
        fill="none"
        strokeDasharray="80 226"
        strokeLinecap="round"
        transform="rotate(-90 118 256)"
      />

      {/* Expense list */}
      <rect x="200" y="200" width="152" height="32" rx="8" fill="#141419" stroke="rgba(255,255,255,0.06)" />
      <rect x="212" y="210" width="24" height="24" rx="6" fill="rgba(99,102,241,0.12)" />
      <rect x="244" y="212" width="64" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
      <rect x="244" y="224" width="40" height="6" rx="3" fill="rgba(255,255,255,0.04)" />

      <rect x="200" y="240" width="152" height="32" rx="8" fill="#141419" stroke="rgba(255,255,255,0.06)" />
      <rect x="212" y="250" width="24" height="24" rx="6" fill="rgba(34,197,94,0.12)" />
      <rect x="244" y="252" width="72" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
      <rect x="244" y="264" width="36" height="6" rx="3" fill="rgba(255,255,255,0.04)" />

      <rect x="200" y="280" width="152" height="32" rx="8" fill="#141419" stroke="rgba(255,255,255,0.06)" />
      <rect x="212" y="290" width="24" height="24" rx="6" fill="rgba(245,158,11,0.12)" />
      <rect x="244" y="292" width="56" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
      <rect x="244" y="304" width="44" height="6" rx="3" fill="rgba(255,255,255,0.04)" />

      {/* Accent glow */}
      <ellipse cx="200" cy="180" rx="160" ry="80" fill="rgba(99,102,241,0.06)" />
    </svg>
  </div>
)

export default HeroVisual
