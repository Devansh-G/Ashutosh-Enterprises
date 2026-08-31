/**
 * Inline SVG icons — avoids an icon-library dependency and keeps the bundle small.
 * All are 24x24, stroke-based, and inherit `currentColor`.
 */
type IconProps = { className?: string };

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-6 w-6"}
      aria-hidden="true"
      {...strokeProps}
    >
      {children}
    </svg>
  );
}

export const PhoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.5 3h3l1.5 4-2 1.5a11 11 0 005.5 5.5L16 12l4 1.5v3a2 2 0 01-2.2 2A16.5 16.5 0 014 6.2 2 2 0 016.5 3z" />
  </Svg>
);

export const WhatsAppIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" className={p.className ?? "h-6 w-6"} aria-hidden="true" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.13a8.2 8.2 0 01-4.18-1.15l-.3-.18-3.11.82.83-3.04-.19-.31a8.2 8.2 0 01-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 4.54 0 8.23 3.7 8.23 8.23 0 4.54-3.7 8.22-8.26 8.22zm4.52-6.16c-.25-.12-1.47-.72-1.69-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.83-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2s.86 2.32.98 2.48c.12.17 1.7 2.6 4.12 3.64.58.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.42-.58 1.62-1.15.2-.56.2-1.05.14-1.15-.06-.1-.22-.16-.47-.28z" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
    <path d="M3 6l9 6.5L21 6" />
  </Svg>
);

export const PinIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const CheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 12.5l5 5 10-11" />
  </Svg>
);

export const MenuIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const CloseIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
);

export const TruckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2.5 7.5h10v9h-10zM12.5 11h4l3 3v2.5h-7z" />
    <circle cx="6" cy="18" r="1.6" />
    <circle cx="16.5" cy="18" r="1.6" />
  </Svg>
);

export const TagIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12.6 2.7H21v8.4l-9.3 9.3a1.5 1.5 0 01-2.1 0L3.3 14a1.5 1.5 0 010-2.1z" />
    <circle cx="17" cy="7" r="1.4" />
  </Svg>
);

export const ShieldIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 2.8l7.5 3v6c0 4.6-3.2 8-7.5 9.4C7.7 19.8 4.5 16.4 4.5 11.8v-6z" />
    <path d="M9 12l2.2 2.2L15.5 10" />
  </Svg>
);

export const BoltIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M13.5 2.5L5 13.5h5l-1 8 8.5-11h-5z" />
  </Svg>
);

export const GearIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2.5v2.6M12 18.9v2.6M4.6 4.6l1.9 1.9M17.5 17.5l1.9 1.9M2.5 12h2.6M18.9 12h2.6M4.6 19.4l1.9-1.9M17.5 6.5l1.9-1.9" />
  </Svg>
);

export const HeadsetIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 13v-1a8 8 0 1116 0v1" />
    <path d="M4 13h2.5v5H5a1 1 0 01-1-1zM20 13h-2.5v5H19a1 1 0 001-1z" />
    <path d="M17.5 18v.5a2.5 2.5 0 01-2.5 2.5h-2" />
  </Svg>
);

export const GlobeIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3.2 9.5h17.6M3.2 14.5h17.6M12 3a15 15 0 000 18M12 3a15 15 0 010 18" />
  </Svg>
);

export const CalendarIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
  </Svg>
);
