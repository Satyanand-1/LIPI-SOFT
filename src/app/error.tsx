"use client";

import Link from "next/link";
import { useEffect } from "react";

/** Shown when a page throws while rendering. Offers a retry and a way out. */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // The digest identifies the server-side log entry without exposing details.
    console.error("Page error", error.digest ?? "");
  }, [error]);

  return (
    <section className="shell flex min-h-[80svh] flex-col justify-center pb-20 pt-32" aria-labelledby="error-heading">
      <div className="rule-top grid gap-x-10 gap-y-8 pt-6 lg:grid-cols-12">
        <p className="type-label text-accent-ink lg:col-span-3">Something went wrong</p>
        <div className="lg:col-span-9" role="alert">
          <h1 id="error-heading" className="type-h1 max-w-[14ch]">
            This page failed to load.
          </h1>
          <p className="type-lead mt-6 max-w-xl">An unexpected error occurred on our side. Trying again usually resolves it.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button type="button" onClick={reset} className="btn btn-primary">
              <span>Try again</span>
            </button>
            <Link href="/" className="btn btn-secondary">
              <span>Back to home</span>
            </Link>
          </div>
          {error.digest ? <p className="type-label mt-10 text-ink-faint">Reference: {error.digest}</p> : null}
        </div>
      </div>
    </section>
  );
}
