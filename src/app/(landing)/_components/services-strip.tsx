import {
  Brain,
  Cloud,
  Code,
  Database,
  HandHeart,
  Smartphone,
} from "lucide-react";

const SERVICES = [
  { icon: Code, label: "Web Development" },
  { icon: Smartphone, label: "Mobile Apps" },
  { icon: Cloud, label: "Cloud & DevOps" },
  { icon: Brain, label: "AI & Automation" },
  { icon: HandHeart, label: "NGO Tech" },
  { icon: Database, label: "Custom Software" },
];

// CSS-only marquee: the list is rendered twice and slides by half its width,
// so the loop is seamless. Pauses on hover; stops for reduced motion.
const styles = `
  .services-track { animation: services-marquee 40s linear infinite; }
  .services-strip:hover .services-track { animation-play-state: paused; }
  @keyframes services-marquee { to { transform: translate3d(-50%, 0, 0); } }
  @media (prefers-reduced-motion: reduce) {
    .services-track { animation: none; }
  }
`;

function ServiceList({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className="flex shrink-0">
      {SERVICES.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="flex items-center gap-4 border-r border-slate-200 px-8 py-1 whitespace-nowrap"
        >
          <Icon className="size-7 shrink-0 stroke-[1.4] text-[#2F5BFF]" />
          <span className="text-slate-600">{label}</span>
        </li>
      ))}
    </ul>
  );
}

export function ServicesStrip() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl pt-6">
      <style>{styles}</style>
      <p className="px-6 text-[11px] font-medium tracking-[0.25em] text-[#2F5BFF] uppercase md:px-10">
        Services we offer
      </p>

      <div className="services-strip mt-2 overflow-hidden border-b border-slate-200 pt-3 pb-5 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="services-track flex w-max">
          <ServiceList />
          <ServiceList hidden />
        </div>
      </div>
    </section>
  );
}
