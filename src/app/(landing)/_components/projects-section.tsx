// Project showcase as a bento grid: rounded, tinted tiles of mixed sizes that
// lock together in one block. Each tile has the category and name on top and
// the screenshot inside, rising from the bottom (or on the right for wide
// tiles).
//
// lg layout (4 columns, 4 rows):
//   [ big  big ] [ wide  wide ]
//   [ big  big ] [ small][small]
//   [ tall ][ wide  wide ][small]
//   [ tall ][small][ wide  wide ]

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type Project } from "@/constants/projects";
import { cn } from "@/lib/utils";

type Size = "big" | "wide" | "tall" | "small";

/**
 * The tiles, in grid order: which project goes in each slot, the slot's size
 * and its tint. To move a project, move its id to another slot.
 * imageLeft (wide tiles): put the image on the left and the text on the right.
 */
type Slide = "up" | "down" | "left" | "right";

const SLOTS: {
  id: string;
  size: Size;
  tint: string;
  /** Direction the screenshot slides on hover. */
  slide: Slide;
  imageLeft?: boolean;
}[] = [
  { id: "skillup-languages", size: "big", tint: "bg-[#F3EFFF]", slide: "up" },
  { id: "a11y-alt-product", size: "wide", tint: "bg-[#EEF3FF]", slide: "left" }, // top-right
  {
    id: "sri-karpom-karpipom",
    size: "small",
    tint: "bg-[#EEF3FF]",
    slide: "up",
  },
  { id: "rvr-engineering", size: "small", tint: "bg-[#FDEFF7]", slide: "up" },
  { id: "topgrade-app", size: "tall", tint: "bg-[#FFF3EA]", slide: "up" },
  { id: "topgrade", size: "wide", tint: "bg-[#FFF3EA]", slide: "left" }, // middle
  { id: "topgrade-admin", size: "small", tint: "bg-[#F3EFFF]", slide: "down" },
  { id: "a11y-digitech", size: "small", tint: "bg-[#F5F5F7]", slide: "up" },
  { id: "agamagizh", size: "wide", tint: "bg-[#FDEFF7]", slide: "left" }, // bottom-right
];

const SLIDE: Record<Slide, string> = {
  up: "group-hover:-translate-y-3",
  down: "group-hover:translate-y-3",
  left: "group-hover:-translate-x-3",
  right: "group-hover:translate-x-3",
};

// Hover border: a ring of the theme colors runs around the tile.
// Drawn on ::after with a mask so only a thin border shows.
const styles = `
  @property --bento-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
  .bento-tile::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 20;
    pointer-events: none;
    border-radius: inherit;
    padding: 2px;
    background: conic-gradient(
      from var(--bento-angle),
      transparent 0%, #4F74E0 12%, #7C5CF0 24%, #DB5FA8 36%, transparent 48%,
      transparent 50%, #4F74E0 62%, #7C5CF0 74%, #DB5FA8 86%, transparent 98%
    );
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
    opacity: 0;
    transition: opacity 0.4s ease;
    animation: bento-spin 4s linear infinite;
  }
  .bento-tile:hover::after, .bento-tile:focus-visible::after { opacity: 1; }
  @keyframes bento-spin { to { --bento-angle: 360deg; } }
  @media (prefers-reduced-motion: reduce) {
    .bento-tile::after { animation: none; }
  }
`;

const SPAN: Record<Size, string> = {
  big: "lg:col-span-2 lg:row-span-2",
  wide: "lg:col-span-2",
  tall: "lg:row-span-2",
  small: "",
};

function Tile({
  project,
  size,
  tint,
  slide,
  imageLeft = false,
}: {
  project: Project;
  size: Size;
  tint: string;
  slide: Slide;
  imageLeft?: boolean;
}) {
  const wide = size === "wide";
  const big = size === "big";

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "bento-tile group relative flex overflow-hidden rounded-3xl border border-slate-900/10",
        tint,
        SPAN[size],
        // Wide tiles: text left, image right (lg). Others: text top, image below.
        wide
          ? imageLeft
            ? "flex-col lg:flex-row-reverse"
            : "flex-col lg:flex-row"
          : "flex-col",
      )}
    >
      {/* Text */}
      <div
        className={cn(
          "relative z-10 shrink-0",
          big ? "p-7 lg:p-8" : "p-6",
          wide && "lg:w-[42%] lg:self-center",
        )}
      >
        <p className="text-[11px] font-medium tracking-[0.2em] text-slate-500 uppercase">
          {project.category}
        </p>
        <h3
          className={cn(
            "mt-2 font-semibold tracking-tight text-slate-950",
            big ? "text-3xl" : "text-xl",
          )}
        >
          {project.name}
        </h3>
        {(big || wide || size === "tall") && (
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            {project.tagline}
          </p>
        )}
      </div>

      {/* Screenshot */}
      <div
        className={cn(
          "relative min-h-0 flex-1",
          // Below lg every tile is stacked, so give the image a fixed shape.
          "aspect-[16/10] lg:aspect-auto",
          wide ? "lg:my-5 lg:mr-0 lg:ml-0" : "mx-5 lg:mx-6",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 overflow-hidden shadow-[0_10px_40px_-18px_rgba(15,23,42,0.35)] transition-transform duration-500 ease-out motion-reduce:transition-none",
            SLIDE[slide],
            wide
              ? imageLeft
                ? "rounded-r-xl"
                : "rounded-l-xl"
              : "rounded-t-xl",
          )}
        >
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            fill
            sizes={
              big
                ? "(min-width: 1024px) 560px, 100vw"
                : "(min-width: 1024px) 340px, 100vw"
            }
            className={cn(
              "object-cover",
              // Anchored to the left edge of the screenshot. The tall tile is
              // nudged right a little so the phone sits in the middle.
              size === "tall" ? "object-[12%_0%]" : "object-left-top",
            )}
          />
        </div>
      </div>

      {/* Arrow, top-right */}
      <span className="absolute top-5 right-5 z-10 grid size-9 place-items-center rounded-full bg-white/90 text-slate-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <ArrowUpRight className="size-4" />
      </span>
    </a>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="work"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-14 md:px-10"
    >
      <style>{styles}</style>
      {/* Heading */}
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-medium tracking-[0.25em] text-slate-500 uppercase">
          Our work
        </p>
        <h2 className="mt-4 text-4xl leading-[1.1] font-semibold tracking-tight text-slate-950 md:text-5xl">
          Projects we&apos;ve{" "}
          <span className="bg-gradient-to-r from-[#3f5fb5] via-[#7c5cf0] to-[#db5fa8] bg-clip-text text-transparent">
            built and shipped.
          </span>
        </h2>
        <p className="mt-4 text-slate-500">
          Websites, portals, products and mobile apps for education, NGOs and
          growing businesses.
        </p>
      </div>

      <div className="mt-12 grid grid-flow-dense gap-4 sm:grid-cols-2 lg:auto-rows-[250px] lg:grid-cols-4">
        {SLOTS.map(({ id, size, tint, slide, imageLeft }) => {
          const project = PROJECTS.find((p) => p.id === id);
          return project ? (
            <Tile
              key={id}
              project={project}
              size={size}
              tint={tint}
              slide={slide}
              imageLeft={imageLeft}
            />
          ) : null;
        })}
      </div>
    </section>
  );
}
