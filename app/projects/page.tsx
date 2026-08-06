
"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <main
      style={{
        gridColumn: "2",
        gridRow: "5",
        padding: "80px 24px 60px",
        fontFamily: "var(--font-geist-mono)",
        minWidth: 0,
      }}
    >
      {/* Page Header */}
      <div style={{ marginBottom: "32px" }}>
        {/* Breadcrumb */}
        <div
          style={{
            fontSize: "10px",
            color: "var(--nav-link)",
            letterSpacing: "0.08em",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Link
            href="/"
            style={{ color: "var(--nav-link)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--nav-link-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--nav-link)")}
          >
            HOME
          </Link>
          <span style={{ opacity: 0.5 }}>/</span>
          <span style={{ color: "var(--foreground)" }}>PROJECTS</span>
        </div>

        {/* Title */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "9px", color: "var(--nav-link)", letterSpacing: "0.1em", marginBottom: "6px" }}>
              SECTION_02 // PROFESSIONAL_PORTFOLIO
            </div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "var(--foreground)",
                margin: 0,
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              Projects
            </h1>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <CadProjects />
      </div>

      {/* Back to Home Link */}
      <div style={{ marginTop: "40px", display: "flex", justifyContent: "center" }}>
        <Link
          href="/"
          style={{
            fontSize: "11px",
            letterSpacing: "0.08em",
            color: "var(--nav-link)",
            textDecoration: "none",
            padding: "8px 16px",
            border: "1px solid var(--line-stroke-accent)",
            borderRadius: "3px",
            transition: "all 0.2s",
            fontFamily: "var(--font-geist-mono)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--foreground)";
            e.currentTarget.style.borderColor = "var(--foreground)";
            e.currentTarget.style.backgroundColor = "var(--line-fill-accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--nav-link)";
            e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          ← BACK_TO_HOME
        </Link>
      </div>
    </main>
  );
}

function CadExperience() {
  const [expandedId, setExpandedId] = useState<string>("EXP-01");

  const experiences = [
    {
      id: "EXP-01",
      role: "Founder & Lead Engineer",
      company: "Kosh",
      period: "2025 — PRESENT",
      status: "ACTIVE",
      description:
        "Building a full-fledged email platform from scratch — custom SMTP server, entire mail infrastructure, and a modern client with both a chat-like interface for new-gen users and a traditional UI for classic email users. Leading architecture, product design, and end-to-end development.",
      tech: ["Next.js", "Node.js", "JavaScript", "AWS", "SMTP", "Socket.io", "Razorpay", "PostgreSQL"],
    },
    {
      id: "EXP-02",
      role: "Freelance Web & App Developer",
      company: "Freelancing",
      period: "2025 — PRESENT",
      status: "ACTIVE",
      description: "Building a full-fledged web and mobile applications for clients across the globe, utilizing the latest technologies and industry best practices.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind", "motion", "nodejs", "express", "mongodb", "Supabase", "Socket.io", "Razorpay"],
    },

    {
      id: "EXP-03",
      role: "Full Stack Developer",
      company: "Devnovate.co",
      period: "2025 — 2026",
      status: "COMPLETED",
      description:
        "Redesigned the existing UI/UX of the company's website & added new features.",
      tech: ["React", "TypeScript", "Tailwind", "motion", "nodejs", "express", "mongodb"],
    },
    {
      id: "EXP-04",
      role: "Frontend Developer",
      company: "Microsun global infotech LLP",
      period: "Oct 2025 — Dec 2025",
      status: "COMPLETED",
      description:
        "Worked on designing the UI of the company's website and clients SME portals using Figma and React.",
      tech: ["Figma", "TypeScript", "React", "Vite", "Tailwind", "Motion", "Chakra UI"],
    },
  ];

  return (
    <div
      id="experience"
      style={{
        marginTop: "24px",
        border: "1px solid var(--line-stroke-accent)",
        backgroundColor: "var(--line-fill)",
        position: "relative",
        fontSize: "12px",
        fontFamily: "var(--font-geist-mono)",
      }}
    >
      {/* CAD Corner Crosshairs */}
      <div style={{ position: "absolute", top: "-6px", left: "-6px", color: "var(--line-stroke-accent)", fontSize: "10px", lineHeight: "1" }}>+</div>
      <div style={{ position: "absolute", top: "-6px", right: "-6px", color: "var(--line-stroke-accent)", fontSize: "10px", lineHeight: "1" }}>+</div>
      <div style={{ position: "absolute", bottom: "-6px", left: "-6px", color: "var(--line-stroke-accent)", fontSize: "10px", lineHeight: "1" }}>+</div>
      <div style={{ position: "absolute", bottom: "-6px", right: "-6px", color: "var(--line-stroke-accent)", fontSize: "10px", lineHeight: "1" }}>+</div>

      {/* CAD Height Dimension (Left Side) */}
      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "-12px",
          width: "6px",
          borderTop: "1px solid var(--line-stroke-accent)",
          borderBottom: "1px solid var(--line-stroke-accent)",
          borderLeft: "1px solid var(--line-stroke-accent)",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "0",
            transform: "translate(-50%, -50%) rotate(-90deg)",
            fontSize: "9px",
            fontFamily: "var(--font-geist-mono)",
            color: "var(--line-stroke-accent)",
            backgroundColor: "var(--background)",
            padding: "0 4px",
            letterSpacing: "0.1em",
            whiteSpace: "nowrap",
          }}
        >
          H: AUTO
        </span>
      </div>

      {/* Header Bar */}
      <div
        style={{
          borderBottom: "1px solid var(--line-stroke-accent)",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "var(--line-fill-accent)",
          fontSize: "11px",
          letterSpacing: "0.1em",
          color: "var(--nav-link-hover)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "6px", height: "6px", backgroundColor: "#f59e0b", borderRadius: "50%", display: "inline-block" }} />
          <span>SPEC_DATA // EXPERIENCE_TIMELINE</span>
        </div>
        <span>TOTAL: 0{experiences.length}_NODES</span>
      </div>

      {/* Experience Entries */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0" }}>
        {experiences.map((exp, index) => {
          const isExpanded = expandedId === exp.id;
          const statusColor = exp.status === "ACTIVE" ? "#22c55e" : exp.status === "ONGOING" ? "#3b82f6" : "var(--nav-link)";

          return (
            <div
              key={exp.id}
              style={{
                borderBottom: index === experiences.length - 1 ? "none" : "1px solid var(--line-stroke)",
                backgroundColor: "var(--background)",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--line-fill)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--background)";
              }}
            >
              {/* Compact Header Row — always visible */}
              <div
                style={{
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setExpandedId(isExpanded ? "" : exp.id)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {/* Company icon */}
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      border: "1px solid var(--line-stroke-accent)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--foreground)",
                      backgroundColor: "var(--line-fill-accent)",
                      flexShrink: 0,
                    }}
                  >
                    {exp.company.charAt(0)}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)" }}>{exp.role}</span>
                      <span
                        style={{
                          fontSize: "8px",
                          padding: "2px 6px",
                          border: `1px solid ${statusColor}`,
                          color: statusColor,
                          letterSpacing: "0.08em",
                          borderRadius: "2px",
                        }}
                      >
                        {exp.status}
                      </span>
                    </div>
                    <span style={{ fontSize: "10px", color: "var(--nav-link-hover)", fontWeight: 500 }}>
                      @ {exp.company} · <span style={{ color: "var(--nav-link)", fontWeight: 400 }}>{exp.period}</span>
                    </span>
                  </div>
                </div>

                {/* Expand/Collapse chevron */}
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    border: "1px solid var(--line-stroke-accent)",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                    color: "var(--foreground)",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transition: "transform 0.3s ease",
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              {/* Expandable Details */}
              <div
                style={{
                  overflow: "hidden",
                  maxHeight: isExpanded ? "500px" : "0px",
                  transition: "max-height 0.4s ease, opacity 0.3s ease",
                  opacity: isExpanded ? 1 : 0,
                }}
              >
                <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {/* Divider */}
                  <div style={{ borderTop: "1px dashed var(--line-stroke)" }} />

                  {/* Description */}
                  <div style={{ color: "var(--nav-link-hover)", fontSize: "12px", lineHeight: "1.6", maxWidth: "800px" }}>
                    {exp.description}
                  </div>

                  {/* Tech Tags */}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          padding: "3px 7px",
                          backgroundColor: "var(--background)",
                          border: "1px solid var(--line-stroke)",
                          color: "var(--foreground)",
                          fontSize: "10px",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CadProjects() {
  const [expandedId, setExpandedId] = useState<string>("PRJ-01");

  const projects = [
    {
      id: "PRJ-01",
      name: "Kosh",
      status: "PRODUCTION",
      description: "A full-stack email platform built entirely from scratch with a custom SMTP server and complete mail architecture. Features a chat-like interface for new-gen users alongside a traditional email UI, instant custom domain provisioning, AI-powered smart filtering, and a unified cross-platform experience.",
      tech: ["Next.js", "Node.js", "JavaScript", "Razorpay", "AWS", "SMTP", "Motion", "Socket.io", "PostgreSQL"],
      link: "https://kosh.uno",
    },
    {
      id: "PRJ-02",
      name: "Rajdoot",
      status: "PRODUCTION",
      description: "Sophisticated Messaging APIs for Developers. Build powerful messaging applications with our elegant, reliable, and affordable API platform.",
      tech: ["React", "Tailwind", "Node.js", "MongoDB", "Razorpay", "AWS", "Cloudinary", "Arduino", "Motion", "Socket.io"],
      link: "https://Rajdoot.wtf",
    },
    {
      id: "PRJ-03",
      name: "Swasthya",
      status: "PRODUCTION",
      description: "A platform that allows you to monitor your health and get alerts when your health is not good. It also allows you to track your family and friends medication and health.",
      tech: ["React Native", "Node.js", "Tailwind", "Motion", "MongoDB", "AWS", "Cloudinary", "IOT"],
      link: "https://swasthya.parminder.pro",
    },
    {
      id: "PRJ-04",
      name: "ZURL",
      status: "PRODUCTION",
      description: "URL Shortener with a twist. Shorten your URLs and share them with the world. ZURL is a URL shortener that allows you to create short links for your long URLs.",
      tech: ["React", "Node.js", "Tailwind", "MongoDB", "Motion"],
      link: "https://zurl.parminder.pro",
    },
  ];

  return (
    <div
      id="projects"
      style={{
        marginTop: "24px",
        border: "1px solid var(--line-stroke-accent)",
        backgroundColor: "var(--line-fill)",
        position: "relative",
        fontSize: "12px",
        fontFamily: "var(--font-geist-mono)",
      }}
    >
      {/* CAD Corner Crosshairs */}
      <div style={{ position: "absolute", top: "-6px", left: "-6px", color: "var(--line-stroke-accent)", fontSize: "10px", lineHeight: "1" }}>+</div>
      <div style={{ position: "absolute", top: "-6px", right: "-6px", color: "var(--line-stroke-accent)", fontSize: "10px", lineHeight: "1" }}>+</div>
      <div style={{ position: "absolute", bottom: "-6px", left: "-6px", color: "var(--line-stroke-accent)", fontSize: "10px", lineHeight: "1" }}>+</div>
      <div style={{ position: "absolute", bottom: "-6px", right: "-6px", color: "var(--line-stroke-accent)", fontSize: "10px", lineHeight: "1" }}>+</div>

      {/* CAD Height Dimension (Left Side) */}
      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "-12px",
          width: "6px",
          borderTop: "1px solid var(--line-stroke-accent)",
          borderBottom: "1px solid var(--line-stroke-accent)",
          borderLeft: "1px solid var(--line-stroke-accent)",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "0",
            transform: "translate(-50%, -50%) rotate(-90deg)",
            fontSize: "9px",
            fontFamily: "var(--font-geist-mono)",
            color: "var(--line-stroke-accent)",
            backgroundColor: "var(--background)",
            padding: "0 4px",
            letterSpacing: "0.1em",
            whiteSpace: "nowrap",
          }}
        >
          H: AUTO
        </span>
      </div>

      {/* CAD Width Dimension (Top Side) */}
      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "-12px",
          left: "0",
          right: "0",
          height: "6px",
          borderLeft: "1px solid var(--line-stroke-accent)",
          borderRight: "1px solid var(--line-stroke-accent)",
          borderTop: "1px solid var(--line-stroke-accent)",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "9px",
            fontFamily: "var(--font-geist-mono)",
            color: "var(--line-stroke-accent)",
            backgroundColor: "var(--background)",
            padding: "0 4px",
            letterSpacing: "0.1em",
            whiteSpace: "nowrap",
          }}
        >
          W: 100% (SCALE 1:1)
        </span>
      </div>

      {/* Header Bar */}
      <div
        style={{
          borderBottom: "1px solid var(--line-stroke-accent)",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "var(--line-fill-accent)",
          fontSize: "11px",
          letterSpacing: "0.1em",
          color: "var(--nav-link-hover)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "6px", height: "6px", backgroundColor: "#3b82f6", borderRadius: "50%", display: "inline-block" }} />
          <span>SPEC_DATA // PROJECTS_SCHEMA</span>
        </div>
        <span>TOTAL: 0{projects.length}_ACTIVE_NODES</span>
      </div>

      {/* Projects Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0" }}>
        {projects.map((prj, index) => {
          const isExpanded = expandedId === prj.id;

          return (
            <div
              key={prj.id}
              style={{
                borderBottom: index === projects.length - 1 ? "none" : "1px solid var(--line-stroke)",
                backgroundColor: "var(--background)",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--line-fill)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--background)";
              }}
            >
              {/* Compact Header Row — always visible */}
              <div
                style={{
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setExpandedId(isExpanded ? "" : prj.id)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {/* Project icon */}
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      border: "1px solid var(--line-stroke-accent)",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--foreground)",
                      backgroundColor: "var(--line-fill-accent)",
                      flexShrink: 0,
                    }}
                  >
                    {prj.name.charAt(0)}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)" }}>{prj.name}</span>
                      <span
                        style={{
                          fontSize: "8px",
                          padding: "2px 6px",
                          border: "1px solid var(--line-stroke-accent)",
                          color: "var(--nav-link)",
                          letterSpacing: "0.08em",
                          borderRadius: "2px",
                        }}
                      >
                        {prj.status}
                      </span>
                    </div>
                    <span style={{ fontSize: "9px", color: "var(--nav-link)", letterSpacing: "0.05em" }}>{prj.id}</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {/* Live link */}
                  {prj.link && prj.link !== "#" && (
                    <a
                      href={prj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "4px 8px",
                        border: "1px dashed var(--line-stroke-accent)",
                        color: "var(--foreground)",
                        fontSize: "10px",
                        textDecoration: "none",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--foreground)";
                        e.currentTarget.style.backgroundColor = "var(--line-fill-accent)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      <span>LIVE</span>
                    </a>
                  )}

                  {/* Expand/Collapse chevron */}
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      border: "1px solid var(--line-stroke-accent)",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                      color: "var(--foreground)",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        transition: "transform 0.3s ease",
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Expandable Details */}
              <div
                style={{
                  overflow: "hidden",
                  maxHeight: isExpanded ? "500px" : "0px",
                  transition: "max-height 0.4s ease, opacity 0.3s ease",
                  opacity: isExpanded ? 1 : 0,
                }}
              >
                <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {/* Divider */}
                  <div style={{ borderTop: "1px dashed var(--line-stroke)", marginBottom: "0" }} />

                  {/* Description */}
                  <div style={{ color: "var(--nav-link-hover)", fontSize: "12px", lineHeight: "1.6", maxWidth: "800px" }}>
                    {prj.description}
                  </div>

                  {/* Tech Stack Tags */}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {prj.tech.map(t => (
                      <span
                        key={t}
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "var(--background)",
                          border: "1px solid var(--line-stroke)",
                          color: "var(--foreground)",
                          fontSize: "10px",
                          letterSpacing: "0.05em"
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
