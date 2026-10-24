"use client";
// TEMPORARY: renders the globe alone so it can be recorded to video.
import dynamic from "next/dynamic";
import type { GlobeArc, GlobeConfig } from "@/components/ui/globe";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false },
);

const CONFIG: GlobeConfig = {
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
  arcTime: 48000 / (3.9 * 13),
  arcGap: 3,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  autoRotateSpeed: 1.25,
};
const CHENNAI = { lat: 13.08, lng: 80.27 };
const CITIES: [number, number][] = [
  [51.51, -0.13], [40.71, -74.01], [1.35, 103.82], [25.2, 55.27],
  [-33.87, 151.21], [35.68, 139.69], [28.61, 77.21], [19.08, 72.88],
  [52.52, 13.4], [37.77, -122.42],
];
const COLORS = ["#ffffff", "#8EC5FF", "#C7B8FF"];
const ARCS: GlobeArc[] = CITIES.map(([lat, lng], i) => ({
  order: (i % 5) * 0.6,
  startLat: CHENNAI.lat,
  startLng: CHENNAI.lng,
  endLat: lat,
  endLng: lng,
  arcAlt: 0.15 + (i % 4) * 0.1,
  color: COLORS[i % COLORS.length],
}));

export default function Page() {
  return (
    <div style={{ width: 1440, height: 1200 }}>
      <style>{`html,body{background:transparent!important}nextjs-portal{display:none!important}`}</style>
      <World globeConfig={CONFIG} data={ARCS} />
    </div>
  );
}
