// Flowing ribbon of dotted lines (like particles in a wave) with a soft glow
// behind it. Pure SVG, drawn on a 400 x 400 canvas and scaled to cover its box.
// Each theme has its own colors and wave shape.
//
// Animation (CSS only, calm): dots travel along each line at slightly
// different speeds (a soft shimmer), the ribbon sways up and down a little and
// the glow breathes. Everything is still for reduced motion.

import { cn } from "@/lib/utils";

const SIZE = 400;
const LINES = 30;

export type WaveTheme =
  "blue" | "violet" | "rose" | "indigo" | "sky" | "red" | "aurora";

const THEMES: Record<
  WaveTheme,
  {
    colors: [string, string, string];
    glow: string;
    tilt: number;
    phase: number;
    flip?: boolean;
  }
> = {
  blue: {
    colors: ["#60a5fa", "#6366f1", "#a78bfa"],
    glow: "#c7d2fe",
    tilt: 1,
    phase: 0,
  },
  violet: {
    colors: ["#a78bfa", "#c084fc", "#f0abfc"],
    glow: "#e9d5ff",
    tilt: 0.7,
    phase: 1.6,
  },
  rose: {
    colors: ["#fb923c", "#f472b6", "#f9a8d4"],
    glow: "#fbcfe8",
    tilt: 0.9,
    phase: 3.1,
    flip: true,
  },
  indigo: {
    colors: ["#818cf8", "#8b5cf6", "#c084fc"],
    glow: "#ddd6fe",
    tilt: 0.85,
    phase: 0.8,
  },
  sky: {
    colors: ["#38bdf8", "#3b82f6", "#818cf8"],
    glow: "#bae6fd",
    tilt: 0.75,
    phase: 2.3,
    flip: true,
  },
  red: {
    colors: ["#fb7185", "#f43f5e", "#c084fc"],
    glow: "#fecdd3",
    tilt: 0.95,
    phase: 4.2,
  },
  // Wide blue -> purple -> pink wave for section backgrounds.
  aurora: {
    // Threadstack brand: bright blue -> royal blue -> violet
    colors: ["#0A84FF", "#2F5BFF", "#5B3BF0"],
    glow: "#dbe6ff",
    tilt: 0.6,
    phase: 0.4,
  },
};

const DASH = "0.1 6";
const PERIOD = 6.1; // one dot + one gap, so the flow loops seamlessly

const styles = `
  .pw-flow { animation: pw-flow linear infinite; }
  @media (max-width: 1023px) { .pw-flow { animation: none; } }
  .pw-sway { animation: pw-sway 7s ease-in-out infinite alternate; }
  .pw-glow { animation: pw-glow 6s ease-in-out infinite alternate; }
  @keyframes pw-flow { to { stroke-dashoffset: -${PERIOD}; } }
  @keyframes pw-sway { from { transform: translateY(6px); } to { transform: translateY(-10px); } }
  @keyframes pw-glow { from { opacity: 0.85; } to { opacity: 1; } }
  @media (prefers-reduced-motion: reduce) {
    .pw-flow, .pw-sway, .pw-glow { animation: none; }
  }
`;

/** The three colors of a theme (also used for matching UI, like borders). */
export const waveColors = (theme: WaveTheme) => THEMES[theme].colors;

/** One wavy line across the canvas. t = 0..1 picks the line inside the ribbon. */
function wavePath(t: number, tilt: number, phase: number) {
  let d = "";
  for (let x = -20; x <= SIZE + 20; x += 8) {
    const k = x / SIZE;
    const base = 330 - tilt * k * 170; // rises toward the right
    const spread = 30 + 150 * k; // ribbon fans out toward the right
    const wave = 34 * Math.sin(x / 75 + phase + t * 2.4);
    const y = base + (t - 0.5) * spread + wave;
    d += `${d ? "L" : "M"}${x} ${y.toFixed(1)}`;
  }
  return d;
}

export function ParticleWaves({
  theme,
  className,
}: {
  theme: WaveTheme;
  className?: string;
}) {
  const { colors, glow, tilt, phase, flip } = THEMES[theme];
  const id = `waves-${theme}`;
  const lines = Array.from({ length: LINES }, (_, i) => i / (LINES - 1));

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("pointer-events-none", className)}
    >
      <defs>
        <linearGradient
          id={`${id}-stroke`}
          x1="0"
          x2={SIZE}
          y1="0"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={colors[0]} />
          <stop offset="0.5" stopColor={colors[1]} />
          <stop offset="1" stopColor={colors[2]} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.55" cy="0.65" r="0.5">
          <stop offset="0" stopColor={glow} stopOpacity="1" />
          <stop offset="1" stopColor={glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      <style>{styles}</style>
      <g transform={flip ? `translate(${SIZE} 0) scale(-1 1)` : undefined}>
        <rect
          width={SIZE}
          height={SIZE}
          fill={`url(#${id}-glow)`}
          className="pw-glow"
        />
        <g
          fill="none"
          stroke={`url(#${id}-stroke)`}
          strokeLinecap="round"
          strokeWidth="2.4"
          strokeDasharray={DASH}
          className="pw-sway"
          style={{ animationDelay: `${-phase * 2}s` }}
        >
          {lines.map((t, i) => (
            <path
              key={t}
              d={wavePath(t, tilt, phase)}
              opacity={0.3 + 0.65 * Math.sin(Math.PI * t)}
              className="pw-flow"
              // Slightly different speed per line = soft shimmer.
              style={{ animationDuration: `${0.9 + (i % 5) * 0.15}s` }}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
