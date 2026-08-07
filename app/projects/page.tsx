
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HoverTechTag } from "../components/HoverTechTag";

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

function CadProjects() {
  const [expandedId, setExpandedId] = useState<string>("PRJ-01");

  const projects = [
    {
      id: "PRJ-01",
      name: "Kosh",
      status: "DEVELOPMENT",
      description: [
        "Engineered a full-stack email platform built entirely from scratch with a custom SMTP server and complete mail processing infrastructure.",
        "Designed a modern client interface featuring both a chat-like experience for next-gen users alongside a classic email layout.",
        "Built automated custom domain provisioning and DNS record verification pipelines for instant tenant onboarding.",
        "Implemented AI-powered smart email filtering, automated thread categorization, and real-time inbox synchronization via Socket.io.",
        "Integrated Razorpay subscription billing, AWS S3 storage for mail attachments, and a PostgreSQL database schema."
      ],
      tech: ["Next.js", "Node.js", "JavaScript","TypeScript","Tailwind", "Razorpay", "AWS", "SMTP", "Motion", "Socket.io", "PostgreSQL"],
      link: "https://kosh.uno",
    },
    {
      id: "PRJ-02",
      name: "Rajdoot",
      status: "PRODUCTION",
      description: [
        "Architected a developer-first messaging API platform for building custom, high-reliability communication apps with sub-100ms latency.",
        "Designed RESTful and WebSocket API endpoints using Node.js, Express, and MongoDB for high-throughput message routing.",
        "Built an interactive developer dashboard with React, Tailwind CSS, and Framer Motion for API key provisioning and real-time usage metrics.",
        "Implemented hardware IoT integration layer supporting physical triggers via Arduino and webhook events for embedded devices.",
        "Integrated Cloudinary asset pipelines, Razorpay subscription tiers, and AWS cloud deployment for scaling infrastructure."
      ],
      tech: ["React", "Tailwind", "Node.js", "MongoDB", "Razorpay", "AWS", "Cloudinary", "Arduino", "Motion", "Socket.io"],
      link: "https://Rajdoot.wtf",
    },
    {
      id: "PRJ-03",
      name: "Swasthya",
      status: "PRODUCTION",
      description: [
        "Developed a cross-platform mobile health monitoring application using React Native for real-time vital tracking and health alerts.",
        "Built family and friend medication tracking features with automated push notification reminders and daily compliance reports.",
        "Engineered hardware IoT integration to sync live biometric data from wearable sensor modules directly to user profiles.",
        "Architected scalable Node.js backend microservices and MongoDB database schemas for encrypted personal health records.",
        "Deployed secure media storage using Cloudinary and automated serverless backend workflows on AWS."
      ],
      tech: ["React Native", "Node.js", "Tailwind", "Motion", "MongoDB", "AWS", "Cloudinary", "IOT"],
      link: "https://swasthya.parminder.pro",
    },
    {
      id: "PRJ-04",
      name: "ZURL",
      status: "PRODUCTION",
      description: [
        "Created a high-speed URL shortening service with custom link alias creation, password protection, and instant QR code generation.",
        "Implemented comprehensive click analytics tracking geolocation, device breakdown, referrer HTTP headers, and access timestamps.",
        "Designed a sleek dark-mode responsive user interface built with React, Tailwind CSS, and smooth Motion animations.",
        "Architected lightweight Node.js redirect handlers and optimized MongoDB index lookups to achieve sub-50ms URL redirection speeds.",
        "Added custom domain branding support, bulk link management, and customizable link expiration policies."
      ],
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        {projects.map((prj, index) => {
          const isExpanded = expandedId === prj.id;
          const isLast = index === projects.length - 1;

          return (
            <div
              key={prj.id}
              style={{
                borderBottom: isLast ? "none" : "1px solid var(--line-stroke-accent)",
                backgroundColor: "var(--background)",
                transition: "background-color 0.2s ease",
              }}
            >
              {/* Compact Header Row */}
              <div
                style={{
                  padding: "16px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setExpandedId(isExpanded ? "" : prj.id)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  {/* Project icon */}
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
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
                    {prj.name.charAt(0)}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--foreground)" }}>{prj.name}</span>
                      <span
                        style={{
                          fontSize: "9px",
                          padding: "2px 6px",
                          color: prj.status === "PRODUCTION" ? "#3b82f6" : "#f59e0b",
                          letterSpacing: "0.08em",
                          borderRadius: "3px",
                          fontWeight: 600,
                          border: prj.status === "PRODUCTION" ? "1px solid #3b82f6" : "1px solid #f59e0b",
                          borderStyle: "dashed",
                        }}
                      >
                        {prj.status}
                      </span>
                    </div>
                    <span style={{ fontSize: "11px", color: "var(--nav-link)", letterSpacing: "0.05em" }}>{prj.id}</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
                        padding: "5px 10px",
                        border: "1px dashed var(--line-stroke-accent)",
                        borderRadius: "4px",
                        color: "var(--foreground)",
                        fontSize: "10px",
                        textDecoration: "none",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
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
                      <polyline points="6 15 12 9 18 15" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Expandable Details */}
              {isExpanded && (
                <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Dotted Divider */}
                  <div style={{ borderTop: "1px dotted var(--line-stroke-accent)", margin: "0" }} />

                  {/* Technologies & Tools */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)" }}>Technologies & Tools</span>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {prj.tech.map((t) => (
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

                  {/* What I've done (5 Points) */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "4px" }}>
                    <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)" }}>What I've done</span>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                      {(Array.isArray(prj.description) ? prj.description : [prj.description]).map((desc, i) => (
                        <li key={i} style={{ display: "flex", gap: "12px", color: "var(--nav-link-hover)", fontSize: "13px", lineHeight: "1.6" }}>
                          <span style={{ color: "var(--line-stroke-accent)", marginTop: "1px", fontSize: "10px" }}>▪</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
