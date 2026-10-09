import { DotSphere } from "@/components/dot-sphere";
import { OrbitArt } from "@/components/orbit-art";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ContactSection } from "./_components/contact-section";
import { FaqSection } from "./_components/faq-section";
import { Hero } from "./_components/hero";
import { MoreServicesSection } from "./_components/more-services-section";
import { ProcessSection } from "./_components/process-section";
import { ProductsSection } from "./_components/products-section";
import { ProjectsSection } from "./_components/projects-section";
import { ServicesSection } from "./_components/services-section";
import { ServicesStrip } from "./_components/services-strip";
import { TechSection } from "./_components/tech-section";
import { WhySection } from "./_components/why-section";

export default function LandingPage() {
  return (
    <main id="top" className="relative overflow-x-clip bg-white">
      {/* Vertical guide lines on both sides of the content area (start below the header) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[81px] bottom-0 left-1/2 z-30 w-full max-w-7xl -translate-x-1/2 border-x border-slate-200/80"
      />

      <SiteHeader />

      {/* First screen: header + hero */}
      <div className="relative flex flex-col overflow-hidden border-b border-slate-200 lg:h-svh lg:min-h-[680px]">
        {/* Spacer for the fixed header */}
        <div aria-hidden className="h-[81px] shrink-0" />
        {/* Soft color glows behind the orbit art */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-20 right-0 hidden h-[calc(100%-5rem)] w-[55%] lg:block"
        >
          <div className="absolute top-[15%] right-[30%] size-80 rounded-full bg-blue-300/30 blur-3xl" />
          <div className="absolute top-[35%] right-[8%] size-72 rounded-full bg-violet-300/30 blur-3xl" />
          <div className="absolute top-[58%] right-[28%] size-64 rounded-full bg-pink-300/25 blur-3xl" />
        </div>
        {/* Orbit art on the right side, below the header */}
        <div className="absolute top-20 right-0 hidden aspect-[952/995] h-[calc(100%-5rem)] lg:block">
          <OrbitArt className="absolute inset-0 size-full" />
        </div>
        <Hero />
        {/* Sphere sits at the bottom center; only its top part shows. */}
        <DotSphere className="absolute bottom-0 left-1/2 aspect-square w-[min(700px,150vw)] -translate-x-1/2 translate-y-[62%]" />
      </div>

      <ServicesStrip />
      <ServicesSection />
      <ProcessSection />
      <ProductsSection />
      <MoreServicesSection />
      <ProjectsSection />
      <WhySection />
      <TechSection />
      <FaqSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
