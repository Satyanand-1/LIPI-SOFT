import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "light" | "outline-light";

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: "md" | "sm";
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function buttonClass(variant: Variant = "primary", size: "md" | "sm" = "md", className?: string) {
  return cn("btn", `btn-${variant}`, size === "sm" && "btn-sm", className);
}

/** Link styled as a button. Every call to action on the site uses this. */
export function ButtonLink({ variant = "primary", size = "md", arrow = true, className, children, ...rest }: Props) {
  return (
    <Link className={buttonClass(variant, size, className)} {...rest}>
      <span>{children}</span>
      {arrow ? <ArrowRight className="btn-arrow size-4 shrink-0" aria-hidden="true" strokeWidth={2} /> : null}
    </Link>
  );
}
