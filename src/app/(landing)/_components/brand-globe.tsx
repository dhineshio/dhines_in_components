"use client";

// The globe for the "Why choose us" brand tile. It is a looping video of the
// 3D globe (recorded once from components/ui/globe), not live three.js, so it
// costs almost nothing to load and play. The video has a transparent
// background: Safari plays HEVC with alpha, other browsers VP9 WebM with alpha.
// Shows only the part of the globe that is visible in the tile.

import { useEffect, useRef, useState } from "react";

export function BrandGlobe() {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Pick the format and start loading a little before it scrolls in;
    // play only while it is on screen.
    const safari =
      /Apple/.test(navigator.vendor) &&
      video.canPlayType('video/mp4; codecs="hvc1"') !== "";
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduceMotion) {
          setSrc(safari ? "/brand/globe.mp4" : "/brand/globe.webm");
          loader.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    const player = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    loader.observe(video);
    player.observe(video);
    return () => {
      loader.disconnect();
      player.disconnect();
    };
  }, []);

  return (
    // The recorded part covers the top-left of the full globe box.
    <video
      ref={ref}
      src={src ?? undefined}
      poster="/brand/globe-poster.webp"
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      aria-hidden
      className="absolute top-0 left-[9.1667%] h-[60%] w-[50%] object-cover"
    />
  );
}
