"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ProjectLogo } from "./ProjectLogo";

export interface ProjectSlide {
  badge: string;
  title: string;
  urlLabel: string;
  image: string;
}

export interface ProjectCardMeta {
  brandColor: string;
  bgGradient: string;
  stars: string;
}

// ── REAL WEBSITE SCREENSHOTS FOR EACH PROJECT ──

function getProjectSlides(projectName: string): ProjectSlide[] {
  switch (projectName) {
    case "Kosh":
      return [
        {
          badge: "HERO",
          title: "Custom Domain Email Platform",
          urlLabel: "kosh.uno",
          image: "/projects/kosh/01-hero.webp",
        },
        {
          badge: "CHAT_WEBMAIL",
          title: "Conversational Thread Experience",
          urlLabel: "kosh.uno · Chat View",
          image: "/projects/kosh/02-chat-webmail.webp",
        },
        {
          badge: "INFRASTRUCTURE",
          title: "Automated DNS & Security Setup",
          urlLabel: "kosh.uno/how-it-works",
          image: "/projects/kosh/03-how-it-works.webp",
        },
        {
          badge: "PRICING",
          title: "Flat Zero Per-Seat Pricing",
          urlLabel: "kosh.uno/pricing",
          image: "/projects/kosh/04-pricing.webp",
        },
      ];

    case "Swasthya":
      return [
        {
          badge: "HERO",
          title: "Smart Health & Medication Tracking",
          urlLabel: "swasthya.pro",
          image: "/projects/swasthya/01-hero.webp",
        },
        {
          badge: "APP_SHOWCASE",
          title: "Daily Action & Medication Screens",
          urlLabel: "swasthya.pro/showcase",
          image: "/projects/swasthya/02-showcase.webp",
        },
        {
          badge: "CARE_CIRCLE",
          title: "Family Medication Oversight",
          urlLabel: "swasthya.pro/showcase",
          image: "/projects/swasthya/03-care-circle.webp",
        },
        {
          badge: "CAPABILITIES",
          title: "Activity, Diet & Wellness Suite",
          urlLabel: "swasthya.pro/features",
          image: "/projects/swasthya/04-features.webp",
        },
      ];

    case "Rajdoot":
      return [
        {
          badge: "HERO",
          title: "Messaging APIs for Developers",
          urlLabel: "rajdoot.parminder.pro",
          image: "/projects/rajdoot/01-hero.webp",
        },
        {
          badge: "DASHBOARD",
          title: "Messages Overview & Analytics",
          urlLabel: "rajdoot.parminder.pro",
          image: "/projects/rajdoot/02-dashboard.webp",
        },
        {
          badge: "DOCS",
          title: "Developer Guides & SDK Reference",
          urlLabel: "rajdoot.parminder.pro/docs",
          image: "/projects/rajdoot/03-docs.webp",
        },
        {
          badge: "API_REFERENCE",
          title: "REST Messaging Endpoints",
          urlLabel: "rajdoot.parminder.pro/api-reference",
          image: "/projects/rajdoot/04-api.webp",
        },
      ];

    case "ZURL":
    default:
      return [
        {
          badge: "HERO",
          title: "Shorten Your Reach",
          urlLabel: "zurl.parminder.pro",
          image: "/projects/zurl/01-hero.webp",
        },
        {
          badge: "FEATURES",
          title: "Real-Time Analytics & Security",
          urlLabel: "zurl.parminder.pro/#features",
          image: "/projects/zurl/02-features.webp",
        },
        {
          badge: "WORKFLOW",
          title: "Capture, Transform & Monitor",
          urlLabel: "zurl.parminder.pro",
          image: "/projects/zurl/03-workflow.webp",
        },
        {
          badge: "AUTH_PORTAL",
          title: "Dashboard Authentication Portal",
          urlLabel: "zurl.parminder.pro",
          image: "/projects/zurl/04-portal.webp",
        },
      ];
  }
}

// ── CAD PROJECT CARD WITH VERTICAL BOTTOM-TO-TOP SCREENSHOT CAROUSEL ──

