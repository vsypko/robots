export function MenuBar({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <rect x="1.5" y="1" width={21} height={4} />
      <rect x="1.5" y="10" width={21} height={4} />
      <rect x="1.5" y="19" width={21} height={4} />
    </svg>
  );
}

export function Xmark({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <polygon points="4,1 12,9 20,1 23,4 15,12 23,20 20,23 12,15 4,23 1,20 9,12 1,4" />
    </svg>
  );
}

export function ArrowRight({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <polygon points="6,1 18,12 6,23" />
    </svg>
  );
}

export function WiFi({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path d="M1 6 A20 20 0 0 1 23 6" />
      <path d="M4 11 A14 14 0 0 1 20 11" />
      <path d="M7 16 A8 8 0 0 1 17 16" />
      <circle cx="12" cy="21" r="1" />
    </svg>
  );
}

export function Edit({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path d="M1 6 A20 20 0 0 1 23 6" />
      <path d="M4 11 A14 14 0 0 1 20 11" />
      <path d="M7 16 A8 8 0 0 1 17 16" />
      <circle cx="12" cy="21" r="1" />
    </svg>
  );
}

export function Delete({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path d="M1 6 A20 20 0 0 1 23 6" />
      <path d="M4 11 A14 14 0 0 1 20 11" />
      <path d="M7 16 A8 8 0 0 1 17 16" />
      <circle cx="12" cy="21" r="1" />
    </svg>
  );
}

export function ArrowLeft({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <polygon points="18,1 6,12 18,23" />
    </svg>
  );
}

export function ArrowUp({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <polygon points="1,16 12,4 23,16" />
    </svg>
  );
}

export function ArrowDown({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <polygon points="1,8 12,20 23,8" />
    </svg>
  );
}

export function Stop({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <rect x="1" y="1" width={21} height={21} />
    </svg>
  );
}

export function ArrowsExpand({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.2} stroke={color} fill="none">
      <polygon points="1,1 8,1 6,3 9,6 6,9 3,6 1,8" />
      <polygon points="23,1 23,8 21,6 18,9 15,6 18,3 16,1" />
      <polygon points="23,23 16,23 18,21 15,18 18,15 21,18 23,16" />
      <polygon points="1,23 1,16 3,18 6,15 9,18 6,21 8,23" />
    </svg>
  );
}

export function ArrowsNarrow({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.2} stroke={color} fill="none">
      <polygon points="9,9 2,9 4,7 1,4 4,1 7,4 9,2" />
      <polygon points="15,9 15,2 17,4 20,1 23,4 20,7 22,9" />
      <polygon points="15,15 22,15 20,17 23,20 20,23 17,20 15,22" />
      <polygon points="9,15 9,22 7,20 4,23 1,20 4,17 2,15" />
    </svg>
  );
}

export function TurnOff({ size = 16, color = "currentColor" }) {
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

export function Ok({ size = 16, color = "currentColor" }) {
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
