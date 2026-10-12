import type { ReactNode } from "react";

/**
 * A template re-mounts on every navigation, so this CSS animation gives each
 * page a brief entrance without any client-side JavaScript.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="animate-page">{children}</div>;
}
