import { cn } from "@/lib/cn";

/**
 * LIPI SOFT mark: a letter hanging from a headline rule, closed by a cursor
 * block. The rule is the motif the rest of the site's layout is built on.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <rect x="4" y="5" width="32" height="5" fill="currentColor" />
      <rect x="9" y="10" width="5" height="25" fill="currentColor" />
      <rect x="9" y="30" width="15" height="5" fill="currentColor" />
      <rect x="28" y="30" width="5" height="5" className="fill-accent" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-7 shrink-0" />
      <span className="font-display text-[1.06rem] leading-none tracking-[0.14em]">
        <span className="font-bold">LIPI</span>
        <span className="font-normal"> SOFT</span>
      </span>
    </span>
  );
}
