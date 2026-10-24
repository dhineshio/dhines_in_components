"use client";

// Typed wrapper for React Bits AnimatedContent (a JS file, so TypeScript
// cannot tell which props are optional). Use <Reveal> instead of it.

import type { ComponentType, ReactNode } from "react";
import AnimatedContentJs from "@/components/AnimatedContent";

export type RevealProps = {
  children?: ReactNode;
  className?: string;
  role?: string;
  trigger?: "scroll" | "mount";
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string;
  delay?: number;
  stagger?: number;
  blur?: number;
  scale?: number;
  threshold?: number;
  once?: boolean;
};

export const Reveal =
  AnimatedContentJs as unknown as ComponentType<RevealProps>;
