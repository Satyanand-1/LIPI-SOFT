"use client";

/**
 * Renders the current year in the visitor's browser, so the copyright notice
 * stays correct on statically generated pages without a rebuild.
 */
export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
