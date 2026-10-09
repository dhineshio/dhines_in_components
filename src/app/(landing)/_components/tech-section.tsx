// "Tech stack": the tools we build with, in four groups. Each tool is a small
// tile with its logo and name. Icons are in /public/tech.

import Image from "next/image";

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
        {/* Intro */}
        <div>
          <p className="text-[11px] font-medium tracking-[0.25em] text-slate-500 uppercase">
            Tech stack
          </p>
          <h2 className="mt-4 text-4xl leading-[1.1] font-semibold tracking-tight text-slate-950">
            Built with tools{" "}
            <span className="bg-gradient-to-r from-[#3f5fb5] via-[#7c5cf0] to-[#db5fa8] bg-clip-text text-transparent">
              that last.
            </span>
          </h2>
          <p className="mt-4 leading-relaxed text-slate-500">
            We use modern, well-supported technology, so your product is fast
            today and easy to grow later.
          </p>
        </div>

        {/* Groups */}
        <dl className="divide-y divide-slate-200 border-y border-slate-200">
          {GROUPS.map(({ title, tools }) => (
            <div
              key={title}
              className="grid gap-4 py-6 sm:grid-cols-[9rem_1fr] sm:items-center"
            >
              <dt className="text-sm font-medium text-slate-900">{title}</dt>
              <dd className="flex flex-wrap gap-2.5">
                {tools.map(({ name, icon }) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-2.5 rounded-xl border border-slate-900/10 bg-white py-2 pr-4 pl-2.5 text-sm text-slate-700 transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none"
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
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
