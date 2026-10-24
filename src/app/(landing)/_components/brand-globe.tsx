// The globe for the "Why choose us" brand tile: a still picture of the globe
// (rendered once from components/ui/globe) with connection lines drawn on top
// in SVG. No three.js, so it costs almost nothing. The lines glow softly.
// Covers the top-left part of the globe box, the only part the tile shows.

import Image from "next/image";

// One home point (Chennai) with dotted lines out to other cities on the
// visible part of the globe (picture is 720 x 720).
const HOME: [number, number] = [275, 430];
const CITIES: { at: [number, number]; lift: number }[] = [
  { at: [540, 232], lift: 80 },
  { at: [455, 318], lift: 50 },
  { at: [592, 326], lift: 70 },
];

/** Quadratic curve from a to b, lifted away from the globe (up and left). */
const curve = (
  [x1, y1]: [number, number],
  [x2, y2]: [number, number],
  lift: number,
) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return `M${x1} ${y1} Q${mx - lift * 0.6} ${my - lift} ${x2} ${y2}`;
};

const styles = `
  .bg-link { stroke-dasharray: 0 12; animation: bg-flow 1.6s linear infinite; }
  @keyframes bg-flow { to { stroke-dashoffset: -24; } }
  @media (prefers-reduced-motion: reduce) { .bg-link { animation: none; } }
`;

export function BrandGlobe() {
  return (
    <div className="absolute top-0 left-[9.1667%] h-[60%] w-[50%]">
      <style>{styles}</style>
      <Image
        src="/brand/globe-map.webp"
        alt=""
        fill
        sizes="(min-width: 1024px) 320px, 360px"
        className="object-cover"
      />
      <svg
        aria-hidden
        viewBox="0 0 720 720"
        className="absolute inset-0 size-full"
        fill="none"
      >
        {/* Dotted lines: round caps on zero-length dashes draw dots */}
        {CITIES.map(({ at, lift }, i) => (
          <path
            key={i}
            className="bg-link"
            d={curve(HOME, at, lift)}
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
            style={{ animationDelay: `${-i * 0.3}s` }}
          />
        ))}
        {CITIES.map(({ at: [x, y] }, i) => (
          <circle key={i} cx={x} cy={y} r="6" fill="#ffffff" />
        ))}
        {/* Home point, a little bigger with a soft ring */}
        <circle
          cx={HOME[0]}
          cy={HOME[1]}
          r="20"
          fill="#8EC5FF"
          opacity="0.35"
        />
        <circle cx={HOME[0]} cy={HOME[1]} r="9" fill="#ffffff" />
      </svg>
    </div>
  );
}
