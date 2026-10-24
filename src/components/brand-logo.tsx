import Image from "next/image";
import { cn } from "@/lib/utils";

/** Threadstack Technologies logo (mark + name). Set the height with className. */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/threadstack-logo.webp"
      alt="Threadstack Technologies"
      width={1503}
      height={317}
      priority
      className={cn("h-9 w-auto", className)}
    />
  );
}
