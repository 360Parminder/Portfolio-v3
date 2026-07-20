"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GithubIcon, Moon02Icon, Sun01Icon, Calendar01Icon } from "hugeicons-react";
import { getCalApi } from "@calcom/embed-react";

export function Navbar() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mq.matches);

    const updateTheme = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener("change", updateTheme);

    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: mq.matches ? "#ffffff" : "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: mq.matches ? "dark" : "light",
      });
    })();

    return () => mq.removeEventListener("change", updateTheme);
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
        // "container",
        "w-full"
      )}
      style={{
        height: "60px",
        gap: "34px",
        padding: "0 200px",
      }}
    >
      {/* Logo */}
      <Link href="/" className={clsx('no-underline', 'flex', 'items-center')}>
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
        className={clsx('flex', 'items-center', 'no-underline', 'transition-colors')}
        style={{ color: "var(--nav-link)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--nav-link-hover)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--nav-link)")
        }
      >
        <GithubIcon size={18} color="currentColor" variant="solid" />
      </a>

      {/* Theme toggle */}
      <button
        className={clsx('flex', 'items-center', 'justify-center', 'transition-colors')}
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
        {isDark ? (
          <Moon02Icon size={16} color="currentColor" />
        ) : (
          <Sun01Icon size={16} color="currentColor" />
        )}
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
      <button
        data-cal-link="https://cal.com/parminder360/chat"
        data-cal-config={`{"layout":"month_view","theme":"${isDark ? 'dark' : 'light'}"}`}
        className={clsx("transition-all", "flex", "items-center")}
        style={{
          cursor: "pointer",
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
        <Calendar01Icon size={14} color="currentColor" />
        Book a Meet
      </button>
    </nav>
  );
}
