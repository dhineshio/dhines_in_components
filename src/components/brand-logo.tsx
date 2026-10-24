import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Threadstack Technologies logo (mark + name). Set the height with className.
 * The earlier logo is kept at /brand/threadstack-logo.webp (1503 x 317).
 */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/threadstack-logo-v2.webp"
      alt="Threadstack Technologies"
      width={1525}
      height={380}
      priority
      className={cn("h-9 w-auto", className)}
    />
  );
}
