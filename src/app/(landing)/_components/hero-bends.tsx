"use client";

// Hero background (right side): React Bits "Color Bends" in the Threadstack
// brand colors, fading out toward the text on the left.

import { useEffect, useState, type ComponentType } from "react";
import ColorBendsJs from "@/components/ColorBends";

// ColorBends is a JS file, so TypeScript guesses `colors` as an empty array
// type. Give it the props we use.
const ColorBends = ColorBendsJs as unknown as ComponentType<{
  colors: string[];
  speed?: number;
  transparent?: boolean;
}>;

// Kept outside the component: ColorBends updates whenever this array changes.
const COLORS = ["#0A84FF", "#2F5BFF", "#5B3BF0", "#7B61FF"];

export function HeroBends({ className }: { className?: string }) {
  // Start the WebGL background only after the text reveal is done and the
  // browser is idle, so the two do not compete on load. Then fade it in.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let idle = 0;
    const timer = window.setTimeout(() => {
      // requestIdleCallback is missing in Safari: fall back to a timeout.
      idle =
        typeof window.requestIdleCallback === "function"
          ? window.requestIdleCallback(() => setReady(true), { timeout: 800 })
          : window.setTimeout(() => setReady(true), 0);
    }, 1200);
    return () => {
      window.clearTimeout(timer);
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idle);
      }
    };
  }, []);

  return (
    <div
      aria-hidden
      className={`transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"} ${className ?? ""}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, #000 45%), linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    >
      {ready && <ColorBends colors={COLORS} speed={0.2} transparent />}
    </div>
  );
}
