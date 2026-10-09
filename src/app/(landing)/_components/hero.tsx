import type { CSSProperties } from "react";
import { ArrowRight, Box, ChartNoAxesColumn, ShieldCheck } from "lucide-react";

const TAGS = ["Software", "SaaS", "AI Solutions"];

const HEADING = "Technology that moves your";
const HEADING_ACCENT = "business forward.";

const FEATURES = [
  {
    icon: Box,
    title: "Custom Software",
    text: "Built around your needs",
    color: "text-blue-500",
  },
  {
    icon: ChartNoAxesColumn,
    title: "Scalable Solutions",
    text: "Designed to grow",
    color: "text-violet-500",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Support",
    text: "With you at every step",
    color: "text-pink-500",
  },
];

// Entrance animation (CSS only), "mask reveal": heading words slide up out of
// an invisible line (each word is clipped by its own box), and the rest fades
// in and rises a little, one after another. The blue accent gets a soft shine
// that repeats. Everything is still for reduced motion.
const styles = `
  .hero-in {
    opacity: 0;
    animation: hero-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    animation-delay: var(--d, 0s);
  }
  .hero-mask {
    display: inline-block;
    overflow: hidden;
    vertical-align: top;
    padding-bottom: 0.08em; /* room for descenders (y, g) */
  }
  .hero-word {
    display: inline-block;
    transform: translateY(110%);
    animation: hero-word 0.9s cubic-bezier(0.65, 0, 0.35, 1) forwards;
    animation-delay: var(--d, 0s);
  }
  .hero-shine {
    /* shine layer on top of a blue -> purple -> pink gradient */
    background:
      linear-gradient(100deg, transparent 40%, rgba(255, 255, 255, 0.6) 50%, transparent 60%) 120% 0 / 250% 100% no-repeat,
      linear-gradient(90deg, #3f5fb5, #7c5cf0 55%, #db5fa8);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    /* one soft pass, then a pause, on repeat */
    animation: hero-shine 5s ease-in-out infinite;
    animation-delay: var(--d, 0s);
  }
  @keyframes hero-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
  @keyframes hero-word { to { transform: none; } }
  @keyframes hero-shine { 0% { background-position: 120% 0, 0 0; } 35%, 100% { background-position: -20% 0, 0 0; } }
  @media (prefers-reduced-motion: reduce) {
    .hero-in, .hero-word { animation: none; opacity: 1; transform: none; }
    .hero-shine { animation: none; }
  }
`;

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/** Splits text into words that slide up one after another. */
function Words({ text, start }: { text: string; start: number }) {
  return text.split(" ").map((word, i) => (
    <span key={i} className="hero-mask">
      <span className="hero-word" style={delay(start + i * 0.06)}>
        {word}&nbsp;
      </span>
    </span>
  ));
}

const accentStart = 0.15 + HEADING.split(" ").length * 0.06;

export function Hero() {
  return (
    <section className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl flex-1 px-6 pt-12 pb-[calc(min(700px,150vw)*0.23+1.5rem)] md:px-10 md:pt-16 lg:pb-0">
      <style>{styles}</style>
      <div className="pointer-events-auto max-w-2xl">
        {/* Small label */}
        <p
          className="hero-in flex flex-wrap items-center gap-x-3 text-[11px] font-medium tracking-[0.25em] text-slate-500 uppercase"
          style={delay(0)}
        >
          {TAGS.map((tag, i) => (
            <span key={tag} className="flex items-center gap-3">
              {i > 0 && <span className="size-1 rounded-full bg-slate-400" />}
              {tag}
            </span>
          ))}
        </p>

        <h1 className="mt-6 text-4xl leading-[1.08] font-medium tracking-tight text-slate-950 md:text-[3.5rem]">
          <span className="sr-only">
            {HEADING} {HEADING_ACCENT}
          </span>
          <span aria-hidden>
            <Words text={HEADING} start={0.15} />
            <span className="hero-mask">
              <span className="hero-word" style={delay(accentStart)}>
                <span className="hero-shine" style={delay(accentStart + 0.6)}>
                  {HEADING_ACCENT}
                </span>
              </span>
            </span>
          </span>
        </h1>

        <p
          className="hero-in mt-5 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg"
          style={delay(accentStart + 0.2)}
        >
          We build scalable SaaS products, custom software, and AI-powered
          solutions for businesses and non-profit organisations.
        </p>

        {/* Actions */}
        <div
          className="hero-in mt-8 flex flex-wrap items-center gap-7"
          style={delay(accentStart + 0.35)}
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
        </div>

        {/* Features */}
        <ul className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-slate-200">
          {FEATURES.map(({ icon: Icon, title, text, color }, i) => (
            <li
              key={title}
              className="hero-in flex items-start gap-4 sm:px-6 sm:first:pl-0"
              style={delay(accentStart + 0.5 + i * 0.1)}
            >
              <Icon
                className={`mt-0.5 size-6 shrink-0 stroke-[1.5] ${color}`}
              />
              <div>
                <p className="text-sm text-slate-700">{title}</p>
                <p className="mt-1 text-xs text-slate-500">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
