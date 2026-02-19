"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <head>
        <title>Error - Dialektli</title>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --bg: hsl(0, 0%, 100%);
                --fg: hsl(220, 15%, 10%);
                --muted: hsl(220, 10%, 45%);
                --primary: hsl(0, 80%, 50%);
                --destructive: hsl(0, 72%, 51%);
                --border: hsl(220, 10%, 90%);
                --card: hsl(0, 0%, 99%);
              }
              @media (prefers-color-scheme: dark) {
                :root {
                  --bg: hsl(220, 15%, 10%);
                  --fg: hsl(220, 10%, 95%);
                  --muted: hsl(220, 10%, 60%);
                  --primary: hsl(0, 80%, 50%);
                  --destructive: hsl(0, 72%, 51%);
                  --border: hsl(220, 15%, 22%);
                  --card: hsl(220, 15%, 13%);
                }
              }
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body {
                font-family: Inter, system-ui, sans-serif;
                background: var(--bg);
                color: var(--fg);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .container {
                max-width: 28rem;
                text-align: center;
                padding: 2rem 1rem;
              }
              .icon-wrap {
                width: 5rem;
                height: 5rem;
                border-radius: 9999px;
                background: color-mix(in srgb, var(--destructive) 10%, transparent);
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1.5rem;
              }
              .icon-wrap svg { width: 2.5rem; height: 2.5rem; color: var(--destructive); }
              h1 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem; }
              p { color: var(--muted); line-height: 1.6; }
              .digest {
                margin-top: 1rem;
                padding: 0.5rem 0.75rem;
                background: var(--card);
                border: 1px solid var(--border);
                border-radius: 0.375rem;
                font-size: 0.75rem;
                font-family: monospace;
                color: var(--muted);
              }
              .actions {
                margin-top: 2rem;
                display: flex;
                gap: 0.75rem;
                justify-content: center;
                flex-wrap: wrap;
              }
              button, a.btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 0.5rem 1.25rem;
                border-radius: 0.375rem;
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                text-decoration: none;
                transition: opacity 0.15s;
              }
              button:hover, a.btn:hover { opacity: 0.85; }
              .btn-primary {
                background: var(--primary);
                color: white;
                border: none;
              }
              .btn-outline {
                background: transparent;
                color: var(--fg);
                border: 1px solid var(--border);
              }
            `,
          }}
        />
      </head>
      <body>
        <div className="container">
          <div className="icon-wrap">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>
          <h1>Critical Error</h1>
          <p>
            Something went seriously wrong. The application could not recover
            gracefully. Please try refreshing the page.
          </p>
          {error.digest && (
            <div className="digest">Error ID: {error.digest}</div>
          )}
          <div className="actions">
            <button className="btn-primary" onClick={reset}>
              Try Again
            </button>
            <Link href="/" className="btn btn-outline">
              Back to Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
