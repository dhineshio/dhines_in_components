// Decorative "orbit" art for the right side of a hero: two thin orbit lines,
// dotted orbit arcs, vertical stems with dots, glowing nodes and scattered
// dots. Drawn on a 952 x 995 canvas (same as the design reference) and
// scaled to fit its box.
//
// Animation (CSS only, calm): dots flow along the dotted arcs, small light
// signals travel along the thin lines and stems, the big nodes pulse and the
// scattered dots twinkle. Everything stops for reduced motion.

import type React from "react";
import { cn } from "@/lib/utils";

const W = 952;
const H = 995;

const LINE = "#c9cfe0"; // thin line color
const DOT = "#3f5fb5"; // dot / node color
const OPACITY = 0.8; // overall strength of the whole art (0..1)

/** Thin solid orbit lines. */
const LINES = [
  // Left side of the orbit: down through the left node to the bottom stem.
  "M 58 170 C 40 360, 150 590, 340 700 C 420 740, 480 750, 545 748",
  // Right side: from the top, through the big node, down the right edge.
  "M 470 165 C 600 250, 690 360, 745 470 C 810 610, 835 790, 830 995",
];

/** Dotted orbit arcs: path, dot size, gap between dots, opacity. */
const ARCS: { d: string; size: number; gap: number; opacity: number }[] = [
  // Top arc, from the top-left corner toward the big node.
  {
    d: "M 25 86 C 320 105, 540 250, 690 410",
    size: 3.2,
    gap: 15,
    opacity: 0.55,
  },
  // Main diagonal arc, out to the right edge.
  {
    d: "M 128 238 C 330 300, 520 430, 640 560 C 720 645, 820 720, 952 775",
    size: 4,
    gap: 17,
    opacity: 0.85,
  },
  // Inner left arc, from the top-left dot down to the bottom stem.
  {
    d: "M 125 98 C 118 300, 220 500, 400 650 C 450 690, 500 725, 545 742",
    size: 2.6,
    gap: 11,
    opacity: 0.45,
  },
  // Lower inner arc.
  {
    d: "M 228 478 C 330 560, 430 690, 625 795",
    size: 3.2,
    gap: 16,
    opacity: 0.7,
  },
  // Faint inner arcs.
  {
    d: "M 200 168 C 400 260, 560 400, 600 560",
    size: 2.2,
    gap: 12,
    opacity: 0.3,
  },
  {
    d: "M 280 380 C 400 420, 520 520, 560 640",
    size: 2.2,
    gap: 12,
    opacity: 0.25,
  },
];

/** Vertical stems with dots on them. ring = small light ring around a dot. */
const STEMS: {
  x: number;
  y1: number;
  y2: number;
  dots: { y: number; faint?: boolean }[];
}[] = [
  { x: 389, y1: 0, y2: 474, dots: [{ y: 195 }, { y: 474, faint: true }] },
  { x: 705, y1: 424, y2: 838, dots: [{ y: 661 }] },
  { x: 515, y1: 570, y2: 960, dots: [{ y: 747 }] },
];

/** Big glowing nodes. */
const NODES = [
  { x: 705, y: 424, r: 13 },
  { x: 124, y: 471, r: 8 }, // sits on the left orbit line
];

/** Scattered dots: x, y, radius, opacity, ring. */
const SCATTER: [number, number, number, number, boolean?][] = [
  [127, 97, 3, 0.85],
  [129, 237, 3, 0.85],
  [272, 235, 4, 1],
  [553, 500, 3.5, 1],
  [372, 637, 3, 0.9],
  [624, 794, 3, 0.9],
  [703, 227, 3, 0.9],
  [680, 286, 3, 0.55, true],
  [376, 839, 3.5, 0.7, true],
  [571, 190, 2, 0.35],
  [235, 835, 2, 0.3],
];

const styles = `
  .oa-flow { animation: oa-flow linear infinite; }
  .oa-signal { animation: oa-signal linear infinite; }
  .oa-pulse { transform-box: fill-box; transform-origin: center; animation: oa-pulse 3.2s ease-in-out infinite; }
  .oa-twinkle { animation: oa-twinkle ease-in-out infinite alternate; }
  /* --period = one dot + one gap, so the loop is seamless */
  @keyframes oa-flow { to { stroke-dashoffset: calc(var(--period) * -1); } }
  @keyframes oa-signal { from { stroke-dashoffset: 1.1; } to { stroke-dashoffset: -0.1; } }
  @keyframes oa-pulse { 50% { transform: scale(1.35); opacity: 0.55; } }
  @keyframes oa-twinkle { from { opacity: 1; } to { opacity: 0.25; } }
  @media (prefers-reduced-motion: reduce) {
    .oa-flow, .oa-signal, .oa-pulse, .oa-twinkle { animation: none; }
    .oa-signal { opacity: 0; }
  }
`;

