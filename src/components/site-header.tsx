import Link from "next/link";
import { ArrowRight } from "lucide-react";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#solutions" },
  { label: "Our Work", href: "#work" },
  { label: "About", href: "#about" },
];

/** Bold "N"-style mark: two thick bars joined by a diagonal. */
function BrandMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className="size-8">
      <path d="M2 2h7l14 20V2h7v28h-7L9 10v20H2z" fill="currentColor" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-slate-200/70">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center gap-3 text-slate-900">
          <BrandMark />
          <span className="text-2xl tracking-tight">Brand</span>
        </Link>

        <nav className="hidden items-center gap-14 text-[15px] text-slate-800 md:flex">
          {NAV.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="transition-colors hover:text-slate-950"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-lg border border-slate-300 px-5 py-3 text-[15px] text-slate-900 transition-colors hover:border-slate-400 hover:bg-slate-50 sm:inline-flex"
          >
            Contact us
          </a>
          <a
            href="#talk"
            className="group inline-flex items-center gap-3 rounded-lg bg-slate-950 px-5 py-3 text-[15px] text-white transition-colors hover:bg-slate-800"
          >
            Talk to us
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
