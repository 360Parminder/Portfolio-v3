"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { HoverTechTag } from "../components/HoverTechTag";

export default function WorkPage() {
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
          <span style={{ color: "var(--foreground)" }}>WORK</span>
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
              Work Experience
            </h1>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <CadExperience />
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

  const experiences = [
    {
      id: "EXP-01",
      role: "Freelance Web & App Developer",
      company: "Freelancing",
      period: "Apr 2026 — Present",
      location: "Remote",
      status: "ACTIVE",
      description: [
        "Building full-fledged web and mobile applications for clients across the globe using React, Next.js, and React Native.",
        "Designing scalable backend architectures with Node.js, Express, MongoDB, and Supabase integration.",
        "Implementing real-time communication features, payment gateways (Razorpay), and smooth UI animations with Motion."
      ],
      tech: ["Next.js", "React", "TypeScript", "Tailwind", "motion", "nodejs", "express", "mongodb", "Supabase", "Socket.io", "Razorpay"],
    },
    {
      id: "EXP-02",
      role: "Full Stack Developer",
      company: "Devnovate.co",
      period: "Jan 2025 — May 2026",
      location: "Remote",
      status: "COMPLETED",
      description: [
        "Redesigned the existing UI/UX of the company's core web platform to significantly enhance user engagement and accessibility.",
        "Developed responsive frontend components using React, TypeScript, and Tailwind CSS with fluid motion effects.",
        "Engineered RESTful backend APIs and optimized database models using Node.js, Express, and MongoDB."
      ],
      tech: ["React", "TypeScript", "Tailwind", "motion", "nodejs", "express", "mongodb", "Chakra UI"],
    },
    {
      id: "EXP-03",
      role: "Frontend Developer",
      company: "Microsun global infotech LLP",
      period: "Oct 2025 — Dec 2025",
      location: "Remote",
      status: "COMPLETED",
      description: [
        "Designed high-fidelity UI wireframes and interactive prototypes in Figma for client SME portals.",
        "Developed modular, high-performance web application interfaces using React, Vite, TypeScript, and Chakra UI.",
        "Collaborated with cross-functional teams to integrate backend APIs, improve load speed, and ensure cross-browser compatibility."
      ],
      tech: ["Figma", "JavaScript", "React", "Vite", "Tailwind", "Motion", "AWS"],
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


      {/* CAD Height Dimension (Left Side) */}
      <div
        className={clsx('hidden', 'md:block')}
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
      <div style={{ display: "flex", flexDirection: "column", gap: "32px", padding: "24px 20px" }}>
        {experiences.map((exp, index) => {
          const statusColor = exp.status === "ACTIVE" ? "#22c55e" : "var(--nav-link)";
          const isLast = index === experiences.length - 1;

          return (
            <div
              key={exp.id}
              style={{
                borderBottom: isLast ? "none" : "1px dashed var(--line-stroke)",
                paddingBottom: isLast ? "0" : "12px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Top Row: Company, Role, Date, Location */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
                {/* Left Side */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "20px", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em" }}>{exp.company}</span>
                    {exp.status === "ACTIVE" ?
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "3px 10px",
                          border: `1px solid ${statusColor}`,
                          borderStyle: "dotted",
                          borderRadius: "5px",
                          fontSize: "11px",
                          color: statusColor,
                          backgroundColor: "var(--line-fill-accent)",
                          letterSpacing: "0.05em",
                          fontWeight: 500,
                        }}
                      >
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: statusColor }} />
                        Working
                      </span> : null}
                  </div>
                  <span style={{ fontSize: "14px", color: "var(--nav-link-hover)" }}>{exp.role}</span>
                </div>

                {/* Right Side */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                  <span style={{ fontSize: "14px", color: "var(--nav-link-hover)" }}>{exp.period}</span>
                  <span style={{ fontSize: "13px", color: "var(--nav-link)" }}>{exp.location}</span>
                </div>
              </div>

              {/* Technologies & Tools */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)" }}>Technologies & Tools</span>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {exp.tech.map((t) => (
                    <HoverTechTag
                      key={t}
                      techName={t}
                      baseStyle={{
                        padding: "12px 12px",
                        backgroundColor: "var(--line-fill-accent)",
                        border: "1px dashed var(--line-stroke-accent)",
                        color: "var(--foreground)",
                        fontSize: "12px",
                        borderRadius: "6px",
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* What I've done */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}>
                <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)" }}>What I&apos;ve done</span>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {(Array.isArray(exp.description) ? exp.description : [exp.description]).map((desc, i) => (
                    <li key={i} style={{ display: "flex", gap: "12px", color: "var(--nav-link-hover)", fontSize: "13px", lineHeight: "1.6" }}>
                      <span style={{ color: "var(--line-stroke-accent)", marginTop: "1px", fontSize: "10px" }}>▪</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