/** A small light that travels along a path (path is normalized to 1). */
function Signal({
  d,
  duration,
  delay = 0,
}: {
  d: string;
  duration: number;
  delay?: number;
}) {
  return (
    <path
      d={d}
      pathLength={1}
      className="oa-signal"
      style={{
        animationDuration: `${duration}s`,
        animationDelay: `${-delay}s`,
      }}
      fill="none"
      stroke={DOT}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeDasharray="0.04 1.1"
      strokeDashoffset="1.1"
      opacity="0.7"
    />
  );
}

/** A dot with a small light ring around it. */
function RingDot({
  x,
  y,
  r,
  opacity = 1,
}: {
  x: number;
  y: number;
  r: number;
  opacity?: number;
}) {
  return (
    <g opacity={opacity}>
      <circle cx={x} cy={y} r={r * 2} fill={DOT} opacity="0.12" />
      <circle cx={x} cy={y} r={r} fill={DOT} />
    </g>
  );
}

export function OrbitArt({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${W} ${H}`}
      className={cn("pointer-events-none", className)}
      opacity={OPACITY}
    >
      <style>{styles}</style>
      <defs>
        <radialGradient id="orbit-halo">
          <stop offset="0" stopColor={DOT} stopOpacity="0.14" />
          <stop offset="0.7" stopColor={DOT} stopOpacity="0.08" />
          <stop offset="1" stopColor={DOT} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Thin orbit lines */}
      <g fill="none" stroke={LINE} strokeWidth="1.6">
        {LINES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      {/* Signals travelling along the thin lines */}
      {LINES.map((d, i) => (
        <Signal key={d} d={d} duration={9 + i * 3} delay={i * 4} />
      ))}

      {/* Dotted orbit arcs */}
      <g fill="none" stroke={DOT} strokeLinecap="round">
        {ARCS.map(({ d, size, gap, opacity }, i) => (
          <path
            key={d}
            d={d}
            strokeWidth={size}
            strokeDasharray={`0.1 ${gap}`}
            opacity={opacity}
            className="oa-flow"
            style={
              {
                "--period": `${gap + 0.1}px`,
                // Different speed per arc; every other arc flows backwards.
                animationDuration: `${1.4 + i * 0.35}s`,
                animationDirection: i % 2 ? "reverse" : "normal",
              } as React.CSSProperties
            }
          />
        ))}
      </g>

      {/* Vertical stems with dots */}
      {STEMS.map(({ x, y1, y2, dots }) => (
        <g key={x}>
          <line x1={x} x2={x} y1={y1} y2={y2} stroke={LINE} strokeWidth="1.6" />
          <Signal
            d={`M ${x} ${y1} L ${x} ${y2}`}
            duration={5 + (x % 3)}
            delay={x % 5}
          />
          {dots.map(({ y, faint }) => (
            <RingDot key={y} x={x} y={y} r={5} opacity={faint ? 0.5 : 1} />
          ))}
        </g>
      ))}

      {/* Glowing nodes */}
      {NODES.map(({ x, y, r }) => (
        <g key={`${x}-${y}`}>
          <circle
            cx={x}
            cy={y}
            r={r * 3.5}
            fill="url(#orbit-halo)"
            className="oa-pulse"
            style={{ animationDelay: `${-x / 300}s` }}
          />
          <circle cx={x} cy={y} r={r} fill={DOT} />
        </g>
      ))}

      {/* Scattered dots */}
      {SCATTER.map(([x, y, r, o, ring], i) => (
        <g
          key={`${x}-${y}`}
          className="oa-twinkle"
          style={{
            animationDuration: `${2.5 + (i % 4) * 0.7}s`,
            animationDelay: `${-i * 0.6}s`,
          }}
        >
          {ring ? (
            <RingDot x={x} y={y} r={r} opacity={o} />
          ) : (
            <circle cx={x} cy={y} r={r} fill={DOT} opacity={o} />
          )}
        </g>
      ))}
    </svg>
  );
}
