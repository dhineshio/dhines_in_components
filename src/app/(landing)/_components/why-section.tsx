// "Why choose us": a header row and four tiles of the same height:
// brand tile with a 3D globe, testimonial, projects count (with a fan of real
// project screenshots) and a satisfaction stat with faces travelling around a circle.
//
// PLACEHOLDERS to replace with real content: the testimonial (quote, name,
// role) and the "98%" number.

import Image from "next/image";
import { ArrowRight, CornerDownRight, Star } from "lucide-react";
import { BrandGlobe } from "./brand-globe";

const THUMBS = [
  "/projects/skillup-languages-screen.webp",
  "/projects/topgrade-screen.webp",
  "/projects/agamagizh-screen.webp",
  "/projects/sri-karpom-karpipom-screen.webp",
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
  @media (prefers-reduced-motion: reduce) {
    .why-ring, .why-logo { animation: none; }
  }
`;

// Resting and hover positions of the three fanned screenshots (back to front).
const FAN = [
  "-translate-x-[88%] -translate-y-[6%] -rotate-[10deg] group-hover:-translate-x-[104%] group-hover:-rotate-[16deg]",
  "-translate-x-[12%] -translate-y-[6%] rotate-[10deg] group-hover:translate-x-[4%] group-hover:rotate-[16deg]",
  "-translate-x-1/2 -translate-y-[14%] group-hover:-translate-y-[26%]",
];

const tile = "relative min-h-[420px] overflow-hidden rounded-3xl";

export function WhySection() {
  return (
    <section
      id="about"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-14 md:px-10"
    >
      {/* Header row */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <p className="flex items-center gap-2 text-sm font-medium tracking-[0.15em] text-slate-900 uppercase">
          <CornerDownRight className="size-4 text-slate-400" />
          Why choose us
        </p>
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 border-b border-slate-300 pb-1 text-[15px] text-slate-900 transition-colors hover:border-slate-900"
        >
          Contact us
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* 1. Gradient tile: text on top, a big globe in the bottom-right
            corner */}
        <div
          className={`${tile} bg-gradient-to-br from-[#3f5fb5] via-[#7c5cf0] to-[#db5fa8] p-7 text-white`}
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
        <figure className={`${tile} flex flex-col bg-slate-50 p-7`}>
          <div className="flex gap-1 text-slate-900" aria-label="5 out of 5">
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
          <figcaption className="mt-auto border-l-2 border-slate-200 pt-8 pl-4">
            <p className="font-medium text-slate-950">Client name</p>
            <p className="mt-0.5 text-sm text-slate-500">Role, Company</p>
          </figcaption>
        </figure>

        {/* 3. Projects delivered: big gradient number, and a fan of real
            project screenshots that spreads out on hover */}
        <div
          className={`${tile} group border border-slate-900/10 bg-[#F3EFFF] p-7`}
        >
          <p className="bg-gradient-to-r from-[#3f5fb5] via-[#7c5cf0] to-[#db5fa8] bg-clip-text text-6xl font-semibold tracking-tight text-transparent">
            18+
          </p>
          <p className="mt-2 text-slate-600">Projects delivered</p>

          <div className="absolute inset-x-0 bottom-0 h-[52%]">
            {THUMBS.slice(0, 3).map((src, i) => (
              <div
                key={src}
                className={`absolute bottom-[-8%] left-1/2 aspect-[16/10] w-[62%] origin-bottom overflow-hidden rounded-xl border-4 border-white bg-white shadow-[0_14px_30px_-14px_rgba(15,23,42,0.45)] transition-transform duration-500 ease-out motion-reduce:transition-none ${FAN[i]}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="240px"
                  className="object-cover object-left-top"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 4. Satisfaction + client logos on an arc */}
        <div className={`${tile} bg-slate-50 p-7`}>
          <p className="text-5xl font-medium tracking-tight text-slate-950">
            98%
          </p>
          <p className="mt-2 text-slate-600">Client satisfaction rate</p>
          {/* Ring centered near the bottom-right corner, so about half of it
              shows. Logos sit at equal angles around it. */}
          <style>{ringStyles}</style>
          <div className="absolute right-[-90px] bottom-[-90px] size-[260px]">
            <div className="absolute inset-0 rounded-full border border-dashed border-slate-300" />
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
      </div>
    </section>
  );
}
