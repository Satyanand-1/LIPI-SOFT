"use client";

/**
 * Last-resort boundary for failures in the root layout itself. It replaces
 * the whole document, so it carries its own minimal inline styling.
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#f4f1ea", color: "#14161a", fontFamily: "system-ui, 'Segoe UI', sans-serif", padding: "1.5rem" }}>
        <main style={{ maxWidth: "34rem", borderTop: "4px solid #14161a", paddingTop: "1.5rem" }}>
          <title>Something went wrong | LIPI SOFT</title>
          <h1 style={{ fontSize: "2.25rem", lineHeight: 1.05, letterSpacing: "-0.03em", margin: 0 }}>The site hit an unexpected error.</h1>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.5, color: "#454952" }}>Please try again. If the problem continues, come back in a few minutes.</p>
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: "0.75rem", padding: "0.9rem 1.4rem", background: "#14161a", color: "#f4f1ea", border: 0, borderRadius: 3, fontSize: "1rem", fontWeight: 600, cursor: "pointer" }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
