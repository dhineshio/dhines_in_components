import Image from "next/image";
import { ArrowRight, CircleCheck } from "lucide-react";
import { ParticleWaves, type WaveTheme } from "@/components/particle-waves";
import { cn } from "@/lib/utils";

const PRODUCTS: {
  name: string;
  kind: string;
  text: string;
  features: string[];
  href: string;
  /** Card tint, number chip and check color. */
  tint: string;
  chip: string;
  check: string;
  wave: WaveTheme;
  /** Product mockup (laptop + phone). Optional; waves show until added. */
  image?: string;
}[] = [
  {
    name: "RelayTable",
    kind: "Restaurant SaaS",
    text: "Complete restaurant management with POS, CRM, QR menu ordering, table booking and more.",
    features: ["POS & Billing", "Table Booking", "QR Menu", "Customer CRM"],
    href: "#relaytable",
    tint: "from-[#EEF3FF] to-[#F7F9FF]",
    chip: "text-[#4F74E0]",
    check: "text-[#4F74E0]",
    wave: "blue",
  },
  {
    name: "Voice AI & Calling",
    kind: "Communication SaaS",
    text: "AI-powered voice agents and calling automation to help businesses communicate, support and grow efficiently.",
    features: [
      "AI Voice Agents",
      "Lead Qualification",
      "Automated Calling",
      "CRM Integration",
    ],
    href: "#voice-ai",
    tint: "from-[#F3EFFF] to-[#FAF8FF]",
    chip: "text-[#7C5CF0]",
    check: "text-[#8B6CF5]",
    wave: "violet",
  },
  {
    name: "NGO CRM",
    kind: "White-label SaaS",
    text: "A complete management system for NGOs with donations, fundraising, beneficiaries, staff management and automated receipts.",
    features: [
      "Donations",
      "Fundraising",
      "Beneficiaries",
      "Staff & Volunteers",
    ],
    href: "#ngo-crm",
    tint: "from-[#FDEFF4] to-[#FFF8FA]",
    chip: "text-[#DB4F72]",
    check: "text-[#EC5B7E]",
    wave: "red",
  },
];

export function ProductsSection() {
  return (
    <section
      id="products"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-14 md:px-10"
    >
      {/* Heading */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-medium tracking-[0.25em] text-slate-500 uppercase">
            Our products
          </p>
          <h2 className="mt-4 text-4xl leading-[1.1] font-semibold tracking-tight text-slate-950 md:text-5xl">
            Powerful products for{" "}
            <span className="bg-gradient-to-r from-[#3f5fb5] via-[#7c5cf0] to-[#db5fa8] bg-clip-text text-transparent">
              a better tomorrow.
            </span>
          </h2>
          <p className="mt-4 text-slate-500">
            Scalable SaaS products to help businesses, organisations and
            communities work smarter.
          </p>
        </div>
        <a
          href="#products"
          className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:border-slate-300 md:self-auto"
        >
          View all products
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* Cards */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {PRODUCTS.map((p, i) => {
          return (
            <article
              key={p.name}
              className={cn(
                "relative flex min-h-[470px] flex-col overflow-hidden rounded-3xl border border-white bg-gradient-to-b p-8 shadow-[0_0_0_1px_rgba(15,23,42,0.04)]",
                p.tint,
              )}
            >
              {/* Number chip, top-right */}
              <span
                className={cn(
                  "absolute top-7 right-7 z-10 rounded-full bg-white/80 px-3.5 py-1.5 text-sm font-semibold",
                  p.chip,
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="relative z-10 pr-16 text-2xl font-semibold tracking-tight text-slate-950">
                {p.name}
              </h3>
              <p className="relative z-10 mt-1 text-slate-500">{p.kind}</p>
              <p className="relative z-10 mt-3 leading-relaxed text-slate-600 lg:min-h-[6.5rem]">
                {p.text}
              </p>

              <ul className="relative z-10 mt-5 grid grid-cols-2 content-start gap-x-4 gap-y-2.5">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <CircleCheck
                      className={cn("mt-0.5 size-4 shrink-0", p.check)}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={p.href}
                className="group relative z-10 mt-7 inline-flex items-center gap-2 self-start rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
              >
                View product
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              {/* Product mockup at the bottom (waves until an image is added) */}
              {p.image ? (
                <Image
                  src={p.image}
                  alt={`${p.name} on laptop and phone`}
                  width={1200}
                  height={800}
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="absolute inset-x-0 bottom-0 w-full object-contain"
                />
              ) : (
                <ParticleWaves
                  theme={p.wave}
                  className="absolute inset-x-0 bottom-0 h-[42%] w-full"
                />
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
