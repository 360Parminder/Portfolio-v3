"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GithubIcon, Moon02Icon, Sun01Icon, Calendar01Icon, Menu01Icon, Cancel01Icon } from "hugeicons-react";
import { getCalApi } from "@calcom/embed-react";

export function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    // Play mode-change sound
    const audio = new Audio("/mode_change_sound.mp3");
    audio.volume = 0.5;
    audio.play().catch(() => { });
  };

  const navLinks = [
    { name: "HOME", code: "01", href: "/" },
    { name: "WORK", code: "02", href: "/work" },
    { name: "BLOG", code: "03", href: "/blog" },
    { name: "RESUME", code: "04", href: "/resume" },
  ];

  return (
    <>
      {/* ── DESKTOP NAVBAR ── */}
      <nav
        className={clsx(
          "hidden md:flex",
          "fixed",
          "top-0",
          "z-40",
          "items-center",
          "justify-between",
          "w-full",
          "overflow-x-auto",
          "scrollbar-hide",
          "whitespace-nowrap"
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
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
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
            <GithubIcon size={14} color="currentColor" />
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

      {/* ── MOBILE NAVIGATION ── */}
      <div className="md:hidden">
        {/* Mobile Floating Pill */}
        <div
          className={clsx('fixed', 'bottom-12', 'left-1/2', '-translate-x-1/2', 'z-50', 'flex', 'items-center', 'justify-between', 'gap-4', 'px-5', 'py-3', 'rounded-full', 'backdrop-blur-xl', 'shadow-lg', 'border', 'border-[var(--line-stroke-accent)]')}
          style={{
            backgroundColor: "color-mix(in srgb, var(--background) 75%, transparent)",
          }}
        >
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={clsx('flex', 'items-center', 'justify-center', 'transition-colors')}
            style={{ color: "var(--nav-link)" }}
            aria-label="Toggle Dark / Light Theme"
          >
            {isDark ? <Moon02Icon size={22} color="currentColor" /> : <Sun01Icon size={22} color="currentColor" />}
          </button>

          <div className={clsx('w-[1px]', 'h-6', 'bg-[var(--line-stroke-accent)]', 'opacity-50')} />

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={clsx('flex', 'items-center', 'justify-center', 'transition-colors')}
            style={{ color: "var(--foreground)" }}
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <Cancel01Icon size={22} color="currentColor" /> : <Menu01Icon size={22} color="currentColor" />}
          </button>
        </div>

        {/* Mobile Popup Menu Card */}
        {isMobileMenuOpen && (
          <div
            className={clsx('fixed', 'bottom-32', 'left-1/2', '-translate-x-1/2', 'z-40', 'w-[240px]', 'rounded-[24px]', 'p-4', 'shadow-2xl', 'border', 'border-[var(--line-stroke-accent)]', 'backdrop-blur-xl')}
            style={{
              backgroundColor: "color-mix(in srgb, var(--background) 80%, transparent)",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            <div className={clsx('flex', 'flex-col', 'gap-1')}>
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={clsx('flex', 'items-center', 'gap-3', 'p-3', 'rounded-xl', 'no-underline', 'transition-all', 'border', 'border-transparent')}
                  style={{
                    color: "var(--nav-link)",
                    fontSize: "12px",
                    letterSpacing: "0.08em",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--foreground)";
                    e.currentTarget.style.backgroundColor = "var(--line-fill)";
                    e.currentTarget.style.borderColor = "var(--line-stroke)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--nav-link)";
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                >
                  <span style={{ fontSize: "10px", opacity: 0.5, width: "20px" }}>{item.code}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}

              <div className={clsx('my-3', 'mx-2', 'border-t', 'border-[var(--line-stroke)]', 'opacity-50')} />

              {/* Action Buttons in Mobile Menu */}
              <div className={clsx('flex', 'items-center', 'justify-between', 'gap-2', 'px-1')}>
                <a
                  href="https://github.com/360Parminder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx('flex', 'items-center', 'justify-center', 'flex-1', 'py-2.5', 'rounded-xl', 'border', 'border-[var(--line-stroke-accent)]', 'transition-colors')}
                  style={{ color: "var(--foreground)", backgroundColor: "var(--line-fill)" }}
                >
                  <GithubIcon size={16} color="currentColor" />
                </a>

                <button
                  data-cal-link="https://cal.com/parminder360/chat"
                  data-cal-config={`{"layout":"month_view","theme":"${isDark ? 'dark' : 'light'}"}`}
                  className={clsx('flex', 'items-center', 'justify-center', 'flex-1', 'py-2.5', 'rounded-xl', 'border', 'border-[var(--line-stroke-accent)]', 'transition-colors')}
                  style={{ color: "var(--foreground)", backgroundColor: "var(--line-fill-accent)" }}
                >
                  <Calendar01Icon size={16} color="currentColor" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
