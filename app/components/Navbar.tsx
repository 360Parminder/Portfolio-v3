"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Navbar() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mq.matches);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed",
        "top-0",
        "z-40",
        "flex",
        "items-center",
        "justify-center",
        "border-b",
        "border-neutral-200",
        "dark:border-white/5",
      )}
      style={{
        left: "var(--col-left)",
        right: "var(--col-right)",
        height: "60px",
        gap: "24px",
      }}
    >
      {/* Logo */}
      <Link href="/" className="no-underline flex items-center">
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      {/* Separator */}
      <div
        style={{
          width: "1px",
          height: "20px",
          backgroundColor: "var(--line-stroke)",
        }}
      />

      {/* Nav Links */}
      {["About", "Work", "Skills"].map((item) => (
        <Link
          key={item}
          href={`#${item.toLowerCase()}`}
          className={clsx("no-underline", "transition-colors")}
          style={{
            fontSize: "14px",
            fontWeight: 400,
            letterSpacing: "0.02em",
            color: "var(--nav-link)",
            fontFamily: "var(--font-geist-sans)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--nav-link-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--nav-link)")
          }
        >
          {item}
        </Link>
      ))}

      {/* Separator */}
      <div
        style={{
          width: "1px",
          height: "20px",
          backgroundColor: "var(--line-stroke)",
        }}
      />

      {/* GitHub */}
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center no-underline transition-colors"
        style={{ color: "var(--nav-link)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--nav-link-hover)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--nav-link)")
        }
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      </a>

      {/* Theme toggle */}
      <button
        className="flex items-center justify-center transition-colors"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--nav-link)",
          padding: 0,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--nav-link-hover)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--nav-link)")
        }
        aria-label="Theme"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      </button>

      {/* Separator */}
      <div
        style={{
          width: "1px",
          height: "20px",
          backgroundColor: "var(--line-stroke)",
        }}
      />

      {/* Cal.com Meet Button */}
      <a
        href="https://cal.com"
        target="_blank"
        rel="noopener noreferrer"
        className={clsx("no-underline", "transition-all", "flex", "items-center")}
        style={{
          fontSize: "13px",
          fontWeight: 500,
          letterSpacing: "0.02em",
          color: "var(--foreground)",
          fontFamily: "var(--font-geist-sans)",
          padding: "6px 16px",
          borderRadius: "999px",
          border: "1px solid var(--line-stroke-accent)",
          gap: "6px",
          background: "var(--line-fill-accent)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--line-stroke)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--line-fill-accent)";
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        Book a Meet
      </a>
    </nav>
  );
}
