export function MenuBar({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <rect x="1.5" y="1" width={21} height={4} />
      <rect x="1.5" y="10" width={21} height={4} />
      <rect x="1.5" y="19" width={21} height={4} />
    </svg>
  );
}

export function Xmark({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <polygon points="4,1 12,9 20,1 23,4 15,12 23,20 20,23 12,15 4,23 1,20 9,12 1,4" />
    </svg>
  );
}

export function ArrowRight({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <polygon points="6,1 18,12 6,23" />
    </svg>
  );
}

export function WiFi({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path d="M1 6 A20 20 0 0 1 23 6" />
      <path d="M4 11 A14 14 0 0 1 20 11" />
      <path d="M7 16 A8 8 0 0 1 17 16" />
      <circle cx="12" cy="21" r="1" />
    </svg>
  );
}

export function Edit({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path d="M1 6 A20 20 0 0 1 23 6" />
      <path d="M4 11 A14 14 0 0 1 20 11" />
      <path d="M7 16 A8 8 0 0 1 17 16" />
      <circle cx="12" cy="21" r="1" />
    </svg>
  );
}

export function Delete({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path d="M1 6 A20 20 0 0 1 23 6" />
      <path d="M4 11 A14 14 0 0 1 20 11" />
      <path d="M7 16 A8 8 0 0 1 17 16" />
      <circle cx="12" cy="21" r="1" />
    </svg>
  );
}

export function ArrowLeft({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <polygon points="18,1 6,12 18,23" />
    </svg>
  );
}

export function ArrowUp({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <polygon points="1,16 12,4 23,16" />
    </svg>
  );
}

export function ArrowDown({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <polygon points="1,8 12,20 23,8" />
    </svg>
  );
}

export function Stop({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <rect x="1" y="1" width={21} height={21} />
    </svg>
  );
}

export function ArrowsExpand({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.2} stroke={color} fill="none">
      <polygon points="1,1 8,1 6,3 9,6 6,9 3,6 1,8" />
      <polygon points="23,1 23,8 21,6 18,9 15,6 18,3 16,1" />
      <polygon points="23,23 16,23 18,21 15,18 18,15 21,18 23,16" />
      <polygon points="1,23 1,16 3,18 6,15 9,18 6,21 8,23" />
    </svg>
  );
}

export function ArrowsNarrow({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.2} stroke={color} fill="none">
      <polygon points="9,9 2,9 4,7 1,4 4,1 7,4 9,2" />
      <polygon points="15,9 15,2 17,4 20,1 23,4 20,7 22,9" />
      <polygon points="15,15 22,15 20,17 23,20 20,23 17,20 15,22" />
      <polygon points="9,15 9,22 7,20 4,23 1,20 4,17 2,15" />
    </svg>
  );
}

export function TurnOff({ size = 16, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="2" x2="12" y2="12" />
      <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
    </svg>
  );
}

export function Ok({ size = 16, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="8 12 12 17 17 9" />
    </svg>
  );
}

export function SiteIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      // fill="none"
      // stroke={color}
      // strokeWidth="2.5"
      // strokeLinecap="round"
      // strokeLinejoin="round"
      className={className}
    >
      <line x1="1" y1="63" x2="63" y2="63" strokeWidth={2} strokeLinecap="round" />
      <path d="M28 63 l4 -54 h5 l4 54 m-3 -34 h-7 m-1 10 h9 m1 10 h-11 z" strokeWidth={2} fill="#20a050" />
      <rect x="2" y="54" width={4} height={8} strokeWidth={2} fill="none" />
      <rect x="8" y="59" width={20} height={4} strokeWidth={2} fill="none" />
      <path d="M10 59 l6 -25 h4 l6 25" strokeWidth={2} />
      <path d="M14 44 h7 l-8 8 h10 l-10 -9 " strokeWidth={2} />

      <line x1="4" y1="34" x2="4" y2="75" strokeWidth={2} transform="translate(0, 3)" />
      <g transform="rotate(20 18 36)">
        <rect x="9" y="32" width={18} height={2} strokeWidth={2} stroke="#703030" />
        <path d="M5 24 c-5 4 -1 17 2 20 h2 c-1 -5 -3 -5 -1 -20 z" strokeWidth={2} fill="#20a050" stroke="#703030" />
      </g>

      <path
        d="m39 16 a0.5 0.5 0 0 1 0.5 0.5 v1 a0.5 0.5 0 0 1 -0.5 0.5 h-9 a0.5 0.5 0 0 1 -0.5 -0.5 v-1 a0.5 0.5 0 0 1 0.5 -0.5 Z"
        strokeWidth={2}
        fill="currentColor"
      />

      <path strokeWidth={2} fill="#20a050" d="M34 62 v-2 a 1 1 0 0 1 1 -1 h22 a 1 1 0 0 1 1 1 v2 z" />
      <path
        fill="#2050B0"
        strokeWidth={2}
        d="M36 59 v-5 a1 1 0 0 1 0 -2 v-4 a1 1 0 0 1 0 -2 v-4 a8 8 0 0 1 8 -8 v-2 h4 v2 a8 8 0 0 1 8 8 v4 a1 1 0 0 1 0 2 v4 a1 1 0 0 1 0 2 v5 z"
      />

      <path d="M46 39 c-18 21 18 21 0 0 Z" fill="white" strokeWidth={1} />
      <path d="M43 46 c-5 8 7 11 0 0" fill="#2050B0" strokeWidth={1} />
      <path d="M46 32 v-3 a4 4 0 0 1 4 -4 h2 a4 4 0 0 1 4 4 v14 h3 a3 3 0 0 1 3 3 v17" strokeWidth={2} />
    </svg>
  );
}

export function ReportsIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} stroke="currentColor">
      <line x1="6" y1="5" x2="30" y2="5" strokeWidth={2} strokeLinecap="round" />
      <line x1="6" y1="10" x2="30" y2="10" strokeWidth={2} strokeLinecap="round" />
      <line x1="6" y1="15" x2="30" y2="15" strokeWidth={2} strokeLinecap="round" />
      <path d="M63 8 v54 a2 2 0 0 1 -2 2 h-58 a2 2 0 0 1 -2 -2 v-60 a2 2 0 0 1 2 -2 h50 l10 8 l-8 0 a2 2 0 0 1 -2 -2 v-6" />
      <path d="M41 35 a14 14 1 1 0 20 14 h-14 z" />
      <path d="M42 33 a14 14 0 0 1 7 -0.5 l-2 14 z" />
      <path d="M51 33 a14 14 0 0 1 8 6 l-11 8 z" />
      <path d="M60 40 a14 14 0 0 1 2 8 l-13 0 z" />
      <path d="M6 56 a2 2 1 1 0 2 0.5 l6 -15 a2 2 0 1 1 2 1 l4 8 a2 2 1 1 0 2 0 l10 -16 a2 2 0 1 1 0.5 0.5" />
    </svg>
  );
}
