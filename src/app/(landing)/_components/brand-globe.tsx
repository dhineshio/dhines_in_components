"use client";

// The globe for the "Why choose us" brand tile. three.js is heavy, so it is
// loaded only in the browser, and only when this tile is rendered.

import dynamic from "next/dynamic";
import type { GlobeArc, GlobeConfig } from "@/components/ui/globe";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false },
);

const CONFIG: GlobeConfig = {
  pointSize: 4,
  globeColor: "#34258f",
  showAtmosphere: true,
  atmosphereColor: "#e9d5ff",
  atmosphereAltitude: 0.14,
  emissive: "#34258f",
  emissiveIntensity: 0.35,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.85)",
  ambientLight: "#c4b5fd",
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
const COLORS = ["#ffffff", "#fde68a", "#fbcfe8"];

const ARCS: GlobeArc[] = CITIES.map(([lat, lng], i) => ({
  order: (i % 5) * 0.6, // small stagger, so arcs start one after another
  startLat: CHENNAI.lat,
  startLng: CHENNAI.lng,
  endLat: lat,
  endLng: lng,
  arcAlt: 0.15 + (i % 4) * 0.1,
  color: COLORS[i % COLORS.length],
}));

export function BrandGlobe() {
  return <World globeConfig={CONFIG} data={ARCS} />;
}
