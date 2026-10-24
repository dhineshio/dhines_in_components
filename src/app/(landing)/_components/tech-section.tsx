// "Tech stack": the tools we build with, in four groups. Each tool is a small
// tile with its logo and name. Icons are in /public/tech.

import Image from "next/image";
import { Reveal } from "@/components/reveal";

const GROUPS: { title: string; tools: { name: string; icon: string }[] }[] = [
  {
    title: "Frontend",
    tools: [
      { name: "Next.js", icon: "nextjs" },
      { name: "TypeScript", icon: "ts" },
      { name: "JavaScript", icon: "js" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "Bootstrap", icon: "bootstrap" },
    ],
  },
  {
    title: "Backend",
    tools: [
      { name: "Python", icon: "python" },
      { name: "Django", icon: "django" },
      { name: "PostgreSQL", icon: "postgresql" },
    ],
  },
  {
    title: "Mobile",
    tools: [
      { name: "Flutter", icon: "flutter" },
      { name: "Dart", icon: "dart" },
    ],
  },
  {
    title: "Cloud & tools",
    tools: [
      { name: "AWS", icon: "aws" },
      { name: "Cloudflare", icon: "cloudflare.svg" },
      { name: "Docker", icon: "docker.svg" },
      { name: "Git", icon: "git" },
      { name: "Figma", icon: "figma" },
    ],
  },
];

export function TechSection() {
  return (
    <section
      id="tech"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-14 md:px-10"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        {/* Intro, then each group row, reveal on scroll */}
        <Reveal distance={40} duration={0.9} threshold={0.15}>
          <p className="text-[11px] font-medium tracking-[0.25em] text-slate-500 uppercase">
            Tech stack
          </p>
          <h2 className="mt-4 text-4xl leading-[1.1] font-semibold tracking-tight text-slate-950">
            Built with tools{" "}
            <span className="bg-gradient-to-r from-[#0A84FF] via-[#2F5BFF] to-[#5B3BF0] bg-clip-text text-transparent">
              that last.
            </span>
          </h2>
          <p className="mt-4 leading-relaxed text-slate-500">
            We use modern, well-supported technology, so your product is fast
            today and easy to grow later.
          </p>
        </Reveal>

        {/* Groups */}
        <dl className="divide-y divide-slate-200 border-y border-slate-200">
          {GROUPS.map(({ title, tools }, i) => (
            <Reveal
              key={title}
              distance={30}
              duration={0.7}
              delay={i * 0.08}
              threshold={0.1}
              className="grid gap-4 py-6 sm:grid-cols-[9rem_1fr] sm:items-center"
            >
              <dt className="flex items-center gap-2 text-sm font-medium text-slate-900">
                <span className="size-1.5 rounded-full bg-gradient-to-r from-[#0A84FF] to-[#5B3BF0]" />
                {title}
              </dt>
              <dd className="flex flex-wrap gap-2.5">
                {tools.map(({ name, icon }) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-2.5 rounded-xl border border-slate-900/10 bg-white py-2 pr-4 pl-2.5 text-sm text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:border-[#2F5BFF]/40 hover:shadow-[0_8px_20px_-12px_rgba(47,91,255,0.45)] motion-reduce:transition-none"
                  >
                    <Image
                      // Icons are .webp unless the name already has an extension.
                      src={`/tech/${icon.includes(".") ? icon : `${icon}.webp`}`}
                      alt=""
                      width={24}
                      height={24}
                      className="size-6 object-contain"
                    />
                    {name}
                  </span>
                ))}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
