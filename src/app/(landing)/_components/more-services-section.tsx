import {
  ArrowRight,
  Bot,
  Camera,
  Clapperboard,
  Megaphone,
  PhoneCall,
  Share2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Services beyond software. Colors cycle through the site's theme.
const SERVICES: {
  title: string;
  text: string;
  icon: LucideIcon;
  tile: string;
}[] = [
  {
    title: "Voice Calling",
    text: "Trained relationship managers (RMs) who call your customers for sales, support and follow-ups.",
    icon: PhoneCall,
    tile: "bg-[#EEF3FF] text-[#4F74E0]",
  },
  {
    title: "Digital Marketing",
    text: "Ads, SEO and campaigns that bring the right customers to you.",
    icon: Megaphone,
    tile: "bg-[#F3EFFF] text-[#7C5CF0]",
  },
  {
    title: "Video Editing",
    text: "Reels, ads and explainer videos, edited to keep people watching.",
    icon: Clapperboard,
    tile: "bg-[#FDEFF7] text-[#DB5FA8]",
  },
  {
    title: "Photo & Video Shoots",
    text: "Product, brand and event shoots, planned and shot by our team.",
    icon: Camera,
    tile: "bg-[#FFF3EA] text-[#EA7A3A]",
  },
  {
    title: "Social Media",
    text: "Content planning, posting and page management, done for you.",
    icon: Share2,
    tile: "bg-[#EEF3FF] text-[#4F74E0]",
  },
  {
    title: "Chatbot Integration",
    text: "Chatbots for your website and WhatsApp that answer customers and collect leads.",
    icon: Bot,
    tile: "bg-[#F3EFFF] text-[#7C5CF0]",
  },
];

export function MoreServicesSection() {
  return (
    <section
      id="more-services"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-14 md:px-10"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        {/* Intro */}
        <div>
          <p className="text-[11px] font-medium tracking-[0.25em] text-slate-500 uppercase">
            More services
          </p>
          <h2 className="mt-4 text-4xl leading-[1.1] font-semibold tracking-tight text-slate-950">
            Beyond software,{" "}
            <span className="bg-gradient-to-r from-[#3f5fb5] via-[#7c5cf0] to-[#db5fa8] bg-clip-text text-transparent">
              we help you grow.
            </span>
          </h2>
          <p className="mt-4 leading-relaxed text-slate-500">
            One team for your product, your marketing and your content, so you
            do not have to manage many vendors.
          </p>
          <a
            href="#contact"
            className="group mt-7 inline-flex items-center gap-2 border-b border-slate-300 pb-1 text-[15px] text-slate-900 transition-colors hover:border-slate-900"
          >
            Ask about a service
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Service list: rows with a line between them */}
        <ul className="grid sm:grid-cols-2 sm:gap-x-10">
          {SERVICES.map(({ title, text, icon: Icon, tile }) => (
            <li
              key={title}
              className="flex items-start gap-4 border-t border-slate-200 py-6"
            >
              <span
                className={cn(
                  "grid size-11 shrink-0 place-items-center rounded-xl",
                  tile,
                )}
              >
                <Icon className="size-5 stroke-[1.6]" />
              </span>
              <div>
                <h3 className="font-semibold text-slate-950">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
