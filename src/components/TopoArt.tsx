/**
 * Deterministic topographic contour art.
 *
 * Generates nested, irregular contour rings from a string seed — used as
 * elegant placeholder imagery so the site needs no stock photography.
 * Pure function of `seed`, so server and client render identically.
 */

type Tone = "plum" | "estate" | "gold" | "sand";

const TONES: Record<Tone, { bg: string; line: string; accent: string }> = {
  plum: { bg: "#32254a", line: "#8d7bb0", accent: "#d4af37" },
  estate: { bg: "#24443a", line: "#7fa190", accent: "#d4af37" },
  gold: { bg: "#f4efe4", line: "#b08d2e", accent: "#46345e" },
  sand: { bg: "#e8dfcb", line: "#9c8f76", accent: "#24443a" },
};

/** Small deterministic PRNG (mulberry32). */
function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Build one smooth closed contour ring as an SVG path. */
function ring(
  cx: number,
  cy: number,
  radius: number,
  wobble: number[],
  amplitude: number,
) {
  const n = wobble.length;
  const pts = wobble.map((w, i) => {
    const angle = (i / n) * Math.PI * 2;
    const r = radius * (1 + amplitude * w);
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const;
  });
  // Catmull-Rom → cubic bezier for a smooth closed curve
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(2)} ${c1[1].toFixed(2)}, ${c2[0].toFixed(2)} ${c2[1].toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return d + " Z";
}

export function TopoArt({
  seed,
  tone = "plum",
  className,
}: {
  seed: string;
  tone?: Tone;
  className?: string;
}) {
  const rand = mulberry32(hashSeed(seed));
  const palette = TONES[tone];

  const cx = 55 + rand() * 90; // off-centre focal point
  const cy = 45 + rand() * 60;
  const points = 10;
  const wobble = Array.from({ length: points }, () => rand() * 2 - 1);
  const rings = 7;

  const paths = Array.from({ length: rings }, (_, i) => {
    // Each ring drifts slightly so contours are not perfectly concentric
    const drift = i * 3;
    return ring(
      cx + drift * (rand() - 0.5),
      cy + drift * (rand() - 0.5),
      14 + i * 13,
      wobble.map((w, j) => w * 0.75 + (rand() * 0.5 - 0.25) * (j % 2 ? 1 : -1)),
      0.16,
    );
  });

  return (
    <svg
      viewBox="0 0 200 150"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Topographic contour illustration"
    >
      <rect width="200" height="150" fill={palette.bg} />
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={palette.line}
          strokeWidth={i === 3 ? 0.9 : 0.45}
          opacity={0.85 - i * 0.08}
        />
      ))}
      {/* Survey benchmark at the focal point */}
      <g stroke={palette.accent} strokeWidth="0.9">
        <line x1={cx - 4} y1={cy} x2={cx + 4} y2={cy} />
        <line x1={cx} y1={cy - 4} x2={cx} y2={cy + 4} />
        <circle cx={cx} cy={cy} r="2.2" fill="none" />
      </g>
    </svg>
  );
}
