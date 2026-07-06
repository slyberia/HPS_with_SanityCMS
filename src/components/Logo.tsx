export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      {/* Contour rings */}
      <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="1" />
      <path
        d="M20 6.5c8 0 12.5 6 12.5 13.5S28 33.5 20 33.5 8.5 28 7.5 20 12 6.5 20 6.5Z"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.55"
      />
      <path
        d="M20 11c5.2 0 8.5 4 8.5 9s-3.3 9-8.5 9-8-3.5-8.7-9c-0.6-5 3.5-9 8.7-9Z"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.4"
      />
      {/* Benchmark cross in gold */}
      <g stroke="#b08d2e" strokeWidth="1.4">
        <line x1="20" y1="14.5" x2="20" y2="25.5" />
        <line x1="14.5" y1="20" x2="25.5" y2="20" />
      </g>
      <circle cx="20" cy="20" r="2.6" stroke="#b08d2e" strokeWidth="1.2" />
    </svg>
  );
}

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark
        className={`h-9 w-9 ${light ? "text-gold-pale" : "text-plum"}`}
      />
      <span className="leading-none">
        <span
          className={`block font-display text-[1.35rem] font-semibold tracking-wide ${
            light ? "text-cream" : "text-ink"
          }`}
        >
          HPS
        </span>
        <span className="block text-[0.55rem] font-semibold uppercase tracking-luxe text-gold">
          Geospatial
        </span>
      </span>
    </span>
  );
}
