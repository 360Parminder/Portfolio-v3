"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GithubIcon, Moon02Icon, Sun01Icon, Calendar01Icon } from "hugeicons-react";
import { getCalApi } from "@calcom/embed-react";

export function Navbar() {
  const [isDark, setIsDark] = useState(true);

  const applyTheme = (dark: boolean) => {
    setIsDark(dark);
    const themeStr = dark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", themeStr);
    if (dark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = savedTheme ? savedTheme === "dark" : systemDark;

    applyTheme(initialDark);

    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: initialDark ? "#ffffff" : "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: initialDark ? "dark" : "light",
      });
    })();
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    applyTheme(nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  };

  return (
    <nav
      className={clsx(
        "fixed",
        "top-0",
        "z-40",
        "flex",
        "items-center",
        "justify-between",
        "w-full"
      )}
      style={{
        height: "60px",
        padding: "0 24px",
        borderBottom: "1px solid var(--line-stroke-accent)",
        backgroundColor: "var(--background)",
        fontFamily: "var(--font-geist-mono)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* CAD Left System Identifier & Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <Link href="/" className={clsx("no-underline", "flex", "items-center")}>
          <div
            style={{
              padding: "4px",
              border: "1px solid var(--line-stroke-accent)",
              borderRadius: "3px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--line-fill)",
            }}
          >
            <Image src="/logo.svg" alt="logo" width={26} height={26} />
          </div>
        </Link>

        {/* CAD Identifier Tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10px", color: "var(--nav-link)" }}>
          <span style={{ color: "var(--line-stroke-accent)" }}>[+]</span>
          <span style={{ letterSpacing: "0.1em" }}>SYS_NAV // REV_01</span>
        </div>
      </div>

      {/* Center Nav Links with CAD Section Indices */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          borderLeft: "1px dashed var(--line-stroke)",
          borderRight: "1px dashed var(--line-stroke)",
          padding: "0 24px",
          height: "100%",
        }}
      >
        {[
          { name: "ABOUT", code: "01" },
          { name: "WORK", code: "02" },
          { name: "SKILLS", code: "03" },
        ].map((item) => (
          <Link
            key={item.name}
            href={`#${item.name.toLowerCase()}`}
            className={clsx("no-underline", "transition-colors", "flex", "items-center", "gap-1.5")}
            style={{
              fontSize: "11px",
              letterSpacing: "0.08em",
              color: "var(--nav-link)",
              fontFamily: "var(--font-geist-mono)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--nav-link-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--nav-link)")}
          >
            <span style={{ fontSize: "9px", opacity: 0.5 }}>{item.code} //</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Right Controls: GitHub, Theme Toggle, Cal.com Meet */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* GitHub Button */}
        <a
          href="https://github.com/360Parminder"
          target="_blank"
          rel="noopener noreferrer"
          className={clsx("flex", "items-center", "no-underline", "transition-colors")}
          style={{
            color: "var(--nav-link)",
            padding: "6px 10px",
            border: "1px solid var(--line-stroke)",
            borderRadius: "3px",
            backgroundColor: "var(--line-fill)",
            fontSize: "11px",
            gap: "6px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--nav-link-hover)";
            e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--nav-link)";
            e.currentTarget.style.borderColor = "var(--line-stroke)";
          }}
        >
          <GithubIcon size={14} color="currentColor" variant="solid" />
          <span style={{ fontSize: "10px" }}>GIT</span>
        </a>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={clsx("flex", "items-center", "justify-center", "transition-colors")}
          style={{
            background: "var(--line-fill)",
            border: "1px solid var(--line-stroke)",
            borderRadius: "3px",
            cursor: "pointer",
            color: "var(--nav-link)",
            padding: "6px 8px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--nav-link-hover)";
            e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--nav-link)";
            e.currentTarget.style.borderColor = "var(--line-stroke)";
          }}
          aria-label="Toggle Dark / Light Theme"
        >
          {isDark ? <Moon02Icon size={14} color="currentColor" /> : <Sun01Icon size={14} color="currentColor" />}
        </button>

        {/* Separator */}
        <div style={{ width: "1px", height: "16px", backgroundColor: "var(--line-stroke)" }} />

        {/* Cal.com Meet Button */}
        <button
          data-cal-link="https://cal.com/parminder360/chat"
          data-cal-config={`{"layout":"month_view","theme":"${isDark ? 'dark' : 'light'}"}`}
          className={clsx("transition-all", "flex", "items-center")}
          style={{
            cursor: "pointer",
            fontSize: "11px",
            letterSpacing: "0.08em",
            color: "var(--foreground)",
            fontFamily: "var(--font-geist-mono)",
            padding: "6px 14px",
            borderRadius: "3px",
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
          <span>MEET_SYNC</span>
        </button>
      </div>
    </nav>
  );
}
