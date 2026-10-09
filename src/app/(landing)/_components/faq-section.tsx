"use client";

// FAQ: questions that open and close smoothly (one open at a time). The
// answer's height animates with a grid-rows transition. Works with the
// keyboard.
//
// PLACEHOLDER answers: written as sensible defaults. Check each one against
// how you really work before going live.

import { useState } from "react";
import { Plus } from "lucide-react";

const FAQS: { q: string; a: string }[] = [
  {
    q: "What kind of projects do you take on?",
    a: "Websites, web portals, SaaS products and mobile apps, plus growth services like digital marketing, video and chatbots. We work with businesses, schools and NGOs.",
  },
  {
    q: "How long does a project take?",
    a: "It depends on the size. A simple website can take a few weeks, while a portal or an app takes longer. We share a clear timeline before we start.",
  },
  {
    q: "How much does it cost?",
    a: "Every project is different, so we give a quote after we understand what you need. Tell us about your project and we will send you a clear estimate.",
  },
  {
    q: "Do you work with NGOs and non-profits?",
    a: "Yes. We have built websites and tools for NGOs, and we offer an NGO CRM for donations, fundraising and beneficiary tracking.",
  },
  {
    q: "Will you support us after launch?",
    a: "Yes. We stay with you after launch for fixes, updates and new features.",
  },
  {
    q: "How do we get started?",
    a: "Use the contact button to tell us what you have in mind. We will set up a short call, understand your goals and suggest the next steps.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-14 md:px-10"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        {/* Intro */}
        <div>
          <p className="text-[11px] font-medium tracking-[0.25em] text-slate-500 uppercase">
            FAQ
          </p>
          <h2 className="mt-4 text-4xl leading-[1.1] font-semibold tracking-tight text-slate-950">
            Questions,{" "}
            <span className="bg-gradient-to-r from-[#3f5fb5] via-[#7c5cf0] to-[#db5fa8] bg-clip-text text-transparent">
              answered.
            </span>
          </h2>
          <p className="mt-4 leading-relaxed text-slate-500">
            Do not see your question here? Ask us and we will reply soon.
          </p>
        </div>

        {/* Questions */}
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <div key={q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-medium text-slate-950"
                  >
                    {q}
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-full border transition-[transform,background-color,color,border-color] duration-300 ease-out motion-reduce:transition-none ${
                        isOpen
                          ? "rotate-45 border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>
                {/* Height animates from 0 to the answer's own height */}
                <div
                  id={`faq-answer-${i}`}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="max-w-2xl pb-6 leading-relaxed text-slate-600">
                      {a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
