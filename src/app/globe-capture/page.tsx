"use client";
// TEMPORARY: renders the globe alone so it can be recorded to video.
import dynamic from "next/dynamic";
import { ARCS, CONFIG } from "../(landing)/_components/brand-globe";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false },
);

export default function Page() {
  return (
    <div style={{ width: 1440, height: 1200 }}>
      <style>{`html,body{background:transparent!important}nextjs-portal{display:none!important}`}</style>
      <World
        globeConfig={{
          ...CONFIG,
          autoRotateSpeed: 1.25,
          arcTime: 48000 / (3.9 * 13),
        }}
        data={ARCS}
      />
    </div>
  );
}
