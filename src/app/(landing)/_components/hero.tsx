import { Reveal as AnimatedContent } from "@/components/reveal";
import { ArrowRight, Box, ChartNoAxesColumn, ShieldCheck } from "lucide-react";

const TAGS = ["Software", "SaaS", "AI Solutions"];

const HEADING = "Technology that moves your";
const HEADING_ACCENT = "business forward.";

const FEATURES = [
  {
    icon: Box,
    title: "Custom Software",
    text: "Built around your needs",
    color: "text-[#0A84FF]",
  },
  {
    icon: ChartNoAxesColumn,
    title: "Scalable Solutions",
    text: "Designed to grow",
    color: "text-[#2F5BFF]",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Support",
    text: "With you at every step",
    color: "text-[#5B3BF0]",
  },
];

// The blue accent in the heading gets a soft shine that repeats (not a
// reveal). Still for reduced motion.
const styles = `
  .hero-shine {
    background:
      linear-gradient(100deg, transparent 40%, rgba(255, 255, 255, 0.6) 50%, transparent 60%) 120% 0 / 250% 100% no-repeat,
      linear-gradient(90deg, #0A84FF, #2F5BFF 50%, #5B3BF0);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    /* one soft pass, then a pause, on repeat */
    animation: hero-shine 5s ease-in-out 1.2s infinite;
  }
  @keyframes hero-shine { 0% { background-position: 120% 0, 0 0; } 35%, 100% { background-position: -20% 0, 0 0; } }
  @media (prefers-reduced-motion: reduce) {
    .hero-shine { animation: none; }
  }
`;

// React Bits AnimatedContent is the only reveal: each block fades and rises
// into place on load, one after another.
// Opacity + movement only: animating a blur filter is costly and made the
// first frames stutter.
const REVEAL = {
  trigger: "mount",
  distance: 24,
  duration: 0.9,
  ease: "power3.out",
} as const;

export function Hero() {
  return (
    <section className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl flex-1 px-6 pt-12 pb-[calc(min(700px,150vw)*0.23+1.5rem)] md:px-10 md:pt-16 lg:pb-0">
      <style>{styles}</style>
      <div className="pointer-events-auto max-w-2xl">
        {/* Small label */}
        <AnimatedContent {...REVEAL} delay={0}>
          <p className="flex flex-wrap items-center gap-x-3 text-[11px] font-medium tracking-[0.25em] text-slate-500 uppercase">
            {TAGS.map((tag, i) => (
              <span key={tag} className="flex items-center gap-3">
                {i > 0 && <span className="size-1 rounded-full bg-slate-400" />}
                {tag}
              </span>
            ))}
          </p>
        </AnimatedContent>

        <AnimatedContent {...REVEAL} delay={0.1}>
          <h1 className="mt-6 text-4xl leading-[1.08] font-medium tracking-tight text-slate-950 md:text-[3.5rem]">
            {HEADING} <span className="hero-shine">{HEADING_ACCENT}</span>
          </h1>
        </AnimatedContent>

        <AnimatedContent {...REVEAL} delay={0.2}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
            We build scalable SaaS products, custom software, and AI-powered
            solutions for businesses and non-profit organisations.
          </p>
        </AnimatedContent>

        {/* Actions */}
        <AnimatedContent
          {...REVEAL}
          delay={0.3}
          className="mt-8 flex flex-wrap items-center gap-7"
        >
          <a
            href="#services"
            className="group inline-flex items-center gap-3 rounded-lg bg-slate-950 px-6 py-3 text-[15px] text-white transition-colors hover:bg-slate-800"
          >
            Our services
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#work"
            className="border-b border-slate-300 pb-1 text-[15px] text-slate-900 transition-colors hover:border-slate-900"
          >
            See our work
          </a>
        </AnimatedContent>

        {/* Features */}
        <AnimatedContent
          {...REVEAL}
          delay={0.4}
          stagger={0.08}
          role="list"
          className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-slate-200"
        >
          {FEATURES.map(({ icon: Icon, title, text, color }) => (
            <div
              key={title}
              role="listitem"
              className="flex items-start gap-4 sm:px-6 sm:first:pl-0"
            >
              <Icon
                className={`mt-0.5 size-6 shrink-0 stroke-[1.5] ${color}`}
              />
              <div>
                <p className="text-sm text-slate-700">{title}</p>
                <p className="mt-1 text-xs text-slate-500">{text}</p>
              </div>
            </div>
          ))}
        </AnimatedContent>
      </div>
    </section>
  );
}
