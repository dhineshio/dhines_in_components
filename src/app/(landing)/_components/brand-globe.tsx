"use client";

// The globe for the "Why choose us" brand tile. three.js and the country dot
// math are heavy, so the globe loads only when the tile is close to the
// screen (not on page load, where it froze the hero's reveal).

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { GlobeArc, GlobeConfig } from "@/components/ui/globe";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false },
);

export const CONFIG: GlobeConfig = {
  pointSize: 4,
  globeColor: "#1E2A9E",
  showAtmosphere: true,
  atmosphereColor: "#C7D7FF",
  atmosphereAltitude: 0.14,
  emissive: "#1E2A9E",
  emissiveIntensity: 0.35,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.85)",
  ambientLight: "#A9C2FF",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 900, // faster arcs
  arcGap: 3, // and they repeat much sooner
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  autoRotateSpeed: 0.6,
};

// Arcs from Chennai to cities around the world, in the site's colors.
const CHENNAI = { lat: 13.08, lng: 80.27 };
const CITIES: [number, number][] = [
  [51.51, -0.13], // London
  [40.71, -74.01], // New York
  [1.35, 103.82], // Singapore
  [25.2, 55.27], // Dubai
  [-33.87, 151.21], // Sydney
  [35.68, 139.69], // Tokyo
  [28.61, 77.21], // Delhi
  [19.08, 72.88], // Mumbai
  [52.52, 13.4], // Berlin
  [37.77, -122.42], // San Francisco
];
const COLORS = ["#ffffff", "#8EC5FF", "#C7B8FF"];

export const ARCS: GlobeArc[] = CITIES.map(([lat, lng], i) => ({
  order: (i % 5) * 0.6, // small stagger, so arcs start one after another
  startLat: CHENNAI.lat,
  startLng: CHENNAI.lng,
  endLat: lat,
  endLng: lng,
  arcAlt: 0.15 + (i % 4) * 0.1,
  color: COLORS[i % COLORS.length],
}));

export function BrandGlobe() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Load a little before it scrolls in; once loaded, keep it.
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          loader.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    // Animate only while it is on screen.
    const watcher = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    loader.observe(el);
    watcher.observe(el);
    return () => {
      loader.disconnect();
      watcher.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="size-full">
      {near && <World globeConfig={CONFIG} data={ARCS} paused={!visible} />}
    </div>
  );
}
