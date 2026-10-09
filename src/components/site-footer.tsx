// Site footer: brand and short line, three link columns, a bottom bar with
// the copyright and a "back to top" link, and a large faded brand word.
//
// PLACEHOLDERS: the social links point to "#". Contact details come from
// src/constants/contact.ts.

import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/site-header";
import { CONTACT } from "@/constants/contact";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Web & SaaS Development", href: "#services" },
      { label: "Mobile App Development", href: "#services" },
      { label: "AI & Automation", href: "#services" },
      { label: "Cloud & DevOps", href: "#services" },
      { label: "More services", href: "#more-services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How we work", href: "#process" },
      { label: "Products", href: "#products" },
      { label: "Our work", href: "#work" },
      { label: "Why choose us", href: "#about" },
      { label: "FAQ", href: "#faq" },
    ],
  },
];

const SOCIALS = [
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
];

const linkClass = "text-slate-600 transition-colors hover:text-slate-950";

export function SiteFooter() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-slate-200">
      <div className="mx-auto w-full max-w-7xl px-6 pt-14 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 text-slate-900">
              <BrandMark />
              <span className="text-2xl tracking-tight">Brand</span>
            </Link>
            <p className="mt-5 max-w-xs leading-relaxed text-slate-500">
              Software, products and growth services for businesses and
              non-profits.
            </p>
            <a
              href="#contact"
              className="group mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-[15px] text-white transition-colors hover:bg-slate-800"
            >
              Start a project
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Link columns */}
          {COLUMNS.map(({ title, links }) => (
            <nav key={title} aria-label={title}>
              <p className="text-[11px] font-medium tracking-[0.25em] text-slate-500 uppercase">
                {title}
              </p>
              <ul className="mt-5 space-y-3 text-[15px]">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className={linkClass}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact + social */}
          <div>
            <p className="text-[11px] font-medium tracking-[0.25em] text-slate-500 uppercase">
              Get in touch
            </p>
            <ul className="mt-5 space-y-3 text-[15px]">
              <li>
                <a href={`mailto:${CONTACT.email}`} className={linkClass}>
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={`tel:+${CONTACT.phoneDigits}`} className={linkClass}>
                  {CONTACT.phone}
                </a>
              </li>
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2">
              {SOCIALS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="inline-flex items-center gap-1 rounded-full border border-slate-900/10 px-3.5 py-1.5 text-sm text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-950"
                  >
                    {label}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-slate-200 py-6 text-sm text-slate-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Brand. All rights reserved.</p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-slate-700 transition-colors hover:text-slate-950"
          >
            Back to top
            <ArrowUp className="size-4 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Large faded brand word, cut off at the bottom edge */}
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.22em] bg-gradient-to-b from-slate-200 to-transparent bg-clip-text text-center text-[clamp(5rem,22vw,20rem)] leading-none font-semibold tracking-tight text-transparent select-none"
      >
        Brand
      </p>
    </footer>
  );
}
