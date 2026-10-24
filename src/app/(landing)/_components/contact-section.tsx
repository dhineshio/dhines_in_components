"use client";

// Contact section: a short pitch with direct contact options on the left, and
// a form on the right.
//
// There is no backend for the form yet. On submit it opens the visitor's
// email app with the message filled in (a mailto: link), so nothing is lost.
// When an API is ready, replace the body of `onSubmit`.

import { useEffect, useState, type FormEvent } from "react";
import { Select } from "@base-ui/react/select";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import GradientWaves from "@/components/GradientWaves";
import { Reveal } from "@/components/reveal";
import { CONTACT } from "@/constants/contact";

const SERVICES = [
  "Web & SaaS Development",
  "Mobile App Development",
  "AI & Automation",
  "Cloud & DevOps",
  "NGO Solutions",
  "Voice Calling",
  "Digital Marketing",
  "Video Editing & Shoots",
  "Something else",
];

const OPTIONS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us",
    href: `https://wa.me/${CONTACT.phoneDigits}`,
    tile: "bg-[#EAF4FF] text-[#0A84FF]",
  },
  {
    icon: Phone,
    label: "Call",
    value: CONTACT.phone,
    href: `tel:+${CONTACT.phoneDigits}`,
    tile: "bg-[#EEF2FF] text-[#2F5BFF]",
  },
  {
    icon: Mail,
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    tile: "bg-[#F1EEFF] text-[#5B3BF0]",
  },
];

const field =
  "mt-1.5 w-full rounded-xl border border-slate-900/10 bg-white px-4 py-3 text-[15px] text-slate-950 outline-none transition-[border-color,box-shadow] placeholder:text-slate-400 focus:border-[#2F5BFF] focus:ring-4 focus:ring-[#2F5BFF]/15";

export function ContactSection() {
  const [sent, setSent] = useState(false);

  // Large screens only: render the WebGL waves.
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const body = [
      `Name: ${get("name")}`,
      `Phone or email: ${get("contact")}`,
      `Service: ${get("service")}`,
      "",
      get("message"),
    ].join("\n");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      `New enquiry from ${get("name")}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative z-10 mx-auto w-full max-w-7xl scroll-mt-24 px-6 py-14 md:px-10"
    >
      {/* The whole card rises in on scroll */}
      <Reveal distance={50} duration={0.9} threshold={0.12}>
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0A84FF] via-[#2F5BFF] to-[#5B3BF0]">
          {/* Background: React Bits GradientWaves (large screens only: its 3D
            shader is too heavy for phone GPUs). Phones get a still gradient in
            the same colors. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(123,97,255,0.55),transparent_60%),radial-gradient(ellipse_at_10%_90%,rgba(199,215,255,0.35),transparent_55%)] lg:hidden"
          />
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {wide && (
              <GradientWaves
                horizonColor="#2F5BFF"
                waveColor="#7B61FF"
                crestColor="#C7D7FF"
                speed={0.3}
                fogDepth={26}
                mouseInteraction={false}
                grain={false}
              />
            )}
          </div>

          <div className="relative grid gap-10 p-7 md:p-12 lg:grid-cols-2 lg:gap-16">
            {/* Pitch + direct options */}
            <div className="flex flex-col">
              <p className="text-[11px] font-medium tracking-[0.25em] text-white/70 uppercase">
                Contact
              </p>
              <h2 className="mt-4 text-4xl leading-[1.1] font-semibold tracking-tight text-white md:text-5xl">
                Have a project in mind?{" "}
                <span className="text-[#C7D7FF]">Let&apos;s talk.</span>
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-white/80">
                Tell us what you need. We will get back to you with the next
                steps.
              </p>

              <ul className="mt-10 space-y-3 lg:mt-auto lg:pt-10">
                {OPTIONS.map(({ icon: Icon, label, value, href, tile }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="group flex items-center gap-4 rounded-2xl border border-white/60 bg-white/90 p-3 pr-5 backdrop-blur-sm transition-colors hover:bg-white"
                    >
                      <span
                        className={`grid size-11 shrink-0 place-items-center rounded-xl ${tile}`}
                      >
                        <Icon className="size-5 stroke-[1.6]" />
                      </span>
                      <span>
                        <span className="block text-xs text-slate-500">
                          {label}
                        </span>
                        <span className="block font-medium text-slate-950">
                          {value}
                        </span>
                      </span>
                      <ArrowRight className="ml-auto size-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-900" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form ("Talk to us" links jump here) */}
            <form
              id="talk"
              onSubmit={onSubmit}
              className="scroll-mt-24 rounded-3xl bg-white p-6 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.5)] md:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Your name
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Full name"
                    className={field}
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Phone or email
                  <input
                    name="contact"
                    required
                    placeholder="How can we reach you?"
                    className={field}
                  />
                </label>
              </div>

              {/* Service: custom dropdown (Base UI Select: keyboard and screen
                reader support, and it still posts a "service" form value) */}
              <div className="mt-5">
                <p
                  id="service-label"
                  className="text-sm font-medium text-slate-700"
                >
                  What do you need?
                </p>
                <Select.Root name="service" required>
                  <Select.Trigger
                    aria-labelledby="service-label"
                    className={`${field} flex items-center justify-between text-left data-[popup-open]:border-[#2F5BFF] data-[popup-open]:ring-4 data-[popup-open]:ring-[#2F5BFF]/15`}
                  >
                    <Select.Value
                      placeholder={
                        <span className="text-slate-400">Choose a service</span>
                      }
                    />
                    <Select.Icon className="text-slate-500 transition-transform duration-200 data-[popup-open]:rotate-180">
                      <ChevronDown className="size-4" />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Positioner
                      sideOffset={8}
                      alignItemWithTrigger={false}
                      className="z-50"
                    >
                      <Select.Popup className="max-h-72 w-[var(--anchor-width)] origin-[var(--transform-origin)] overflow-y-auto rounded-2xl border border-slate-900/10 bg-white p-1.5 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)] transition-[opacity,transform] duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
                        {SERVICES.map((service) => (
                          <Select.Item
                            key={service}
                            value={service}
                            className="flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[15px] text-slate-700 outline-none select-none data-[highlighted]:bg-[#EEF2FF] data-[highlighted]:text-slate-950 data-[selected]:font-medium data-[selected]:text-slate-950"
                          >
                            <Select.ItemText>{service}</Select.ItemText>
                            <Select.ItemIndicator>
                              <Check className="size-4 text-[#2F5BFF]" />
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.Popup>
                    </Select.Positioner>
                  </Select.Portal>
                </Select.Root>
              </div>

              <label className="mt-5 block text-sm font-medium text-slate-700">
                Message
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us a little about your project"
                  className={`${field} resize-none`}
                />
              </label>

              <button
                type="submit"
                className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-slate-950 px-6 py-4 font-medium text-white transition-colors hover:bg-slate-800"
              >
                Send message
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <p
                role="status"
                className="mt-4 min-h-5 text-center text-sm text-slate-500"
              >
                {sent
                  ? "Your email app should open with the message. Press send there to finish."
                  : "We reply to every message."}
              </p>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
