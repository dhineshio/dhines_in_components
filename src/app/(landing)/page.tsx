import { DotSphere } from "@/components/dot-sphere";
import { OrbitArt } from "@/components/orbit-art";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "./_components/hero";
import { ServicesSection } from "./_components/services-section";
import { ServicesStrip } from "./_components/services-strip";

export default function LandingPage() {
  return (
    <main className="relative overflow-x-clip bg-white">
      {/* Vertical guide lines on both sides of the content area (start below the header) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[81px] bottom-0 left-1/2 z-0 w-full max-w-7xl -translate-x-1/2 border-x border-slate-200/80"
      />

      {/* First screen: header + hero */}
      <div className="relative flex h-svh min-h-[680px] flex-col overflow-hidden border-b border-slate-200">
        <SiteHeader />
        {/* Orbit art on the right side, below the header */}
        <OrbitArt className="absolute top-20 right-0 hidden h-[calc(100%-5rem)] w-auto lg:block" />
        <Hero />
        {/* Sphere sits at the bottom center; only its top part shows. */}
        <DotSphere className="absolute bottom-0 left-1/2 aspect-square w-[min(700px,100vw)] -translate-x-1/2 translate-y-[62%]" />
      </div>

      <ServicesStrip />
      <ServicesSection />
    </main>
  );
}
