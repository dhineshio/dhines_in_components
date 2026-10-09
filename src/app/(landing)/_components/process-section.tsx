import Image from "next/image";
import {
  ArrowRight,
  Code2,
  PenTool,
  Rocket,
  Search,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS: {
  title: string;
  text: string;
  icon: LucideIcon;
  /** Arch background, number color and badge tint. */
  arch: string;
  number: string;
  badge: string;
  /**
   * Cut-out photo (transparent PNG). Photos: Unsplash - Discover by Yogendra Singh,
   * Design by SUSHMITA NAG, Build by Noman Khan, Launch
   * by Vitaly Gariev.
   */
  image?: string;
}[] = [
  {
    title: "Discover",
    image: "/process/discover-thinking.webp",
    text: "We understand your goals, challenges and requirements to define the right solution.",
    icon: Search,
    arch: "bg-[#7FA2F8]",
    number: "text-[#4F74E0]",
    badge: "bg-[#EEF3FF]",
  },
  {
    title: "Design",
    image: "/process/design-kurta.webp",
    text: "We create clean, modern and user-friendly designs focused on your users.",
    icon: PenTool,
    arch: "bg-[#B79CFA]",
    number: "text-[#7C5CF0]",
    badge: "bg-[#F3EFFF]",
  },
  {
    title: "Build",
    image: "/process/build.webp",
    text: "We develop scalable, secure and high-performance solutions using the latest technologies.",
    icon: Code2,
    arch: "bg-[#F08CC3]",
    number: "text-[#DB5FA8]",
    badge: "bg-[#FDEFF7]",
  },
  {
    title: "Launch",
    image: "/process/launch-thumbsup.webp",
    text: "We deploy, optimise and provide ongoing support to ensure long-term success.",
    icon: Rocket,
    arch: "bg-[#FBAA74]",
    number: "text-[#EA7A3A]",
    badge: "bg-[#FFF3EA]",
  },
];

export function ProcessSection() {
  return (
    <section
      id="process"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-14 md:px-10"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-medium tracking-[0.25em] text-[#3f5fb5] uppercase">
          How we work
        </p>
        <h2 className="mt-5 text-4xl leading-[1.1] font-medium tracking-tight text-slate-950 md:text-5xl">
          From idea to impact,
          <br />a{" "}
          <span className="bg-gradient-to-r from-[#3f5fb5] via-[#7c5cf0] to-[#db5fa8] bg-clip-text text-transparent">
            simple and clear process.
          </span>
        </h2>
        <p className="mt-5 leading-relaxed text-slate-500">
          We follow a structured and transparent process to deliver high-quality
          solutions that achieve real results.
        </p>
      </div>

      <ol className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-12">
        {STEPS.map(
          ({ title, text, icon: Icon, arch, number, badge, image }, i) => (
            <li
              key={title}
              className="relative rounded-2xl border border-slate-200/80 bg-white p-7"
            >
              {/* Arch with photo or icon */}
              <div className="relative mx-auto h-44 w-[82%]">
                <div className={cn("absolute inset-0 rounded-t-full", arch)} />
                {image ? (
                  // Taller than the arch and bottom-aligned, so the head
                  // rises a little above it (like the reference).
                  <div className="absolute inset-x-0 bottom-0 h-[110%]">
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="260px"
                      className="object-contain object-bottom"
                    />
                  </div>
                ) : (
                  <Icon className="absolute top-1/2 left-1/2 size-14 -translate-x-1/2 -translate-y-1/3 stroke-[1.3] text-white" />
                )}
                {/* Number badge, overlapping the arch's bottom-left */}
                <span
                  className={cn(
                    "absolute -bottom-5 -left-4 grid size-14 place-items-center rounded-full text-xl font-semibold ring-4 ring-white",
                    badge,
                    number,
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-10 text-xl font-semibold text-slate-950">
                {title}
              </h3>
              <p className="mt-3 leading-relaxed text-slate-500">{text}</p>

              {/* Arrow to the next step (xl, in the gap between cards) */}
              {i < STEPS.length - 1 && (
                <ArrowRight
                  aria-hidden
                  className="absolute top-[30%] -right-9 hidden size-6 stroke-[1.5] text-slate-400 xl:block"
                />
              )}
            </li>
          ),
        )}
      </ol>
    </section>
  );
}
