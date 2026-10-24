import type { Metadata } from "next";
import { DotSphere } from "@/components/dot-sphere";
import { SiteFooter } from "@/components/site-footer";
import { HeroShards } from "@/components/hero-shards";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
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

// Page title and share card. The share images sit next to this page
// (opengraph-image.png, twitter-image.png); icons are in src/app.
// Set NEXT_PUBLIC_SITE_URL to the real domain so share links use full URLs.
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "Threadstack Technologies",
  description:
    "Websites, SaaS products, mobile apps and AI tools for businesses and non-profits.",
  openGraph: {
    type: "website",
    siteName: "Threadstack Technologies",
    title: "Threadstack Technologies",
    description:
      "Websites, SaaS products, mobile apps and AI tools for businesses and non-profits.",
  },
  twitter: { card: "summary_large_image" },
};

export default function LandingPage() {
  return (
    <main id="top" className="relative overflow-x-clip bg-white">
      {/* Vertical guide lines on both sides of the content area (start below the header) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[97px] bottom-0 left-1/2 z-30 w-full max-w-7xl -translate-x-1/2 border-x border-slate-200/80"
      />

      <SmoothScroll />
      <SiteHeader />

      {/* First screen: header + hero */}
      <div className="relative flex flex-col overflow-hidden border-b border-slate-200 lg:h-svh lg:min-h-[680px]">
        {/* Spacer for the fixed header */}
        <div aria-hidden className="h-[97px] shrink-0" />
        {/* Diagonal glass bands in the brand blues, right side (large screens).
            Fades out toward the text on the left. z-40 puts it above the
            vertical guide line (z-30), so the line sits behind the art. */}
        <HeroShards className="absolute top-24 right-0 z-40 hidden h-[calc(100%-6rem)] w-[60%] [mask-image:linear-gradient(to_right,transparent,#000_35%)] lg:block" />
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
