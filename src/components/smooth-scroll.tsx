"use client";

// Smooth, eased scrolling for mouse wheels and trackpads (Lenis). Touch
// screens keep the phone's own scrolling, which already feels smooth. Links
// to "#section" glide there too, stopping below the fixed header. Off for
// people who prefer reduced motion. GSAP ScrollTrigger (used by the reveal
// animations) updates on every Lenis scroll so they stay in sync.

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: { offset: -80 },
    });
    lenis.on("scroll", ScrollTrigger.update);
    return () => lenis.destroy();
  }, []);
  return null;
}
