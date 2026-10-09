import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import {
  ParticleWaves,
  waveColors,
  type WaveTheme,
} from "@/components/particle-waves";

const SERVICES: {
  title: string;
  text: string;
  theme: WaveTheme;
  href: string;
  image?: string;
  /**
   * Size and position of the image. Each picture has different empty space
   * around its object, so these values make the visible objects the same size
   * (fit a 245x185 box at a 278px card) and sit 24px above the card bottom.
   */
  imageClass?: string;
}[] = [
  {
    title: "Web & SaaS Development",
    text: "Modern, scalable and high-performing web applications.",
    theme: "blue",
    href: "#web",
    image: "/web-developement.png",
    imageClass: "bottom-[11px] w-[100%] translate-x-[calc(-50%+5px)]",
  },
  {
    title: "Mobile App Development",
    text: "Android & iOS apps for businesses and communities.",
    theme: "violet",
    href: "#mobile",
    image: "/app-developement.png",
    imageClass: "bottom-0 w-[122%] translate-x-[calc(-50%-14px)]",
  },
  {
    title: "AI & Automation",
    text: "AI-powered tools to automate and enhance your work.",
    theme: "rose",
    href: "#ai",
    image: "/ai-solutions.png",
    imageClass: "bottom-[6px] w-[110%] translate-x-[calc(-50%-2px)]",
  },
];

// Hover border: a ring of the card's own colors spins around the edge.
// Drawn on ::before with a mask so only a thin border shows.
const styles = `
  @property --svc-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
  .svc-card::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 20;
    pointer-events: none;
    border-radius: inherit;
    padding: 1.5px;
    background: conic-gradient(
      from var(--svc-angle),
      transparent 0%, var(--c1) 12%, var(--c2) 24%, var(--c3) 36%, transparent 48%,
      transparent 50%, var(--c1) 62%, var(--c2) 74%, var(--c3) 86%, transparent 98%
    );
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
    opacity: 0;
    transition: opacity 0.4s ease;
    animation: svc-spin 4s linear infinite;
  }
  .svc-card:hover::before, .svc-card:focus-visible::before { opacity: 1; }
  @keyframes svc-spin { to { --svc-angle: 360deg; } }
  @media (prefers-reduced-motion: reduce) {
    .svc-card::before { animation: none; }
  }
`;

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-6 py-20 md:px-10 lg:grid-cols-[1fr_3fr] lg:gap-8"
    >
      <style>{styles}</style>
      {/* Intro */}
      <div className="lg:pt-6">
        <p className="text-[11px] font-medium tracking-[0.25em] text-slate-500 uppercase">
          Our services
        </p>
        <h2 className="mt-5 text-4xl leading-[1.1] font-medium tracking-tight text-slate-950">
          Digital solutions for{" "}
          <span className="text-[#3f5fb5]">real impact.</span>
        </h2>
        <p className="mt-5 leading-relaxed text-slate-500">
          We design and build technology solutions that help businesses and
          non-profits work better, faster and smarter.
        </p>
        <a
          href="#services"
          className="group mt-8 inline-flex items-center gap-3 rounded-lg bg-slate-950 px-6 py-3 text-[15px] text-white transition-colors hover:bg-slate-800"
        >
          Explore all services
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(({ title, text, theme, href, image, imageClass }) => (
          <a
            key={title}
            href={href}
            style={
              {
                "--c1": waveColors(theme)[0],
                "--c2": waveColors(theme)[1],
                "--c3": waveColors(theme)[2],
              } as CSSProperties
            }
            className="svc-card group relative flex min-h-[400px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-shadow hover:shadow-[0_20px_50px_-25px_rgba(63,95,181,0.35)]"
          >
            <div className="relative z-10 flex items-start justify-between gap-4">
              <h3 className="text-2xl leading-tight font-medium tracking-tight text-slate-950">
                {title}
              </h3>
              <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-[#3f5fb5] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <ArrowUpRight className="size-5" />
              </span>
            </div>
            <p className="relative z-10 mt-3 max-w-[16rem] leading-relaxed text-slate-500">
              {text}
            </p>

            {/* Particle wave background, lower part of the card */}
            <ParticleWaves
              theme={theme}
              className="absolute inset-x-0 bottom-0 h-[70%] w-full"
            />
            {image && (
              <Image
                src={image}
                alt=""
                width={1536}
                height={1024}
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 65vw, 135vw"
                className={`absolute left-1/2 z-0 max-w-none object-contain ${imageClass ?? ""}`}
              />
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
