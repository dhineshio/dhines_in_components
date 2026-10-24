// "Why choose us": a header row and four tiles of the same height:
// brand tile with a 3D globe, testimonial, projects count (with a fan of real
// project screenshots) and a satisfaction stat with faces travelling around a circle.
//
// PLACEHOLDERS to replace with real content: the testimonial (quote, name,
// role) and the "98%" number.

import Image from "next/image";
import { ArrowRight, CornerDownRight, Star } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { BrandGlobe } from "./brand-globe";

const THUMBS = [
  "/projects/skillup-languages-screen.webp",
  "/projects/topgrade-screen.webp",
  "/projects/agamagizh-screen.webp",
  "/projects/sri-karpom-karpipom-screen.webp",
  "/projects/a11ydigitech-screen.webp",
  "/projects/rvr-engineering-portal.webp",
];

// Each column gets different projects, so the same one never sits side by side.
const COLUMNS = [
  THUMBS.filter((_, i) => i % 2 === 0),
  THUMBS.filter((_, i) => i % 2 === 1),
];

// Faces that travel around a circle, evenly spaced. Free stock portraits
// from Unsplash (not real clients) - replace with real client photos.
const LOGOS = [1, 2, 3, 4, 5, 6].map((n) => `/people/person-${n}.webp`);

// Each face appears twice on the ring, so the gaps between them are small.
const RING = [...LOGOS, ...LOGOS];

// The ring turns; each logo turns the other way at the same speed, so it
// stays upright.
const ringStyles = `
  .why-ring { animation: why-spin 24s linear infinite; }
  .why-logo { animation: why-spin 24s linear infinite reverse; }
  @keyframes why-spin { to { transform: rotate(360deg); } }
  /* Screenshot columns: move by half (one copy plus its gap) and loop */
  .why-col { animation: why-up 30s linear infinite; }
  .why-col-down { animation-direction: reverse; }
  .group:hover .why-col { animation-play-state: paused; }
  @keyframes why-up { to { transform: translateY(calc(-50% - 6px)); } }
  @media (prefers-reduced-motion: reduce) {
    .why-ring, .why-logo, .why-col { animation: none; }
  }
`;

const tile = "relative min-h-[420px] overflow-hidden rounded-3xl";

export function WhySection() {
  return (
    <section
      id="about"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-14 md:px-10"
    >
      <style>{ringStyles}</style>
      {/* Header row */}
      <Reveal
        distance={30}
        duration={0.8}
        threshold={0.15}
        className="flex items-center justify-between border-b border-slate-200 pb-6"
      >
        <p className="flex items-center gap-2 text-sm font-medium tracking-[0.15em] text-slate-900 uppercase">
          <CornerDownRight className="size-4 text-[#2F5BFF]" />
          Why choose us
        </p>
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 border-b border-slate-300 pb-1 text-[15px] text-slate-900 transition-colors hover:border-slate-900"
        >
          Contact us
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </Reveal>

      {/* Tiles reveal one by one on scroll */}
      <Reveal
        role="list"
        distance={50}
        duration={0.8}
        stagger={0.12}
        threshold={0.1}
        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {/* 1. Gradient tile: text on top, a big globe in the bottom-right
            corner */}
        <div
          role="listitem"
          className={`${tile} bg-gradient-to-br from-[#0A84FF] via-[#2F5BFF] to-[#5B3BF0] p-7 text-white`}
        >
          <p className="relative z-10 text-xl font-semibold tracking-tight">
            Built in Chennai, used everywhere
          </p>
          <p className="relative z-10 mt-2 leading-relaxed text-white/80">
            We work with teams across India and abroad, online and on time.
          </p>
          {/* The globe is much bigger than the tile; only its top-left part
              shows. */}
          <div className="absolute top-[36%] left-[-22%] aspect-[1.2] w-[210%]">
            <BrandGlobe />
          </div>
        </div>

        {/* 2. Testimonial (placeholder text) */}
        <figure
          role="listitem"
          className={`${tile} flex flex-col bg-slate-50 p-7`}
        >
          <div className="flex gap-1 text-[#2F5BFF]" aria-label="5 out of 5">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
          </div>
          <blockquote className="mt-5 text-lg leading-relaxed text-slate-600">
            Working with the team was smooth from start to finish. They{" "}
            <strong className="font-semibold text-slate-900">
              understood what we needed and delivered on time
            </strong>
            , and the product works well for our users.
          </blockquote>
          <figcaption className="mt-auto border-l-2 border-[#2F5BFF]/40 pt-8 pl-4">
            <p className="font-medium text-slate-950">Client name</p>
            <p className="mt-0.5 text-sm text-slate-500">Role, Company</p>
          </figcaption>
        </figure>

        {/* 3. Projects delivered: big gradient number, and a tilted wall of
            real project screenshots in two columns that scroll slowly in
            opposite directions (pauses on hover) */}
        <div
          role="listitem"
          className={`${tile} group border border-[#2F5BFF]/15 bg-[radial-gradient(ellipse_at_80%_100%,#DCE6FF_0%,transparent_60%),linear-gradient(180deg,#F5F7FF,#EEF2FF)] p-7`}
        >
          <p className="relative z-10 bg-gradient-to-r from-[#0A84FF] via-[#2F5BFF] to-[#5B3BF0] bg-clip-text text-6xl font-semibold tracking-tight text-transparent">
            18+
          </p>
          <p className="relative z-10 mt-2 text-slate-600">
            Projects delivered
          </p>

          <div className="absolute inset-x-0 bottom-0 h-[64%] [mask-image:linear-gradient(to_bottom,transparent,#000_30%)] [perspective:900px]">
            <div className="absolute inset-[-20%_-10%] flex gap-3 [transform:rotateX(28deg)_rotateZ(-14deg)]">
              {COLUMNS.map((col, c) => (
                <div
                  key={c}
                  className={`why-col flex w-1/2 flex-col gap-3 ${c ? "why-col-down" : ""}`}
                >
                  {/* Two copies so the loop has no gap */}
                  {[...col, ...col].map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg border-2 border-white bg-white shadow-[0_10px_24px_-12px_rgba(47,91,255,0.45)]"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="160px"
                        className="object-cover object-left-top"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Satisfaction + client logos on an arc */}
        <div role="listitem" className={`${tile} bg-slate-50 p-7`}>
          <p className="bg-gradient-to-r from-[#0A84FF] via-[#2F5BFF] to-[#5B3BF0] bg-clip-text text-6xl font-semibold tracking-tight text-transparent">
            98%
          </p>
          <p className="mt-2 text-slate-600">Client satisfaction rate</p>
          {/* Ring centered near the bottom-right corner, so about half of it
              shows. Logos sit at equal angles around it. */}
          <div className="absolute right-[-90px] bottom-[-90px] size-[260px]">
            <div className="absolute inset-0 rounded-full border border-dashed border-[#2F5BFF]/30" />
            <div className="why-ring absolute inset-0">
              {RING.map((src, i) => (
                <span
                  key={i}
                  className="absolute top-1/2 left-1/2 size-14"
                  style={{
                    // Place on the circle: turn to the angle, then move out.
                    transform: `translate(-50%, -50%) rotate(${(360 / RING.length) * i}deg) translateY(-130px) rotate(${-(360 / RING.length) * i}deg)`,
                  }}
                >
                  <span className="why-logo relative block size-full overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_8px_20px_-10px_rgba(15,23,42,0.25)]">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