export function CadProjectCardItem({
  prj,
  meta,
  index = 0,
}: {
  prj: {
    id: string;
    name: string;
    description: string | string[];
    link: string;
    status: string;
    tech: string[];
  };
  meta: ProjectCardMeta;
  index?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const slides = getProjectSlides(prj.name);
  const currentSlide = slides[activeSlide] ?? slides[0];
  const displayDesc = Array.isArray(prj.description) ? prj.description[0] : prj.description;

  // Auto-play vertical carousel from bottom to top on hover
  useEffect(() => {
    if (!hovered || slides.length <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 2600);

    return () => clearInterval(timer);
  }, [hovered, slides.length]);

  const handleCycleNext = () => {
    if (slides.length <= 1) return;
    setDirection(1);
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "flex", flexDirection: "column" }}
    >
      {/* Title Bar above card */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
          padding: "0 2px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <h3
            style={{
              fontSize: "17px",
              fontWeight: 600,
              margin: 0,
              color: meta.brandColor,
              fontFamily: "var(--font-geist-sans), sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            {prj.name.toLowerCase()}
          </h3>
        </div>

        <motion.div
          whileHover={{ scale: 1.08 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: "var(--nav-link)",
            fontSize: "12px",
            fontFamily: "var(--font-geist-mono), monospace",
            cursor: "default",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span>{meta.stars}</span>
        </motion.div>
      </div>

      {/* Card Preview Container with Vertical Bottom-to-Top Screenshot Carousel */}
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 10",
          minHeight: "230px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          overflow: "hidden",
          border: hovered ? `1px solid ${meta.brandColor}` : "1px solid var(--line-stroke-accent)",
          backgroundColor: "var(--background)",
          boxShadow: hovered ? "0 14px 34px -10px rgba(0,0,0,0.3)" : "none",
          transition: "border 0.3s ease, box-shadow 0.3s ease",
          userSelect: "none",
        }}
      >
        {/* Browser Chrome Header Ribbon */}
        <div
          style={{
            flexShrink: 0,
            padding: "8px 12px",
            borderBottom: "1px solid var(--line-stroke-accent)",
            backgroundColor: "var(--line-fill-accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
            zIndex: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
            <ProjectLogo url={prj.link} name={prj.name} size={18} shape="rounded" />
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--foreground)",
                letterSpacing: "0.04em",
                flexShrink: 0,
              }}
            >
              {prj.name.toUpperCase()}
            </span>
            <span
              style={{
                fontSize: "9px",
                color: meta.brandColor,
                fontWeight: 600,
                letterSpacing: "0.06em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {"//"} {currentSlide.badge}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <span
              className="hidden sm:inline"
              style={{
                fontSize: "9px",
                color: "var(--nav-link)",
                letterSpacing: "0.03em",
                maxWidth: "220px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {currentSlide.urlLabel}
            </span>

            {/* Faux window dots */}
            <div style={{ display: "flex", gap: "4px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--line-stroke-accent)" }} />
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--line-stroke-accent)" }} />
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--line-stroke-accent)" }} />
            </div>

            {/* External Live Site Link Button */}
            {prj.link && prj.link !== "#" && (
              <motion.a
                href={prj.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                title={`Visit ${prj.name}`}
                aria-label={`Visit ${prj.name}`}
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(0, 0, 0, 0.72)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.22)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  textDecoration: "none",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </motion.a>
            )}
          </div>
        </div>

        {/* Screenshot Carousel Viewport */}
        <div
          onClick={handleCycleNext}
          title={`${currentSlide.title} — click to preview next screen`}
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
            backgroundColor: "var(--background)",
          }}
        >
          {/* Preload other slide images once hovered so transitions have zero flicker */}
          {hovered &&
            slides.map((s, idx) =>
              idx === activeSlide ? null : (
                <div
                  key={`preload-${s.image}`}
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0,
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                >
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 760px"
                    loading="eager"
                    draggable={false}
                    style={{
                      objectFit: "cover",
                      objectPosition: "top center",
                    }}
                  />
                </div>
              )
            )}

          {/* Animated Vertical Carousel Slides: Flow from Bottom to Top */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeSlide}
              custom={direction}
              variants={{
                enter: (dir: number) => ({
                  y: dir > 0 ? "100%" : "-100%",
                  opacity: 0,
                }),
                center: {
                  y: 0,
                  opacity: 1,
                },
                exit: (dir: number) => ({
                  y: dir > 0 ? "-100%" : "100%",
                  opacity: 0,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                y: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.25 },
              }}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 10,
              }}
            >
              <Image
                src={currentSlide.image}
                alt={`${prj.name} screenshot — ${currentSlide.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 760px"
                loading={index === 0 && activeSlide === 0 ? "eager" : "lazy"}
                draggable={false}
                style={{
                  objectFit: "cover",
                  objectPosition: "top center",
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Bottom-Right Vertical Indicator Dots */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              right: "12px",
              bottom: "12px",
              zIndex: 30,
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              alignItems: "center",
              padding: "6px 5px",
              borderRadius: "12px",
              backgroundColor: "rgba(15, 23, 42, 0.72)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
            }}
          >
            {slides.map((slide, dotIdx) => {
              const isActive = activeSlide === dotIdx;
              return (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDirection(dotIdx >= activeSlide ? 1 : -1);
                    setActiveSlide(dotIdx);
                  }}
                  title={slide.title}
                  aria-label={`View ${prj.name} screenshot ${dotIdx + 1}: ${slide.title}`}
                  style={{
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    width: "5px",
                    height: isActive ? "16px" : "5px",
                    borderRadius: isActive ? "3px" : "50%",
                    backgroundColor: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.45)",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Description below card */}
      <div
        style={{
          marginTop: "12px",
          color: "var(--nav-link-hover)",
          fontSize: "13px",
          lineHeight: "1.6",
          fontFamily: "var(--font-geist-sans), sans-serif",
        }}
      >
        {displayDesc}
      </div>

      {/* Tech pills row with motion */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          marginTop: "12px",
        }}
      >
        {prj.tech.map((t: string) => (
          <motion.span
            key={t}
            whileHover={{ scale: 1.06, y: -1 }}
            transition={{ duration: 0.15 }}
            style={{
              backgroundColor: "var(--background)",
              border: "1px solid var(--line-stroke-accent)",
              color: "var(--nav-link)",
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "9px",
              letterSpacing: "0.04em",
              padding: "2px 6px",
              borderRadius: "3px",
              cursor: "default",
            }}
          >
            {t}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
