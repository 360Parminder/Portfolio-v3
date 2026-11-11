"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { GithubIcon, Moon02Icon, Sun01Icon, Calendar01Icon, Menu01Icon, Cancel01Icon } from "hugeicons-react";
import { getCalApi } from "@calcom/embed-react";
import { CAD_EASE, CadDraftRule, useCadDraft } from "./CadDraft";

export function Navbar() {
  const { instantDone, isResetting } = useCadDraft();
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
    { name: "PROJECTS", code: "03", href: "/projects" },
    { name: "FLOWS", code: "04", href: "/flows" },
    { name: "BLOG", code: "05", href: "/blog" },
    { name: "RESUME", code: "06", href: "/resume" },
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
          backgroundColor: "var(--background)",
          fontFamily: "var(--font-geist-mono)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Bottom ruled drafting line */}
        <CadDraftRule
          axis="x"
          origin="left"
          delay={0.25}
          duration={1.1}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "1px",
            backgroundColor: "var(--line-stroke-accent)",
            pointerEvents: "none",
          }}
        />

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
                position: "relative",
              }}
            >
              <svg width="26" height="26" viewBox="0 0 200 200" fill="none" aria-label="logo">
                <motion.rect
                  width="200"
                  height="200"
                  rx="47"
                  fill="white"
                  stroke="rgba(128, 128, 128, 0.35)"
                  strokeWidth="3"
                  initial={instantDone ? { fillOpacity: 1, pathLength: 1 } : { fillOpacity: 0, pathLength: 0 }}
                  animate={
                    instantDone
                      ? { fillOpacity: 1, pathLength: 1 }
                      : isResetting
                        ? { fillOpacity: 0, pathLength: 0 }
                        : { fillOpacity: 1, pathLength: 1 }
                  }
                  transition={
                    instantDone || isResetting
                      ? { duration: 0 }
                      : {
                          pathLength: { delay: 0.32, duration: 0.65, ease: CAD_EASE },
                          fillOpacity: { delay: 0.46, duration: 0.44 },
                        }
                  }
                />
                <motion.path
                  d="M42.6451 66.199V48.247H158.398V66.199H143.999V174.285L120.811 163.813V140.625C112.458 147.357 105.103 150.723 98.7451 150.723C96.7504 150.723 94.6934 150.411 92.5741 149.788C90.4547 149.04 88.2107 147.856 85.8421 146.235C83.4734 144.614 81.4164 143.181 79.6711 141.934C77.9257 140.563 75.6817 138.568 72.9391 135.95C70.3211 133.207 68.3264 131.213 66.9551 129.966C65.7084 128.595 63.6514 126.413 60.7841 123.421C58.0414 120.304 56.2961 118.372 55.5481 117.624C54.8001 116.876 54.4261 99.7343 54.4261 66.199H42.6451ZM77.8011 125.104C83.1617 130.34 90.4547 131.088 99.6801 127.348C108.905 123.608 115.949 117.624 120.811 109.396V66.199H77.4271L77.8011 125.104Z"
                  fill="black"
                  stroke="black"
                  strokeWidth="5"
                  strokeLinejoin="round"
                  initial={
                    instantDone
                      ? { fillOpacity: 1, pathLength: 1, strokeOpacity: 0 }
                      : { fillOpacity: 0, pathLength: 0, strokeOpacity: 1 }
                  }
                  animate={
                    instantDone
                      ? { fillOpacity: 1, pathLength: 1, strokeOpacity: 0 }
                      : isResetting
                        ? { fillOpacity: 0, pathLength: 0, strokeOpacity: 1 }
                        : { fillOpacity: 1, pathLength: 1, strokeOpacity: 0 }
                  }
                  transition={
                    instantDone || isResetting
                      ? { duration: 0 }
                      : {
                          pathLength: { delay: 0.6, duration: 1.05, ease: CAD_EASE },
                          fillOpacity: { delay: 1.32, duration: 0.48 },
                          strokeOpacity: { delay: 1.4, duration: 0.48 },
                        }
                  }
                />
              </svg>
            </div>
          </Link>

          {/* CAD Identifier Tag */}
          <motion.div
            initial={instantDone ? { opacity: 1 } : { opacity: 0 }}
            animate={instantDone ? { opacity: 1 } : isResetting ? { opacity: 0 } : { opacity: 1 }}
            transition={instantDone || isResetting ? { duration: 0 } : { delay: 0.7, duration: 0.58 }}
            style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10px", color: "var(--nav-link)" }}
          >
            <span style={{ color: "var(--line-stroke-accent)" }}>[+]</span>
            <span style={{ letterSpacing: "0.1em" }}>SYS_NAV // REV_01</span>
          </motion.div>
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
          {navLinks.map((item, i) => (
            <motion.div
              key={item.name}
              initial={instantDone ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
              animate={
                instantDone
                  ? { opacity: 1, y: 0 }
                  : isResetting
                    ? { opacity: 0, y: -4 }
                    : { opacity: 1, y: 0 }
              }
              transition={instantDone || isResetting ? { duration: 0 } : { delay: 0.6 + i * 0.1, duration: 0.54, ease: CAD_EASE }}
            >
              <Link
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
                <span style={{ fontSize: "9px", opacity: 0.5 }}>{item.code} {"//"}</span>
                <span>{item.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right Controls: GitHub, Theme Toggle, Cal.com Meet */}
        <motion.div
          initial={instantDone ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
          animate={
            instantDone
              ? { opacity: 1, y: 0 }
              : isResetting
                ? { opacity: 0, y: -4 }
                : { opacity: 1, y: 0 }
          }
          transition={instantDone || isResetting ? { duration: 0 } : { delay: 1.12, duration: 0.6, ease: CAD_EASE }}
          style={{ display: "flex", alignItems: "center", gap: "12px" }}
        >
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
        </motion.div>
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
