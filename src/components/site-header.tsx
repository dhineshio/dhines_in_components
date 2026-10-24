"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#solutions" },
  { label: "Our Work", href: "#work" },
  { label: "About", href: "#about" },
];

/**
 * Fixed header. At the top it blends into the page; once you scroll it turns
 * into frosted glass with a border line (no shadow). Height stays the same.
 * Put a h-[97px] spacer where the header used to sit.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  // True while the menu is closing: its text stays in place until the circle
  // has fully closed (otherwise the text slides down mid-close and glitches).
  const [closing, setClosing] = useState(false);
  // Circle radius that just covers the screen from the menu button. A bigger
  // radius (e.g. 150%) makes the close look stuck: the circle shrinks off
  // screen for a while before anything visible moves.
  const [radius, setRadius] = useState(0);
  const closeMenu = () => {
    setClosing(true);
    setOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the menu is open: lock page scroll, close on Escape or wide screen.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeMenu();
    document.body.style.overflow = "hidden"; // no page scroll behind the menu
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = () => wide.matches && closeMenu();
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Menu text slides up out of its row; other parts fade up. Both run one
  // after another when the menu opens.
  // Items animate only on the way in. On the way out they stay put (visible)
  // and reset, without animation, once the menu is hidden.
  const visible = open || closing;
  const ease = open
    ? "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
    : "transition-none";
  const slide = `inline-block ${ease} ${
    visible ? "translate-y-0 opacity-100" : "translate-y-[110%] opacity-0"
  }`;
  const fade = `${ease} ${
    visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
  }`;

  return (
    <>
      <header
        // The blur stays on once scrolled, even while the menu is open (only
        // the background turns solid). Switching backdrop-filter off when the
        // menu opened made the screen blink on phones.
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 motion-reduce:transition-none ${
          scrolled ? "backdrop-blur-xl" : ""
        } ${
          scrolled && !open
            ? "border-slate-200 bg-white/75"
            : "border-slate-200/70 bg-white"
        }`}
      >
        <div className="mx-auto flex h-24 w-full max-w-7xl items-center justify-between px-6 md:px-10 lg:px-6 min-[1360px]:px-0">
          <Link href="/" className="flex items-center gap-3 text-slate-900">
            <BrandLogo className="h-10 sm:h-12" />
          </Link>

          <nav className="hidden items-center gap-8 text-[15px] text-slate-800 lg:flex xl:gap-14">
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
              className="hidden rounded-lg border border-slate-300 px-5 py-3 text-[15px] text-slate-900 transition-colors hover:border-slate-400 hover:bg-slate-50 lg:inline-flex"
            >
              Contact us
            </a>
            <a
              href="#talk"
              className="group hidden items-center gap-3 rounded-lg bg-slate-950 px-5 py-3 text-[15px] text-white transition-colors hover:bg-slate-800 sm:inline-flex"
            >
              Talk to us
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            {/* Menu button (below lg) */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => {
                if (open) closeMenu();
                else {
                  setRadius(
                    Math.ceil(
                      Math.hypot(window.innerWidth - 46, window.innerHeight),
                    ),
                  );
                  setClosing(false);
                  setOpen(true);
                }
              }}
              className="grid size-11 place-items-center rounded-lg border border-[#2F5BFF]/30 text-[#2F5BFF] transition-colors hover:bg-[#EEF3FF] lg:hidden"
            >
              {/* Two lines that rotate into an X */}
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-[1.5px] w-full bg-current transition-all duration-300 ease-out motion-reduce:transition-none ${
                    open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] bg-current transition-all duration-300 ease-out motion-reduce:transition-none ${
                    open
                      ? "top-1/2 w-full -translate-y-1/2 -rotate-45"
                      : "top-full w-3/5 -translate-y-full"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu (below lg). It opens as a circle growing out
          of the menu button; big numbered links slide up one by one.
          It sits outside <header>: the header's backdrop blur would trap a
          fixed child inside the header box. */}
      <div
        id="mobile-menu"
        inert={!open}
        onTransitionEnd={(e) => {
          // The circle has finished closing: now reset the items.
          if (e.target === e.currentTarget && !open) setClosing(false);
        }}
        style={{
          clipPath: open
            ? `circle(${radius}px at calc(100% - 46px) 0px)`
            : "circle(0px at calc(100% - 46px) 0px)",
        }}
        className={`fixed inset-x-0 top-[97px] bottom-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-white bg-[radial-gradient(ellipse_at_100%_0%,#e6efff_0%,transparent_55%),radial-gradient(ellipse_at_0%_100%,#eeebff_0%,transparent_55%)] will-change-[clip-path] transition-[clip-path] motion-reduce:transition-none lg:hidden ${
          open
            ? "duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
            : "duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]"
        }`}
      >
        <nav className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pt-6 md:px-10">
          <p
            style={{ transitionDelay: open ? "180ms" : "0ms" }}
            className={`${fade} mb-2 text-[11px] font-medium tracking-[0.25em] text-slate-400 uppercase`}
          >
            Menu
          </p>
          {NAV.map(({ label, href }, i) => (
            // The link's own box clips the text, so it slides up from a line.
            <a
              key={label}
              href={href}
              onClick={() => closeMenu()}
              className="group flex items-center gap-4 overflow-hidden border-b border-slate-200 py-5"
            >
              <span
                style={{ transitionDelay: open ? `${220 + i * 70}ms` : "0ms" }}
                className={`${slide} w-6 text-xs font-medium tracking-widest text-[#2F5BFF]`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                style={{ transitionDelay: open ? `${220 + i * 70}ms` : "0ms" }}
                className={`${slide} text-[2rem] leading-none font-medium tracking-tight text-slate-950`}
              >
                {label}
              </span>
              <span
                style={{ transitionDelay: open ? `${300 + i * 70}ms` : "0ms" }}
                className={`${fade} ml-auto grid size-10 shrink-0 place-items-center rounded-full border border-[#2F5BFF]/20 bg-[#EEF3FF] text-[#2F5BFF] group-active:bg-[#2F5BFF] group-active:text-white`}
              >
                <ArrowRight className="size-4" />
              </span>
            </a>
          ))}
        </nav>

        {/* Buttons: full width, stacked, at the bottom */}
        <div
          style={{
            transitionDelay: open ? `${260 + NAV.length * 70}ms` : "0ms",
          }}
          className={`${fade} relative mx-auto mt-auto flex w-full max-w-7xl flex-col gap-3 px-6 pt-10 pb-8 md:px-10`}
        >
          <a
            href="#talk"
            onClick={() => closeMenu()}
            className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#0A84FF] via-[#2F5BFF] to-[#5B3BF0] px-5 py-4 text-base font-medium text-white"
          >
            Talk to us
            <ArrowRight className="size-4" />
          </a>
          <a
            href="#contact"
            onClick={() => closeMenu()}
            className="rounded-xl border border-[#2F5BFF]/30 bg-white px-5 py-4 text-center text-base font-medium text-[#2F5BFF]"
          >
            Contact us
          </a>
        </div>
      </div>
    </>
  );
}
