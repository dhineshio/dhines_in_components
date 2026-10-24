// Hero right side: diagonal glass bands in the Threadstack brand blues, with
// thin accent lines, dot patches and soft light. Static SVG (animation later).
// Drawn on a 1000 x 1000 canvas; every band runs at 45 degrees, so each one is
// a long rectangle inside a group rotated by -45deg.

import { cn } from "@/lib/utils";

const S = 1000;

/** Bands along the diagonal: offset across the diagonal, length, width. */
const BANDS: {
  x: number; // position across the diagonal (rotated space)
  y: number; // start along the diagonal
  len: number;
  w: number;
  fill: string;
  opacity: number;
}[] = [
  // Wide pale glass sheets (back)
  { x: 420, y: -120, len: 1100, w: 260, fill: "url(#hs-pale)", opacity: 0.9 },
  { x: 760, y: 80, len: 900, w: 220, fill: "url(#hs-pale)", opacity: 0.7 },
  // Main bright band (upper)
  { x: 520, y: 40, len: 520, w: 120, fill: "url(#hs-blue)", opacity: 1 },
  // Lower bright band
  { x: 760, y: 560, len: 560, w: 70, fill: "url(#hs-deep)", opacity: 1 },
  // Violet band on the far right
  { x: 900, y: 260, len: 600, w: 110, fill: "url(#hs-violet)", opacity: 0.75 },
  // Light sky band, bottom right
  { x: 980, y: 640, len: 500, w: 120, fill: "url(#hs-sky)", opacity: 0.8 },
];

/** Thin lines along the diagonal. */
const LINES: {
  x: number;
  y: number;
  len: number;
  color: string;
  w: number;
  o: number;
}[] = [
  { x: 640, y: -200, len: 820, color: "#2A2FD9", w: 2, o: 0.85 },
  { x: 470, y: 520, len: 420, color: "#2A2FD9", w: 2, o: 0.8 },
  { x: 700, y: 760, len: 360, color: "#2A2FD9", w: 1.6, o: 0.75 },
  { x: 600, y: 200, len: 260, color: "#FFFFFF", w: 2, o: 0.9 },
  { x: 860, y: 600, len: 420, color: "#FFFFFF", w: 1.6, o: 0.8 },
  { x: 380, y: 300, len: 700, color: "#A9C2FF", w: 1.2, o: 0.6 },
];

export function HeroShards({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${S} ${S}`}
      preserveAspectRatio="xMaxYMid slice"
      className={cn("pointer-events-none", className)}
    >
      <defs>
        {/* Gradients run across each band (left -> right in rotated space) */}
        <linearGradient id="hs-pale" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#EEF3FF" stopOpacity="0" />
          <stop offset="0.5" stopColor="#E3EBFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#F4F1FF" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="hs-blue" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#BFD6FF" stopOpacity="0.4" />
          <stop offset="0.45" stopColor="#3B82F6" />
          <stop offset="0.8" stopColor="#2F5BFF" />
          <stop offset="1" stopColor="#5B3BF0" />
        </linearGradient>
        <linearGradient id="hs-deep" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#0A84FF" />
          <stop offset="0.6" stopColor="#2F5BFF" />
          <stop offset="1" stopColor="#4338CA" />
        </linearGradient>
        <linearGradient id="hs-violet" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#C7B8FF" stopOpacity="0.2" />
          <stop offset="1" stopColor="#7B61FF" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="hs-sky" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#E0ECFF" stopOpacity="0.3" />
          <stop offset="1" stopColor="#8EC5FF" />
        </linearGradient>
        {/* Bands fade out at both ends along the diagonal */}
        <linearGradient id="hs-ends" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.18" stopColor="#fff" />
          <stop offset="0.82" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="hs-ends-mask" maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill="url(#hs-ends)" />
        </mask>
        <pattern
          id="hs-dots"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.4" fill="#93A8D8" />
        </pattern>
        <radialGradient id="hs-glow">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.35" stopColor="#CFE0FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#CFE0FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft wash behind everything */}
      <rect width={S} height={S} fill="#F7F9FF" opacity="0.6" />

      {/* Dot patches */}
      <rect
        x="560"
        y="360"
        width="220"
        height="260"
        fill="url(#hs-dots)"
        opacity="0.55"
      />
      <rect
        x="700"
        y="840"
        width="200"
        height="140"
        fill="url(#hs-dots)"
        opacity="0.45"
      />

      {/* Diagonal bands and lines (rotated space: y runs up-right) */}
      <g transform={`rotate(45 ${S / 2} ${S / 2})`}>
        {BANDS.map((b, i) => (
          <rect
            key={i}
            x={b.x - b.w / 2}
            y={b.y}
            width={b.w}
            height={b.len}
            rx="6"
            fill={b.fill}
            opacity={b.opacity}
            mask="url(#hs-ends-mask)"
          />
        ))}
        {LINES.map((l, i) => (
          <rect
            key={i}
            x={l.x}
            y={l.y}
            width={l.w}
            height={l.len}
            fill={l.color}
            opacity={l.o}
            mask="url(#hs-ends-mask)"
          />
        ))}
      </g>

      {/* Light flare where the main band ends */}
      <ellipse cx="560" cy="470" rx="120" ry="14" fill="url(#hs-glow)" />
    </svg>
  );
}
